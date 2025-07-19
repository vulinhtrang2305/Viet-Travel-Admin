// import React, { useContext, useEffect, useState } from "react";
// import {
//     Table,
//     Form,
//     Button,
//     InputGroup,
//     Row,
//     Col,
//     Card,
//     Collapse,
//     Alert,
// } from "react-bootstrap";
// import { FaHeart, FaPlus, FaTrash } from "react-icons/fa";
// import AppContext from "../provider/Context";

// const FavouriteManager = () => {
//     const { favourite, spot, userFind } = useContext(AppContext);
//     const { users, fetchUsers} = userFind;
//     const { spots, fetchSpots } = spot;
//     const {
//         favourites,
//         fetchFavourites,
//         fetchFavouritesByUser,
//         addToFavourite,
//         deleteFavourite,
//     } = favourite;

//     const [formData, setFormData] = useState({ userId: "", spotId: "" });
//     const [message, setMessage] = useState("");
//     const [search, setSearch] = useState("");
//     const [showForm, setShowForm] = useState(false);

//     useEffect(() => {
//         fetchFavourites();
//         fetchSpots();
//         fetchUsers();
//     }, []);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             await addToFavourite(formData);
//             setMessage("✅ Added to favourites.");
//             setFormData({ userId: "", spotId: "" });
//             setShowForm(false);
//         } catch {
//             setMessage("❌ Failed to add favourite.");
//         }
//     };

//     const handleDelete = async (userId, spotId) => {
//         if (window.confirm("Are you sure you want to remove this favourite?")) {
//             await deleteFavourite(userId, spotId);
//             setMessage("🗑️ Favourite removed.");
//         }
//     };

//     const filtered = favourites.filter(
//         (f) => f.userId.includes(search) || f.spotId.includes(search)
//     );

//     const getSpotNames = (spotIds) => {
//         if (!Array.isArray(spotIds)) return "N/A";
//         return spotIds
//             .map((id) => spots.find((s) => s._id === id)?.name)
//             .filter(Boolean)
//             .join(", ");
//     };

//     const getUserName = (userId) => {
//         const found = users.find((u) => u._id === userId);
//         return found?.username || userId;
//     };    

//     return (
//         <div className="container mt-4">
//             <div className="d-flex justify-content-between align-items-center mb-3">
//                 <h3 className="mb-0">
//                     <FaHeart className="me-2 text-danger" /> Favourite Manager
//                 </h3>
//                 <Button
//                     variant="success"
//                     onClick={() => {
//                         setShowForm(!showForm);
//                         setFormData({ userId: "", spotId: "" });
//                     }}
//                 >
//                     {showForm ? (
//                         "Cancel"
//                     ) : (
//                         <>
//                             <FaPlus className="me-1" /> Add Favourite
//                         </>
//                     )}
//                 </Button>
//             </div>

//             {message && (
//                 <Alert variant="info" dismissible onClose={() => setMessage("")}>
//                     {message}
//                 </Alert>
//             )}

//             <Collapse in={showForm}>
//                 <div>
//                     <Card className="mb-3">
//                         <Card.Body>
//                             <Form onSubmit={handleSubmit}>
//                                 <Row className="g-3">
//                                     <Col md={6}>
//                                         <Form.Control
//                                             placeholder="User ID"
//                                             value={formData.userId}
//                                             onChange={(e) =>
//                                                 setFormData({ ...formData, userId: e.target.value })
//                                             }
//                                             required
//                                         />
//                                     </Col>
//                                     <Col md={6}>
//                                         <Form.Control
//                                             placeholder="Spot ID"
//                                             value={formData.spotId}
//                                             onChange={(e) =>
//                                                 setFormData({ ...formData, spotId: e.target.value })
//                                             }
//                                             required
//                                         />
//                                     </Col>
//                                     <Col md="auto">
//                                         <Button type="submit" variant="primary">
//                                             Add
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
//                     placeholder="Search by User or Spot ID..."
//                     value={search}
//                     onChange={(e) => setSearch(e.target.value)}
//                 />
//             </InputGroup>

//             <div className="border border-gray-200 rounded-4 p-3 shadow-sm bg-white mt-3">
//                 <Table responsive hover className="align-middle mb-0">
//                     <thead className="table-light text-center">
//                         <tr>
//                             <th style={{ width: '50px' }}>#</th>
//                             <th>User</th>
//                             <th>Spot Name</th>
//                             <th style={{ width: '100px' }}>Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {filtered.length > 0 ? (
//                             filtered.map((item, idx) => (
//                                 <tr key={`${item.userId}-${item.spotId}`}>
//                                     <td className="text-center fw-bold">{idx + 1}</td>
//                                     <td className="text-center text-muted">{getUserName(item.userId)}</td>
//                                     <td className="text-break">{getSpotNames(item.spotId)}</td>
//                                     <td className="text-center">
//                                         <Button
//                                             variant="outline-danger"
//                                             size="sm"
//                                             onClick={() => handleDelete(item.userId, item.spotId)}
//                                             className="rounded-circle"
//                                             title="Remove favourite"
//                                         >
//                                             <FaTrash />
//                                         </Button>
//                                     </td>
//                                 </tr>
//                             ))
//                         ) : (
//                             <tr>
//                                 <td colSpan={4} className="text-center text-muted py-4">
//                                     No favourites found.
//                                 </td>
//                             </tr>
//                         )}
//                     </tbody>
//                 </Table>
//             </div>
//         </div>
//     );
// };

// export default FavouriteManager;



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
    const { favourite, spot, userFind } = useContext(AppContext);
    const { users, fetchUsers } = userFind;
    const { spots, fetchSpots } = spot;
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
        fetchSpots();
        fetchUsers();
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
        (f) => f.userId.includes(search) || f.spotId.includes(search)
    );

    const getSpotNames = (spotIds) => {
        if (!Array.isArray(spotIds)) return "N/A";
        return spotIds
            .map((id) => spots.find((s) => s._id === id)?.name)
            .filter(Boolean)
            .join(", ");
    };

    const getUserName = (userId) => {
        const found = users.find((u) => u._id === userId);
        return found?.username || userId;
    };

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
                    {showForm ? (
                        "Cancel"
                    ) : (
                        <>
                            <FaPlus className="me-1" /> Add Favourite
                        </>
                    )}
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
                                        <Form.Select
                                            value={formData.userId}
                                            onChange={(e) =>
                                                setFormData({ ...formData, userId: e.target.value })
                                            }
                                            required
                                        >
                                            <option value="">Select User</option>
                                            {users.map((user) => (
                                                <option key={user._id} value={user._id}>
                                                    {user.username}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Select
                                            value={formData.spotId}
                                            onChange={(e) =>
                                                setFormData({ ...formData, spotId: e.target.value })
                                            }
                                            required
                                        >
                                            <option value="">Select Spot</option>
                                            {spots.map((spot) => (
                                                <option key={spot._id} value={spot._id}>
                                                    {spot.name}
                                                </option>
                                            ))}
                                        </Form.Select>
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

            <div className="border border-gray-200 rounded-4 p-3 shadow-sm bg-white mt-3">
                <Table responsive hover className="align-middle mb-0">
                    <thead className="table-light text-center">
                        <tr>
                            <th style={{ width: '50px' }}>#</th>
                            <th>User</th>
                            <th>Spot Name</th>
                            <th style={{ width: '100px' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.length > 0 ? (
                            filtered.map((item, idx) => (
                                <tr key={`${item.userId}-${item.spotId}`}>
                                    <td className="text-center fw-bold">{idx + 1}</td>
                                    <td className="text-center text-muted">{getUserName(item.userId)}</td>
                                    <td className="text-break">{getSpotNames(item.spotId)}</td>
                                    <td className="text-center">
                                        <Button
                                            variant="outline-danger"
                                            size="sm"
                                            onClick={() => handleDelete(item.userId, item.spotId)}
                                            className="rounded-circle"
                                            title="Remove favourite"
                                        >
                                            <FaTrash />
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4} className="text-center text-muted py-4">
                                    No favourites found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default FavouriteManager;