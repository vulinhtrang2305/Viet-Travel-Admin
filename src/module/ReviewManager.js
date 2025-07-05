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
import { FaPlus, FaEdit, FaTrash, FaStar } from "react-icons/fa";
import AppContext from "../provider/Context";

const ReviewManager = () => {
    const { review, spot } = useContext(AppContext);
    const { spots } = spot;
    const { reviews, fetchReviews, createReview, updateReview, deleteReview } =
        review;

    const [search, setSearch] = useState("");
    const [formData, setFormData] = useState({
        userId: "",
        spotId: "",
        rating: 5,
        comment: "",
        imageUrl: "",
    });
    const [editId, setEditId] = useState(null);
    const [message, setMessage] = useState("");
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        fetchReviews();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editId) {
                await updateReview(editId, formData);
                setMessage("✅ Review updated successfully.");
            } else {
                await createReview(formData);
                setMessage("✅ Review created successfully.");
            }
            setFormData({
                userId: "",
                spotId: "",
                rating: 5,
                comment: "",
                imageUrl: "",
            });
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
        if (window.confirm("Are you sure to delete this review?")) {
            await deleteReview(id);
            setMessage("🗑️ Review deleted.");
        }
    };

    const filtered = reviews.filter((r) =>
        r.comment.toLowerCase().includes(search.toLowerCase())
    );

    const getSpot = (spoId) => {
        return spot?.spots?.find((c) => c._id === spoId);
    };
    

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h3 className="mb-0">
                    <FaStar className="me-2 text-warning" />
                    Review Manager
                </h3>
                <Button
                    variant="success"
                    onClick={() => {
                        setShowForm(!showForm);
                        setEditId(null);
                        setFormData({
                            userId: "",
                            spotId: "",
                            rating: 5,
                            comment: "",
                            imageUrl: "",
                        });
                    }}
                >
                    {showForm ? (
                        "Cancel"
                    ) : (
                        <>
                            <FaPlus className="me-1" /> Create New Review
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
                                            placeholder="User ID"
                                            value={formData.userId}
                                            onChange={(e) =>
                                                setFormData({ ...formData, userId: e.target.value })
                                            }
                                        />
                                    </Col>
                                    <Col md={4}>
                                        <Form.Control
                                            placeholder="Spot ID"
                                            value={formData.spotId}
                                            onChange={(e) =>
                                                setFormData({ ...formData, spotId: e.target.value })
                                            }
                                        />
                                    </Col>
                                    <Col md={2}>
                                        <Form.Control
                                            type="number"
                                            placeholder="Rating"
                                            value={formData.rating}
                                            onChange={(e) =>
                                                setFormData({ ...formData, rating: e.target.value })
                                            }
                                            min={1}
                                            max={5}
                                        />
                                    </Col>
                                    <Col md={6}>
                                        <Form.Control
                                            placeholder="Comment"
                                            value={formData.comment}
                                            onChange={(e) =>
                                                setFormData({ ...formData, comment: e.target.value })
                                            }
                                        />
                                    </Col>
                                    <Col md={6}>
                                        <Form.Control
                                            placeholder="Image URL"
                                            value={formData.imageUrl}
                                            onChange={(e) =>
                                                setFormData({ ...formData, imageUrl: e.target.value })
                                            }
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
                    placeholder="Search reviews..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </InputGroup>

            <div className="border border-gray-200 rounded-4 p-3 shadow-sm bg-white mt-3">
                <Table responsive hover className="align-middle mb-0">
                    <thead className="table-light text-center">
                        <tr>
                            <th style={{ width: "50px" }}>#</th>
                            <th>User</th>
                            <th>Spot</th>
                            <th>Rating</th>
                            <th>Comment</th>
                            <th>Images</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.length > 0 ? (
                            filtered.map((item, i) => (
                                <tr key={item._id}>
                                    <td className="text-center fw-bold">{i + 1}</td>
                                    <td className="text-break">{item.userId}</td>
                                    <td className="text-break">{getSpot(item.spotId)?.name || 'N/A'}</td>
                                    <td className="text-center">
                                        <span className="badge bg-warning text-dark px-2 py-1 d-inline-flex align-items-center gap-1">
                                            ⭐ {item.rating}
                                        </span>
                                    </td>
                                    <td className="text-break" style={{ maxWidth: "300px" }}>
                                        {item.comment}
                                    </td>
                                    <td>
                                        {Array.isArray(item.imageUrl) && item.imageUrl.length > 0 ? (
                                            <div className="d-flex flex-wrap gap-1">
                                                {item.imageUrl.map((url, idx) => (
                                                    <img
                                                        key={idx}
                                                        src={url}
                                                        alt={`review-img-${idx}`}
                                                        style={{
                                                            width: 50,
                                                            height: 40,
                                                            objectFit: "cover",
                                                            borderRadius: 6,
                                                            border: "1px solid #ccc",
                                                        }}
                                                        onError={(e) => {
                                                            e.target.onerror = null;
                                                            e.target.src = "/fallback.jpg"; // ảnh fallback nếu lỗi
                                                        }}
                                                    />
                                                ))}
                                            </div>
                                        ) : (
                                            <span className="text-muted fst-italic">No image</span>
                                        )}
                                    </td>
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
                                <td colSpan="7" className="text-center text-muted py-4">
                                    No reviews found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default ReviewManager;
