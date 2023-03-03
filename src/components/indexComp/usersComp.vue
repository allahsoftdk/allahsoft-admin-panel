<script lang="ts">
import axios from "axios";
import Swal from "sweetalert2";
import { useUserStore } from "../../stores/user";
export default {
    setup() {
        const userStore = useUserStore();
        return { userStore }
    },
    methods: {
        deleteUser(userId: number, username: string) {
            Swal.fire({
                title: 'Terminate ' + username + '?',
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
                        url: "http://localhost/api/user/" + userId,
                        headers: {
                            Accept: "application/json",
                        },
                        withCredentials: true,
                    })
                        .then(() => {
                            this.userStore.deleteUser(userId);
                            Swal.fire(
                                'Deleted!',
                                'User has been deleted.',
                                'success'
                            )
                        })
                        .catch((err) => Swal.fire({
                            title: 'Error!',
                            text: 'An error happen when trying to delete the user',
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
                <th scope="col">Role</th>
                <th scope="col">Activity</th>
                <th scope="col">Terminate</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="user in userStore.getUser">
                <th scope="row">{{ user.id }}</th>
                <td> {{ user.name }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.role.role }}</td>
                <td><a class=" text-light btn btn-info" href="#">View activity</a></td>
                <td><button type="button" @click="deleteUser(user.id, user.name)" class="btn btn-danger">Terminate</button>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<style></style>
