export type TRole = 'admin' | 'user' | 'staff';
export type TUserStatus = 'BASIC' | 'PREMIUM';

export type TUser = {
    email: string;
    name: string;
    membershipNumber?: string;
    image?: string;
    role?: TRole;
    phone?: string;
    address?: string;
    status?: TUserStatus
}