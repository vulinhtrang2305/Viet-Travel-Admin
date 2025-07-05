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
import { FaEdit } from "react-icons/fa";
import AppContext from "../provider/Context";

const UserManager = () => {
    const { userFind } = useContext(AppContext);
    const { users, fetchUsers, updateUser } = userFind;

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
        });
        setShowForm(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editId) {
                await updateUser(editId, formData);
                setMessage("✅ Cập nhật người dùng thành công.");
                setEditId(null);
                setShowForm(false);
                await fetchUsers();
            }
        } catch {
            setMessage("❌ Cập nhật người dùng thất bại.");
        }
    };

    const filteredUsers = users.filter((u) =>
        u.username?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h3 className="mb-0">👥 Quản lý người dùng</h3>
                <Button
                    variant="secondary"
                    onClick={() => {
                        setShowForm(false);
                        setEditId(null);
                    }}
                >
                    Ẩn biểu mẫu
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
                                    <Col md={6}>
                                        <Button type="submit" variant="primary">
                                            Cập nhật người dùng
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

            <Table bordered hover responsive className="table-striped">
                <thead className="table-light">
                    <tr>
                        <th>#</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>DOB</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.length > 0 ? (
                        filteredUsers.map((user, index) => (
                            <tr key={user._id}>
                                <td>{index + 1}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.phone}</td>
                                <td>{user.address}</td>
                                <td>{user.dob ? user.dob.split("T")[0] : "N/A"}</td>
                                <td>
                                    <Button
                                        variant="outline-info"
                                        size="sm"
                                        onClick={() => handleEdit(user)}
                                    >
                                        <FaEdit />
                                    </Button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={7} className="text-center">
                                Không tìm thấy người dùng.
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    );
};

export default UserManager;
