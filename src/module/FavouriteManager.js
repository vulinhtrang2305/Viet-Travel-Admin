import React, { useContext, useEffect, useState } from "react";
import {
    Table,
    Form,
    Button,
    InputGroup,
    Row,
    Col,
    Card,
    Collapse,
    Alert,
} from "react-bootstrap";
import { FaHeart, FaPlus, FaTrash } from "react-icons/fa";
import AppContext from "../provider/Context";

const FavouriteManager = () => {
    const { favourite } = useContext(AppContext);
    const {
        favourites,
        fetchFavourites,
        fetchFavouritesByUser,
        addToFavourite,
        deleteFavourite,
    } = favourite;

    const [formData, setFormData] = useState({ userId: "", spotId: "" });
    const [message, setMessage] = useState("");
    const [search, setSearch] = useState("");
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        fetchFavourites();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addToFavourite(formData);
            setMessage("✅ Added to favourites.");
            setFormData({ userId: "", spotId: "" });
            setShowForm(false);
        } catch {
            setMessage("❌ Failed to add favourite.");
        }
    };

    const handleDelete = async (userId, spotId) => {
        if (window.confirm("Are you sure you want to remove this favourite?")) {
            await deleteFavourite(userId, spotId);
            setMessage("🗑️ Favourite removed.");
        }
    };

    const filtered = favourites.filter(
        (f) =>
            f.userId.includes(search) ||
            f.spotId.includes(search)
    );

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h3 className="mb-0">
                    <FaHeart className="me-2 text-danger" /> Favourite Manager
                </h3>
                <Button
                    variant="success"
                    onClick={() => {
                        setShowForm(!showForm);
                        setFormData({ userId: "", spotId: "" });
                    }}
                >
                    {showForm ? "Cancel" : <><FaPlus className="me-1" /> Add Favourite</>}
                </Button>
            </div>

            {message && (
                <Alert variant="info" dismissible onClose={() => setMessage("")}>
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
                                            placeholder="User ID"
                                            value={formData.userId}
                                            onChange={(e) =>
                                                setFormData({ ...formData, userId: e.target.value })
                                            }
                                            required
                                        />
                                    </Col>
                                    <Col md={6}>
                                        <Form.Control
                                            placeholder="Spot ID"
                                            value={formData.spotId}
                                            onChange={(e) =>
                                                setFormData({ ...formData, spotId: e.target.value })
                                            }
                                            required
                                        />
                                    </Col>
                                    <Col md="auto">
                                        <Button type="submit" variant="primary">
                                            Add
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
                    placeholder="Search by User or Spot ID..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </InputGroup>

            <Table bordered hover responsive className="table-striped">
                <thead className="table-light">
                    <tr>
                        <th>#</th>
                        <th>User ID</th>
                        <th>Spot ID</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filtered.length > 0 ? (
                        filtered.map((item, idx) => (
                            <tr key={`${item.userId}-${item.spotId}`}>
                                <td>{idx + 1}</td>
                                <td>{item.userId}</td>
                                <td>{item.spotId}</td>
                                <td>
                                    <Button
                                        variant="outline-danger"
                                        size="sm"
                                        onClick={() => handleDelete(item.userId, item.spotId)}
                                    >
                                        <FaTrash />
                                    </Button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="text-center">
                                No favourites found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    );
};

export default FavouriteManager;
