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
import { FaPlus, FaEdit, FaTrash, FaLightbulb } from "react-icons/fa";
import AppContext from "../provider/Context";
import { uploadImage } from "../components/UploadImage";

const SuggestManager = () => {
    const { suggest, spot } = useContext(AppContext);
    const { spots, fetchSpots } = spot;
    const {
        suggests,
        fetchSuggests,
        createSuggest,
        updateSuggest,
        deleteSuggest,
    } = suggest;

    const [search, setSearch] = useState("");
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        imageUrl: [],
        spotId: "",
    });
    const [editId, setEditId] = useState(null);
    const [message, setMessage] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        fetchSuggests();
        fetchSpots();
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
            setFormData({ title: "", description: "", imageUrl: [], spotId: "" });
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

    const filtered = suggests.filter((s) =>
        s.title.toLowerCase().includes(search.toLowerCase())
    );

    const getSpotNames = (spotIds) => {
        if (!Array.isArray(spotIds)) return "N/A";
        return spotIds
            .map((id) => spots.find((s) => s._id === id)?.name)
            .filter(Boolean)
            .join(", ");
    };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h3 className="mb-0">
                    <FaLightbulb className="me-2 text-warning" />
                    Suggest Manager
                </h3>
                <Button
                    variant="success"
                    onClick={() => {
                        setShowForm(!showForm);
                        setEditId(null);
                        setFormData({
                            title: "",
                            description: "",
                            imageUrl: [],
                            spotId: "",
                        });
                    }}
                >
                    {showForm ? (
                        "Cancel"
                    ) : (
                        <>
                            <FaPlus className="me-1" /> Create New Suggest
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
                                    <Col md={6}>
                                        <Form.Control
                                            placeholder="Title"
                                            value={formData.title}
                                            onChange={(e) =>
                                                setFormData({ ...formData, title: e.target.value })
                                            }
                                        />
                                    </Col>
                                    <Col md={6}>
                                        <Form.Control
                                            placeholder="Description"
                                            value={formData.description}
                                            onChange={(e) =>
                                                setFormData({ ...formData, description: e.target.value })
                                            }
                                        />
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label>Upload Image</Form.Label>
                                            <Form.Control
                                                type="file"
                                                accept="image/*"
                                                onChange={async (e) => {
                                                    const file = e.target.files[0];
                                                    if (!file) return;
                                                    setUploading(true);
                                                    try {
                                                        const url = await uploadImage(file);
                                                        setFormData((prev) => ({
                                                            ...prev,
                                                            imageUrl: [...prev.imageUrl, url],
                                                        }));
                                                        setMessage("✅ Image uploaded.");
                                                    } catch (err) {
                                                        console.error("Upload error:", err);
                                                        setMessage("❌ Upload failed.");
                                                    } finally {
                                                        setUploading(false);
                                                    }
                                                }}
                                            />
                                            {uploading && <div className="small text-muted mt-1">Uploading...</div>}
                                        </Form.Group>

                                        {formData.imageUrl.length > 0 && (
                                            <div className="d-flex flex-wrap gap-2 mt-2">
                                                {formData.imageUrl.map((url, idx) => (
                                                    <div key={idx} style={{ position: "relative" }}>
                                                        <img
                                                            src={url}
                                                            alt={`preview-${idx}`}
                                                            style={{ width: 60, height: 50, objectFit: "cover", borderRadius: 4 }}
                                                        />
                                                        <Button
                                                            size="sm"
                                                            variant="danger"
                                                            style={{
                                                                position: "absolute",
                                                                top: -5,
                                                                right: -5,
                                                                borderRadius: "50%",
                                                                padding: "0 6px",
                                                            }}
                                                            onClick={() =>
                                                                setFormData((prev) => ({
                                                                    ...prev,
                                                                    imageUrl: prev.imageUrl.filter((_, i) => i !== idx),
                                                                }))
                                                            }
                                                        >
                                                            ×
                                                        </Button>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </Col>
                                    <Col md={6}>
                                        <Form.Select
                                            value={formData.spotId}
                                            onChange={(e) =>
                                                setFormData({ ...formData, spotId: e.target.value })
                                            }
                                        >
                                            <option value="">Select Spot</option>
                                            {spots.map((s) => (
                                                <option key={s._id} value={s._id}>
                                                    {s.name}
                                                </option>
                                            ))}
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
                    placeholder="Search suggests..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </InputGroup>

            <div className="border border-gray-200 rounded-4 p-3 shadow-sm bg-white mt-3">
                <Table responsive hover className="align-middle mb-0">
                    <thead className="table-light text-center">
                        <tr>
                            <th style={{ width: "50px" }}>#</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Images</th>
                            <th>Spot</th>
                            <th style={{ width: "110px" }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.length > 0 ? (
                            filtered.map((item, i) => (
                                <tr key={item._id}>
                                    <td className="text-center fw-bold">{i + 1}</td>
                                    <td className="text-break text-dark">{item.title}</td>
                                    <td className="text-break text-muted" style={{ maxWidth: "300px" }}>
                                        {item.description}
                                    </td>
                                    <td>
                                        {Array.isArray(item.imageUrl) && item.imageUrl.length > 0 ? (
                                            <div className="d-flex flex-wrap gap-1">
                                                {item.imageUrl.map((url, idx) => (
                                                    <img
                                                        key={idx}
                                                        src={url}
                                                        alt={`img-${idx}`}
                                                        style={{
                                                            width: 50,
                                                            height: 40,
                                                            objectFit: "cover",
                                                            borderRadius: "6px",
                                                            border: "1px solid #ccc",
                                                        }}
                                                        onError={(e) => {
                                                            e.target.onerror = null;
                                                            e.target.src = "/fallback.jpg";
                                                        }}
                                                    />
                                                ))}
                                            </div>
                                        ) : (
                                            <span className="text-muted fst-italic">No image</span>
                                        )}
                                    </td>
                                    <td className="text-break">{getSpotNames(item.spotId)}</td>
                                    <td className="text-center">
                                        <Button
                                            variant="outline-info"
                                            size="sm"
                                            onClick={() => handleEdit(item)}
                                            className="me-2"
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
                                <td colSpan="6" className="text-center text-muted py-4">
                                    No suggests found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default SuggestManager;