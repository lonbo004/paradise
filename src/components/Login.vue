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
  mounted() {
    ////test
    setTimeout(() => {
      this.account = "iloveu";
      this.password = "aa1234";
    }, 100);
  },
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

<style>
</style>