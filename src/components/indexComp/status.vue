<script lang="ts">
import { usePostStore } from "@/stores/posts";
import { useUserStore } from "@/stores/user";
import { usePostCommentStore } from "@/stores/postComments";
import { usePrayerAlarmStore } from "@/stores/prayerAlarm";
import { useRoleStore } from "@/stores/role";
import { useEventStore } from "@/stores/event";

export default {
    setup() {
        const userStore = useUserStore();
        const postStore = usePostStore();
        const postComment = usePostCommentStore();
        const prayerAlarm = usePrayerAlarmStore();
        const role = useRoleStore();
        const event = useEventStore();

        return { userStore, postStore, postComment, prayerAlarm, role, event }
    }
};
</script>

<template>
    <div class="row p-3">
        <div class="col-12 shadow">
            <div class="row">
                <div class="col-2 border">
                    <div class="row">
                        <div class="col-12 pt-2">
                            <h5>Users</h5>
                        </div>
                        <div class="col-12 text-success">
                            <h4>{{ userStore.getUser.length }}</h4>
                        </div>
                    </div>
                    <div class="row border-top bg-light pt-1">
                        <div class="col-8">
                            <h6>Today</h6>
                        </div>
                        <div class="col-4 text-success text-right d-flex justify-content-end">
                            <h6 class="text-danger">NaN</h6>
                        </div>
                    </div>
                </div>

                <div class="col-2 border">
                    <div class="row">
                        <div class="col-12 pt-2">
                            <h5>Posts</h5>
                        </div>
                        <div class="col-12 text-success">
                            <h4>{{ postStore.getPosts.length }}</h4>
                        </div>
                    </div>
                    <div class="row border-top bg-light pt-1">
                        <div class="col-8">
                            <h6>Today</h6>
                        </div>
                        <div class="col-4 text-success text-right d-flex justify-content-end">
                            <h6 class="text-danger">NaN</h6>
                        </div>
                    </div>
                </div>

                <div class="col-2 border">
                    <div class="row">
                        <div class="col-12 pt-2">
                            <h5>Posts comments</h5>
                        </div>
                        <div class="col-12 text-success">
                            <h4>{{ postComment.getPostComment.length }}</h4>
                        </div>
                    </div>
                    <div class="row border-top bg-light pt-1">
                        <div class="col-8">
                            <h6>Today</h6>
                        </div>
                        <div class="col-4 text-success text-right d-flex justify-content-end">
                            <h6 class="text-danger">NaN</h6>
                        </div>
                    </div>
                </div>

                <div class="col-2 border">
                    <div class="row">
                        <div class="col-12 pt-2">
                            <h5>Prayer alarm</h5>
                        </div>
                        <div class="col-12 text-success">
                            <h4>{{ prayerAlarm.getPrayerAlarm.length }}</h4>
                        </div>
                    </div>
                    <div class="row border-top bg-light pt-1">
                        <div class="col-8">
                            <!---->
                        </div>
                        <div class="col-4 text-success text-right d-flex justify-content-end">
                            <!---->
                        </div>
                    </div>
                </div>

                <div class="col-2 border">
                    <div class="row">
                        <div class="col-12 pt-2">
                            <h5>Roles</h5>
                        </div>
                        <div class="col-12 text-success">
                            <h4>{{ role.getRole.length }}</h4>
                        </div>
                    </div>
                    <div class="row border-top bg-light pt-1">
                        <div class="col-8">
                            <!---->
                        </div>
                        <div class="col-4 text-success text-right d-flex justify-content-end">
                            <!---->
                        </div>
                    </div>
                </div>

                <div class="col-2 border">
                    <div class="row">
                        <div class="col-12 pt-2">
                            <h5>Events</h5>
                        </div>
                        <div class="col-12 text-success">
                            <h4>{{ event.getEvent.length }}</h4>
                        </div>
                    </div>
                    <div class="row border-top bg-light pt-1">
                        <div class="col-8">
                            <!---->
                        </div>
                        <div class="col-4 text-success text-right d-flex justify-content-end">
                            <!---->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.colored-toast.swal2-icon-info {
    background-color: #3fc3ee !important;
}
</style>
