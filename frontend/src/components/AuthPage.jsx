import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { loginService, registerService } from "../services/AuthService";
import { useNavigate } from "react-router-dom";

export default function AuthPage() {
    
    const navigate = useNavigate();

    useEffect(() => {
        if(localStorage.getItem("user") != null) navigate('/resolve');
    })

    const [isLogin, setIsLogin] = useState(true);
    const[name, setName] = useState('');
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[confirmPass, setConfirmPass] = useState('');
    const[passError, setPassError] = useState(false);
    const[error, setError] = useState(false);
    const[loginError, setLoginError] = useState(false);
    const[registerError, setRegisterError] = useState(false);

    const handleAuth = (e) => {
        e.preventDefault();
        if(isLogin) login();
        else register();
    }

    const register = () => {
        
        if(name.length == 0 || email.length == 0 || password.length == 0 || confirmPass.length == 0) {
            setError(true);
            return;
        }

        setError(false);

        if(password != confirmPass) {
            setPassError(true);
            return;
        }

        setPassError(false);
        
        const reqBody = {
            name,
            email,
            password
        }

        registerService(reqBody).then((response) => {
            localStorage.setItem("user", JSON.stringify(response.data));
            navigate('/resolve');
        }).catch(() => {
            setRegisterError(true);
        })
    }

    const login = () => {

        if(email.length == 0 || password.length == 0) {
            setError(true);
            return;
        }

        const reqBody = {
            email,
            password
        }

        loginService(reqBody).then((response) => {
            localStorage.setItem("user", JSON.stringify(response.data));
            navigate("/resolve");
        }).catch(() => {
            setLoginError(true);
        })
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-white px-4">
            <Navbar />
            <div className="absolute inset-0 opacity-10 [background-image:linear-gradient(to_right,#71717a_1px,transparent_1px),linear-gradient(to_bottom,#71717a_1px,transparent_1px)] [background-size:40px_40px]" />

            <div className="w-full max-w-md p-8 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl">
                {/* Toggle Title */}
                <h2 className="text-3xl font-bold text-center mb-6">
                    {isLogin ? "Welcome Back" : "Create an Account"}
                </h2>

                {/* Form */}
                <form className="space-y-5" onSubmit={handleAuth}>
                    {!isLogin && (
                        <div>
                            <label className="block text-sm mb-2 text-zinc-300">Full Name</label>
                            <input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                type="text"
                                placeholder="John Doe"
                                className="w-full px-4 py-2 rounded-lg bg-zinc-900 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>
                    )}

                    <div>
                        <label className="block text-sm mb-2 text-zinc-300">Email</label>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            placeholder="you@example.com"
                            className="w-full px-4 py-2 rounded-lg bg-zinc-900 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm mb-2 text-zinc-300">Password</label>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            placeholder="••••••••"
                            className="w-full px-4 py-2 rounded-lg bg-zinc-900 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>

                    {!isLogin && (
                        <div>
                            <label className="block text-sm mb-2 text-zinc-300">Confirm Password</label>
                            <input
                                value={confirmPass}
                                onChange={(e) => setConfirmPass(e.target.value)}
                                type="password"
                                placeholder="••••••••"
                                className="w-full px-4 py-2 rounded-lg bg-zinc-900 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold hover:opacity-90 transition"
                    >
                        {isLogin ? "Login" : "Sign Up"}
                    </button>
                    {passError && <p className='text-red-500'>Password must match!</p>}
                    {error && <p className='text-red-500'>All fields must be filled</p>}
                    {loginError && <p className='text-red-500'>Error while logging in</p>}
                    {registerError && <p className='text-red-500'>Error while registering</p>}
                </form>

                {/* Footer */}
                <p className="text-center text-zinc-400 mt-6">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-purple-400 hover:underline"
                    >
                        {isLogin ? "Sign Up" : "Login"}
                    </button>
                </p>
            </div>
        </div>
    );
}
