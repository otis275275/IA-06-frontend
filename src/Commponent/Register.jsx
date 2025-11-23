import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useRegisterMutation } from '../service/hookMutation';
import { getErrorMessage } from '../service/authService.js';
export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [frontendErrors, setFrontendErrors] = useState({});

    const location = useLocation();
    const successMessageFromRegister = location.state?.successMessage;
    const navigate = useNavigate();
    const { 
        mutate, 
        isPending, 
        isError,   
        error,     
        isSuccess
    } = useRegisterMutation();

    // Quy tắc validation frontend
    function validate() {
        const e = {};
        // Regex đơn giản cho frontend validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!email) {
            e.email = 'Email không được để trống';
        } else if (!emailRegex.test(email)) {
            e.email = 'Email không hợp lệ';
        }

        if (!password) {
            e.password = 'Mật khẩu không được để trống';
        } else if (password.length < 5 || password.length > 10) {
            e.password = 'Mật khẩu phải có 5-10 ký tự';
        }

        return e;
    }

    const handleSubmit = (ev) => {
        ev.preventDefault();
        setFrontendErrors({}); 
        
        const e = validate();
        if (Object.keys(e).length) {
            setFrontendErrors(e);
            return;
        }

        mutate({ email, password });
    };

    const backendErrorMessage = isError ? getErrorMessage(error) : null;
    const successMessage = isSuccess ? 'Đăng ký tài khoản thành công! Đang chuyển hướng sang đăng nhập' : null;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 font-sans">
            <div className="w-full max-w-md bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-lg p-6">
                <h2 className="text-white text-3xl font-bold mb-1">Đăng ký</h2>
                <p className="text-white/70 mb-6">Chào mừng trở lại.</p>

                {/* Success Message from Register or Login Success */}
                {(successMessageFromRegister || successMessage) && (
                    <div className="mb-4 text-sm text-green-300 bg-green-900/30 p-3 rounded-lg border border-green-700/50">
                        {successMessage || successMessageFromRegister}
                    </div>
                )}
                
                {/* Lỗi form chung từ Backend/API */}
                {backendErrorMessage && (
                    <div className="mb-4 text-sm text-red-300 bg-red-900/20 p-3 rounded-lg border border-red-700/50">{backendErrorMessage}</div>
                )}

                <form onSubmit={handleSubmit} noValidate>
                    <label className="block mb-3">
                        <span className="text-sm text-white/80 font-medium">Email</span>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={`mt-2 w-full rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition ${
                                frontendErrors.email ? 'ring-2 ring-red-400/60' : ''
                            }`}
                            placeholder="you@example.com"
                        />
                        {frontendErrors.email && <p className="mt-1 text-xs text-red-300">{frontendErrors.email}</p>}
                    </label>

                    <label className="block mb-4 relative">
                        <span className="text-sm text-white/80 font-medium">Mật khẩu</span>
                        <div className="mt-2 relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={`w-full rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 px-4 py-2 pr-12 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition ${
                                    frontendErrors.password ? 'ring-2 ring-red-400/60' : ''
                                }`}
                                placeholder="••••••••"
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword((s) => !s)}
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition p-1"
                                aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                            >
                                {showPassword ? (
                                    // eye off SVG
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.06.15-2.082.425-3.037M3 3l18 18" />
                                    </svg>
                                ) : (
                                    // eye SVG
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                )}
                            </button>
                        </div>
                        {frontendErrors.password && <p className="mt-1 text-xs text-red-300">{frontendErrors.password}</p>}
                    </label>

                    <button
                        type="submit"
                        className="w-full py-3 mt-4 rounded-lg bg-sky-500 hover:bg-sky-600 active:scale-[0.99] transition text-white font-semibold shadow-lg shadow-sky-500/30 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        disabled={isPending} // Dùng isPending từ useMutation
                    >
                        {isPending && (
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        )}
                        {isPending ? 'Đang xử lý...' : 'Đăng ký'}
                    </button>
                </form>
                
                <div className="mt-6 text-sm text-white/70 text-center">
                    Bạn đã có tài khoản? <Link to="/register" className="text-sky-300 hover:underline font-medium">Đăng nhập</Link>
                </div>
            </div>
        </div>
    );
}