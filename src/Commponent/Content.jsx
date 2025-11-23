import React from 'react';
import { useLocation } from "react-router-dom";

export default function Content() {
    const location = useLocation();
    // Lấy email từ state khi điều hướng (thường là sau khi đăng nhập thành công)
    const email = location.state?.email || 'Guest';
    const description = location.state?.email ? 'Bạn đã đăng nhập thành công vào hệ thống.' : 'Bạn vui lòng đăng nhập để tiếp tục sử dụng trang web.';
    
    return (
        <div className="h-[calc(100vh-72px)] flex flex-col justify-center items-center bg-gradient-to-br from-green-50 to-teal-100 p-8">
            <div className="max-w-3xl text-center p-10 bg-white rounded-3xl shadow-2xl transform transition-all duration-300 hover:shadow-3xl">
                <svg className="w-16 h-16 text-teal-500 mx-auto mb-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.276a11.002 11.002 0 00-15.54 0m15.54 0L14 10m-4 4l-2 2m-2-2l2-2" />
                </svg>
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-2">
                    Chào mừng, <span className="text-teal-600 block sm:inline">{email}!</span>
                </h1>
                <p className="text-xl text-gray-600 font-light mt-4">
                    {description}
                </p>
            </div>
        </div>
    );
}