<template>
  <div class="search_frame ctn0">
    <div class="search_ctn" v-if="me_list.length">
      <div class="search_title">使用進階組合搜尋（*不填則搜尋所有）：</div>
      <MeLayout>
        <MeCard :class="'_kw'" v-for="(item,index) in me_list" :meInfo="item" />
      </MeLayout>
      <div>
        <pagination :total="count" :page.sync="params.page" :limit.sync="params.page_range" @pagination="getData" />
      </div>
    </div>
    <div class="search_ctn">
      <div class="search_title">使用進階組合搜尋（*不填則搜尋所有）：</div>
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
                <el-select class="type_input search_from_select" multiple placeholder="請選擇服務地區" popper-class="search_from_select">
                  <div class="fx sp_option">
                    <span @click="sp_district_code('all')">全選</span>
                    <span @click="sp_district_code('clear')">清除</span>
                  </div>
                  <el-option :label="item.Name" :value="item.Code" v-for="item in DistrictList">
                    <el-checkbox-group class="check_group" v-model="params.district_code">
                      <el-checkbox :label="item.Code">{{item.Name}}</el-checkbox>
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
                <el-button @click="getData" class="submit">送出</el-button>
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
import MeCard from "@c/MeCard";
import pagination from "@c/pagination";
export default {
  components: { MeLayout, MeCard, pagination },
  data() {
    return {
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
    }
  },
  computed: {
    ...mapGetters(["siteInfo", "TownList", "CountryList", "EnvironmentList", "CupList", "ServiceTypeList", "ServiceModeList", "AllowServiceList"]),
  },
  methods: {
    getData() {
      Lady_Search(params).then(res => {
        this.page = 1;
        this.me_list = res.LadyList;
        this.count = res.count;
      })
    },
    sp_district_code(type) {
      if (type === "all") {
        this.params.district_code = this.sd_TownList.DistrictList.map(x => x.Code);
      }
      else if (type === "clear") {
        this.params.district_code.splice(0);
      }
    }
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