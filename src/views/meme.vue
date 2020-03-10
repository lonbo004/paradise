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
              <div class="_num">
                編號:
                <span>{{currentMe.id}}</span>
              </div>
              <div class="_name">{{currentMe.name}}</div>
              <div class="_list fx fw">
                <div class="_50">
                  國别:
                  <span>{{currentMe.country_name}}</span>
                </div>
                <div class="_50">
                  年齡:
                  <span>{{currentMe.age}}</span>
                </div>
                <div class="_50">
                  身高:
                  <span>{{currentMe.height}}</span>
                </div>
                <div class="_50">
                  體重:
                  <span>{{currentMe.weight}}</span>
                </div>
                <div class="_50">
                  罩杯:
                  <span>{{currentMe.cup}}</span>
                </div>
                <div class="_50">
                  環境:
                  <span>{{currentMe.environment_name}}</span>
                </div>
                <div>
                  類型:
                  <span>{{currentMe.service_type_name}}</span>
                </div>
                <div class="_50">
                  <template v-if="currentMe.longtime_local_final_price">
                    定點長鐘:
                    <span class="_price">{{currentMe.longtime_local_final_price}}</span>
                  </template>
                </div>
                <div class="_50">
                  <template v-if="currentMe.longtime_outside_final_price">
                    外約長鐘:
                    <span class="_price">{{currentMe.longtime_outside_final_price}}</span>
                  </template>
                </div>
                <div class="_50">
                  <template v-if="currentMe.shorttime_local_final_price">
                    定點短鐘:
                    <span class="_price">{{currentMe.shorttime_local_final_price}}</span>
                  </template>
                </div>
                <div class="_50">
                  <template v-if="currentMe.shorttime_outside_final_price">
                    外約短鐘:
                    <span class="_price">{{currentMe.shorttime_outside_final_price}}</span>
                  </template>
                </div>
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
            備註 :
            <span>{{currentMe.note||"暫無"}}</span>
          </div>
        </div>
        <div class="meme_star">
          <div class="fx aic total_start">
            <div class="score">{{totalScore * 2}}</div>
            <el-rate v-model="totalScore" disabled score-template="{totalScore}"></el-rate>
          </div>
          <div class="fx reta_item">
            <span>外貌：</span>
            <el-rate v-model="ratingGrup.face_point" allow-half show-score text-color="#6bc414"></el-rate>
          </div>
          <div class="fx reta_item">
            <span>態度：</span>
            <el-rate v-model="ratingGrup.attitude_point" allow-half show-score text-color="#6bc414"></el-rate>
          </div>
          <div class="fx reta_item">
            <span>身材：</span>
            <el-rate v-model="ratingGrup.body_point" allow-half show-score text-color="#6bc414"></el-rate>
          </div>
          <div class="fx reta_item">
            <span>技巧：</span>
            <el-rate v-model="ratingGrup.skill_point" allow-half show-score text-color="#6bc414"></el-rate>
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
            <input type="text" v-model="cotents" placeholder="發表我的評價" @keypress.enter="Api_Message_Create" />
            <div class="comment_btn" @click="Api_Message_Create">評價</div>
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
import { Lady_GetOne, Api_Message_Create, Api_Score_Create } from "@/api";
export default {
  components: { slick },
  data() {
    return {
      cotents: '',
      ratingGrup: {
        face_point: 0,
        attitude_point: 0,
        body_point: 0,
        skill_point: 0,
      }
    }
  },
  computed: {
    ...mapState(["isLogin", "memberData"]),
    currentMe: {
      get() { return this.$store.state.currentMe; },
      set(val) { this.$store.state.currentMe = val; }
    },
    totalScore() {
      let total = 0
      let data = this.ratingGrup
      for (let score in data) {
        total = total + data[score] / 4
      }
      return total
    },
    photo() {
      return ((this.currentMe.FileList || [])[0] || {}).path;
    },
    MMT: () => MMT
  },
  mounted() {
    this.getData();
  },
  methods: {
    memeRating() {
      Api_Score_Create(this.face_point, this.attitude_point, this.body_point, this.skill_point).then(res => {
        this.getData();
      })
    },
    Api_Message_Create() {
      Api_Message_Create(this.cotents).then(res => {
        this.cotents = "";
        this.getData();
      })
    },
    getData() {
      Lady_GetOne(this.$route.params.code).then(res => {
        if (res) {
          this.currentMe = res;
        };
      })
    }
  }
};
</script>

<style>
</style>
