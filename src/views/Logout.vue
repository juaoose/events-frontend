<script>
export default {
  created() {
    this.$store.dispatch("removeToken");
    this.$router.push({ name: "home" });
  },
};
</script>