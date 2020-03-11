<template>
  <div class="meme_frame">
    <div class="meme_ctn">
      <div class="banner_frame">
        <div class="banner_ctn">
          <div class="me_box fx">
            <div class="_photo">
              <img :src="photo" />
            </div>
            <div class="_data _fill">
              <div class="_name">{{currentMe.name}}</div>
              <div class="_list fx fw">
                <template v-for="row in templateList">
                  <div v-for="item in row" :class="{_50: row.length>1}">
                    {{item.label}}
                    <span :class="item.value_css">{{item.value}}</span>
                  </div>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="meme_info">
        <div class="meme_file fx fw jcsb">
          <div class="file_box" v-for="item in currentMe.FileList">
            <template v-if="/^image/.test(item.filetype)">
              <img :src="item.path" />
            </template>
            <template v-if="/^video/.test(item.filetype)">
              <video :src="item.path" controls preload></video>
            </template>
          </div>
        </div>
        <div class="meme_service">
          <div class="service_list">
            服務地區 :
            <span>{{currentMe.district_code_name||"暫無"}}</span>
          </div>
          <div class="service_list">
            服務模式 :
            <span>{{currentMe.service_mode_name||"暫無"}}</span>
          </div>
          <div class="service_list">
            可配合 :
            <span>{{currentMe.allow_name||"暫無"}}</span>
          </div>
          <div class="service_list">
            不接受 :
            <span>{{currentMe.not_allow_name||"暫無"}}</span>
          </div>
          <div class="service_list">
            加價項目 :
            <span>{{currentMe.discount||"暫無"}}</span>
          </div>
          <div class="service_list">
            商品優惠(備註事項) :
            <span>{{currentMe.note||"暫無"}}</span>
          </div>
        </div>
        <div class="meme_star">
          <div class="fx aic total_start">
            <div class="score">{{total_point}}</div>
            <el-rate v-model="re_total_point" disabled></el-rate>
          </div>
          <div class="fx reta_item">
            <span>外貌：</span>
            <el-rate v-model="re_face_point" allow-half></el-rate>
            <span class="_score">{{face_point}}</span>
          </div>
          <div class="fx reta_item">
            <span>態度：</span>
            <el-rate v-model="re_attitude_point" allow-half></el-rate>
            <span class="_score">{{attitude_point}}</span>
          </div>
          <div class="fx reta_item">
            <span>身材：</span>
            <el-rate v-model="re_body_point" allow-half></el-rate>
            <span class="_score">{{body_point}}</span>
          </div>
          <div class="fx reta_item">
            <span>技巧：</span>
            <el-rate v-model="re_skill_point" allow-half></el-rate>
            <span class="_score">{{skill_point}}</span>
          </div>
          <div class="submit" v-if="isLogin" @click="memeRating">送出評分</div>
        </div>
        <div class="msg_ctn">
          <div class="fx list" v-for="item in currentMe.messageList">
            <div class="user_img">
              <img src="@img/deafult.jpg" />
            </div>
            <div class="comment">
              <div class="title">
                <div class="name">{{item.member_name}}</div>
              </div>
              <div class="text">{{item.cotents}}</div>
              <div class="date">{{MMT(item.createtime).format('YYYY年MM月YY日 HH:mm')}}</div>
            </div>
          </div>
          <div class="fx comment_from" v-if="isLogin">
            <input type="text" v-model="cotents" placeholder="發表我的評價" @keypress.enter="Message_Create" />
            <div class="comment_btn" @click="Message_Create">評價</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import slick from "vue-slick";//initialSlide
//api
import { Lady_GetOne, Message_Create, Score_Create } from "@/api";
export default {
  components: { slick },
  data() {
    return {
      cotents: '',
      total_point: 0,
      face_point: 0,
      attitude_point: 0,
      body_point: 0,
      skill_point: 0,
    }
  },
  computed: {
    ...mapState(["isLogin", "memberData"]),
    ...mapGetters(["siteInfo"]),
    currentMe: {
      get() { return this.$store.state.currentMe; },
      set(val) { this.$store.state.currentMe = val; }
    },
    re_total_point: {
      get() { return this.total_point / 2; },
      set(val) { this.total_point = val * 2; }
    },
    re_face_point: {
      get() { return this.face_point / 2; },
      set(val) { this.face_point = val * 2; }
    },
    re_attitude_point: {
      get() { return this.attitude_point / 2; },
      set(val) { this.attitude_point = val * 2; }
    },
    re_body_point: {
      get() { return this.body_point / 2; },
      set(val) { this.body_point = val * 2; }
    },
    re_skill_point: {
      get() { return this.skill_point / 2; },
      set(val) { this.skill_point = val * 2; }
    },
    photo() {
      return ((this.currentMe.FileList || [])[0] || {}).path;
    },
    templateList() {
      let result = [];
      function row(label, value) {
        return { label, value }
      }
      result.push([
        new row("國别:", this.currentMe.country_name),
        new row("編號:", this.currentMe.id),
      ]);
      result.push([
        new row("年齡:", this.currentMe.age),
        new row("身高:", this.currentMe.height)
      ]);
      result.push([
        new row("體重:", this.currentMe.weight),
        new row("罩杯:", this.currentMe.cup)
      ]);
      result.push([
        new row("環境:", this.currentMe.environment_name),
        new row("類型:", this.currentMe.service_type_name)
      ]);
      result.push([
        new row("長鐘時間:", this.currentMe.longtime),
        new row("短鐘時間:", this.currentMe.shorttime)
      ]);
      if (this.siteInfo.ShowPrice) {
        result.push([]);
        if (this.currentMe.longtime_local_final_price) {
          result[result.length - 1].push(new row("定點長鐘:", this.currentMe.longtime_local_final_price))
        }
        if (this.currentMe.longtime_outside_final_price) {
          result[result.length - 1].push(new row("外約長鐘:", this.currentMe.longtime_outside_final_price))
        }
        result.push([]);
        if (this.currentMe.shorttime_local_final_price) {
          result[result.length - 1].push(new row("定點短鐘:", this.currentMe.shorttime_local_final_price))
        }
        if (this.currentMe.shorttime_outside_final_price) {
          result[result.length - 1].push(new row("外約短鐘:", this.currentMe.shorttime_outside_final_price))
        }
      }
      return result;
    },
    MMT: () => MMT
  },
  mounted() {
    this.getData();
  },
  methods: {
    memeRating() {
      Score_Create(this.face_point, this.attitude_point, this.body_point, this.skill_point).then(res => {
        this.getData();
      })
    },
    Message_Create() {
      Message_Create(this.cotents).then(res => {
        this.cotents = "";
        this.getData();
      })
    },
    getData() {
      Lady_GetOne(this.$route.params.code).then(res => {
        if (res) {
          this.currentMe = res;
          this.total_point = res.total_point;
          this.face_point = res.face_point;
          this.attitude_point = res.attitude_point;
          this.body_point = res.body_point;
          this.skill_point = res.skill_point;
        };
      })
    }
  }
};
</script>

<style lang="less">
@import "~@c/MeCard/css.less";
</style>
