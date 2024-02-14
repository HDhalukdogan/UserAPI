'use client'
import { fetchUsersAsync } from '@/app/lib/features/account/accountSlice'
import { useAppDispatch, useAppSelector } from '@/app/lib/hooks'
import React, { useEffect } from 'react'

export default function UserList() {
    const users = useAppSelector(state => state.account.users)
    const dispatch = useAppDispatch()
    useEffect(() => {
        if (users.length === 0) {
            dispatch(fetchUsersAsync())
        }
    }, [])

    return (
        <div>
            {users.map((user: any) => <p key={user.id}>{user.userName}</p>)}
        </div>
    )
}
