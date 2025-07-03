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
    Card
} from "react-bootstrap";
import { FaPlus, FaEdit, FaTrash, FaMapMarkerAlt } from "react-icons/fa";
import AppContext from "../provider/Context";

const ProvinceManager = () => {
    const { province } = useContext(AppContext);
    const { provinces, fetchProvinces, createProvince, updateProvince, deleteProvince } = province;

    const [search, setSearch] = useState("");
    const [formData, setFormData] = useState({ name: "" });
    const [editId, setEditId] = useState(null);
    const [message, setMessage] = useState("");
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        fetchProvinces();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editId) {
                await updateProvince(editId, formData);
                setMessage("✅ Province updated successfully.");
            } else {
                await createProvince(formData);
                setMessage("✅ Province created successfully.");
            }
            setFormData({ name: "" });
            setEditId(null);
            setShowForm(false);
        } catch {
            setMessage("❌ Something went wrong.");
        }
    };

    const handleEdit = (item) => {
        setEditId(item._id);
        setFormData(item);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure to delete this province?")) {
            await deleteProvince(id);
            setMessage("🗑️ Province deleted.");
        }
    };

    const filtered = provinces.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h3 className="mb-0"><FaMapMarkerAlt className="me-2 text-success" />Province Manager</h3>
                <Button
                    variant="success"
                    onClick={() => {
                        setShowForm(!showForm);
                        setEditId(null);
                        setFormData({ name: "" });
                    }}
                >
                    {showForm ? "Cancel" : <><FaPlus className="me-1" /> Create New Province</>}
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
                                <Row className="g-3 align-items-center">
                                    <Col md={6}>
                                        <Form.Control
                                            placeholder="Province Name"
                                            value={formData.name}
                                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </Col>
                                    <Col md={3}>
                                        <Button type="submit" variant="primary">
                                            {editId ? "Update" : "Create"}
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
                    placeholder="Search provinces..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </InputGroup>

            <Table bordered hover responsive className="table-striped">
                <thead className="table-light">
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filtered.length > 0 ? filtered.map((item, i) => (
                        <tr key={item._id}>
                            <td>{i + 1}</td>
                            <td>{item.name}</td>
                            <td>
                                <Button variant="outline-info" size="sm" onClick={() => handleEdit(item)}><FaEdit /></Button>{" "}
                                <Button variant="outline-danger" size="sm" onClick={() => handleDelete(item._id)}><FaTrash /></Button>
                            </td>
                        </tr>
                    )) : (
                        <tr><td colSpan="3" className="text-center">No provinces found.</td></tr>
                    )}
                </tbody>
            </Table>
        </div>
    );
};

export default ProvinceManager;
