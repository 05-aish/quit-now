import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

function Auth() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [authError, setAuthError] = useState(null);  

    const handleAuthSubmit = async (e) => {
        e.preventDefault();
        //password validation before hitting the API
        if (password.length < 6) {
            setAuthError("Password must be at least 6 characters long.");
            return;
        }

        let error = null;

        if (isLogin) {
            const res = await supabase.auth.signInWithPassword({ email, password });
            error = res.error;
        } else {
            const res = await supabase.auth.signUp({ email, password });
            error = res.error;
        }

        if (error) {
             if (error.message.toLowerCase().includes('invalid')) {
                setAuthError('Invalid email or password.');
                } else if (error.message.toLowerCase().includes('user already')) {
                    setAuthError('User already exists. Try logging in.');
                } else {
                    setAuthError('Something went wrong. Try again.');
                }
                return;
        }
        setAuthError(null);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-pink-50 to-blue-50">
            
            <div className="bg-white p-8 rounded-2xl shadow-xl w-80 flex flex-col items-center">
                
                <h2 className="text-2xl font-bold mb-6">
                    {isLogin ? 'Login' : 'Sign Up'}
                </h2>

                <form className="flex flex-col gap-4 w-full" onSubmit={handleAuthSubmit}>
                    
                    <input
                        type="email"
                        required
                        placeholder="Email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value)
                            setAuthError(null);
                            }
                        }
                        className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-200"
                    />
                    <div className="relative w-full">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                required
                                placeholder="Password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value)
                                    setAuthError(null);
                                    }
                                }
                                className="w-full border rounded-lg px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-200"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(prev => !prev)}
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {showPassword ? 
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#999999"><path d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z"/></svg>
                                :
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#999999"><path d="M607.5-372.5Q660-425 660-500t-52.5-127.5Q555-680 480-680t-127.5 52.5Q300-575 300-500t52.5 127.5Q405-320 480-320t127.5-52.5Zm-204-51Q372-455 372-500t31.5-76.5Q435-608 480-608t76.5 31.5Q588-545 588-500t-31.5 76.5Q525-392 480-392t-76.5-31.5ZM214-281.5Q94-363 40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200q-146 0-266-81.5ZM480-500Zm207.5 160.5Q782-399 832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280q113 0 207.5-59.5Z"/></svg>
                                }       
                            </button>
                    </div>
                    {password.length > 0 && password.length < 6 && (
                        <p className="text-xs text-red-400 mt-1">
                            Password must be at least 6 characters
                        </p>
                    )}
                    <button
                        type="submit"
                        disabled={password.length > 0 && password.length < 6}
                        className="bg-gradient-to-r from-pink-400 to-blue-300 text-white font-semibold py-2 rounded-lg mt-2 hover:scale-105 transition-transform duration-200 w-full"
                    >
                        {isLogin ? 'Login' : 'Sign Up'}
                    </button>


                    <p className="text-sm text-center mt-2">
                        {isLogin ? 'New account?' : 'Already have an account?'}{' '}
                        <button
                            type="button"
                            onClick={() => setIsLogin(prev => !prev)}
                            className="text-blue-500 font-medium hover:underline"
                        >
                            {isLogin ? 'Sign Up' : 'Login'}
                        </button>
                    </p>
                    
                    {authError && (
                        <p className="text-sm text-red-500 mt-2">
                            {authError}
                        </p>
                    )}
                </form>
            </div>
            
        </div>
    );
}

export default Auth;