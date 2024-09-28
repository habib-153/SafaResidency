export type TRole = 'admin' | 'user' | 'staff';

export type TUser = {
    email: string;
    name: string;
    image?: string;
    role?: TRole;
    phone?: string;
    address?: string;
}