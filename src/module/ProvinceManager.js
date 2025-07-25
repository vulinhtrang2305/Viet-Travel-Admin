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
import { FaPlus, FaEdit, FaTrash, FaMapMarkerAlt } from "react-icons/fa";
import AppContext from "../provider/Context";

const ProvinceManager = () => {
    const { province } = useContext(AppContext);
    const {
        provinces,
        fetchProvinces,
        createProvince,
        updateProvince,
        deleteProvince,
    } = province;

    const [search, setSearch] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        region: "",
        regionCode: ""
    });
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
            setFormData({ name: "", region: "", regionCode: "" });
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

    const filtered = provinces.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h3 className="mb-0">
                    <FaMapMarkerAlt className="me-2 text-success" />
                    Province Manager
                </h3>
                <Button
                    variant="success"
                    onClick={() => {
                        setShowForm(!showForm);
                        setEditId(null);
                        setFormData({ name: "", region: "", regionCode: "" });
                    }}
                >
                    {showForm ? (
                        "Cancel"
                    ) : (
                        <>
                            <FaPlus className="me-1" /> Create New Province
                        </>
                    )}
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
                                    <Col md={4}>
                                        <Form.Control
                                            placeholder="Province Name"
                                            value={formData.name}
                                            onChange={(e) =>
                                                setFormData({ ...formData, name: e.target.value })
                                            }
                                            required
                                        />
                                    </Col>
                                    <Col md={4}>
                                        <Form.Select
                                            value={formData.region}
                                            onChange={(e) =>
                                                setFormData({ ...formData, region: e.target.value })
                                            }
                                            required
                                        >
                                            <option value="">Select Region</option>
                                            <option value="Bắc">Bắc</option>
                                            <option value="Trung">Trung</option>
                                            <option value="Nam">Nam</option>
                                        </Form.Select>
                                    </Col>
                                    <Col md={3}>
                                        <Form.Select
                                            value={formData.regionCode}
                                            onChange={(e) =>
                                                setFormData({ ...formData, regionCode: e.target.value })
                                            }
                                            required
                                        >
                                            <option value="">Select Region Code</option>
                                            <option value="north">north</option>
                                            <option value="central">central</option>
                                            <option value="south">south</option>
                                        </Form.Select>
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
                    placeholder="Search provinces..."
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
                            <th>Region</th>
                            <th>Region Code</th>
                            <th style={{ width: "110px" }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.length > 0 ? (
                            filtered.map((item, i) => (
                                <tr key={item._id}>
                                    <td className="text-center fw-bold">{i + 1}</td>
                                    <td className="text-break text-dark text-center fw-medium">{item.name}</td>
                                    <td className="text-center">
                                        <span className="badge bg-info-subtle text-info rounded-pill px-2 py-1">
                                            {item.region || "—"}
                                        </span>
                                    </td>
                                    <td className="text-center text-muted">{item.regionCode || "—"}</td>
                                    <td className="text-center">
                                        <Button
                                            variant="outline-info"
                                            size="sm"
                                            onClick={() => handleEdit(item)}
                                            className="me-1"
                                        >
                                            <FaEdit />
                                        </Button>
                                        <Button
                                            variant="outline-danger"
                                            size="sm"
                                            onClick={() => handleDelete(item._id)}
                                        >
                                            <FaTrash />
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center text-muted py-4">
                                    No provinces found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default ProvinceManager;