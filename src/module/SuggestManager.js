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
import { FaPlus, FaEdit, FaTrash, FaStar, FaLightbulb } from "react-icons/fa";
import AppContext from "../provider/Context";

const SuggestManager = () => {
    const { suggest } = useContext(AppContext);
    const { suggests, fetchSuggests, createSuggest, updateSuggest, deleteSuggest } = suggest;

    const [search, setSearch] = useState("");
    const [formData, setFormData] = useState({ title: "", description: "", imageUrl: "", spotId: "" });
    const [editId, setEditId] = useState(null);
    const [message, setMessage] = useState("");
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        fetchSuggests();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editId) {
                await updateSuggest(editId, formData);
                setMessage("✅ Suggest updated successfully.");
            } else {
                await createSuggest(formData);
                setMessage("✅ Suggest created successfully.");
            }
            setFormData({ title: "", description: "", imageUrl: "", spotId: "" });
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
        if (window.confirm("Are you sure to delete this suggestion?")) {
            await deleteSuggest(id);
            setMessage("🗑️ Suggest deleted.");
        }
    };

    const filtered = suggests.filter(s => s.title.toLowerCase().includes(search.toLowerCase()));

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h3 className="mb-0"><FaLightbulb className="me-2 text-warning" />Suggest Manager</h3>
                <Button
                    variant="success"
                    onClick={() => {
                        setShowForm(!showForm);
                        setEditId(null);
                        setFormData({ title: "", description: "", imageUrl: "", spotId: "" });
                    }}
                >
                    {showForm ? "Cancel" : <><FaPlus className="me-1" /> Create New Suggest</>}
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
                                            placeholder="Title"
                                            value={formData.title}
                                            onChange={e => setFormData({ ...formData, title: e.target.value })}
                                        />
                                    </Col>
                                    <Col md={6}>
                                        <Form.Control
                                            placeholder="Description"
                                            value={formData.description}
                                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                                        />
                                    </Col>
                                    <Col md={6}>
                                        <Form.Control
                                            placeholder="Image URL"
                                            value={formData.imageUrl}
                                            onChange={e => setFormData({ ...formData, imageUrl: e.target.value })}
                                        />
                                    </Col>
                                    <Col md={6}>
                                        <Form.Control
                                            placeholder="Spot ID"
                                            value={formData.spotId}
                                            onChange={e => setFormData({ ...formData, spotId: e.target.value })}
                                        />
                                    </Col>
                                    <Col md="auto">
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
                    placeholder="Search suggests..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </InputGroup>

            <Table bordered hover responsive className="table-striped">
                <thead className="table-light">
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Image</th>
                        <th>Spot ID</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filtered.length > 0 ? filtered.map((item, i) => (
                        <tr key={item._id}>
                            <td>{i + 1}</td>
                            <td>{item.title}</td>
                            <td>{item.description}</td>
                            <td>
                                {Array.isArray(item.imageUrl) && item.imageUrl.length > 0 ? (
                                    <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
                                        {item.imageUrl.map((url, idx) => (
                                            <img
                                                key={idx}
                                                src={url}
                                                alt={`img-${idx}`}
                                                style={{ width: 50, height: 40, objectFit: "cover", borderRadius: 4 }}
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                }}
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    <span className="text-muted">No image</span>
                                )}
                            </td>
                            <td>{item.spotId}</td>
                            <td>
                                <Button variant="outline-info" size="sm" onClick={() => handleEdit(item)}><FaEdit /></Button>{" "}
                                <Button variant="outline-danger" size="sm" onClick={() => handleDelete(item._id)}><FaTrash /></Button>
                            </td>
                        </tr>
                    )) : (
                        <tr><td colSpan="6" className="text-center">No suggests found.</td></tr>
                    )}
                </tbody>
            </Table>
        </div>
    );
};

export default SuggestManager;