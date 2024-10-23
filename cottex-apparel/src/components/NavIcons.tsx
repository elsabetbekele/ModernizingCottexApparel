"use client"; // Ensure this is at the very top of the file

import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Cart from "./Cart";
import { useWixClient } from "@/hooks/useWixClient";
import Cookies from "js-cookie";
import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/hooks/useCartStore";
import { ToastContainer, toast } from "react-toastify"; // Import ToastContainer and toast
import "react-toastify/dist/ReactToastify.css"; // Import toastify styles

const NavIcons = () => {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const wixClient = useWixClient(); // Ensure this hook is valid for client component
    const isLoggedIn = wixClient.auth.loggedIn();

    const handleProfile = () => {
        if (!isLoggedIn) {
            router.push("/login");
            return;
        } else {
            setIsProfileOpen((prev) => !prev);
        }
    };

    const handleLogout = async () => {
        try {
            setIsLoading(true);
            Cookies.remove("refreshToken");
            await wixClient.auth.logout(window.location.href);
            setIsProfileOpen(false);
            router.push("/");
        } catch (error) {
            console.error("Logout failed:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCartClick = () => {
        if (!isLoggedIn) {
            toast.error("Please log in first to view the cart", {
                position: "top-right", // Use string value for position
            });
            return;
        }
        setIsCartOpen((prev) => !prev);
    };

    const { cart, counter, getCart } = useCartStore();

    useEffect(() => {
        getCart(wixClient);
    }, [wixClient, getCart]);

    return (
        <div className="flex items-center gap-4 xl:gap-6 relative">
            <Image
                src="/profile.png"
                alt="Profile"
                width={38}
                height={38}
                className="cursor-pointer"
                onClick={handleProfile}
            />
            {isProfileOpen && (
                <div className="absolute p-4 rounded-md top-12 left-0 text-sm shadow-[0_3px_10px_rgb(0,0,0,0.2)] z-20 bg-white">
                    <Link href="/" className="block">Profile</Link>
                    <div className="mt-2 cursor-pointer" onClick={handleLogout}>
                        {isLoading ? "Logging out..." : "Logout"}
                    </div>
                </div>
            )}
            <Image
                src="/notification.png"
                alt="Notification"
                width={28}
                height={28}
                className="cursor-pointer"
            />
            
            <div className="relative cursor-pointer" onClick={handleCartClick}>
                <Image
                    src="/cart.png"
                    alt="Cart"
                    width={38}
                    height={38}
                    style={{ width: "auto", height: "auto" }} 
                />
                <div className="absolute -top-4 -right-4 w-6 h-6 bg-cottex rounded-full text-white text-sm flex items-center justify-center">
                    {counter}
                </div>
            </div>
            {isLoggedIn && isCartOpen && <Cart />}

            {/* Add ToastContainer for displaying toasts */}
            <ToastContainer />
        </div>
    );
};

export default NavIcons;
