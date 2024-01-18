import { getAllUsers } from "../actions/authActions"

export default async function page() {

    const users = await getAllUsers();
    console.log('users', users)
    return (
        <div>
            {users.map((user:any)=><p key={user.id}>{user.userName}</p>)}
        </div>
    )
}