<template>
  <div class="top_frame">
    <div class="top_ctn">
      <div class="br_arc"></div>
      <SideLayout>
        <template slot="side">
          <div class="s_town_btn" v-for="item in TownList" :class="{active: item.Code === params}" @click="sp_town_code('sd', item.Code)">{{item.Name}}</div>
        </template>
        <template slot="body">
          <MeLayout>
            <MeCard :mode="'_top'" v-for="(item,index) in me_list" :meInfo="item" />
          </MeLayout>
        </template>
        <template slot="pagination" v-if="me_list.length">
          <pagination :total="count" :page.sync="params.page" :limit.sync="params.page_range" @pagination="()=>{getData(false)}" />
        </template>
      </SideLayout>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
//api
import { Lady_Search } from "@/api";
//components
import MeLayout from "@c/MeLayout";
import SideLayout from "@c/SideLayout";
import MeCard from "@c/MeCard/MeCard.vue";
import pagination from "@c/pagination";
export default {
  components: { SideLayout, MeLayout, MeCard, pagination },
  data() {
    return {
      count: 0,
      me_list: [],
      params: {
        town_code: this.$route.params.town_code,
        page: 1,
        page_range: 10,
      },
    }
  },
  computed: {
    ...mapState(["SiteCode"]),
    ...mapGetters(["TownList"]),
  },
  mounted() {
    this.getData(false);
  },
  methods: {
    getData(isNewSearch) {
      this.params.town_code = val.params.town_code;
      if (isNewSearch) this.params.page = 1;
      Lady_Search(this.params).then(res => {
        this.me_list = res.LadyList;
        this.count = res.count;
      })
    },
    sp_town_code(type, code) {
      if (type === "sd") {
        this.$router.push({ path: `/${this.SiteCode}/top/${code}` })
      }
    }
  },
  watch: {
    $route: {
      handler(val) {
        this.getData(true);
      },
      deep: true,
    }
  }
}
</script>

<style>
</style>