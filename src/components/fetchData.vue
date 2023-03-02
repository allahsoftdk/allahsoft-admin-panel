<script lang="ts">
import axios from "axios";
import { usePostStore } from "../stores/posts";
import { useUserStore } from "../stores/user";
import { usePostCommentStore } from "../stores/postComments";
import { usePrayerAlarmStore } from "../stores/prayerAlarm";
import { useRoleStore } from "../stores/role";
export default {
    setup() {
        const userStore = useUserStore();
        const postStore = usePostStore();
        const postComment = usePostCommentStore();
        const prayerAlarm = usePrayerAlarmStore();
        const role = useRoleStore();
        return { userStore, postStore, postComment, prayerAlarm, role }
    },
    data() {
        return {}
    },
    methods: {
        async fetchAllUsers() {
            axios({
                method: "get",
                url: "http://localhost/api/user/",
                headers: {
                    Accept: "application/json",
                },
                withCredentials: true,
            })
                .then((res) => {
                    this.userStore.setUser(res.data);
                })
                .catch((err) => console.log(err));
        },
        async fetchAllPosts() {
            axios({
                method: "get",
                url: "http://localhost/api/post/",
                headers: {
                    Accept: "application/json",
                },
                withCredentials: true,
            })
                .then((res) => {
                    this.postStore.setPosts(res.data);
                })
                .catch((err) => console.log(err));
        },
        async fetchAllPostComments() {
            axios({
                method: "get",
                url: "http://localhost/api/post_comment/",
                headers: {
                    Accept: "application/json",
                },
                withCredentials: true,
            })
                .then((res) => {
                    this.postComment.setPostComment(res.data);
                })
                .catch((err) => console.log(err));
        },
        async fetchPrayerAlarm() {
            axios({
                method: "get",
                url: "http://localhost/api/prayer_alarm",
                headers: {
                    Accept: "application/json",
                },
                withCredentials: true,
            })
                .then((res) => {
                    this.prayerAlarm.setPrayerAlarm(res.data);
                })
                .catch((err) => console.log(err));
        },
    },
    created() {
        Promise.all([this.fetchAllUsers(), this.fetchAllPosts(), this.fetchAllPostComments(), this.fetchPrayerAlarm()]).then((res) => { });
    }
};
</script>

<template></template>

<style></style>
