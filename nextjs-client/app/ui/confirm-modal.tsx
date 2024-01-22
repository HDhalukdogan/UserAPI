'use client'
import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";

type Props = {
    buttonText: string
    modalHeader: string
    modalBody: string
    onConfirm?: any
    disable?: boolean
}

export default function ConfirmModal({ buttonText, modalHeader, modalBody, onConfirm, disable = false }: Props) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const handleClose = async (onClose: () => void) => {
        await onConfirm(modalHeader)
        onClose()
    }

    return (
        <>
            <Button isDisabled={disable} onPress={onOpen}>{buttonText}</Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">{modalHeader}</ModalHeader>
                            <ModalBody>
                                {modalBody}
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" onPress={() => handleClose(onClose)}>
                                    Yes
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
