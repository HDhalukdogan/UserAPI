import ExcelButton from "@/app/ui/excel-button";
import { getAllUsers } from "../../actions/authActions"

export default async function page() {

    const users = await getAllUsers();
    return (
        <div>
            <ExcelButton/>
            {users.map((user:any)=><p key={user.id}>{user.userName}</p>)}
        </div>
    )
}