import React from "react";
import AdminNavbar from "../ui/admin/nav-bar";


export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <div>
                <AdminNavbar />
            </div>
            <div className="grow p-6 md:overflow-y-auto md:p-12">
                {children}
            </div>
        </div>
    );
}
