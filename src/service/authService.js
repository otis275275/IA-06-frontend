import api from "./api";

export const getErrorMessage = (error) => {
    // Trường hợp 1: Lỗi kết nối mạng (Network Error) - không có phản hồi từ server
    if (!error.response) {
        console.error("Lỗi kết nối mạng hoặc lỗi không xác định:", error.message);
        return "Lỗi kết nối mạng hoặc lỗi không xác định.";
    }

    // Trường hợp 2: Có phản hồi (HTTP Error)
    const resData = error.response.data;

    // 1. Lỗi Validation (Giả định trả về mảng lỗi)
    if (Array.isArray(resData) && resData.length > 0) {
        // Lấy thông báo lỗi đầu tiên
        const firstError = resData.find(e => e.msg)?.msg;
        return firstError || "Dữ liệu đăng nhập/đăng ký không hợp lệ.";
    } 
    
    // 2. Lỗi Logic (message)
    if (resData.message) {
        return resData.message;
    }

    // 3. Lỗi HTTP Status code
    switch (error.response.status) {
        case 401:
            return "Email hoặc mật khẩu không chính xác.";
        case 400:
            return "Yêu cầu không hợp lệ. Vui lòng kiểm tra dữ liệu đầu vào.";
        default:
            return `Lỗi Server (${error.response.status}).`;
    }
};

export const login = async (data) => {
    // Hàm này đã nằm trong phạm vi của 'api' (được định nghĩa phía trên)
    const response = await api.post('/api/login', data);
    return response.data; 
};

export const register = async (data) => {
    // Hàm này đã nằm trong phạm vi của 'api' (được định nghĩa phía trên)
    const response = await api.post('/api/register', data);
    return response.data;
};