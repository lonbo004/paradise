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
      <div class="fx t_s_content">
        <div class="t_s_city">
          <div class="side_city_btn" v-for="item in TownList">{{item.Name}}</div>
        </div>
        <div class="t_s_res">
          <MeLayout>
            <MeCard :class="'_kw'" v-for="(item,index) in me_list" :meInfo="item" />
          </MeLayout>
          <div class="t_s_box">
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
import MeLayout from "@c/MeLayout";
import MeCard from "@c/MeCard";
import pagination from "@c/pagination";
export default {
  components: { MeLayout, MeCard, pagination },
  data() {
    return {
      me_list: [],
      count: 0,
      params: {
        town_code: "",
        district_code: "",
        country_code: "",
        service_type_code: ""
      },
      page: 1,
      page_range: 10,
      DistrictList: [],
      ready: false,
    }
  },
  computed: {
    ...mapState(["SiteCode"]),
    ...mapGetters(["siteInfo", "TownList", "CountryList", "ServiceTypeList"]),
  },
  created() {
    this.DistrictList = this.TownList.find(x => x.Code === this.$route.params.townCode).DistrictList;
  },
  mounted() {
    this.params.town_code = this.$route.params.townCode;
    this.params.district_code = this.$route.params.districtCode;
    this.params.country_code = this.$route.params.countryCode;
    this.params.service_type_code = this.$route.params.serviceType;
    this.ready = true;
  },
  methods: {
    getData() {
      let _params = JSON.parse(JSON.stringify(this.params));
      for (let key in _params) {
        if (_params[key] == -1) {
          _params[key] = "";
        }
      }
      _params.page = this.page;
      _params.page_range = this.page_range;
      Lady_Search(_params).then(res => {
        this.page = 1;
        this.me_list = res.LadyList;
        this.count = res.count;
      }).finally(() => {
        document.getElementsByTagName("html")[0].scrollTop = 0;
      })
    }
  },
  watch: {
    params: {
      handler(val) {
        if (!this.ready) return false;
        this.$router.replace({ path: `/${this.SiteCode}/town/${this.params.town_code}/${this.params.district_code}/${this.params.country_code}/${this.params.service_type_code}` })
      },
      deep: true
    },
    $route: {
      handler(val) {
        this.getData();
      },
      deep: true,
      immediate: true
    }
  }
};
</script>
