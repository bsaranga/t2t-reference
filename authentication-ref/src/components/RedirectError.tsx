'use client'

import { useEffect, useState } from "react";
import { CardDescription } from "./ui/card";

export default function RedirectErrorDisplay() {
    const [error, setError] = useState<string|undefined>(undefined);

    useEffect(() => {
        document.cookie.split(';').map(c => c.trim()).map(c => {
            const [key, value] = c.split('=');
            if (key === 'redirect_error') {
                setError(value);
                document.cookie += 'redirect_error=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/login;';
            }
        });
    }, []);
    
    return (
        <CardDescription className="text-red-500">{ !!error && error }</CardDescription>
    )
}