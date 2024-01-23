import { getUsersWithRoles } from '@/app/actions/authActions'
import Link from 'next/link';
import React from 'react'

export default async function UserWr() {
    const userswr = await getUsersWithRoles();
    return (
        <div>
            {userswr.map((user: any) => (
                <div className='flex justify-between m-5 bg-gray-100 p-1 items-center rounded' key={user.id}>
                    <Link href={`/admin/userswr/${user.id}`}>
                        {user.username}
                    </Link>
                    <br />
                    <ul>
                        {user.roles.map((role: any) => <li key={role}>
                            {role}
                        </li>
                        )}
                    </ul>
                </div>
            ))}
        </div>
    )
}

