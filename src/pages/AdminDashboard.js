import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import ProvinceManager from "../module/ProvinceManager";
import SpotManager from "../module/SpotManager";
import ReviewManager from "../module/ReviewManager";
import SuggestManager from "../module/SuggestManager";
import CategoryManager from "../module/CategoryManager";
import FavouriteManager from "../module/FavouriteManager";
import UserManager from "../module/UserManager";

const AdminDashboard = () => {
    const [section, setSection] = useState("category");

    const renderContent = () => {
        switch (section) {
            case "category":
                return <CategoryManager />;
            case "province":
                return <ProvinceManager />;
            case "spot":
                return <SpotManager />;
            case "review":
                return <ReviewManager />;
            case "suggest":
                return <SuggestManager />;
            case "favourite":
                return <FavouriteManager />;
            case "user":
                return <UserManager />;
            default:
                return <div className="p-4">🔍 Select a section to manage.</div>;
        }
    };

    return (
        <div style={{ display: "flex" }}>
            <Sidebar onSelect={setSection} active={section} />
            <div style={{ flex: 1, padding: "2rem" }}>{renderContent()}</div>
        </div>
    );
};

export default AdminDashboard;
