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
                            <h4><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-people-fill" viewBox="0 0 16 16">
  <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7Zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216ZM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"/>
</svg> {{ userStore.getUser.length }}</h4>
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
                            <h4><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-chat-square-fill" viewBox="0 0 16 16">
  <path d="M2 0a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2.5a1 1 0 0 1 .8.4l1.9 2.533a1 1 0 0 0 1.6 0l1.9-2.533a1 1 0 0 1 .8-.4H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
</svg> {{ postStore.getPosts.length }}</h4>
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
                            <h4><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-chat-fill" viewBox="0 0 16 16">
  <path d="M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 4.18-1.234A9.06 9.06 0 0 0 8 15z"/>
</svg> {{ postComment.getPostComment.length }}</h4>
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
                            <h4><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-bell-fill" viewBox="0 0 16 16">
  <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z"/>
</svg> {{ prayerAlarm.getPrayerAlarm.length }}</h4>
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
                            <h4><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-person-fill-gear" viewBox="0 0 16 16">
  <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm-9 8c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4Zm9.886-3.54c.18-.613 1.048-.613 1.229 0l.043.148a.64.64 0 0 0 .921.382l.136-.074c.561-.306 1.175.308.87.869l-.075.136a.64.64 0 0 0 .382.92l.149.045c.612.18.612 1.048 0 1.229l-.15.043a.64.64 0 0 0-.38.921l.074.136c.305.561-.309 1.175-.87.87l-.136-.075a.64.64 0 0 0-.92.382l-.045.149c-.18.612-1.048.612-1.229 0l-.043-.15a.64.64 0 0 0-.921-.38l-.136.074c-.561.305-1.175-.309-.87-.87l.075-.136a.64.64 0 0 0-.382-.92l-.148-.045c-.613-.18-.613-1.048 0-1.229l.148-.043a.64.64 0 0 0 .382-.921l-.074-.136c-.306-.561.308-1.175.869-.87l.136.075a.64.64 0 0 0 .92-.382l.045-.148ZM14 12.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Z"/>
</svg> {{ role.getRole.length }}</h4>
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
                            <h4><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-calendar-event-fill" viewBox="0 0 16 16">
  <path d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4V.5zM16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2zm-3.5-7h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5z"/>
</svg> {{ event.getEvent.length }}</h4>
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
