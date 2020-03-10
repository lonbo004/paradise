<template>
  <div class="kw_frame">
    <div class="kw_ttl">搜尋結果</div>
    <div class="br_arc"></div>
    <div class="count_ttl">
      符合條件的結果
      <span>{{count}}</span> 筆
    </div>
    <div class="kw_ctn" v-if="me_list.length">
      <MeLayout>
        <MeCard :class="'_kw'" v-for="(item,index) in me_list" :meInfo="item" />
      </MeLayout>
      <pagination :total="count" :page.sync="page" :limit.sync="page_range" @pagination="()=>{getData(false)}" />
    </div>
  </div>
</template>

<script>
import { Lady_Keywords_Search } from "@/api";
//components
import MeLayout from "@c/MeLayout";
import MeCard from "@c/MeCard";
import pagination from "@c/pagination";
export default {
  components: { MeLayout, MeCard, pagination },
  data() {
    return {
      count: 0,
      page: 1,
      page_range: 10,
      me_list: [],
      keyword: ""
    }
  },
  methods: {
    getData(isNewSearch) {
      if (isNewSearch) this.page = 1;
      Lady_Keywords_Search(this.keyword, this.page, this.page_range).then(res => {
        this.me_list = res.LadyList;
        this.count = res.count;
      })
    }
  },
  watch: {
    $route: {
      handler(val) {
        if (!val.params.keyword) return false;
        if (val.params.keyword === this.keyword) return false;
        this.keyword = val.params.keyword;
        this.getData(true);
      },
      deep: true,
      immediate: true
    }
  }
}
</script>

<style>
</style>