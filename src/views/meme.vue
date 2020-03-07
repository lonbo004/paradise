<template>
  <div class="meme_frame ctn0">
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
                <span>{{meInfo.id}}</span>
              </div>
              <div class="_name">{{meInfo.name}}</div>
              <div class="_list fx fw">
                <div class="_50">
                  國别:
                  <span>{{meInfo.country_name}}</span>
                </div>
                <div class="_50">
                  年齡:
                  <span>{{meInfo.age}}</span>
                </div>
                <div class="_50">
                  身高:
                  <span>{{meInfo.height}}</span>
                </div>
                <div class="_50">
                  體重:
                  <span>{{meInfo.weight}}</span>
                </div>
                <div class="_50">
                  罩杯:
                  <span>{{meInfo.cup}}</span>
                </div>
                <div class="_50">
                  環境:
                  <span>{{meInfo.environment_name}}</span>
                </div>
                <div>
                  類型:
                  <span>{{meInfo.service_type_name}}</span>
                </div>
                <div class="_50">
                  <template v-if="meInfo.longtime_local_final_price">
                    定點長鐘:
                    <span class="_price">{{meInfo.longtime_local_final_price}}</span>
                  </template>
                </div>
                <div class="_50">
                  <template v-if="meInfo.longtime_outside_final_price">
                    外約長鐘:
                    <span class="_price">{{meInfo.longtime_outside_final_price}}</span>
                  </template>
                </div>
                <div class="_50">
                  <template v-if="meInfo.shorttime_local_final_price">
                    定點短鐘:
                    <span class="_price">{{meInfo.shorttime_local_final_price}}</span>
                  </template>
                </div>
                <div class="_50">
                  <template v-if="meInfo.shorttime_outside_final_price">
                    外約短鐘:
                    <span class="_price">{{meInfo.shorttime_outside_final_price}}</span>
                  </template>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="meme_info">
        <div class="meme_service">
          <div class="service_list">
            服務地區 :
            <span>{{meInfo.district_code_name||"暫無"}}</span>
          </div>
          <div class="service_list">
            服務模式 :
            <span>{{meInfo.service_mode_name||"暫無"}}</span>
          </div>
          <div class="service_list">
            可配合 :
            <span>{{meInfo.allow_name||"暫無"}}</span>
          </div>
          <div class="service_list">
            不接受 :
            <span>{{meInfo.not_allow_name||"暫無"}}</span>
          </div>
        </div>
        <div class="meme_star">
          <div class="total_start">
            <div class="score">
              <span class="decimal"></span>
            </div>
          </div>
          <div class="star_rate"></div>
          <div class="star_rate"></div>
          <div class="star_rate"></div>
          <div class="star_rate"></div>
          <div class="submit"></div>
        </div>
        <div class="msg_ctn">
          <div class="fx list" v-for="item in meInfo.messageList">
            <div class="user_img">
              <img src="@img/deafult.jpg" />
            </div>
            <div class="comment">
              <div class="title">
                <div class="name">小宇</div>
              </div>
              <div class="text">臉蛋是本人，沒什麼誤差。會說簡單中文字詞，不會英文，只會越南話。膚色差不多。笑容不錯。入穴感覺不錯。但是..凸小腹。不給親。不給摸下面。身體似乎有蟹足腫。按摩簡單捏幾下後就一直拍打，請記得說OK了，否則一直拍打下去。</div>
              <div class="date">2020年2月21日 21:56</div>
            </div>
          </div>
          <div class="fx comment_from">
            <input type="text" v-model="commentText" placeholder="發表我的評價" />
            <div class="comment_btn">評價</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import slick from "vue-slick";//initialSlide
//api
import { Lady_GetOne } from "@/api";
export default {
  components: { slick },
  data() {
    return {
      meInfo: {},
      commentText: ''
    }
  },
  computed: {
    ...mapState(["currentMe"]),
    photo() {
      return ((this.meInfo.LadyFileList || [])[0] || {}).path;
    },
  },
  mounted() {
    if (this.currentMe) this.meInfo = this.currentMe;
    else this.getData();
  },
  methods: {
    getData() {
      Lady_GetOne(this.$route.params.code).then(res => {
        if (res) this.meInfo = res;
      })
    }
  }
};
</script>

<style>
</style>
