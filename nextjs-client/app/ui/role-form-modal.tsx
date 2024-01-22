'use client'
import React, { useRef } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link } from "@nextui-org/react";
import { useFormState } from "react-dom";
import { createRole, updateRole } from "../actions/authActions";



export default function RoleFormModal({ roleName, disable = false }: { roleName?: string, disable?: boolean }) {
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

    const buttonRef = useRef<any>();
    const closeButtonRef = useRef<any>();

    const handleCreate = () => {
        buttonRef.current.click()
    }



    async function action(prevState: string | undefined, formData: FormData) {
        await new Promise((r) => setTimeout(r, 1000))
        const role = formData.get("role")?.toString()

        if (role) {
            if (roleName) {
                await updateRole(roleName, role)
                onClose()
            } else {
                await createRole(role)
                onClose()
            }

        }

        return undefined
    }
    const [errorMessage, dispatch] = useFormState(action, undefined);


    return (
        <>
            <Button isDisabled={disable} onPress={onOpen} color="primary">{roleName ? "Edit" : "New"}</Button>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">{roleName ? "Edit" : "Create a Role"}</ModalHeader>
                            <ModalBody>
                                <form action={dispatch} className="space-y-3">
                                    <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
                                        <div className="w-full">
                                            <div>
                                                <label
                                                    className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                                                    htmlFor="email"
                                                >
                                                    Role
                                                </label>
                                                <div className="relative">
                                                    <input
                                                        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                                        id="role"
                                                        name="role"
                                                        placeholder="enter a role"
                                                        required
                                                        defaultValue={roleName}
                                                    />
                                                </div>
                                                <button hidden ref={buttonRef} type="submit"></button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </ModalBody>
                            <ModalFooter>
                                <Button ref={closeButtonRef} color="danger" variant="flat" onPress={onClose}>
                                    Close
                                </Button>
                                <Button type="submit" color="primary" onPress={handleCreate}>
                                    {roleName ? "Edit" : "Create"}
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
