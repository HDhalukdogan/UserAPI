import { getUserWithRoles } from '@/app/actions/authActions'
import React from 'react'

type Props = {
    params: {userid:string}
}

export default async function page({params}: Props) {
    const {userid} = params
    const  user = await getUserWithRoles(userid)
  return (
    <div>{JSON.stringify(user)}</div>
  )
}
