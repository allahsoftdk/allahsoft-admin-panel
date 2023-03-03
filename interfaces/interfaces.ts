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

}

export interface PrayerAlarm {
    length: any;
    push: any;

}

export interface Role {
    length: any;

}

export interface Event {
    length: any;

}

