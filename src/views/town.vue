<template>
  <div class="t_search_frame">
    <div class="t_search_ctn">
      <div class="br_arc"></div>
      <div class="t_s_total">
        全部菜品
        <span>{{count}}</span>
        位
      </div>
      <div class="t_s_row fx jcsa">
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
            <MeCard :class="'_town'" v-for="(item,index) in me_list" :meInfo="item" />
          </MeLayout>
        </template>
        <template slot="pagination" v-if="me_list.length">
          <pagination :total="count" :page.sync="page" :limit.sync="page_range" @pagination="getData" />
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
import MeCard from "@c/MeCard";
import pagination from "@c/pagination";
export default {
  components: { SideLayout, MeLayout, MeCard, pagination },
  data() {
    return {
      me_list: [],
      count: 0,
      params: {
        town_code: this.$route.params.town_code,
        district_code: this.$route.params.district_code,
        country_code: this.$route.params.country_code,
        service_type_code: this.$route.params.service_type_code
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
  },
  created() {
    this.DistrictList = this.TownList.find(x => x.Code === this.params.town_code).DistrictList;
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
        this.$router.replace({ path: `/${this.SiteCode}/town/${this.params.town_code}/${this.params.district_code}/${this.params.country_code}/${this.params.service_type_code}` })
      },
      deep: true
    },
    $route: {
      handler(val) {
        this.getData(true);
      },
      deep: true,
      immediate: true
    }
  }
};
</script>
<style lang="less">
.s_head {
  padding: 0 !important;
}
</style>