<template>
  <div class="kw_frame">
    <div class="kw_ttl">搜尋結果</div>
    <div class="br_arc"></div>
    <div class="count_ttl" v-show="isGetData">
      符合條件的結果
      <span>{{count}}</span> 筆
    </div>
    <div class="kw_ctn" v-if="me_list.length">
      <MeLayout>
        <MeCard :mode="'_kw'" v-for="(item,index) in me_list" :meInfo="item" :key="index" />
      </MeLayout>
      <pagination :total="count" :page.sync="page" :limit.sync="page_range" @pagination="()=>{getData(false)}" />
    </div>
  </div>
</template>

<script>
import { Lady_Keywords_Search } from "@/api";
//components
import MeLayout from "@c/MeLayout";
import MeCard from "@c/MeCard/MeCard.vue";
import pagination from "@c/pagination";
//mixins
import cacheCurrentPage from "@mix/cacheCurrentPage";
export default {
  components: { MeLayout, MeCard, pagination },
  mixins: [cacheCurrentPage],
  data() {
    return {
      count: 0,
      page: 1,
      page_range: 10,
      me_list: [],
      isGetData: false,
    }
  },
  computed: {
    keyword() {
      return this.$route.params.keyword;
    },
    cacheData() {
      return {
        page: this.page
      }
    }
  },
  mounted() {
    this.getData(false);
  },
  methods: {
    getData(isNewSearch) {
      this.isGetData = true;
      if (isNewSearch) this.page = 1;
      Lady_Keywords_Search(this.keyword, this.page, this.page_range).then(res => {
        this.me_list = res.LadyList;
        this.count = res.count;
      })
    }
  },
  watch: {
    $route: {
      handler() {
        this.getData(true);
      },
      deep: true
    }
  }
}
</script>

<style>
</style>