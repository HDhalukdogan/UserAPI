'use server'
import { signIn } from "@/auth";
import { AuthError, User } from 'next-auth';
import { fetchWrapper } from "../lib/fetchWrapper";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
  ) {
    try {
      await signIn('credentials', formData);
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case 'CredentialsSignin':
            return 'Invalid credentials.';
          default:
            return 'Something went wrong.';
        }
      }
      throw error;
    }
  }

  export async function loginUser(email: string, password: string): Promise<User | undefined> {
  try {
    const result = await fetchWrapper.post("account/login", { name: email, password })
    let claims = JSON.parse(atob(result.token.split('.')[1]));
    let roles = claims['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    let userId = claims['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
    const user: User = {
      id: userId,
      name: email,
      email: email,
      access_token: result.token,
      roles: roles,
    }
    return user;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

  export async function getAllUsers() {
    const users = await fetchWrapper.get("account/getAllUser")
    return users
  }
  export async function getAllUserExcelBase64() {
    const result = await fetchWrapper.getBase64("account/getAllUserExcel")
    return result
  }
  export async function getUserWithRoles(id:string) {
    const user = await fetchWrapper.get(`account/getUserById/${id}`)
    return user
  }
  export async function getAllRoles() {
    const roles = await fetchWrapper.get("account/getAllRoles")
    return roles
  }
  export async function getRoleWithUsers(roleName : string) {
    const users = await fetchWrapper.get(`account/getRoleWithUsers/${roleName}`)
    return users
  }
  export async function getUsersWithRoles() {
    const users = await fetchWrapper.get("account/users-with-roles")
    return users
  }
  export async function createRole(roleName:string) {
    await fetchWrapper.post(`account/createrole?roleName=${roleName}`,{})
    revalidatePath("/admin/roles")
    redirect("/admin/roles");
  }

  export async function updateRole(roleName:string,updatedRoleName:string) {
    await fetchWrapper.put(`account/updaterole/${roleName}?updatedName=${updatedRoleName}`,{})
    revalidatePath("/admin/roles")
    redirect("/admin/roles");
  }

  export async function deleteRole(roleName:string) {
    await fetchWrapper.del(`account/deleterole/${roleName}`)
    revalidatePath("/admin/roles")
    redirect("/admin/roles");
  }

  export async function uploadFile(body:FormData) {
   const response = await fetchWrapper.postFormData('account/postFile',body)
    return response
  }