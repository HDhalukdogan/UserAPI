import { getUsersWithRoles } from '@/app/actions/authActions'
import React from 'react'

export default async function page() {
    const userswr = await getUsersWithRoles();
    return (
        <div>
            {userswr.map((user: any) => (
                <div key={user.id}>
                    {user.username}
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
