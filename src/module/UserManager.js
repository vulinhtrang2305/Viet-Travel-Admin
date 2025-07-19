// import React, { useContext, useEffect, useState } from "react";
// import {
//     Table,
//     Form,
//     Button,
//     InputGroup,
//     Row,
//     Col,
//     Alert,
//     Collapse,
//     Card,
// } from "react-bootstrap";
// import { FaEdit } from "react-icons/fa";
// import AppContext from "../provider/Context";

// const UserManager = () => {
//     const { userFind } = useContext(AppContext);
//     const { users, fetchUsers, updateUser } = userFind;

//     const [search, setSearch] = useState("");
//     const [showForm, setShowForm] = useState(false);
//     const [editId, setEditId] = useState(null);
//     const [message, setMessage] = useState("");
//     const [formData, setFormData] = useState({
//         username: "",
//         email: "",
//         phone: "",
//         address: "",
//         dob: "",
//     });

//     useEffect(() => {
//         fetchUsers();
//     }, []);

//     const handleEdit = (user) => {
//         setEditId(user._id);
//         setFormData({
//             username: user.username || "",
//             email: user.email || "",
//             phone: user.phone || "",
//             address: user.address || "",
//             dob: user.dob ? user.dob.split("T")[0] : "",
//         });
//         setShowForm(true);
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             if (editId) {
//                 await updateUser(editId, formData);
//                 setMessage("✅ Cập nhật người dùng thành công.");
//                 setEditId(null);
//                 setShowForm(false);
//                 await fetchUsers();
//             }
//         } catch {
//             setMessage("❌ Cập nhật người dùng thất bại.");
//         }
//     };

//     const filteredUsers = users?.filter((u) =>
//         u.username?.toLowerCase().includes(search.toLowerCase())
//     );

//     return (
//         <div className="container mt-4">
//             <div className="d-flex justify-content-between align-items-center mb-3">
//                 <h3 className="mb-0">👥 Quản lý người dùng</h3>
//                 <Button
//                     variant="secondary"
//                     onClick={() => {
//                         setShowForm(false);
//                         setEditId(null);
//                     }}
//                 >
//                     Ẩn biểu mẫu
//                 </Button>
//             </div>

//             {message && (
//                 <Alert variant="info" onClose={() => setMessage("")} dismissible>
//                     {message}
//                 </Alert>
//             )}

//             <Collapse in={showForm}>
//                 <div>
//                     <Card className="mb-3">
//                         <Card.Body>
//                             <Form onSubmit={handleSubmit}>
//                                 <Row className="g-3">
//                                     <Col md={6}>
//                                         <Form.Control
//                                             placeholder="Username"
//                                             value={formData.username}
//                                             onChange={(e) =>
//                                                 setFormData({ ...formData, username: e.target.value })
//                                             }
//                                         />
//                                     </Col>
//                                     <Col md={6}>
//                                         <Form.Control
//                                             placeholder="Email"
//                                             type="email"
//                                             value={formData.email}
//                                             onChange={(e) =>
//                                                 setFormData({ ...formData, email: e.target.value })
//                                             }
//                                         />
//                                     </Col>
//                                     <Col md={6}>
//                                         <Form.Control
//                                             placeholder="Số điện thoại"
//                                             value={formData.phone}
//                                             onChange={(e) =>
//                                                 setFormData({ ...formData, phone: e.target.value })
//                                             }
//                                         />
//                                     </Col>
//                                     <Col md={6}>
//                                         <Form.Control
//                                             placeholder="Địa chỉ"
//                                             value={formData.address}
//                                             onChange={(e) =>
//                                                 setFormData({ ...formData, address: e.target.value })
//                                             }
//                                         />
//                                     </Col>
//                                     <Col md={6}>
//                                         <Form.Control
//                                             type="date"
//                                             value={formData.dob}
//                                             onChange={(e) =>
//                                                 setFormData({ ...formData, dob: e.target.value })
//                                             }
//                                         />
//                                     </Col>
//                                     <Col md={6}>
//                                         <Button type="submit" variant="primary">
//                                             Cập nhật người dùng
//                                         </Button>
//                                     </Col>
//                                 </Row>
//                             </Form>
//                         </Card.Body>
//                     </Card>
//                 </div>
//             </Collapse>

//             <InputGroup className="mb-3">
//                 <Form.Control
//                     placeholder="Tìm kiếm người dùng..."
//                     value={search}
//                     onChange={(e) => setSearch(e.target.value)}
//                 />
//             </InputGroup>

//             <div className="border border-gray-200 rounded-3xl overflow-hidden shadow-sm bg-white mt-3">
//                 <Table hover responsive className="align-middle mb-0">
//                     <thead className="bg-gray-100 text-gray-700 text-sm text-center">
//                         <tr>
//                             <th className="py-3 px-4">#</th>
//                             <th className="py-3 px-4 text-start">Username</th>
//                             <th className="py-3 px-4 text-start">Email</th>
//                             <th className="py-3 px-4">Phone</th>
//                             <th className="py-3 px-4 text-start">Address</th>
//                             <th className="py-3 px-4">DOB</th>
//                             <th className="py-3 px-4">Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {filteredUsers?.length > 0 ? (
//                             filteredUsers?.map((user, index) => (
//                                 <tr
//                                     key={user._id}
//                                     className="text-sm text-gray-800 hover:bg-gray-50 transition duration-150"
//                                 >
//                                     <td className="text-center fw-bold">{index + 1}</td>
//                                     <td className="fw-semibold">{user.username}</td>
//                                     <td className="text-muted">{user.email}</td>
//                                     <td className="text-center">{user.phone}</td>
//                                     <td className="text-muted text-break">{user.address || "—"}</td>
//                                     <td className="text-center">
//                                         <span className="badge bg-light text-dark px-2 py-1 rounded-pill">
//                                             {user.dob ? user.dob.split("T")[0] : "N/A"}
//                                         </span>
//                                     </td>
//                                     <td className="text-center">
//                                         <Button
//                                             variant="outline-primary"
//                                             size="sm"
//                                             className="d-inline-flex align-items-center gap-1"
//                                             onClick={() => handleEdit(user)}
//                                         >
//                                             <FaEdit size={14} />
//                                             Sửa
//                                         </Button>
//                                     </td>
//                                 </tr>
//                             ))
//                         ) : (
//                             <tr>
//                                 <td colSpan={7} className="text-center text-muted py-4 fst-italic">
//                                     Không tìm thấy người dùng.
//                                 </td>
//                             </tr>
//                         )}
//                     </tbody>
//                 </Table>
//             </div>

//         </div>
//     );
// };

// export default UserManager;


import React, { useContext, useEffect, useState } from "react";
import {
    Table,
    Form,
    Button,
    InputGroup,
    Row,
    Col,
    Alert,
    Collapse,
    Card,
} from "react-bootstrap";
import { FaEdit, FaPlus } from "react-icons/fa";
import AppContext from "../provider/Context";

const UserManager = () => {
    const { userFind } = useContext(AppContext);
    const { users, fetchUsers, updateUser, createUser, deleteUser } = userFind;

    const [search, setSearch] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [editId, setEditId] = useState(null);
    const [message, setMessage] = useState("");
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        phone: "",
        address: "",
        dob: "",
        password: "",
    });

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleEdit = (user) => {
        setEditId(user._id);
        setFormData({
            username: user.username || "",
            email: user.email || "",
            phone: user.phone || "",
            address: user.address || "",
            dob: user.dob ? user.dob.split("T")[0] : "",
            password: "",
        });
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa người dùng này?")) {
            await deleteUser(id);
            setMessage("🗑️ Đã xóa người dùng.");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editId) {
                await updateUser(editId, formData);
                setMessage("✅ Cập nhật người dùng thành công.");
            } else {
                await createUser(formData);
                setMessage("✅ Tạo người dùng thành công.");
            }
            setEditId(null);
            setFormData({ username: "", email: "", phone: "", address: "", dob: "", password: "" });
            setShowForm(false);
            await fetchUsers();
        } catch {
            setMessage("❌ Thao tác thất bại.");
        }
    };

    const filteredUsers = users?.filter((u) =>
        u.username?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h3 className="mb-0">👥 Quản lý người dùng</h3>
                <Button
                    variant={showForm ? "secondary" : "success"}
                    onClick={() => {
                        setShowForm(!showForm);
                        setEditId(null);
                        setFormData({ username: "", email: "", phone: "", address: "", dob: "", password: "" });
                    }}
                >
                    {showForm ? "Ẩn biểu mẫu" : <><FaPlus className="me-1" /> Thêm người dùng</>}
                </Button>
            </div>

            {message && (
                <Alert variant="info" onClose={() => setMessage("")} dismissible>
                    {message}
                </Alert>
            )}

            <Collapse in={showForm}>
                <div>
                    <Card className="mb-3">
                        <Card.Body>
                            <Form onSubmit={handleSubmit}>
                                <Row className="g-3">
                                    <Col md={6}>
                                        <Form.Control
                                            placeholder="Username"
                                            value={formData.username}
                                            onChange={(e) =>
                                                setFormData({ ...formData, username: e.target.value })
                                            }
                                            required
                                        />
                                    </Col>
                                    <Col md={6}>
                                        <Form.Control
                                            placeholder="Email"
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) =>
                                                setFormData({ ...formData, email: e.target.value })
                                            }
                                            required
                                        />
                                    </Col>
                                    <Col md={6}>
                                        <Form.Control
                                            placeholder="Số điện thoại"
                                            value={formData.phone}
                                            onChange={(e) =>
                                                setFormData({ ...formData, phone: e.target.value })
                                            }
                                        />
                                    </Col>
                                    <Col md={6}>
                                        <Form.Control
                                            placeholder="Địa chỉ"
                                            value={formData.address}
                                            onChange={(e) =>
                                                setFormData({ ...formData, address: e.target.value })
                                            }
                                        />
                                    </Col>
                                    <Col md={6}>
                                        <Form.Control
                                            type="date"
                                            value={formData.dob}
                                            onChange={(e) =>
                                                setFormData({ ...formData, dob: e.target.value })
                                            }
                                        />
                                    </Col>
                                    {!editId && (
                                        <Col md={6}>
                                            <Form.Control
                                                type="password"
                                                placeholder="Mật khẩu"
                                                value={formData.password}
                                                onChange={(e) =>
                                                    setFormData({ ...formData, password: e.target.value })
                                                }
                                                required
                                            />
                                        </Col>
                                    )}
                                    <Col md={6}>
                                        <Button type="submit" variant="primary">
                                            {editId ? "Cập nhật người dùng" : "Tạo người dùng"}
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                        </Card.Body>
                    </Card>
                </div>
            </Collapse>

            <InputGroup className="mb-3">
                <Form.Control
                    placeholder="Tìm kiếm người dùng..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </InputGroup>

            <div className="border border-gray-200 rounded-3xl overflow-hidden shadow-sm bg-white mt-3">
                <Table hover responsive className="align-middle mb-0">
                    <thead className="bg-gray-100 text-gray-700 text-sm text-center">
                        <tr>
                            <th className="py-3 px-4">#</th>
                            <th className="py-3 px-4 text-start">Username</th>
                            <th className="py-3 px-4 text-start">Email</th>
                            <th className="py-3 px-4">Phone</th>
                            <th className="py-3 px-4 text-start">Address</th>
                            <th className="py-3 px-4">DOB</th>
                            <th className="py-3 px-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers?.length > 0 ? (
                            filteredUsers?.map((user, index) => (
                                <tr
                                    key={user._id}
                                    className="text-sm text-gray-800 hover:bg-gray-50 transition duration-150"
                                >
                                    <td className="text-center fw-bold">{index + 1}</td>
                                    <td className="fw-semibold">{user.username}</td>
                                    <td className="text-muted">{user.email}</td>
                                    <td className="text-center">{user.phone}</td>
                                    <td className="text-muted text-break">{user.address || "—"}</td>
                                    <td className="text-center">
                                        <span className="badge bg-light text-dark px-2 py-1 rounded-pill">
                                            {user.dob ? user.dob.split("T")[0] : "N/A"}
                                        </span>
                                    </td>
                                    <td className="text-center">
                                        <Button
                                            variant="outline-primary"
                                            size="sm"
                                            className="d-inline-flex align-items-center gap-1 me-2"
                                            onClick={() => handleEdit(user)}
                                        >
                                            <FaEdit size={14} /> Sửa
                                        </Button>
                                        <Button
                                            variant="outline-danger"
                                            size="sm"
                                            onClick={() => handleDelete(user._id)}
                                        >
                                            Xóa
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={7} className="text-center text-muted py-4 fst-italic">
                                    Không tìm thấy người dùng.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default UserManager;
