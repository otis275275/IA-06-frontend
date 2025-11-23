import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

export default function Home() {
    const location = useLocation();
    const email = location.state?.email || '';
    // Sử dụng màu sắc tương phản và hiệu ứng đổ bóng/hover
    return (
        <div className="min-h-screen flex flex-col bg-gray-100 font-sans">
            {/* Thanh điều hướng (Navbar) */}
            <header className="h-[72px] w-full bg-slate-800 shadow-xl flex items-center justify-between px-6 md:px-12 text-white">
                <h1 className="text-2xl font-extrabold text-sky-400 tracking-wider">
                    <span role="img" aria-label="shield">🛡️</span> Auth Demo
                </h1>
                
                {/* Khu vực nút điều hướng */}
                {email || (
                    <div className="flex gap-4 items-center h-full py-3">
                        {/* Nút Register */}
                        <Link to="/register">
                            <button 
                                className="transition duration-200 ease-in-out px-5 py-2.5 
                                            bg-sky-600 text-white font-medium rounded-xl 
                                            shadow-lg shadow-sky-600/30 
                                            hover:bg-sky-700 hover:shadow-sky-600/50 
                                            transform hover:scale-[1.03] active:scale-[0.98]"
                            >
                                Đăng ký
                            </button>
                        </Link>

                        {/* Nút Login */}
                        <Link to="/login">
                            <button 
                                className="transition duration-200 ease-in-out px-5 py-2.5 
                                            bg-white text-slate-800 font-medium rounded-xl 
                                            shadow-lg shadow-gray-400/30 
                                            hover:bg-gray-100 hover:shadow-gray-500/50 
                                            transform hover:scale-[1.03] active:scale-[0.98]"
                            >
                                Đăng nhập
                            </button>
                        </Link>
                    </div>
                )}
            </header>
            
            {/* Outlet sẽ hiển thị nội dung của các Route con (Register, Login, Content) */}
            <main className="flex-grow">
                <Outlet />
            </main>
        </div>
    )
}