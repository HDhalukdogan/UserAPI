import React from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button } from "@nextui-org/react";
import AcmeLogo from "../acme-logo";
import { signOut } from "@/auth";
import Link from "next/link";
import NavbarLinks from "./navbar-links";

export default function AdminNavbar() {
    return (
        <Navbar>
            <NavbarBrand>
                <AcmeLogo />
                <Link href="/dashboard">
                    <p className="font-bold text-inherit ms-1">NEXTJS</p>
                </Link>
            </NavbarBrand>
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarLinks/>
            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarItem>
                    <form action={async () => {
                        'use server'
                        await signOut()
                    }}>
                        <Button type="submit" color="primary" variant="flat">
                            Log Out
                        </Button>
                    </form>
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
}
