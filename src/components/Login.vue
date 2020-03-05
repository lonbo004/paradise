<template>
  <div class="l_frame">
    <div class="fx jcc aic h100">
      <div class="l_ctn">
        <div class="l_x" @click="login_show = false">X</div>
        <img src="@img/login_banner_pc.jpg" />
        <div class="l_box">
          <input type="text" placeholder="帳號" />
          <input type="password" placeholder="密碼" />
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
      get() {
        return this.$store.state.login_show;
      },
      set(val) {
        this.$store.state.login_show = val;
      }
    }
  },
  created() {
    ////test
    this.account = "TRE";
    this.password = "PASS";
  },
  methods: {
    Member_Login() {
      Member_Login(this.account, this.password).then(res => {
        if (res) {
          this.$store.state.memberData = res;
          localStorage.setItem("token", res.token);
        }
      }).catch(ex => {

      }).finally(() => {
        this.$store.state.login_show = false;
      })
    }
  }
}
</script>

<style>
</style>