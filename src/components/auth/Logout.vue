<script>
export default {
  data() {
    return {
      showSnackbar: false,
      snackbarText: "",
    };
  },
  created() {
    this.$store.dispatch("removeToken");
    this.$router.push({ name: "home" });
  },
};
</script>