<script lang="ts">
import axios from "axios";
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
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    axios({
                        method: "delete",
                        url: "http://localhost/api/post/" + postId,
                        headers: {
                            Accept: "application/json",
                        },
                        withCredentials: true,
                    })
                        .then(() => {
                            this.postStore.deletePost(postId);
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
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
                <th scope="col">Delete</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="post in postStore.getPosts">
                <th scope="row">{{ post.id }}</th>
                <td> {{ post.user.name }}</td>
                <td>{{ post.user.email }}</td>
                <td>{{ post.description }}</td>
                <td><button type="button" class="btn btn-danger"
                        @click="deletePost(post.id, post.user.name)">Delete</button></td>
            </tr>
        </tbody>
    </table>
</template>

<style></style>
