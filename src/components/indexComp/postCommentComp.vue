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
                confirmButtonColor: '#3085d6',
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
                            Swal.fire(
                                'Deleted!',
                                'Comment has been deleted.',
                                'success'
                            )
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
                        @click="deleteComment(postCommentt.id, postCommentt.user.name)">Delete</button></td>
            </tr>
        </tbody>
    </table>
</template>

<style></style>
