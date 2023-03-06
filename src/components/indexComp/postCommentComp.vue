<script lang="ts">
import axios from "axios";
import Swal from "sweetalert2";
import { usePostCommentStore } from "../../stores/postComments";
export default {
    setup() {
        const postComment = usePostCommentStore();
        return { postComment }
    },
    methods: {
        deleteComment(commentId: number, username: string) {
            Swal.fire({
                title: 'Delete ' + username + "'s comment",
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#099c27',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    axios({
                        method: "delete",
                        url: "http://localhost/api/post_comment/" + commentId,
                        headers: {
                            Accept: "application/json",
                        },
                        withCredentials: true,
                    })
                        .then(() => {
                            this.postComment.deletePostComment(commentId);
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
                            title: 'Post comment delete'
                            })
                        })
                        .catch((err) => Swal.fire({
                            title: 'Error!',
                            text: 'An error happen trying to delete the comment',
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
                <th scope="col">Comment</th>
                <th scope="col">Post link</th>
                <th scope="col">Delete</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="postCommentt in postComment.getPostComment">
                <th scope="row">{{ postCommentt.id }}</th>
                <td> {{ postCommentt.user.name }}</td>
                <td>{{ postCommentt.user.email }}</td>
                <td>{{ postCommentt.comment }}</td>
                <td><a href="#">{{ postCommentt.post.description }}</a></td>
                <td><button type="button" class="btn btn-danger"
                        @click="deleteComment(postCommentt.id, postCommentt.user.name)"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
</svg> Delete</button></td>
            </tr>
        </tbody>
    </table>
</template>

<style></style>
