<template>
  <div class="es_frame">
    <div class="br_arc"></div>
    <div class="es_tab">
      <span @click="sp_type('sd', 1)" :class="{active: type === 1}">全方位</span>
      <!-- | -->
      <!-- <span @click="sp_type('sd', 0)" :class="{active: type === 0}">單純</span> -->
    </div>
    <template v-if="me_list.length">
      <div class="es_ctn">
        <MeLayout>
          <MeCard :class="'_es'" v-for="(item,index) in me_list" :meInfo="item" />
        </MeLayout>
        <pagination :total="count" :page.sync="page" :limit.sync="page_range" @pagination="getData" />
      </div>
    </template>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
//api
import { Escort_Search } from "@/api";
//components
import MeLayout from "@c/MeLayout";
import MeCard from "@c/MeCard";
import pagination from "@c/pagination";
export default {
  components: { MeLayout, MeCard, pagination },
  data() {
    return {
      count: 0,
      me_list: [],
      type: 1,// 0:單純, 1:全方位
      page: 1,
      page_range: 10,
    }
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData(isNewSearch) {
      if (isNewSearch) this.page = 1;
      Escort_Search(this.type, this.page, this.page_range).then(res => {
        this.me_list = res.EscortList;
        this.count = res.count;
      })
    },
    sp_type(type, val) {
      if (type === "sd") {
        if (this.type === val) return false;
        this.type = val;
        this.getData(true);
      }
    }
  }
}
</script>

<style>
</style>