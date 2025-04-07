import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../redux/AuthContext";

const ProtectedRoute = () => {
    const { user, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <Navigate to="/signin" />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
