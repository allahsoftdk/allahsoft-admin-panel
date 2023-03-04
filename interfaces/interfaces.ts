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
    userId: number;
};

export interface Role {
    id: Number;
    name: String;
};


export interface Post {
    t: number;
    id: number;
    userId: number;

}

export interface PostComment {
    id: number;
    userId: number;


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

export interface Login{
    id: number;
}

