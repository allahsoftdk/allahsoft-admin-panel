<script lang="ts">
import { axiosInstance } from "../../utils/axiosInstance";
import Swal from "sweetalert2";
import { usePostStore } from "../../stores/posts";
export default {
    setup() {
        const postStore = usePostStore();
        return { postStore }
    },
    methods: {
        deletePost(postId: number, username: string) {
            Swal.fire({
                title: 'Delete ' + username + "'s post",
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#099c27',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    axiosInstance.delete("/api/post/" + postId, {})
                        .then(() => {
                            this.postStore.deletePost(postId);
                            const Toast = Swal.mixin({
                                toast: true,
                                position: 'top-right',
                                iconColor: 'white',
                                customClass: {
                                    popup: 'colored-toast'
                                },
                                showConfirmButton: false,
                                timer: 1500,
                                timerProgressBar: true
                            });

                            Toast.fire({
                                icon: 'success',
                                title: 'Post delete'
                            })
                        })
                        .catch((err) => Swal.fire({
                            title: 'Error!',
                            text: 'An error happen',
                            icon: 'error',
                            confirmButtonText: 'Okay'
                        }));
                }
            })
        },
    }
};
</script>

<template>
    <table class="table">
        <thead>
            <tr>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Description</th>
                <th scope="col">View</th>
                <th scope="col">Delete</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="post in postStore.getPosts">
                <th scope="row">{{ post.id }}</th>
                <td> {{ post.user.name }}</td>
                <td>{{ post.user.email }}</td>
                <td>{{ post.description }}</td>
                <td><button type="button" class="btn btn-info text-white" @click="deletePost(post.id, post.user.name)"><svg
                            xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-eye-fill" viewBox="0 0 16 16">
                            <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                            <path
                                d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                        </svg> View post</button></td>
                <td><button type="button" class="btn btn-danger" @click="deletePost(post.id, post.user.name)"><svg
                            xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-x-circle-fill" viewBox="0 0 16 16">
                            <path
                                d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
                        </svg> Delete</button></td>
            </tr>
        </tbody>
    </table>
</template>

<style></style>
