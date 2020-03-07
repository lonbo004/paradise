<template>
  <div class="search_frame ctn0">
    <div class="search_ctn">
      <div class="search_title">使用進階組合搜尋（*不填則搜尋所有）：</div>
      <div class="search_form">
        <el-form ref="form" :model="params">
          <el-row>
            <el-col :sm="8">
              <el-form-item class="form_label" label="菜品暱稱">
                <el-input class="type_input" v-model="params.name" placeholder="不填搜尋所有"></el-input>
              </el-form-item>
            </el-col>
            <el-col :sm="8">
              <el-form-item class="form_label" label="服務縣市">
                <el-select class="type_input" v-model="params.city" placeholder="請選擇市縣">
                  <el-option :label="item.Name" :value="item.Code" v-for="item in cityList">{{item.Name}}</el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :sm="8">
              <el-form-item class="form_label" label="服務地區">
                <el-select class="type_input search_from_select" v-model="params.area" multiple placeholder="請選擇服務地區" popper-class="search_from_select" @change="areaSelect">
                  <div class="fx sp_option">
                    <el-option :value="'all'">
                      <span>全選</span>
                    </el-option>
                    <el-option :value="'clear'">
                      <span>清除</span>
                    </el-option>
                  </div>
                  <el-option :label="item.Name" :value="item.Code" v-for="item in areaList">
                    <el-checkbox-group class="check_group" v-model="params.area">
                      <el-checkbox :label="item.Name" :value="item.Code">{{item.Name}}</el-checkbox>
                    </el-checkbox-group>
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :sm="8">
              <el-form-item class="form_label" label="年龄">
                <el-input class="type_input" v-model="params.name" placeholder="如:20,或:18-25"></el-input>
              </el-form-item>
            </el-col>
            <el-col :sm="8">
              <el-form-item class="form_label" label="身高">
                <el-input class="type_input" v-model="params.name" placeholder="如:168,或:160-170"></el-input>
              </el-form-item>
            </el-col>
            <el-col :sm="8">
              <el-form-item class="form_label" label="體重">
                <el-input class="type_input" v-model="params.name" placeholder="如:56,或:56-60"></el-input>
              </el-form-item>
            </el-col>
            <el-col :sm="8">
              <el-form-item class="form_label" label="托播價">
                <el-input class="type_input" v-model="params.name" placeholder="如:1000,或:1000-3500"></el-input>
              </el-form-item>
            </el-col>
            <el-col :sm="24">
              <el-form-item class="form_label" label="國籍">
                <el-checkbox-group v-model="params.countryList" class="check_group">
                  <el-checkbox :label="item.Code" v-for="item in countryList" :value="item.Code">{{item.Name}}</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-col>
            <el-col :sm="24">
              <el-form-item class="form_label" label="服務環境">
                <el-checkbox-group v-model="params.environmentList" class="check_group">
                  <el-checkbox :label="item.code" v-for="item in environmentList" :value="item.code">{{item.name}}</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-col>
            <el-col :sm="24">
              <el-form-item class="form_label" label="罩杯">
                <el-checkbox-group v-model="params.cupList" class="check_group">
                  <el-checkbox :label="item.code" v-for="item in cupList" :value="item.code">{{item.name}}</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-col>
            <el-col :sm="8">
              <el-form-item class="form_label" label="服務方式">
                <el-checkbox-group v-model="params.serviceTypeList" class="check_group">
                  <el-checkbox :label="item.Code" v-for="item in serviceTypeList" :value="item.Code">{{item.Name}}</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-col>
            <el-col :sm="16">
              <el-form-item class="form_label" label="服務模式">
                <el-checkbox-group v-model="params.serviceModeList" class="check_group">
                  <el-checkbox :label="item.code" v-for="item in serviceModeList" :value="item.code">{{item.name}}</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-col>
            <el-col :sm="24">
              <el-form-item class="form_label" label="可配合">
                <el-checkbox-group v-model="params.allowServiceList" class="check_group">
                  <el-checkbox :label="item.code" v-for="item in allowServiceList" :value="item.code">{{item.name}}</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-col>
            <el-col :sm="24">
              <el-form-item>
                <el-button @click="searchMeiMei" class="submit">送出</el-button>
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

export default {
  data() {
    return {
      params: {
        area: [],
        name: '',
        city: '',
        cupList: [],
        countryList: [],
        allowServiceList: [],
        serviceTypeList: [],
        serviceModeList: [],
        environmentList: []
      },
      oldChooseData: [],
    }
  },
  computed: {
    ...mapState(["siteData"]),////test siteData
    ...mapGetters(["siteInfo", "TownList"]),
    environmentList() {
      return this.siteData.EnvironmentList
    },
    serviceModeList() {
      return this.siteData.ServiceModeList
    },
    allowServiceList() {
      return this.siteData.AllowServiceList
    },
    cupList() {
      return this.siteData.CupList
    },
    countryList() {
      return this.siteInfo.CountryList
    },
    serviceTypeList() {
      return this.siteInfo.ServiceTypeList
    },
    cityList() {
      return this.TownList
    },
    areaList() {
      let res = []
      let city = !!this.params.city
      if (city) {
        res = this.TownList.filter((tw) => tw.Code === this.params.city)[0].DistrictList
      }
      return res
    },
  },
  methods: {
    searchMeiMei() {
      console.log('submit!');
    },
    areaSelect(val) {
      const allValues = this.areaList.map(item => {
        return item.Code;
      });
      const oldVal = this.oldChooseData.length > 0 ? this.oldChooseData : []
      if (val.includes('all')) {
        this.params.area = allValues;
      }

      // const res = item.find((obj, idx) => obj[idx] === 'all' || obj === 'clear')
      // console.log(res)
      // if (item[0] === 'all' || !res) {
      //   console.log(item)
      //   this.params.area = this.areaList.map(areas => areas.Code)
      // }
      // if (item[0] === 'clear' || res) {
      //   console.log(item, res)
      //   this.params.area = []
      // }
    }
  },
};
</script>