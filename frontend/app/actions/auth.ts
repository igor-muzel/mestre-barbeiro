"use server"
import {cookies} from 'next/headers';
import {redirect} from 'next/navigation';

export async function handleLogout(){
    const cookieUser = await cookies();

    cookieUser.delete('token');

    redirect('/login');
}