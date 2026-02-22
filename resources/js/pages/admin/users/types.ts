export interface User {
    id: number;
    name: string;
    email: string;
    role: 'admin' | 'user';
    created_at: string;
    entreprise_id?: number;
}

export interface UserForm {
    name: string;
    email: string;
    role: 'admin' | 'user';
    password?: string;
    password_confirmation?: string;
    entreprise_id?: number;
}
