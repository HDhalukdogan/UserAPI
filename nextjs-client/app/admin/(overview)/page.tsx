import ExcelButton from "@/app/ui/excel-button";
import { getAllUsers } from "../../actions/authActions"
import UploadButton from "@/app/ui/upload-button";

export default async function page() {

    const users = await getAllUsers();
    return (
        <div>
            <ExcelButton/>
            <UploadButton/>
            {users.map((user:any)=><p key={user.id}>{user.userName}</p>)}
        </div>
    )
}