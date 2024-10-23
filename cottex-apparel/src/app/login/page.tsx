"use client";
import { useState } from 'react';
import { useWixClient } from '@/hooks/useWixClient';
import Cookies from "js-cookie";
import { usePathname, useRouter } from 'next/navigation';
import { LoginState } from '@wix/sdk';

enum MODE {
    LOGIN = "LOGIN",
    REGISTER = "REGISTER",
    RESET_PASSWORD = "RESET_PASSWORD",
    EMAIL_VERIFICATION = "EMAIL_VERIFICATION"
}

const LoginPage = () => {
    const wixClient = useWixClient();
    const router = useRouter();

    const isLoggedIn = wixClient.auth.loggedIn();
    console.log(isLoggedIn);

    if (isLoggedIn) {
        router.push("/");
    }

    const [mode, setMode] = useState(MODE.LOGIN);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailCode, setEmailCode] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const pathName = usePathname();

    const formTitle =
        mode === MODE.LOGIN ? "Log in"
            : mode === MODE.REGISTER ? "Register"
                : mode === MODE.RESET_PASSWORD ? "Reset Your Password"
                    : "Verify Your Email";

    const buttonTitle =
        mode === MODE.LOGIN ? "Login"
            : mode === MODE.REGISTER ? "Register"
                : mode === MODE.RESET_PASSWORD ? "Reset"
                    : "Verify";

                    const validateForm = () => {
                        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                        
                        if (!emailPattern.test(email)) {
                            return "Invalid email format. Please use a valid email";
                        }
                
                        if ((mode === MODE.LOGIN || mode === MODE.REGISTER) && password.length < 8) {
                            return "Password must be at least 8 characters long!";
                        }
                
                        return ""; 
                    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");
        
        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
            setIsLoading(false);
            return; 
        }
        try {
            let response;
            switch (mode) {
                case MODE.LOGIN:
                    response = await wixClient.auth.login({
                        email,
                        password,
                    });
                    break;
                case MODE.REGISTER:
                    response = await wixClient.auth.register({
                        email,
                        password,
                        profile: { nickname: username },
                    });
                   
                    setMode(MODE.LOGIN);  
                    setIsLoading(false);
                    return;  
                case MODE.RESET_PASSWORD:
                    response = await wixClient.auth.sendPasswordResetEmail(
                        email,
                        window.location.href
                    );
                    setMessage("Password reset email sent. Please check your e-mail");
                    break;
                case MODE.EMAIL_VERIFICATION:
                    response = await wixClient.auth.processVerification({
                        verificationCode:emailCode
                    });
                    break;
                default:
                    break;
            }

            console.log(response);

            switch (response?.loginState) {
                case LoginState.SUCCESS:
                    setMessage("Successful! You are being redirected.");
                    const tokens = await wixClient.auth.getMemberTokensForDirectLogin(
                        response.data.sessionToken!
                    );
                    console.log(tokens);

                    Cookies.set("refreshToken", JSON.stringify(tokens.refreshToken), {
                        expires:2
                    });
                    wixClient.auth.setTokens(tokens);
                    router.push("/");
                    break;

                case LoginState.FAILURE:
                    if (
                        response.errorCode === "invalidEmail" ||
                        response.errorCode === "invalidPassword"
                    ) {
                        setError("Invalid email or password!");
                    } else if (response.errorCode === "emailAlreadyExists") {
                        setError("Email already exists!");
                    } else if (response.errorCode === "resetPassword") {
                        setError("You need to reset your password!");
                    } else {
                        setError("Something went wrong!");
                    }
                    break;  

                case LoginState.EMAIL_VERIFICATION_REQUIRED:
                    setMode(MODE.EMAIL_VERIFICATION);
                    break;  

                case LoginState.OWNER_APPROVAL_REQUIRED:
                    setMessage("Your account is pending approval");
                    break; 

                default:
                    break;
            }

        } catch (err) {
            console.log(err);
            setError("invalid email");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='h-[calc(100vh-80px)] px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 flex items-center justify-center'>
            <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
                <h1 className='text-2xl font-semibold'>{formTitle}</h1>
                {mode === MODE.REGISTER ? (
                    <div className='flex flex-col gap-2'>
                        <label className='text-sm to-gray-700'>Username</label>
                        <input
                            type="text"
                            name="username"
                            placeholder='elza'
                            className='ring-2 ring-gray-300 rounded-md p-4 '
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                ):null}
                {mode !== MODE.EMAIL_VERIFICATION ? (
                    <div className='flex flex-col gap-2'>
                        <label className='text-sm to-gray-700'>E-mail </label>
                        <input
                            type="email"
                            name="email"
                            placeholder='elza@gmail.com'
                            className='ring-2 ring-gray-300 rounded-md p-4 '
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                ) : (
                    <div className='flex flex-col gap-2'>
                        <label className='text-sm to-gray-700'>Verification Code</label>
                        <input
                            type="text"
                            name="emailCode"
                            placeholder='Code'
                            className='ring-2 ring-gray-300 rounded-md p-4 '
                            value={emailCode}
                            onChange={(e) => setEmailCode(e.target.value)}
                        />
                    </div>
                )}
                {(mode === MODE.LOGIN || mode === MODE.REGISTER) ? (
                    <div className='flex flex-col gap-2'>
                        <label className='text-sm to-gray-700'>Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder='Enter your password'
                            className='ring-2 ring-gray-300 rounded-md p-4 '
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                ) : null}
                {mode === MODE.LOGIN && (
                    <div className='text-sm underline cursor-pointer'
                        onClick={() => setMode(MODE.RESET_PASSWORD)}>
                        Forgot password?
                    </div>
                )}
                <button className='bg-cottex text-white p-2 rounded-md disabled:bg-pink-200 disabled:cursor-not-allowed' disabled={isLoading}>
                    {isLoading ? "Loading..." : buttonTitle}
                </button>

                {error && <div className='text-red-600'>{error}</div>}
                {mode === MODE.LOGIN && (
                    <div className='text-sm underline cursor-pointer' onClick={() => setMode(MODE.REGISTER)}>
                        {"Don't"} have an account?
                    </div>
                )}
                {mode === MODE.REGISTER && (
                    <div className='text-sm underline cursor-pointer' onClick={() => setMode(MODE.LOGIN)}>
                        Have an account?
                    </div>
                )}
                {mode === MODE.RESET_PASSWORD && (
                    <div className='text-sm underline cursor-pointer' onClick={() => setMode(MODE.LOGIN)}>
                        Go back to Login
                    </div>
                )}
                {message && <div className='text-green-600 text-sm'>{message}</div>}
            </form>
        </div>
    );
}

export default LoginPage;
