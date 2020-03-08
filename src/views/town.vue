<template>
  <div class="t_search_frame ctn0">
    <div class="br_arc"></div>
    <div class="t_search_ctn">
      <div class="t_s_total">
        全部菜品
        <span>71</span>
        位
      </div>
      <div class="t_s_row">
        <el-form ref="form" class="t_s_form" :model="params">
          <el-row class="fx aic">
            <el-col :span="6">
              <el-form-item>
                <div class="town">
                  <div class="side_city_btn">{{town_code}}</div>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item>
                <el-select v-model="params.district_code" placeholder="地區">
                  <el-option v-for="item in areaList" ::label="item.Name" :label="item.Name" :value="item.Code">{{item.Name}}</el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item>
                <el-select v-model="params.environment_code" placeholder="國別">
                  <el-option :label="item.Name" v-for="item in countryList" :value="item.Code">{{item.Name}}</el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item>
                <el-select v-model="params.service_type_code" placeholder="定點">
                  <el-option :value="'不限'">不限</el-option>
                  <el-option :label="item.Name" v-for="item in serviceTypeList" :value="item.Code">{{item.Name}}</el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="fx t_s_content">
        <div class="t_s_city">
          <div class="side_city_btn" v-for="item in cityList" @click="selectTown(item)">{{item.Name}}</div>
        </div>
        <div class="t_s_res">
          <!-- <MeCard /> -->
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
import MeCard from "@c/MeCard";
import pagination from "@c/pagination";
export default {
  components: { MeCard, pagination },
  data() {
    return {
      params: {
        town_code: 'Taipei',
        district_code: '',
        site_code: '',
        environment_code: '',
        service_type_code: ''
      },
      town_code: '台北',
      count: 0,
      page: 1,
      page_range: 10,
    }
  },
  computed: {
    ...mapGetters(["siteInfo", "TownList"]),
    serviceTypeList() {
      return this.siteInfo.ServiceTypeList
    },
    countryList() {
      return this.siteInfo.CountryList
    },
    cityList() {
      return this.TownList
    },
    areaList() {
      let res = []
      let city = !!this.params.town_code
      if (city) {
        res = this.TownList.filter((tw) => tw.Code === this.params.town_code)[0].DistrictList
      }
      return res
    },
  },
  methods: {
    selectTown(item) {
      this.params.town_code = item.Code
      this.town_code = item.Name
    },
    getData() {
    }
  },
};
</script>
