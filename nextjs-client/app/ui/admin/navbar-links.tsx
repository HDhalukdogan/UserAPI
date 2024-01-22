'use client'
import React from 'react'
import { NavbarItem } from "@nextui-org/react";
import Link from "next/link";
import { usePathname } from 'next/navigation';

export default function NavbarLinks() {
    const pathname = usePathname();
    return (
        <>
            <NavbarItem isActive={pathname === "/admin/roles"}>
                <Link color="foreground" href="/admin/roles">
                    Roles
                </Link>
            </NavbarItem>
            <NavbarItem isActive={pathname === "/admin/userswr"}>
                <Link color="foreground" href="/admin/userswr">
                    User Roles
                </Link>
            </NavbarItem></>
    )
}
