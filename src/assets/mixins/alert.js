export default {
  methods: {
    m_error(msg) {
      this.$message({
        type: 'warning',
        message: msg
      });
      return false;
    },
    m_success(msg) {
      this.$message({
        type: 'success',
        message: msg
      });
      return false;
    }
  }
}