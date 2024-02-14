'use client'
import { useSession } from 'next-auth/react'
import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../lib/hooks';
import { setUser } from '../lib/features/account/accountSlice';

export default function InitApp() {
    const session = useSession()
    const dispatch = useAppDispatch()
    const user = useAppSelector(state => state.account.user)
    const initApp = useCallback(async () => {
        try {
            if (session.data && !user)
                dispatch(setUser(session.data.user))
        } catch (error) {
            console.log(error);
        }
    }, [dispatch, session.data?.user])

    useEffect(() => {
        initApp()
    }, [initApp])


    return null;
}
