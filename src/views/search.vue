<template>
  <div class="search_frame">
    <div class="count_ttl" v-show="isGetData">
      符合條件的結果
      <span>{{count}}</span> 筆
    </div>
    <div class="search_ctn">
      <template v-if="me_list.length">
        <MeLayout>
          <MeCard :mode="'_kw'" v-for="(item,index) in me_list" :meInfo="item" :key="index" />
        </MeLayout>
        <pagination :total="count" :page.sync="params.page" :limit.sync="params.page_range" @pagination="()=>{getData(false)}" />
      </template>
    </div>
    <div class="search_title">使用進階組合搜尋（*不填則搜尋所有）：</div>
    <div class="search_ctn">
      <div class="search_form">
        <el-form>
          <el-row>
            <el-col :sm="8">
              <el-form-item class="form_label" label="菜品暱稱">
                <el-input class="type_input" v-model="params.name" placeholder="不填搜尋所有"></el-input>
              </el-form-item>
            </el-col>
            <el-col :sm="8">
              <el-form-item class="form_label" label="服務縣市">
                <el-select class="type_input" v-model="params.town_code" placeholder="請選擇市縣">
                  <el-option :label="item.Name" :value="item.Code" v-for="item in TownList" @click.native="sd_TownList = item"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :sm="8">
              <el-form-item class="form_label" label="服務地區">
                <el-select class="type_input search_from_select" v-model="params.district_code" multiple remove-tag placeholder="請選擇服務地區" popper-class="search_from_select">
                  <div class="sp_option fx jcsa">
                    <span @click="sp_district_code('all')">全選</span>
                    <span @click="sp_district_code('clear')">清除</span>
                  </div>
                  <el-option :label="item.Name" :value="item.Code" v-for="item in DistrictList">
                    <el-checkbox-group class="check_group" v-model="params.district_code">
                      <el-checkbox :label="item.Code" @click.native.stop>{{item.Name}}</el-checkbox>
                    </el-checkbox-group>
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :sm="8">
              <el-form-item class="form_label" label="年龄">
                <el-input class="type_input" v-model="params.age" placeholder="如:20,或:18-25"></el-input>
              </el-form-item>
            </el-col>
            <el-col :sm="8">
              <el-form-item class="form_label" label="身高">
                <el-input class="type_input" v-model="params.height" placeholder="如:168,或:160-170"></el-input>
              </el-form-item>
            </el-col>
            <el-col :sm="8">
              <el-form-item class="form_label" label="體重">
                <el-input class="type_input" v-model="params.weight" placeholder="如:56,或:56-60"></el-input>
              </el-form-item>
            </el-col>
            <el-col :sm="8">
              <el-form-item class="form_label" label="托播價">
                <el-input class="type_input" v-model="params.price" placeholder="如:1000,或:1000-3500"></el-input>
              </el-form-item>
            </el-col>
            <el-col :sm="24">
              <el-form-item class="form_label" label="國籍">
                <el-checkbox-group v-model="params.country_code" class="check_group">
                  <el-checkbox :label="item.Code" v-for="item in CountryList" :value="item.Code">{{item.Name}}</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-col>
            <el-col :sm="24">
              <el-form-item class="form_label" label="服務環境">
                <el-checkbox-group v-model="params.environment_code" class="check_group">
                  <el-checkbox :label="item.code" v-for="item in EnvironmentList" :value="item.code">{{item.name}}</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-col>
            <el-col :sm="24">
              <el-form-item class="form_label" label="罩杯">
                <el-checkbox-group v-model="params.cup_code" class="check_group">
                  <el-checkbox :label="item.code" v-for="item in CupList" :value="item.code">{{item.name}}</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-col>
            <el-col :sm="8">
              <el-form-item class="form_label" label="服務方式">
                <el-checkbox-group v-model="params.service_type_code" class="check_group">
                  <el-checkbox :label="item.Code" v-for="item in ServiceTypeList" :value="item.Code">{{item.Name}}</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-col>
            <el-col :sm="16">
              <el-form-item class="form_label" label="服務模式">
                <el-checkbox-group v-model="params.service_mode_code" class="check_group">
                  <el-checkbox :label="item.code" v-for="item in ServiceModeList" :value="item.code">{{item.name}}</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-col>
            <el-col :sm="24">
              <el-form-item class="form_label" label="可配合">
                <el-checkbox-group v-model="params.allow_service" class="check_group">
                  <el-checkbox :label="item.code" v-for="item in AllowServiceList" :value="item.code">{{item.name}}</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-col>
            <el-col :sm="24">
              <el-form-item>
                <el-button @click="getData(true)" class="submit">送出</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
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
import MeCard from "@c/MeCard/MeCard.vue";
import pagination from "@c/pagination";
export default {
  components: { MeLayout, MeCard, pagination },
  data() {
    return {
      // firstLoad: true,//第一次載入
      me_list: [],
      count: 0,
      params: {
        name: "",
        town_code: "",
        district_code: [],
        age: "",
        height: "",
        weight: "",
        country_code: [],
        price: "",
        environment_code: [],
        service_type_code: [],
        service_mode_code: [],
        cup_code: [],
        allow_service: [],
        page: 1,
        page_range: 10,
      },
      sd_TownList: undefined,
      DistrictList: [],
      isGetData: false,
    }
  },
  computed: {
    ...mapGetters(["siteInfo", "TownList", "CountryList", "EnvironmentList", "CupList", "ServiceTypeList", "ServiceModeList", "AllowServiceList"]),
  },
  created() {
    let { params, sd_TownList } = this.$route.query;
    if (params) {
      params = JSON.parse(params);
      for (let key in params) {
        this.params[key] = params[key];
      }
    }
    if (sd_TownList) {
      this.sd_TownList = sd_TownList;
    }
  },
  mounted() {
    if (this.$route.query.params) this.isGetData = true;
    if (this.isGetData) {
      this.isGetData = false;
      this.getData(false);
    }
  },
  methods: {
    getData(isNewSearch) {
      if (isNewSearch) this.params.page = 1;
      //查詢條件存queryString
      let _params_query = {};
      for (let key in this.params) {
        if (Array.isArray(this.params[key])) {
          if (this.params[key].length) {
            _params_query[key] = this.params[key];
          }
        }
        else if (this.params[key]) {
          _params_query[key] = this.params[key];
        }
      }
      this.$router.push({
        path: `${this.$route.path}?params=${JSON.stringify(_params_query)}&sd_TownList=${this.sd_TownLis}`
      }).catch(() => { })
      //array轉字串
      let _params = JSON.parse(JSON.stringify(this.params));
      for (let key in _params) {
        if (Array.isArray(_params[key])) {
          _params[key] = _params[key].toString();
        }
      }
      Lady_Search(_params).then(res => {
        this.me_list = res.LadyList;
        this.count = res.count;
      }).finally(() => {
        this.isGetData = true;
        document.getElementsByTagName("html")[0].scrollTop = 0;
      })
    },
    sp_district_code(type) {
      if (type === "all") {
        this.params.district_code = this.sd_TownList.DistrictList.map(x => x.Code);
      }
      else if (type === "clear") {
        this.params.district_code.splice(0);
      }
    },
  },
  watch: {
    sd_TownList: {
      handler(val) {
        this.DistrictList = val.DistrictList;
        this.params.environment_code = [];
      },
    }
  }
};
</script>