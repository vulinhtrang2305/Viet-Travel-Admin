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
import AppContext from "../provider/Context";

const CategoryManager = () => {
    const { category } = useContext(AppContext);
    const {
        categories,
        fetchCategories,
        createCategory,
        updateCategory,
        deleteCategory,
    } = category;

    const [search, setSearch] = useState("");
    const [name, setName] = useState("");
    const [editId, setEditId] = useState(null);
    const [message, setMessage] = useState("");
    const [showForm, setShowForm] = useState(false); // Toggle create form

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editId) {
                await updateCategory(editId, name);
                setMessage("✅ Category updated successfully.");
            } else {
                await createCategory(name);
                setMessage("✅ Category created successfully.");
            }
            setName("");
            setEditId(null);
            setShowForm(false);
        } catch (err) {
            setMessage("❌ Something went wrong.");
        }
    };

    const handleEdit = (cat) => {
        setEditId(cat._id);
        setName(cat.name);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure to delete this category?")) {
            await deleteCategory(id);
            setMessage("🗑️ Category deleted.");
        }
    };

    const filteredCategories = categories.filter((cat) =>
        cat.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h3 className="mb-0">📁 Category Manager</h3>
                <Button
                    variant="success"
                    onClick={() => {
                        setShowForm(!showForm);
                        setEditId(null);
                        setName("");
                    }}
                >
                    {showForm ? "Cancel" : "➕ Create New Category"}
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
                                <Row className="align-items-center">
                                    <Col md={6}>
                                        <Form.Control
                                            type="text"
                                            value={name}
                                            placeholder="Enter category name"
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </Col>
                                    <Col md="auto">
                                        <Button type="submit" variant="primary">
                                            {editId ? "Update" : "Create"}
                                        </Button>
                                        {editId && (
                                            <Button
                                                variant="secondary"
                                                className="ms-2"
                                                onClick={() => {
                                                    setEditId(null);
                                                    setName("");
                                                    setShowForm(false);
                                                }}
                                            >
                                                Cancel
                                            </Button>
                                        )}
                                    </Col>
                                </Row>
                            </Form>
                        </Card.Body>
                    </Card>
                </div>
            </Collapse>

            <InputGroup className="mb-3">
                <Form.Control
                    placeholder="Search categories..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </InputGroup>

            <div className="border border-gray-200 rounded-4 p-3 shadow-sm bg-white mt-3">
                <Table responsive hover className="align-middle mb-0">
                    <thead className="table-light text-center">
                        <tr>
                            <th style={{ width: "50px" }}>#</th>
                            <th className="text-center">Name</th>
                            <th style={{ width: "160px" }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCategories.length > 0 ? (
                            filteredCategories.map((cat, index) => (
                                <tr key={cat._id}>
                                    <td className="text-center fw-bold">{index + 1}</td>
                                    <td className="text-center text-dark fw-medium">{cat.name}</td>
                                    <td className="text-center">
                                        <Button
                                            variant="outline-info"
                                            size="sm"
                                            className="me-2"
                                            onClick={() => handleEdit(cat)}
                                        >
                                            <i className="bi bi-pencil-square me-1"></i>Edit
                                        </Button>
                                        <Button
                                            variant="outline-danger"
                                            size="sm"
                                            onClick={() => handleDelete(cat._id)}
                                        >
                                            <i className="bi bi-trash3 me-1"></i>Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="text-center text-muted py-4">
                                    No categories found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default CategoryManager;
