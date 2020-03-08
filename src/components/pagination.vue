<template>
  <div class="pagination_ctn">
    <el-pagination background :current-page.sync="currentPage" :page-size.sync="pageSize" :layout="layout" :total="total" v-bind="$attrs" @current-change="handleCurrentChange" />
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
    limit: {
      type: Number,
      default: 20
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
    },
    pageSize: {
      get() {
        return this.limit;
      },
      set(val) {
        this.$emit("update:limit", val);
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

<style lang="less">
@import "~@css/fn.less";
.pagination_ctn {
  text-align: center;
  .el-pagination.is-background {
    .btn-prev,
    .btn-next {
      @media (max-width: @md) {
        .WH(30px);
      }
      .WH(50px);
      background: #eee;
      color: #999;
      .el-icon {
        font-size: 30px;
        @media (max-width: @md) {
          font-size: 16px;
        }
      }
    }
    li {
      .WH(50px);
      background: #eee;
      color: #999;
      line-height: 50px;
      font-size: 30px;
      border-radius: 5px;
      font-style: italic;
      @media (max-width: @md) {
        .WH(30px);
        font-size: 16px;
        line-height: 30px;
      }
    }
    li:not(.disabled).active,
    li:not(.disabled):hover {
      background: #eee;
      color: #ff0051;
      font-weight: 800;
    }
  }
}
</style>