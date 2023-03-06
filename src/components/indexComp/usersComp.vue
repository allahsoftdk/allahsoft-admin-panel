<script lang="ts">
import axios from "axios";
import Swal from "sweetalert2";
import { useUserStore } from "@/stores/user";
import { usePostStore } from "@/stores/posts";
import { usePostCommentStore } from "@/stores/postComments";
export default {
  setup() {
    const userStore = useUserStore();
    const postCommentStore = usePostCommentStore();
    const postStore = usePostStore();
    return { userStore, postCommentStore, postStore };
  },
  methods: {
    deleteUser(userId: number, username: string) {
      Swal.fire({
        title: "Terminate " + username + "?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#099c27",
        cancelButtonColor: "#d33",
        confirmButtonText: "Terminate",
      }).then((result) => {
        if (result.isConfirmed) {
          axios({
            method: "delete",
            url: "http://localhost/api/user/" + userId,
            headers: {
              Accept: "application/json",
            },
            withCredentials: true,
          })
            .then(() => {
              this.userStore.deleteUser(userId);
              this.postStore.deletePostLinkedToUser(userId);
              this.postCommentStore.deletePostCommentLinkedToUser(userId);
              const Toast = Swal.mixin({
                toast: true,
                position: "top-right",
                iconColor: "white",
                customClass: {
                  popup: "colored-toast",
                },
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true,
              });

              Toast.fire({
                icon: "success",
                title: "User delete",
              });
            })
            .catch((err) =>
              Swal.fire({
                title: "Error!",
                text: "An error happen when trying to delete the user",
                icon: "error",
                confirmButtonText: "Okay",
              })
            );
        }
      });
    },
    viewActivity() {
      this.$router.push("/userActivity");
    },
  },
};
</script>

<template>
  <table class="table">
    <thead>
      <tr>
        <th scope="col">ID</th>
        <th scope="col">Name</th>
        <th scope="col">Email</th>
        <th scope="col">Role</th>
        <th scope="col">Activity</th>
        <th scope="col">Terminate</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="user in userStore.getUser">
        <th scope="row">{{ user.id }}</th>
        <td>{{ user.name }}</td>
        <td>{{ user.email }}</td>
        <td>{{ user.role.role }}</td>
        <td>
          <router-link
            :to="'/activities/' + user.id"
            class="text-light btn btn-info"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-box-arrow-up-right"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"
              />
              <path
                fill-rule="evenodd"
                d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"
              />
            </svg>
            View activity</router-link
          >
        </td>
        <td>
          <button
            type="button"
            @click="deleteUser(user.id, user.name)"
            class="btn btn-danger"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-x-circle-fill"
              viewBox="0 0 16 16"
            >
              <path
                d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"
              />
            </svg>
            Terminate
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style></style>
