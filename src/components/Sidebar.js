import React from "react";
import {
    FaTachometerAlt,
    FaThLarge,
    FaFolderOpen,
    FaUser,
    FaMapMarkerAlt,
    FaGlobeAsia,
    FaCube,
    FaSignInAlt,
    FaStar,
    FaLightbulb,
    FaHeart
} from "react-icons/fa";

const Sidebar = ({ onSelect, active }) => {
    return (
        <div style={{ width: "260px", backgroundColor: "#fff", minHeight: "100vh", padding: "1.5rem", borderRight: "1px solid #eee" }}>
            {/* Logo */}
            <div className="mb-4 d-flex align-items-center">
                <img src="/logo192.png" alt="logo" style={{ width: 30, marginRight: 10 }} />
                <span className="fs-4 fw-bold">Rizz</span>
            </div>

            {/* MAIN MENU */}
            <div className="text-uppercase text-muted small fw-bold mb-2">Main</div>
            <ul className="list-unstyled mb-3">
                <li
                    className={`d-flex align-items-center p-2 rounded ${active === "dashboard" ? "bg-light text-success fw-bold" : "text-dark"}`}
                    onClick={() => onSelect("dashboard")}
                    role="button"
                >
                    <FaTachometerAlt className="me-2" style={{ color: "#4caf50" }} />
                    Dashboard
                </li>
                <li
                    className={`d-flex align-items-center p-2 rounded ${active === "applications" ? "bg-light text-success fw-bold" : "text-dark"}`}
                    onClick={() => onSelect("applications")}
                    role="button"
                >
                    <FaThLarge className="me-2" style={{ color: "#2196f3" }} />
                    Applications
                </li>
            </ul>

            {/* CONTENT MANAGEMENT */}
            <div className="text-uppercase text-muted small fw-bold mb-2">Content Management</div>
            <ul className="list-unstyled mb-3">
                <li
                    className={`d-flex align-items-center p-2 rounded ${active === "category" ? "bg-light text-primary fw-bold" : "text-dark"}`}
                    onClick={() => onSelect("category")}
                    role="button"
                >
                    <FaFolderOpen className="me-2" style={{ color: "#ff9800" }} />
                    Category
                </li>
                <li
                    className={`d-flex align-items-center p-2 rounded ${active === "province" ? "bg-light text-primary fw-bold" : "text-dark"}`}
                    onClick={() => onSelect("province")}
                    role="button"
                >
                    <FaGlobeAsia className="me-2" style={{ color: "#03a9f4" }} />
                    Province
                </li>
                <li
                    className={`d-flex align-items-center p-2 rounded ${active === "spot" ? "bg-light text-primary fw-bold" : "text-dark"}`}
                    onClick={() => onSelect("spot")}
                    role="button"
                >
                    <FaMapMarkerAlt className="me-2" style={{ color: "#e91e63" }} />
                    Spot
                </li>
                <li
                    className={`d-flex align-items-center p-2 rounded ${active === "review" ? "bg-light text-primary fw-bold" : "text-dark"}`}
                    onClick={() => onSelect("review")}
                    role="button"
                >
                    <FaStar className="me-2" style={{ color: "#ffc107" }} />
                    Review
                </li>
                <li
                    className={`d-flex align-items-center p-2 rounded ${active === "suggest" ? "bg-light text-primary fw-bold" : "text-dark"}`}
                    onClick={() => onSelect("suggest")}
                    role="button"
                >
                    <FaLightbulb className="me-2" style={{ color: "#00bcd4" }} />
                    Suggest
                </li>
                <li
                    className={`d-flex align-items-center p-2 rounded ${active === "favourite" ? "bg-light text-primary fw-bold" : "text-dark"}`}
                    onClick={() => onSelect("favourite")}
                    role="button"
                >
                    <FaHeart className="me-2 text-danger" />
                    Favourite
                </li>
                <li
                    className={`d-flex align-items-center p-2 rounded ${active === "user" ? "bg-light text-primary fw-bold" : "text-dark"}`}
                    onClick={() => onSelect("user")}
                    role="button"
                >
                    <FaUser className="me-2" style={{ color: "#9c27b0" }} />
                    User
                </li>
            </ul>

            {/* SYSTEM / PAGES */}
            <div className="text-uppercase text-muted small fw-bold mb-2">System</div>
            <ul className="list-unstyled">
                <li
                    className={`d-flex align-items-center p-2 rounded ${active === "pages" ? "bg-light text-dark fw-bold" : "text-dark"}`}
                    onClick={() => onSelect("pages")}
                    role="button"
                >
                    <FaCube className="me-2" style={{ color: "#795548" }} />
                    Pages
                </li>
                <li
                    className={`d-flex align-items-center p-2 rounded ${active === "auth" ? "bg-light text-dark fw-bold" : "text-dark"}`}
                    onClick={() => onSelect("auth")}
                    role="button"
                >
                    <FaSignInAlt className="me-2" style={{ color: "#607d8b" }} />
                    Authentication
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
