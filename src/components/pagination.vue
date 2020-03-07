<template>
  <div class="pagination_ctn">
    <el-pagination background :pager-count="4" :current-page.sync="currentPage" :page-size.sync="pageSize" :layout="layout" :page-sizes="pageSizes" :total="total" v-bind="$attrs" @current-change="handleCurrentChange" />
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    total: {
      required: true,
      type: Number
    },
    page: {
      type: Number,
      default: 1
    },
    pageSizes: {
      type: Array,
      default() {
        return [10];
      }
    },
    layout: {
      type: String,
      default: "prev, pager, next"
    },
    autoScroll: {
      type: Boolean,
      default: true
    },
    hidden: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    currentPage: {
      get() {
        return this.page;
      },
      set(val) {
        this.$emit("update:page", val);
      }
    }
  },
  methods: {
    handleCurrentChange(val) {
      this.$emit("pagination", { page: val });
    }
  }
};
</script>