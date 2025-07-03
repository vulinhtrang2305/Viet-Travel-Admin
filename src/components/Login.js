import React, { useState, useContext } from "react";
import axios from "axios";
import AppContext from "../provider/Context";

const Login = () => {
    const { loginSuccess } = useContext(AppContext);
    const [form, setForm] = useState({ email: "", password: "" });
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:9999/login", form);
            if (res.data.token) {
                loginSuccess(res.data.user, res.data.token);
                setMessage("Đăng nhập thành công");
            } else {
                setMessage(res.data.message || "Sai thông tin đăng nhập");
            }
        } catch (err) {
            setMessage(err.response?.data?.message || "Lỗi đăng nhập");
        }
    };

    return (
        <div className="card p-4 shadow">
            <h4>Đăng nhập</h4>
            <form onSubmit={handleSubmit}>
                <div className="mb-2">
                    <input name="email" className="form-control" placeholder="Email" onChange={handleChange} required />
                </div>
                <div className="mb-2">
                    <input name="password" type="password" className="form-control" placeholder="Mật khẩu" onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-success w-100">Đăng nhập</button>
            </form>
            {message && <div className="alert alert-info mt-3">{message}</div>}
        </div>
    );
};

export default Login;
