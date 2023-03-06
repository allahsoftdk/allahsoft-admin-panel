<script lang="ts">
import { axiosInstance } from "../../utils/axiosInstance"
import { usePostStore } from "../stores/posts";
import { useUserStore } from "../stores/user";
import { usePostCommentStore } from "../stores/postComments";
import { usePrayerAlarmStore } from "../stores/prayerAlarm";
import { useRoleStore } from "../stores/role";
import { useEventStore } from "../stores/event";
export default {
    setup() {
        const userStore = useUserStore();
        const postStore = usePostStore();
        const postComment = usePostCommentStore();
        const prayerAlarm = usePrayerAlarmStore();
        const role = useRoleStore();
        const event = useEventStore();
        return { userStore, postStore, postComment, prayerAlarm, role, event }
    },
    data() {
        return {
            errorMessage: "",
        }
    },
    methods: {
        async fetchAllUsers() {
            axiosInstance.get("/api/user/", {
                withCredentials: true,
            }).then((res) => {
                this.userStore.setUser(res.data);
            })
                .catch((err) => {
                    this.errorMessage = "An error occurred  while trying to fetch users"
                });
        },
        async fetchAllPosts() {
            axiosInstance.get("api/post/", {
                withCredentials: true,
            })
                .then((res) => {
                    this.postStore.setPosts(res.data);
                })
                .catch((err) => console.log(err));
        },
        async fetchAllPostComments() {
            axiosInstance.get("api/post_comment/", {
                withCredentials: true,
            })
                .then((res) => {
                    this.postComment.setPostComment(res.data);
                })
                .catch((err) => console.log(err));
        },
        async fetchPrayerAlarm() {
            axiosInstance.get("api/prayer_alarm", {
                withCredentials: true,
            })
                .then((res) => {
                    this.prayerAlarm.setPrayerAlarm(res.data);
                })
                .catch((err) => console.log(err));
        },
        async fetchEvents() {
            axiosInstance.get("/api/event/", {
                withCredentials: true,
            })
                .then((res) => {
                    this.event.setEvent(res.data);
                })
                .catch((err) => {
                    this.errorMessage = "An error occurred  while trying to fetch users"
                });
        },
        async fetchRole() {
            axiosInstance.get("api/role/", {
                withCredentials: true,
            })
                .then((res) => {
                    this.role.setRole(res.data);
                })
                .catch((err) => {
                    this.errorMessage = "An error occurred  while trying to fetch users"
                });
        },
    },
    created() {
        Promise.all([this.fetchAllUsers(), this.fetchAllPosts(), this.fetchAllPostComments(), this.fetchPrayerAlarm(), this.fetchEvents(), this.fetchRole()]).then((res) => { });
    }
};
</script>

<template></template>

<style></style>
