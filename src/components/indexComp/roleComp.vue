<script lang="ts">
import axios from "axios";
import Swal from "sweetalert2";
import { useRoleStore } from "../../stores/role";
export default {
    setup() {
        const role = useRoleStore();
        return { role }
    },
    methods: {
    }
};
</script>

<template>
    <table class="table">
        <thead>
            <tr>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="rolee in role.getRole">
                <th scope="row">{{ rolee.id }}</th>
                <td> {{ rolee.role }}</td>
                <td><a class=" text-light btn btn-info" href="#">Edit</a></td>
                <td><button type="button" @click="deleteUser()" class="btn btn-danger">Delete</button></td>
            </tr>
        </tbody>
    </table>
</template>

<style></style>
