<template>
  <div class="l_frame">
    <div class="fx jcc aic h100">
      <div class="l_ctn">
        <div class="l_x" @click="login_show = false">X</div>
        <img src="@img/login_banner_pc.jpg" />
        <div class="l_box">
          <input type="text" v-model="account" placeholder="帳號" />
          <input type="password" v-model="password" placeholder="密碼" />
          <div class="l_btn btn1" @click="Member_Login">登入</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Member_Login } from "@/api";
export default {
  data() {
    return {
      account: "",
      password: ""
    }
  },
  computed: {
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
    Member_Login() {
      Member_Login(this.account, this.password).then(res => {
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
    padding: 15% 10%;
    font-size: 20px;
    & > *:not(:last-child) {
      margin-bottom: 30px;
    }
    & > input {
      display: block;
      width: 100%;
      border: none;
      border-bottom: 1px solid #ccc;
      padding: 0 10px 10px;
      font-size: 20px;
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
  }
}
</style>