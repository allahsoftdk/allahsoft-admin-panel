<script lang="ts">
import axios from "axios";
import Swal from "sweetalert2";
import { useEventStore } from "../../stores/event";
export default {
    setup() {
        const event = useEventStore();
        return { event }
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
                <th scope="col">Event date</th>
                <th scope="col">From</th>
                <th scope="col">To</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="eventt in event.getEvent">
                <th scope="row">{{ eventt.id }}</th>
                <td> {{ eventt.name }}</td>
                <td>{{ eventt.eventDate }}</td>
                <td>{{ eventt.eventFrom }}</td>
                <td>{{ eventt.eventTo }}</td>
                <td><button type="button" class="btn btn-info text-white"
                        @click="deleteComment(postCommentt.id, postCommentt.user.name)">Edit</button></td>
                <td><button type="button" class="btn btn-danger"
                        @click="deleteComment(postCommentt.id, postCommentt.user.name)">Delete</button></td>
            </tr>
        </tbody>
    </table>
</template>

<style></style>
