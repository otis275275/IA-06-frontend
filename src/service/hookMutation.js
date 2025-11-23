import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { login, register } from './authService.js';
export function useLoginMutation() {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: login,
        onSuccess: (data, variables) => {
            console.log("Đăng nhập thành công:", data);
            
            // Chuyển hướng sau 1.5s đến route lồng nhau
            setTimeout(() => {
                navigate('/home/content', {state: {email: data.user?.email || variables.email}});
            }, 1500);
        },
        onError: (error) => {
            console.error("Lỗi đăng nhập chi tiết (debug):", error);
        },
    });
}

// Custom Hook cho Đăng ký
export function useRegisterMutation() {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: register,
        onSuccess: (data) => {
            console.log("Đăng ký thành công:", data);
            setTimeout(()=> {
                
                navigate('/login', { 
                    state: { 
                        successMessage: 'Đăng ký tài khoản thành công! Vui lòng đăng nhập.' 
                    } 
                });
            }, 1500) 
        },
        onError: (error) => {
            console.error("Lỗi đăng ký chi tiết (debug):", error);
        },
    });
}