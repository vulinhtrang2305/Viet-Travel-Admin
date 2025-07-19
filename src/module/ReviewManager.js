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
// import { FaPlus, FaEdit, FaTrash, FaStar } from "react-icons/fa";
// import AppContext from "../provider/Context";

// const ReviewManager = () => {
//     const { review, spot, userFind } = useContext(AppContext);
//     const { users, fetchUsers } = userFind;
//     const { spots } = spot;
//     const { reviews, fetchReviews, createReview, updateReview, deleteReview } =
//         review;

//     const [search, setSearch] = useState("");
//     const [formData, setFormData] = useState({
//         userId: "",
//         spotId: "",
//         rating: 5,
//         comment: "",
//         imageUrl: "",
//     });
//     const [editId, setEditId] = useState(null);
//     const [message, setMessage] = useState("");
//     const [showForm, setShowForm] = useState(false);

//     useEffect(() => {
//         fetchReviews();
//         fetchUsers();
//     }, []);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             if (editId) {
//                 await updateReview(editId, formData);
//                 setMessage("✅ Review updated successfully.");
//             } else {
//                 await createReview(formData);
//                 setMessage("✅ Review created successfully.");
//             }
//             setFormData({
//                 userId: "",
//                 spotId: "",
//                 rating: 5,
//                 comment: "",
//                 imageUrl: "",
//             });
//             setEditId(null);
//             setShowForm(false);
//         } catch {
//             setMessage("❌ Something went wrong.");
//         }
//     };

//     const handleEdit = (item) => {
//         setEditId(item._id);
//         setFormData(item);
//         setShowForm(true);
//     };

//     const handleDelete = async (id) => {
//         if (window.confirm("Are you sure to delete this review?")) {
//             await deleteReview(id);
//             setMessage("🗑️ Review deleted.");
//         }
//     };

//     const filtered = reviews.filter((r) =>
//         r.comment.toLowerCase().includes(search.toLowerCase())
//     );

//     const getSpot = (spoId) => {
//         return spot?.spots?.find((c) => c._id === spoId);
//     };
    
//     const getUserName = (userId) => {
//         const found = users.find((u) => u._id === userId);
//         return found?.username || userId;
//     };    

//     return (
//         <div className="container mt-4">
//             <div className="d-flex justify-content-between align-items-center mb-3">
//                 <h3 className="mb-0">
//                     <FaStar className="me-2 text-warning" />
//                     Review Manager
//                 </h3>
//                 <Button
//                     variant="success"
//                     onClick={() => {
//                         setShowForm(!showForm);
//                         setEditId(null);
//                         setFormData({
//                             userId: "",
//                             spotId: "",
//                             rating: 5,
//                             comment: "",
//                             imageUrl: "",
//                         });
//                     }}
//                 >
//                     {showForm ? (
//                         "Cancel"
//                     ) : (
//                         <>
//                             <FaPlus className="me-1" /> Create New Review
//                         </>
//                     )}
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
//                                     <Col md={4}>
//                                         <Form.Control
//                                             placeholder="User ID"
//                                             value={formData.userId}
//                                             onChange={(e) =>
//                                                 setFormData({ ...formData, userId: e.target.value })
//                                             }
//                                         />
//                                     </Col>
//                                     <Col md={4}>
//                                         <Form.Control
//                                             placeholder="Spot ID"
//                                             value={formData.spotId}
//                                             onChange={(e) =>
//                                                 setFormData({ ...formData, spotId: e.target.value })
//                                             }
//                                         />
//                                     </Col>
//                                     <Col md={2}>
//                                         <Form.Control
//                                             type="number"
//                                             placeholder="Rating"
//                                             value={formData.rating}
//                                             onChange={(e) =>
//                                                 setFormData({ ...formData, rating: e.target.value })
//                                             }
//                                             min={1}
//                                             max={5}
//                                         />
//                                     </Col>
//                                     <Col md={6}>
//                                         <Form.Control
//                                             placeholder="Comment"
//                                             value={formData.comment}
//                                             onChange={(e) =>
//                                                 setFormData({ ...formData, comment: e.target.value })
//                                             }
//                                         />
//                                     </Col>
//                                     <Col md={6}>
//                                         <Form.Control
//                                             placeholder="Image URL"
//                                             value={formData.imageUrl}
//                                             onChange={(e) =>
//                                                 setFormData({ ...formData, imageUrl: e.target.value })
//                                             }
//                                         />
//                                     </Col>
//                                     <Col md="auto">
//                                         <Button type="submit" variant="primary">
//                                             {editId ? "Update" : "Create"}
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
//                     placeholder="Search reviews..."
//                     value={search}
//                     onChange={(e) => setSearch(e.target.value)}
//                 />
//             </InputGroup>

//             <div className="border border-gray-200 rounded-4 p-3 shadow-sm bg-white mt-3">
//                 <Table responsive hover className="align-middle mb-0">
//                     <thead className="table-light text-center">
//                         <tr>
//                             <th style={{ width: "50px" }}>#</th>
//                             <th>User</th>
//                             <th>Spot</th>
//                             <th>Rating</th>
//                             <th>Comment</th>
//                             <th>Images</th>
//                             <th>Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {filtered.length > 0 ? (
//                             filtered.map((item, i) => (
//                                 <tr key={item._id}>
//                                     <td className="text-center fw-bold">{i + 1}</td>
//                                     <td className="text-center">{getUserName(item.userId)}</td>
//                                     <td className="text-break">{getSpot(item.spotId)?.name || 'N/A'}</td>
//                                     <td className="text-center">
//                                         <span className="badge bg-warning text-dark px-2 py-1 d-inline-flex align-items-center gap-1">
//                                             ⭐ {item.rating}
//                                         </span>
//                                     </td>
//                                     <td className="text-break" style={{ maxWidth: "300px" }}>
//                                         {item.comment}
//                                     </td>
//                                     <td>
//                                         {Array.isArray(item.imageUrl) && item.imageUrl.length > 0 ? (
//                                             <div className="d-flex flex-wrap gap-1">
//                                                 {item.imageUrl.map((url, idx) => (
//                                                     <img
//                                                         key={idx}
//                                                         src={url}
//                                                         alt={`review-img-${idx}`}
//                                                         style={{
//                                                             width: 50,
//                                                             height: 40,
//                                                             objectFit: "cover",
//                                                             borderRadius: 6,
//                                                             border: "1px solid #ccc",
//                                                         }}
//                                                         onError={(e) => {
//                                                             e.target.onerror = null;
//                                                             e.target.src = "/fallback.jpg"; // ảnh fallback nếu lỗi
//                                                         }}
//                                                     />
//                                                 ))}
//                                             </div>
//                                         ) : (
//                                             <span className="text-muted fst-italic">No image</span>
//                                         )}
//                                     </td>
//                                     <td className="text-center">
//                                         <Button
//                                             variant="outline-info"
//                                             size="sm"
//                                             onClick={() => handleEdit(item)}
//                                             className="me-2"
//                                         >
//                                             <FaEdit />
//                                         </Button>
//                                         <Button
//                                             variant="outline-danger"
//                                             size="sm"
//                                             onClick={() => handleDelete(item._id)}
//                                         >
//                                             <FaTrash />
//                                         </Button>
//                                     </td>
//                                 </tr>
//                             ))
//                         ) : (
//                             <tr>
//                                 <td colSpan="7" className="text-center text-muted py-4">
//                                     No reviews found.
//                                 </td>
//                             </tr>
//                         )}
//                     </tbody>
//                 </Table>
//             </div>
//         </div>
//     );
// };

// export default ReviewManager;


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
// import { FaPlus, FaEdit, FaTrash, FaStar } from "react-icons/fa";
// import AppContext from "../provider/Context";
// import { uploadImage } from "../components/UploadImage";

// const ReviewManager = () => {
//     const { review, spot, userFind } = useContext(AppContext);
//     const { users, fetchUsers } = userFind;
//     const { spots, fetchSpots } = spot;
//     const { reviews, fetchReviews, createReview, updateReview, deleteReview } = review;

//     const [search, setSearch] = useState("");
//     const [formData, setFormData] = useState({
//         userId: "",
//         spotId: "",
//         rating: 5,
//         comment: "",
//         imageUrl: [],
//     });
//     const [editId, setEditId] = useState(null);
//     const [message, setMessage] = useState("");
//     const [showForm, setShowForm] = useState(false);
//     const [uploading, setUploading] = useState(false);

//     useEffect(() => {
//         fetchReviews();
//         fetchUsers();
//         fetchSpots();
//     }, []);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             if (editId) {
//                 await updateReview(editId, formData);
//                 setMessage("✅ Review updated successfully.");
//             } else {
//                 await createReview(formData);
//                 setMessage("✅ Review created successfully.");
//             }
//             setFormData({
//                 userId: "",
//                 spotId: "",
//                 rating: 5,
//                 comment: "",
//                 imageUrl: [],
//             });
//             setEditId(null);
//             setShowForm(false);
//         } catch {
//             setMessage("❌ Something went wrong.");
//         }
//     };

//     const handleEdit = (item) => {
//         setEditId(item._id);
//         setFormData(item);
//         setShowForm(true);
//     };

//     const handleDelete = async (id) => {
//         if (window.confirm("Are you sure to delete this review?")) {
//             await deleteReview(id);
//             setMessage("🗑️ Review deleted.");
//         }
//     };

//     const filtered = reviews.filter((r) =>
//         r.comment.toLowerCase().includes(search.toLowerCase())
//     );

//     const getSpot = (spoId) => {
//         return spot?.spots?.find((c) => c._id === spoId);
//     };

//     const getUserName = (userId) => {
//         const found = users.find((u) => u._id === userId);
//         return found?.username || userId;
//     };

//     return (
//         <div className="container mt-4">
//             <div className="d-flex justify-content-between align-items-center mb-3">
//                 <h3 className="mb-0">
//                     <FaStar className="me-2 text-warning" />
//                     Review Manager
//                 </h3>
//                 <Button
//                     variant="success"
//                     onClick={() => {
//                         setShowForm(!showForm);
//                         setEditId(null);
//                         setFormData({
//                             userId: "",
//                             spotId: "",
//                             rating: 5,
//                             comment: "",
//                             imageUrl: [],
//                         });
//                     }}
//                 >
//                     {showForm ? (
//                         "Cancel"
//                     ) : (
//                         <>
//                             <FaPlus className="me-1" /> Create New Review
//                         </>
//                     )}
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
//                                     <Col md={4}>
//                                         <Form.Select
//                                             value={formData.userId}
//                                             onChange={(e) =>
//                                                 setFormData({ ...formData, userId: e.target.value })
//                                             }
//                                         >
//                                             <option value="">Select User</option>
//                                             {users.map((u) => (
//                                                 <option key={u._id} value={u._id}>
//                                                     {u.username}
//                                                 </option>
//                                             ))}
//                                         </Form.Select>
//                                     </Col>
//                                     <Col md={4}>
//                                         <Form.Select
//                                             value={formData.spotId}
//                                             onChange={(e) =>
//                                                 setFormData({ ...formData, spotId: e.target.value })
//                                             }
//                                         >
//                                             <option value="">Select Spot</option>
//                                             {spots.map((s) => (
//                                                 <option key={s._id} value={s._id}>
//                                                     {s.name}
//                                                 </option>
//                                             ))}
//                                         </Form.Select>
//                                     </Col>
//                                     <Col md={2}>
//                                         <Form.Control
//                                             type="number"
//                                             placeholder="Rating"
//                                             value={formData.rating}
//                                             onChange={(e) =>
//                                                 setFormData({ ...formData, rating: e.target.value })
//                                             }
//                                             min={1}
//                                             max={5}
//                                         />
//                                     </Col>
//                                     <Col md={6}>
//                                         <Form.Control
//                                             placeholder="Comment"
//                                             value={formData.comment}
//                                             onChange={(e) =>
//                                                 setFormData({ ...formData, comment: e.target.value })
//                                             }
//                                         />
//                                     </Col>
//                                     <Col md={6}>
//                                         <Form.Group>
//                                             <Form.Label>Upload Image</Form.Label>
//                                             <Form.Control
//                                                 type="file"
//                                                 accept="image/*"
//                                                 onChange={async (e) => {
//                                                     const file = e.target.files[0];
//                                                     if (!file) return;
//                                                     setUploading(true);
//                                                     try {
//                                                         const url = await uploadImage(file);
//                                                         setFormData((prev) => ({
//                                                             ...prev,
//                                                             imageUrl: [...prev.imageUrl, url],
//                                                         }));
//                                                         setMessage("✅ Image uploaded.");
//                                                     } catch (err) {
//                                                         console.error("Upload error:", err);
//                                                         setMessage("❌ Upload failed.");
//                                                     } finally {
//                                                         setUploading(false);
//                                                     }
//                                                 }}
//                                             />
//                                             {uploading && <div className="small text-muted mt-1">Uploading...</div>}
//                                         </Form.Group>

//                                         {formData.imageUrl.length > 0 && (
//                                             <div className="d-flex flex-wrap gap-2 mt-2">
//                                                 {formData.imageUrl.map((url, idx) => (
//                                                     <div key={idx} style={{ position: "relative" }}>
//                                                         <img
//                                                             src={url}
//                                                             alt={`preview-${idx}`}
//                                                             style={{ width: 60, height: 50, objectFit: "cover", borderRadius: 4 }}
//                                                         />
//                                                         <Button
//                                                             size="sm"
//                                                             variant="danger"
//                                                             style={{
//                                                                 position: "absolute",
//                                                                 top: -5,
//                                                                 right: -5,
//                                                                 borderRadius: "50%",
//                                                                 padding: "0 6px",
//                                                             }}
//                                                             onClick={() =>
//                                                                 setFormData((prev) => ({
//                                                                     ...prev,
//                                                                     imageUrl: prev.imageUrl.filter((_, i) => i !== idx),
//                                                                 }))
//                                                             }
//                                                         >
//                                                             ×
//                                                         </Button>
//                                                     </div>
//                                                 ))}
//                                             </div>
//                                         )}
//                                     </Col>
//                                     <Col md="auto">
//                                         <Button type="submit" variant="primary">
//                                             {editId ? "Update" : "Create"}
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
//                     placeholder="Search reviews..."
//                     value={search}
//                     onChange={(e) => setSearch(e.target.value)}
//                 />
//             </InputGroup>

//             <div className="border border-gray-200 rounded-4 p-3 shadow-sm bg-white mt-3">
//                 <Table responsive hover className="align-middle mb-0">
//                     <thead className="table-light text-center">
//                         <tr>
//                             <th style={{ width: "50px" }}>#</th>
//                             <th>User</th>
//                             <th>Spot</th>
//                             <th>Rating</th>
//                             <th>Comment</th>
//                             <th>Images</th>
//                             <th>Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {filtered.length > 0 ? (
//                             filtered.map((item, i) => (
//                                 <tr key={item._id}>
//                                     <td className="text-center fw-bold">{i + 1}</td>
//                                     <td className="text-center">{getUserName(item.userId)}</td>
//                                     <td className="text-break">{getSpot(item.spotId)?.name || 'N/A'}</td>
//                                     <td className="text-center">
//                                         <span className="badge bg-warning text-dark px-2 py-1 d-inline-flex align-items-center gap-1">
//                                             ⭐ {item.rating}
//                                         </span>
//                                     </td>
//                                     <td className="text-break" style={{ maxWidth: "300px" }}>
//                                         {item.comment}
//                                     </td>
//                                     <td>
//                                         {Array.isArray(item.imageUrl) && item.imageUrl.length > 0 ? (
//                                             <div className="d-flex flex-wrap gap-1">
//                                                 {item.imageUrl.map((url, idx) => (
//                                                     <img
//                                                         key={idx}
//                                                         src={url}
//                                                         alt={`review-img-${idx}`}
//                                                         style={{
//                                                             width: 50,
//                                                             height: 40,
//                                                             objectFit: "cover",
//                                                             borderRadius: 6,
//                                                             border: "1px solid #ccc",
//                                                         }}
//                                                         onError={(e) => {
//                                                             e.target.onerror = null;
//                                                             e.target.src = "/fallback.jpg";
//                                                         }}
//                                                     />
//                                                 ))}
//                                             </div>
//                                         ) : (
//                                             <span className="text-muted fst-italic">No image</span>
//                                         )}
//                                     </td>
//                                     <td className="text-center">
//                                         <Button
//                                             variant="outline-info"
//                                             size="sm"
//                                             onClick={() => handleEdit(item)}
//                                             className="me-2"
//                                         >
//                                             <FaEdit />
//                                         </Button>
//                                         <Button
//                                             variant="outline-danger"
//                                             size="sm"
//                                             onClick={() => handleDelete(item._id)}
//                                         >
//                                             <FaTrash />
//                                         </Button>
//                                     </td>
//                                 </tr>
//                             ))
//                         ) : (
//                             <tr>
//                                 <td colSpan="7" className="text-center text-muted py-4">
//                                     No reviews found.
//                                 </td>
//                             </tr>
//                         )}
//                     </tbody>
//                 </Table>
//             </div>
//         </div>
//     );
// };

// export default ReviewManager;

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
import { uploadImage } from "../components/UploadImage";

const ReviewManager = () => {
    const { review, spot, userFind } = useContext(AppContext);
    const { users, fetchUsers } = userFind;
    const { spots, fetchSpots } = spot;
    const { reviews, fetchReviews, createReview, updateReview, deleteReview } = review;

    const [search, setSearch] = useState("");
    const [formData, setFormData] = useState({
        userId: "",
        spotId: "",
        rating: 5,
        comment: "",
        imageUrl: [],
    });
    const [editId, setEditId] = useState(null);
    const [message, setMessage] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        fetchReviews();
        fetchUsers();
        fetchSpots();
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
            await fetchReviews();
            setFormData({
                userId: "",
                spotId: "",
                rating: 5,
                comment: "",
                imageUrl: [],
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
            await fetchReviews();
            setMessage("🗑️ Review deleted.");
        }
    };

    const filtered = reviews.filter((r) =>
        r.comment.toLowerCase().includes(search.toLowerCase())
    );

    const getSpot = (spoId) => {
        return spot?.spots?.find((c) => c._id === spoId);
    };

    const getUserName = (userId) => {
        const found = users.find((u) => u._id === userId);
        return found?.username || userId;
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
                            imageUrl: [],
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
                                        <Form.Select
                                            value={formData.userId}
                                            onChange={(e) =>
                                                setFormData({ ...formData, userId: e.target.value })
                                            }
                                        >
                                            <option value="">Select User</option>
                                            {users.map((u) => (
                                                <option key={u._id} value={u._id}>
                                                    {u.username}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </Col>
                                    <Col md={4}>
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
                                    <td className="text-center">{getUserName(item.userId)}</td>
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
                                                            e.target.src = "/fallback.jpg";
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
