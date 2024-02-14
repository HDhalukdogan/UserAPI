import ExcelButton from "@/app/ui/excel-button";
import { getAllUsers } from "../../actions/authActions"
import UploadButton from "@/app/ui/upload-button";
import UserList from "@/app/ui/admin/user-list";

export default async function page() {

    const users = await getAllUsers();
    return (
        <div>
            <ExcelButton />
            <UploadButton />
            {users.map((user: any) => <p key={user.id}>{user.userName}</p>)}
            <hr className="my-5" />
            <h5>Client Side RTK</h5>
            <br />
            <UserList />
        </div>
    )
}