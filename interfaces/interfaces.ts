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
    length: any;
    filter: any;
    t: number;
    push: any;

}

