<script lang="ts">
import navigationbar from "./navigationbar.vue";
import status from "./indexComp/status.vue";
import administration from "./indexComp/administration.vue";
export default {
  components: {
    navigationbar,
    status,
    administration
  }
};
</script>

<template>
  <div class="container-fluid">
    <navigationbar></navigationbar>
    <status></status>
    <administration></administration>
  </div>
</template>

<style>
.colored-toast.swal2-icon-info {
  background-color: #3fc3ee !important;
}
</style>
