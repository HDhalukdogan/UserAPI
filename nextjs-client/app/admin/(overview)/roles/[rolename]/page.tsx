import { getRoleWithUsers } from '@/app/actions/authActions'
import React from 'react'



export default async function page({ params: { rolename } }: { params: { rolename: string } }) {
    const users = await getRoleWithUsers(rolename)
    return (
        <div>
            {users.map((user: any) => <div key={user.id}>{user.userName}</div>)}
        </div>
    )
}
