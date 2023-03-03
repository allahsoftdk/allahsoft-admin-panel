export interface User {
    length: any;
    id: Number;
    name: String;
    email: String;
    password: String;
    token: String;
    createdAt: Date;
    updatedAt: Date;
    roleId: Number;
    role: Role;
};

export interface Role {
    id: Number;
    name: String;
};


export interface Post {
    length: any;
    filter: any;
    t: number;

}

export interface PostComment {
    length: any;
    id: Number;
    filter: any;

}

export interface PrayerAlarm {
    id: number;
    prayerAlarm: string;

}

export interface Role {
    role: string;
    t: number;


}

export interface Event {
    id: number;
    t: number;
    name: string;
    eventDate: string;
    eventFrom: string;
    eventTo: string;


}

