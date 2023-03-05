<script lang="ts">
import { usePostStore } from '@/stores/posts'; 
import { useUserStore } from '@/stores/user';
export default {
    props:["id"],
    setup() {
        const postStore = usePostStore();
        const userStore = useUserStore();
        return { postStore, userStore }
    },
    methods: {},
};
</script>

<template>
    <div class="row p-3">
        <h4 class="text-success">{{ userStore.getUserById(1)?.name }}s posts </h4>
        <div class="col-12 shadow">
            <table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Description</th>
      <th scope="col">Delete</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">{{postStore.getPostById(1)?.id }}</th>
      <td>{{ postStore.getPostById(1)?.description}}</td>
      <td><button type="button" class="btn btn-danger text-white"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
</svg> Delete</button></td>
    </tr>
  </tbody>
</table>
        </div>
    </div>
</template>

<style>

</style>
