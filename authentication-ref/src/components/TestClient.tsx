'use client'

import { getSessionOnClient } from "@/server_actions/getSession";
import { useEffect, useState } from "react"

export default function TestClient() {
    const [role, setRole] = useState<string>();
    
    useEffect(() => {
        getSessionOnClient().then(session => {
            setRole(session.role);
        });
    }, []);

    return (
        <>
            { role === 'STUDENT' && <div className="text-sm text-red-700">Student</div> }
            { role === 'MENTOR' && <div className="text-sm text-red-700">Mentor</div> }
            { role === 'SUPERADMIN' && <div className="text-sm text-red-700">Super Admin</div> }
        </>
    )
}