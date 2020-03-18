<template>
  <div class="s_frame">
    <div class="s_head">
      <slot name="head"></slot>
    </div>
    <div class="s_ctn fx fxfill">
      <div class="s_side">
        <slot name="side"></slot>
      </div>
      <div class="_fill">
        <div class="s_body">
          <slot name="body"></slot>
        </div>
        <div class="s_pagination">
          <slot name="pagination"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less">
@import "~@css/fn.less";
.s_frame {
  .s_head {
    padding: 20px 2%;
  }
  .s_ctn {
    border-top: 1px solid #dddddd;
  }
  .s_side {
    padding-top: 20px;
    width: 160px;
    border-right: 1px solid #dddddd;
    @media (max-width: @md) {
      width: 20%;
    }
  }
  .s_body {
    padding: 20px 2%;
    @media (max-width: @sm) {
      .P_lr(1%);
    }
  }
  .s_pagination {
    padding: 20px 0;
    border-top: 1px solid #dddddd;
  }
}
</style>