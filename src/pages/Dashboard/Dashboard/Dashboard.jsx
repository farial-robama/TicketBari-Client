import React from "react";
import { Navigate } from "react-router";
import { Shield, AlertCircle } from "lucide-react";
import UserDashboard from "../User/UserDashboard";
import AdminDashboard from "../Admin/AdminDashboard";
import VendorDashboard from "../Vendor/VendorDashboard";
import useRole from "../../../hooks/useRole";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";

const Dashboard = () => {
  const [role, isRoleLoading] = useRole();

  // Show loading state while checking role
  if (isRoleLoading) {
    return <LoadingSpinner />;
  }

  // Render appropriate dashboard based on role
  const renderDashboard = () => {
    switch (role) {
      case "admin":
        return <AdminDashboard />;
      case "vendor":
        return <VendorDashboard />;
      case "customer":
      case "user":
        return <UserDashboard />;
      default:
        return (
          <div className="flex items-center justify-center h-64">
            <div className="text-center bg-red-50 border border-red-200 rounded-xl p-8 max-w-md">
              <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Invalid Role
              </h2>
              <p className="text-gray-600 mb-4">
                Your account has an invalid role: "{role}". Please contact
                support.
              </p>
              <button
                onClick={() => (window.location.href = "/")}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Go to Home
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="dashboard-container">
      {/* Optional: Role indicator badge (only in development) */}
      {import.meta.env.MODE === "development" && (
        <div className="mb-4 p-3 bg-purple-50 border border-purple-200 rounded-lg flex items-center gap-2">
          <Shield size={18} className="text-purple-600" />
          <span className="text-sm text-purple-900">
            Current Role: <strong className="capitalize">{role}</strong>
          </span>
        </div>
      )}

      {renderDashboard()}
    </div>
  );
};

export default Dashboard;
