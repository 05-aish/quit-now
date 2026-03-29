import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

function Auth() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);

    const handleAuthSubmit = async (e) => {
        e.preventDefault();

        if (isLogin) {
            const {error} = await supabase.auth.signInWithPassword({ email, password });
            console.log(error);
        } else {
            const {error} = await supabase.auth.signUp({ email, password });
            console.log(error);
        }
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
                        onChange={(e) => setEmail(e.target.value)}
                        className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-200"
                    />

                    <input
                        type="password"
                        required
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    />

                    <button
                        type="submit"
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

                </form>
            </div>
        </div>
    );
}

export default Auth;