// components/ProtectedRoute.tsx
"use client"; // Ensure this component is client-side

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useWixClient } from '@/hooks/useWixClient';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const wixClient = useWixClient();
    const isLoggedIn = wixClient.auth.loggedIn();

    useEffect(() => {
        if (!isLoggedIn) {
            router.push('/login'); // Redirect to login page if not logged in
        }
    }, [isLoggedIn, router]);

    return isLoggedIn ? <>{children}</> : null; // Render children if logged in
};

export default ProtectedRoute;
