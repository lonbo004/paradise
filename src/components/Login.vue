<template>
  <div class="l_frame">
    <div class="fx jcc aic h100">
      <div class="l_ctn">
        <div class="l_x" @click="login_show = false">X</div>
        <img src="@img/login_banner_pc.jpg" />
        <div class="l_box fx fdc jcc aic">
          <div class="_login" v-show="isLoginPage">
            <input type="text" v-model="login.account" placeholder="帳號" />
            <input type="password" v-model="login.password" placeholder="密碼" />
            <div class="l_btn btn1" @click="Member_Login(login.account,login.password)">登入</div>
          </div>
          <div class="_signup" v-show="!isLoginPage">
            <input type="text" v-model="signup.account" placeholder="帳號" />
            <input type="text" v-model="signup.name" placeholder="姓名" />
            <input type="password" v-model="signup.password" placeholder="密碼" />
            <input type="password" v-model="signup.password2" placeholder="確認密碼" />
            <div class="l_btn btn1" @click="Member_Create">註冊</div>
          </div>
          <div v-if="siteInfo.OpenRegister" @click="isLoginPage = !isLoginPage" class="switch_btn btn1">{{isLoginPage? '我要註冊' : '會員登入'}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import { Member_Login, Member_Create } from "@/api";
export default {
  data() {
    return {
      isLoginPage: true,
      login: {
        account: "",
        password: ""
      },
      signup: {
        account: "",
        password: "",
        password2: "",
        name: ""
      }
    }
  },
  computed: {
    ...mapGetters(["siteInfo"]),
    login_show: {
      get() { return this.$store.state.login_show; },
      set(val) { this.$store.state.login_show = val; }
    }
  },
  created() {
    document.querySelectorAll("html, body").forEach(el => {
      el.style.overflowY = "hidden";
    })
  },
  ////test
  mounted() {
    if (isDEV) {
      setTimeout(() => {
        this.account = "iloveu";
        this.password = "aa1234";
      }, 0);
    }
  },
  ////
  methods: {
    Member_Login(account, password) {
      Member_Login(account, password).then(res => {
        if (res) {
          this.$store.state.memberData = res;
          sessionStorage.setItem("token", res.token);
          sessionStorage.setItem("memberData", JSON.stringify(res));
        }
        else {
          sessionStorage.removeItem("token");
          sessionStorage.removeItem("memberData");
        }
      }).catch(ex => {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("memberData");
      }).finally(() => {
        this.$store.state.login_show = false;
        this.$store.commit("set_isLogin");
      })
    },
    Member_Create() {
      if (this.signup.password !== this.signup.password2)
        return this.$root.m_error("密碼不一致");
      Member_Create(this.signup).then(res => {
        if (res === "success") {
          alert("註冊成功!");
          this.Member_Login(this.signup.account, this.signup.password);
        }
      })
    }
  },
  beforeDestroy() {
    document.querySelectorAll("html, body").forEach(el => {
      el.style.overflowY = "auto";
    })
  }
}
</script>

<style lang="less">
@import "~@css/fn.less";
.l_frame {
  .room_f();
  .bc(rgba(0, 0, 0, 0.8));
  z-index: 200;
  .l_ctn {
    flex-shrink: 1;
    .bc(@f);
    position: relative;
    max-width: 96%;
    border-radius: 15px;
    overflow: hidden;
    animation: fadeIn 1s forwards;
  }
  .l_x {
    font-size: 40px;
    .cf();
    font-weight: bold;
    position: absolute;
    top: 10px;
    right: 10px;
    .cp();
    line-height: 1;
  }
  .l_box {
    padding: 30px 10%;
    min-height: 350px;
    font-size: 20px;
    @media (max-width: @sm) {
      font-size: 16px;
    }
    & > div {
      width: 100%;
      & > *:not(:last-child) {
        margin-bottom: 30px;
        @media (max-width: @sm) {
          margin-bottom: 15px;
        }
      }
    }
    input {
      display: block;
      width: 100%;
      border: none;
      border-bottom: 1px solid #ccc;
      padding: 0 10px 10px;
      font-size: 20px;
      @media (max-width: @sm) {
        font-size: 16px;
      }
    }
  }
  .l_btn {
    .bc(#0b2633);
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.18), 0 4px 8px 0 rgba(0, 0, 0, 0.15);
    color: #fff;
    border-radius: 20px;
    text-align: center;
    padding: 10px 0;
    margin: 0 10px;
    margin-top: 60px;
    @media (max-width: @sm) {
      margin-top: 40px;
    }
  }
  .switch_btn {
    margin-top: 20px;
    text-align: center;
  }
}
</style>