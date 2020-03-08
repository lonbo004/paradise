<template>
  <div class="escort_frame">
    <div class="escort_ctn ctn0">
      <div class="br_arc"></div>
      <div class="escort_tab">
        <span @click="tab = 'all'" :class="{active : tab === 'all'}">全方位</span> |
        <span @click="tab = 'simple'" :class="{active : tab === 'simple'}">單純</span>
      </div>
      <div class="escort_content fx">
        <div class="escort_city" v-if="tab !== 'all'">
          <div class="side_city_btn" v-for="item in TownList" :class="{active: item.Code === townCode}" @click="sp_townCode('sd', item.Code)">{{item.Name}}</div>
        </div>
        <div class="escort_res _fill">
          <div class="fx fw jcsb me_fill">
            <MeCard :class="'_escort'" v-for="(item,index) in me_list" :meInfo="item" />
          </div>
          <div class="escort_box" v-if="me_list.length">
            <pagination :total="count" :page.sync="page" :limit.sync="page_range" @pagination="getData" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
//api
import { Lady_Search } from "@/api";
//components
import MeCard from "@c/MeCard";
import pagination from "@c/pagination";
export default {
  components: { MeCard, pagination },
  data() {
    return {
      tab: 'all',
      count: 0,
      page: 1,
      page_range: 10,
      me_list: [],
      townCode: "",
    }
  },
  computed: {
    ...mapState(["SiteCode"]),
    ...mapGetters(["TownList"]),
  },
  mounted() {
    this.townCode = this.$route.params.townCode;
  },
  methods: {
    getData() {
      let params = {
        town_code: this.townCode,
        page: this.page,
        page_range: this.page_range
      }
      Lady_Search(params).then(res => {
        this.page = 1;
        this.me_list = res.LadyList;
        this.count = res.count;
      })
    },
    sp_townCode(type, code) {
      if (type === "sd") {
        this.$router.push({ path: `/${this.SiteCode}/escort/${code}` })
      }
    }
  },
  watch: {
    $route: {
      handler(val) {
        if (!val.params.townCode) return false;
        if (val.params.townCode === this.townCode) return false;
        this.townCode = val.params.townCode;
        this.getData();
      },
      deep: true,
      immediate: true
    }
  }
}
</script>

<style>
</style>