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
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import AppContext from "../provider/Context";

const SpotManager = () => {
    const { spot, province, category } = useContext(AppContext);
    const { spots, fetchSpots, createSpot, updateSpot, deleteSpot } = spot;
    const { provinces, fetchProvinces } = province;
    const { categories, fetchCategories } = category;

    const [search, setSearch] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        provinceId: "",
        region: "",
        type: "",
        imageUrl: [],
        description: "",
        location: { lat: 0, lng: 0 },
        isFavorite: false,
        regionGroup: "",
        regionCode: "",
        categoryId: "",
    });
    const [editId, setEditId] = useState(null);
    const [message, setMessage] = useState("");
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        fetchSpots();
        fetchProvinces();
        fetchCategories();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editId) {
                await updateSpot(editId, formData);
                setMessage("✅ Spot updated successfully.");
            } else {
                await createSpot(formData);
                setMessage("✅ Spot created successfully.");
            }
            setFormData({
                name: "",
                provinceId: "",
                region: "",
                type: "",
                imageUrl: [],
                description: "",
                location: { lat: 0, lng: 0 },
                isFavorite: false,
                regionGroup: "",
                regionCode: "",
                categoryId: "",
            });
            setEditId(null);
            setShowForm(false);
        } catch {
            setMessage("❌ Something went wrong.");
        }
    };

    const handleEdit = (spot) => {
        setEditId(spot._id);
        setFormData(spot);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure to delete this spot?")) {
            await deleteSpot(id);
            setMessage("🗑️ Spot deleted.");
        }
    };

    const filteredSpots = spots.filter((s) =>
        s.name.toLowerCase().includes(search.toLowerCase())
    );

    const getProvince = (provId) => {
        return province?.provinces?.find((p) => p._id === provId);
    };

    const getCategory = (catId) => {
        return category?.categories?.find((c) => c._id === catId);
    };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h3 className="mb-0">📍 Spot Manager</h3>
                <Button
                    variant="success"
                    onClick={() => {
                        setShowForm(!showForm);
                        setEditId(null);
                        setFormData({
                            name: "",
                            provinceId: "",
                            region: "",
                            type: "",
                            imageUrl: [],
                            description: "",
                            location: { lat: 0, lng: 0 },
                            isFavorite: false,
                            regionGroup: "",
                            regionCode: "",
                            categoryId: "",
                        });
                    }}
                >
                    {showForm ? (
                        "Cancel"
                    ) : (
                        <>
                            <FaPlus /> Create New Spot
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
                                            placeholder="Name"
                                            value={formData.name}
                                            onChange={(e) =>
                                                setFormData({ ...formData, name: e.target.value })
                                            }
                                        />
                                    </Col>
                                    <Col md={6}>
                                        <Form.Select
                                            value={formData.provinceId}
                                            onChange={(e) =>
                                                setFormData({ ...formData, provinceId: e.target.value })
                                            }
                                        >
                                            <option value="">Select Province</option>
                                            {provinces.map((p) => (
                                                <option key={p._id} value={p._id}>
                                                    {p.name}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Control
                                            placeholder="Region"
                                            value={formData.region}
                                            onChange={(e) =>
                                                setFormData({ ...formData, region: e.target.value })
                                            }
                                        />
                                    </Col>
                                    <Col md={6}>
                                        <Form.Control
                                            placeholder="Type"
                                            value={formData.type}
                                            onChange={(e) =>
                                                setFormData({ ...formData, type: e.target.value })
                                            }
                                        />
                                    </Col>
                                    <Col md={6}>
                                        <Form.Control
                                            placeholder="Image URLs (comma-separated)"
                                            value={formData.imageUrl.join(",")}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    imageUrl: e.target.value.split(","),
                                                })
                                            }
                                        />
                                    </Col>
                                    <Col md={6}>
                                        <Form.Control
                                            placeholder="Description"
                                            value={formData.description}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    description: e.target.value,
                                                })
                                            }
                                        />
                                    </Col>
                                    <Col md={3}>
                                        <Form.Control
                                            placeholder="Latitude"
                                            type="number"
                                            value={formData.location.lat}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    location: {
                                                        ...formData.location,
                                                        lat: parseFloat(e.target.value),
                                                    },
                                                })
                                            }
                                        />
                                    </Col>
                                    <Col md={3}>
                                        <Form.Control
                                            placeholder="Longitude"
                                            type="number"
                                            value={formData.location.lng}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    location: {
                                                        ...formData.location,
                                                        lng: parseFloat(e.target.value),
                                                    },
                                                })
                                            }
                                        />
                                    </Col>
                                    <Col md={3}>
                                        <Form.Control
                                            placeholder="Region Group"
                                            value={formData.regionGroup}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    regionGroup: e.target.value,
                                                })
                                            }
                                        />
                                    </Col>
                                    <Col md={3}>
                                        <Form.Control
                                            placeholder="Region Code"
                                            value={formData.regionCode}
                                            onChange={(e) =>
                                                setFormData({ ...formData, regionCode: e.target.value })
                                            }
                                        />
                                    </Col>
                                    <Col md={6}>
                                        <Form.Select
                                            value={formData.categoryId}
                                            onChange={(e) =>
                                                setFormData({ ...formData, categoryId: e.target.value })
                                            }
                                        >
                                            <option value="">Select Category</option>
                                            {categories.map((c) => (
                                                <option key={c._id} value={c._id}>
                                                    {c.name}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </Col>
                                    <Col md={3}>
                                        <Form.Check
                                            type="checkbox"
                                            label="Favorite"
                                            checked={formData.isFavorite}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    isFavorite: e.target.checked,
                                                })
                                            }
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
                    placeholder="Search spots..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </InputGroup>
{/* 
            <Table bordered hover responsive className="table-striped shadow-sm rounded overflow-hidden">
                <thead className="table-light text-center align-middle">
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Province</th>
                        <th>Region</th>
                        <th>Type</th>
                        <th>❤️</th>
                        <th>Images</th>
                        <th>Group</th>
                        <th>Code</th>
                        <th>Location</th>
                        <th>Category</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredSpots.length > 0 ? (
                        filteredSpots.map((s, i) => (
                            <tr key={s._id}>
                                <td className="text-center">{i + 1}</td>
                                <td className="fw-semibold">{s.name}</td>
                                <td>{getProvince(s?.provinceId)?.name}</td>
                                <td>
                                    <span className="badge bg-info-subtle text-info rounded-pill px-2 py-1">
                                        {s.region || '—'}
                                    </span>
                                </td>
                                <td>
                                    <span className="badge bg-secondary-subtle text-secondary rounded-pill px-2 py-1">
                                        {s.type || '—'}
                                    </span>
                                </td>
                                <td className="text-center">
                                    {s.isFavorite ? (
                                        <span className="badge bg-danger-subtle text-danger rounded-pill px-2 py-1">
                                            ❤️
                                        </span>
                                    ) : (
                                        <span className="text-muted">—</span>
                                    )}
                                </td>
                                <td>
                                    {Array.isArray(s.imageUrl) && s.imageUrl.length > 0 ? (
                                        <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
                                            {s.imageUrl.slice(0, 3).map((url, idx) => (
                                                <img
                                                    key={idx}
                                                    src={url}
                                                    alt={`img-${idx}`}
                                                    style={{
                                                        width: 50,
                                                        height: 40,
                                                        objectFit: "cover",
                                                        borderRadius: "6px",
                                                        boxShadow: "0 0 3px rgba(0,0,0,0.1)",
                                                    }}
                                                    onError={(e) => (e.target.onerror = null)}
                                                />
                                            ))}
                                            {s.imageUrl.length > 3 && (
                                                <span className="text-muted small">+{s.imageUrl.length - 3}</span>
                                            )}
                                        </div>
                                    ) : (
                                        <span className="text-muted">No image</span>
                                    )}
                                </td>
                                <td className="text-center">
                                    <span className="badge bg-light text-dark rounded-pill px-2 py-1">
                                        {s.regionGroup || '—'}
                                    </span>
                                </td>
                                <td className="text-center text-muted">{s.regionCode || '—'}</td>
                                <td>
                                    {s.location && typeof s.location === "object"
                                        ? `${s.location.lat}, ${s.location.lng}`
                                        : "N/A"}
                                </td>
                                <td>{getCategory(s.categoryId)?.name || "—"}</td>
                                <td
                                    style={{
                                        maxWidth: 200,
                                        whiteSpace: "nowrap",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                    }}
                                    title={s.description}
                                >
                                    {s.description || "—"}
                                </td>
                                <td className="text-center">
                                    <Button
                                        variant="outline-info"
                                        size="sm"
                                        onClick={() => handleEdit(s)}
                                        className="me-1"
                                    >
                                        <FaEdit />
                                    </Button>
                                    <Button
                                        variant="outline-danger"
                                        size="sm"
                                        onClick={() => handleDelete(s._id)}
                                    >
                                        <FaTrash />
                                    </Button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="13" className="text-center text-muted">
                                No spots found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table> */}

            <div className="border border-gray-200 rounded-4 p-3 shadow-sm bg-white mt-3">
                <Table responsive hover className="align-middle mb-0">
                    <thead className="table-light text-center align-middle">
                        <tr>
                            <th style={{ width: 50 }}>#</th>
                            <th>Name</th>
                            <th>Province</th>
                            <th>Region</th>
                            <th>Type</th>
                            <th>❤️</th>
                            <th>Images</th>
                            <th>Group</th>
                            <th>Code</th>
                            <th>Location</th>
                            <th>Category</th>
                            <th>Description</th>
                            <th style={{ width: 110 }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredSpots.length > 0 ? (
                            filteredSpots.map((s, i) => (
                                <tr key={s._id}>
                                    <td className="text-center fw-bold">{i + 1}</td>
                                    <td className="fw-semibold text-break">{s.name}</td>
                                    <td>{getProvince(s?.provinceId)?.name || "—"}</td>
                                    <td className="text-center">
                                        <span className="badge bg-info-subtle text-info rounded-pill px-2 py-1">
                                            {s.region || "—"}
                                        </span>
                                    </td>
                                    <td className="text-center">
                                        <span className="badge bg-secondary-subtle text-secondary rounded-pill px-2 py-1">
                                            {s.type || "—"}
                                        </span>
                                    </td>
                                    <td className="text-center">
                                        {s.isFavorite ? (
                                            <span className="badge bg-danger-subtle text-danger rounded-pill px-2 py-1">❤️</span>
                                        ) : (
                                            <span className="text-muted">—</span>
                                        )}
                                    </td>
                                    <td>
                                        {Array.isArray(s.imageUrl) && s.imageUrl.length > 0 ? (
                                            <div className="d-flex flex-wrap gap-1">
                                                {s.imageUrl.slice(0, 4).map((url, idx) => (
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
                                                {s.imageUrl.length > 4 && (
                                                    <span className="text-muted small">+{s.imageUrl.length - 4}</span>
                                                )}
                                            </div>
                                        ) : (
                                            <span className="text-muted fst-italic">No image</span>
                                        )}
                                    </td>
                                    <td className="text-center">
                                        <span className="badge bg-light text-dark rounded-pill px-2 py-1">
                                            {s.regionGroup || "—"}
                                        </span>
                                    </td>
                                    <td className="text-center text-muted">{s.regionCode || "—"}</td>
                                    <td>
                                        {s.location && typeof s.location === "object"
                                            ? `${s.location.lat}, ${s.location.lng}`
                                            : "N/A"}
                                    </td>
                                    <td>{getCategory(s.categoryId)?.name || "—"}</td>
                                    <td
                                        style={{
                                            maxWidth: 200,
                                            whiteSpace: "nowrap",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                        }}
                                        title={s.description}
                                    >
                                        {s.description || "—"}
                                    </td>
                                    <td className="text-center">
                                        <Button
                                            variant="outline-info"
                                            size="sm"
                                            onClick={() => handleEdit(s)}
                                            className="me-2"
                                        >
                                            <FaEdit />
                                        </Button>
                                        <Button
                                            variant="outline-danger"
                                            size="sm"
                                            onClick={() => handleDelete(s._id)}
                                        >
                                            <FaTrash />
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={13} className="text-center text-muted py-4">
                                    No spots found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>

        </div>
    );
};

export default SpotManager;
