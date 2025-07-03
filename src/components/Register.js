import React, { useState } from "react";
import axios from "axios";

const Register = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        phoneNumber: "",
        address: ""
    });
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:9999/register", form);
            setMessage(res.data.message || "Đăng ký thành công");
        } catch (err) {
            setMessage(err.response?.data?.message || "Lỗi đăng ký");
        }
    };

    return (
        <div className="card p-4 mb-4 shadow">
            <h4>Đăng ký</h4>
            <form onSubmit={handleSubmit}>
                <div className="mb-2">
                    <input name="name" className="form-control" placeholder="Tên" onChange={handleChange} required />
                </div>
                <div className="mb-2">
                    <input name="email" type="email" className="form-control" placeholder="Email" onChange={handleChange} required />
                </div>
                <div className="mb-2">
                    <input name="password" type="password" className="form-control" placeholder="Mật khẩu" onChange={handleChange} required />
                </div>
                <div className="mb-2">
                    <input name="phoneNumber" className="form-control" placeholder="Số điện thoại" onChange={handleChange} required />
                </div>
                <div className="mb-2">
                    <input name="address" className="form-control" placeholder="Địa chỉ" onChange={handleChange} />
                </div>
                <button type="submit" className="btn btn-primary w-100">Đăng ký</button>
            </form>
            {message && <div className="alert alert-info mt-3">{message}</div>}
        </div>
    );
};

export default Register;
