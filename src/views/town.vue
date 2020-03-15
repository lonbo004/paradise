<template>
  <div class="t_search_frame">
    <div class="t_search_ctn">
      <div class="br_arc"></div>
      <div class="t_s_total">
        全部菜品
        <span>{{count}}</span>
        位
      </div>
      <div class="t_s_row">
        <el-select v-model="params.district_code" placeholder="地區">
          <el-option :label="'不限'" :value="'-1'"></el-option>
          <el-option v-for="item in DistrictList" :label="item.Name" :value="item.Code"></el-option>
        </el-select>
        <el-select v-model="params.country_code" placeholder="國別">
          <el-option :label="'不限'" :value="'-1'"></el-option>
          <el-option v-for="item in CountryList" :label="item.Name" :value="item.Code"></el-option>
        </el-select>
        <el-select v-model="params.service_type_code" placeholder="定點">
          <el-option :label="'不限'" :value="'-1'"></el-option>
          <el-option v-for="item in ServiceTypeList" :label="item.Name" :value="item.Code"></el-option>
        </el-select>
      </div>
      <SideLayout>
        <template slot="side">
          <div class="s_town_btn" v-for="item in TownList" :class="{active: item.Code === params.town_code}" @click="sp_town_code('sd',item.Code)">{{item.Name}}</div>
        </template>
        <template slot="body">
          <MeLayout>
            <MeCard :mode="'_town'" v-for="(item,index) in me_list" :meInfo="item" :key="index" />
          </MeLayout>
        </template>
        <template slot="pagination" v-if="me_list.length">
          <pagination :total="count" :page.sync="page" :limit.sync="page_range" @pagination="()=>{getData(false)}" />
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
//mixins
import cacheCurrentPage from "@mix/cacheCurrentPage";
export default {
  components: { SideLayout, MeLayout, MeCard, pagination },
  mixins: [cacheCurrentPage],
  data() {
    return {
      me_list: [],
      count: 0,
      params: {
        town_code: this.$route.params.town_code,
        district_code: this.$route.params.district_code,
        country_code: this.$route.params.country_code,
        service_type_code: this.$route.params.service_type_code,
      },
      page: 1,
      page_range: 10,
      DistrictList: [],
      ready: true,
    }
  },
  computed: {
    ...mapState(["SiteCode"]),
    ...mapGetters(["siteInfo", "TownList", "CountryList", "ServiceTypeList"]),
    cacheData() {
      return {
        params: this.params,
        page: this.page
      }
    }
  },
  mounted() {
    this.DistrictList = this.TownList.find(x => x.Code === this.params.town_code).DistrictList;
    this.getData(false);
  },
  methods: {
    getData(isNewSearch) {
      if (!this.ready) return false;
      if (isNewSearch) this.page = 1;
      let _params = JSON.parse(JSON.stringify(this.params));
      for (let key in _params) {
        if (_params[key] == -1) {
          _params[key] = "";
        }
      }
      _params.page = this.page;
      _params.page_range = this.page_range;
      Lady_Search(_params).then(res => {
        this.me_list = res.LadyList;
        this.count = res.count;
      }).finally(() => {
        document.getElementsByTagName("html")[0].scrollTop = 0;
      })
    },
    sp_town_code(type, val) {
      if (type === "sd") {
        this.ready = false;
        this.params.town_code = val;
        this.params.district_code = "-1";
        this.DistrictList = this.TownList.find(x => x.Code === this.params.town_code).DistrictList;
        this.ready = true;
        this.getData(true);
      }
    }
  },
  watch: {
    params: {
      handler(val) {
        const _path = `/${this.SiteCode}/town/${this.params.town_code}/${this.params.district_code}/${this.params.country_code}/${this.params.service_type_code}`;
        if (_path === this.$route.path) return false;
        this.$router.replace({ path: _path });
      },
      deep: true
    },
    $route: {
      handler(val) {
        this.getData(true);
      },
      deep: true
    }
  }
};
</script>
<style lang="less">
.s_head {
  padding: 0 !important;
}
</style>