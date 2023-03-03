<script lang="ts">
import usersComp from "../indexComp/usersComp.vue";
import postComp from "../indexComp/postComp.vue";
import postCommentComp from "../indexComp/postCommentComp.vue";
import prayerAlarmComp from "../indexComp/prayerAlarmComp.vue";
import roleComp from "../indexComp/roleComp.vue";
import eventComp from "../indexComp/eventComp.vue";
export default {
    components: {
        usersComp,
        postComp,
        postCommentComp,
        prayerAlarmComp,
        roleComp,
        eventComp
    },
    data() {
        return {
            showUser: true,
            showPost: false,
            showPostComment: false,
            showPrayerAlarm: false,
            showRole: false,
            showEvent: false,
            alarmName: "",
            errorMessage: "",
        }
    },
    methods: {
        resetDisplay() {
            this.showUser = false;
            this.showPost = false;
            this.showPostComment = false;
            this.showPrayerAlarm = false;
            this.showRole = false;
            this.showEvent = false;
        },
        displayUser() {
            this.resetDisplay();
            this.showUser = true;
        },
        displayPost() {
            this.resetDisplay();
            this.showPost = true;
        },
        displayPostComment() {
            this.resetDisplay();
            this.showPostComment = true;
        },
        displayPrayerAlarm() {
            this.resetDisplay();
            this.showPrayerAlarm = true;
        },
        displayRole() {
            this.resetDisplay();
            this.showRole = true;
        },
        displayEvent() {
            this.resetDisplay();
            this.showEvent = true;
        },
    },
};
</script>

<template>
    <div class="row p-1">
        <div class="col-12">
            <div id="tabs">
                <ul class="nav nav-tabs">
                    <li class="nav-item">
                        <a class="nav-link" :class="{ active: showUser }" href="#" @click="displayUser()">User</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" :class="{ active: showPost }" href="#" @click="displayPost()">Post</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" :class="{ active: showPostComment }" href="#" @click="displayPostComment()">Post
                            Comments</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" :class="{ active: showPrayerAlarm }" href="#"
                            @click="displayPrayerAlarm()">Prayer alarm</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" :class="{ active: showRole }" href="#" @click="displayRole()">Role</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" :class="{ active: showEvent }" href="#" @click="displayEvent()">Event</a>
                    </li>
                </ul>
                <div v-if="showUser" class="shadow border border-top-0 p-3 overflow-auto">
                    <usersComp></usersComp>
                </div>
                <div v-if="showPost" class="shadow border border-top-0 p-3">
                    <postComp></postComp>
                </div>
                <div v-if="showPostComment" class="shadow border border-top-0 p-3">
                    <postCommentComp></postCommentComp>
                </div>
                <div v-if="showPrayerAlarm" class="shadow border border-top-0 p-3 overflow-auto">
                    <prayerAlarmComp></prayerAlarmComp>
                </div>
                <div v-if="showRole" class="shadow border border-top-0 p-3">
                    <roleComp></roleComp>
                </div>
                <div v-if="showEvent" class="shadow border border-top-0 p-3">
                    <eventComp></eventComp>
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
