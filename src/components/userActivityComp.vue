<script lang="ts">
import navigationbar from "./navigationbar.vue";
import userComp from "./userActivityComp/userDataComp.vue";
import userPostComp from "./userActivityComp/userPostComp.vue";
import userPostCommentComp from "./userActivityComp/userPostCommentComp.vue";
export default {
  components: {
    navigationbar,
    userComp,
    userPostComp,
    userPostCommentComp,
  },
  data() {
    return {
      id: Number.parseInt(this.$route.params.id as string), //this is the id from the browser
    };
  },
};
</script>

<template>
  <div class="container-fluid">
    <navigationbar />
    <userComp :id="id" />
    <div class="row">
      <div class="col-6"><userPostComp id="1" /></div>
      <div class="col-6"><userPostCommentComp id="1" /></div>
    </div>
  </div>
</template>

<style></style>
