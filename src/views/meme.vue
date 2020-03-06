<template>
  <div class="meme_frame ctn0">
    <div class="meme_ctn">
      <div class="meme_detail">
        <div class="g_box fx">
          <div class="_photo">
            <img src="@img/luan.jpg" />
          </div>
          <div class="_data">
            <div class="_name">{{'若妍'}}</div>
            <div class="_num"> 編號:
              <span>{{'70646'}}</span>
            </div>
            <div class="_list">
              <div class="_50">
                國别:
                <span>{{'越南妹'}}</span>
              </div>
              <div class="_50">
                年齡:
                <span>{{'19'}}</span>
              </div>
              <div class="_50">
                身高:
                <span>{{'150'}}</span>
              </div>
              <div class="_50">
                體重:
                <span>{{'43'}}</span>
              </div>
              <div class="_50">
                罩杯:
                <span>{{'D'}}</span>
              </div>
              <div class="_50">
                環境:
                <span>{{'飯店'}}</span>
              </div>
              <div>
                類型:
                <span>{{'定點'}}</span>
              </div>
              <div>
                定點長鐘:
                <span class="price">{{3500}}</span>
              </div>
              <div>
                定點短鐘:
                <span class="price">{{2500}}</span>
              </div>
              <div>
                上架時間:
                <span>{{'2020-02-16'}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="meme_info">
        <div id="meme_slick">
          <div class="close"></div>
        </div>
        <div class="meme_service">
          <div class="service_list">
            服務地區 : <span>123</span>
          </div>
          <div class="service_list">
            服務模式 : <span>1對1</span>
          </div>
          <div class="service_list">
            可配合 : <span>
              <a href="#">註冊會員</a>
              可看
            </span>
          </div>
          <div class="service_list">
            不接受 : <span>
              <a href="#">註冊會員</a>
              可看
            </span>
          </div>
          <div class="service_list">
            加價項目 : <span>
              <a href="#">註冊會員</a>
              可看
            </span>
          </div>
          <div class="service_list">
            優惠專案 : <span>
              <a href="#">註冊會員</a>
              可看
            </span>
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
          <div class="fx list " v-for="item in 3">
            <div class="user_img">
              <img src="@img/deafult.jpg">
            </div>
            <div class="comment">
              <div class="fx title">
                <div class="name">小宇</div>
              </div>
              <div class="text">
                臉蛋是本人，沒什麼誤差。會說簡單中文字詞，不會英文，只會越南話。膚色差不多。笑容不錯。入穴感覺不錯。但是..凸小腹。不給親。不給摸下面。身體似乎有蟹足腫。按摩簡單捏幾下後就一直拍打，請記得說OK了，否則一直拍打下去。
              </div>
              <div class="date">2020年2月21日 21:56</div>
            </div>
          </div>
          <div class="fx comment_from">
            <input type="text" v-model="commentText" placeholder="发表我的評價">
            <div class="comment_btn">評價</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import slick from "vue-slick";//initialSlide
export default {
  data() {
    return {
      commentText: ''
    }
  }
};
</script>

<style>
</style>
