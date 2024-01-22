import { deleteRole, getAllRoles } from "@/app/actions/authActions"
import ConfirmModal from "@/app/ui/confirm-modal";
import RoleFormModal from "@/app/ui/role-form-modal";

export default async function page() {
    const roles = await getAllRoles();

    const handleConfirm = async (roleName: string) => {
        'use server'
        await new Promise((r) => setTimeout(r, 2000))
        await deleteRole(roleName)
    }


    return (
        <div>
            <RoleFormModal />
            {roles.map((role: any) => <div key={role}>
                {role}
                <ConfirmModal disable={role === "admin" || role === "member"} buttonText="Delete" modalHeader={role} modalBody={`Are your sure deleting ${role}`} onConfirm={handleConfirm} />
                <RoleFormModal disable={role === "admin" || role === "member"}  roleName={role} />
            </div>)}
        </div>
    )
}
