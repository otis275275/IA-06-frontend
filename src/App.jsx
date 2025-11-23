import { useState } from 'react'
import { RouterProvider, Routes, BrowserRouter, Route, Navigate, Router } from 'react-router-dom'
import Home from './Commponent/Home.jsx'
import Register from './Commponent/Register.jsx'
import Login from './Commponent/Login.jsx'
import Content from './Commponent/Content.jsx'
import './App.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect } from 'react';
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false, 
        },
        mutations: {
            retry: false,
        }
    }
});

const AppRouter = () => {
    const [isAppReady, setIsAppReady] = useState(false);

    // MÔ PHỎNG QUÁ TRÌNH KHỞI TẠO ỨNG DỤNG
    useEffect(() => {
        // Giả lập độ trễ cần thiết để ứng dụng tải
        const timer = setTimeout(() => {
            setIsAppReady(true);
        }, 500); 

        return () => clearTimeout(timer);
    }, []);

    if (!isAppReady) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
                <svg className="animate-spin h-8 w-8 text-sky-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span className="ml-3">Đang khởi tạo ứng dụng...</span>
            </div>
        );
    }
    
    return (
        // ĐÃ THAY ĐỔI: Sử dụng BrowserRouter trực tiếp
        <BrowserRouter> 
            <Routes>
                {/* Cấu trúc routing lồng nhau */}
                <Route path='/' element={<Navigate to="/home/content" replace />} />
                <Route path='/home' element={<Home/>}>
                    <Route path='content' element={<Content/>}/>
                    <Route index element={<Navigate to="content" replace />} />
                </Route>

                {/* Các route độc lập */}
                <Route path='/register' element={<Register/>} />
                <Route path='/login' element={<Login/>} />
            </Routes>
        </BrowserRouter>
    );
};

// Component chính được export, đảm bảo QueryClientProvider là wrapper ngoài cùng
const App = () => (
    <QueryClientProvider client={queryClient}>
        <AppRouter />
    </QueryClientProvider>
);

export default App
