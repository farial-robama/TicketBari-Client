import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import {
  User,
  Mail,
  Shield,
  Calendar,
  Clock,
  Edit,
  Camera,
  Award,
  MapPin,
  Phone,
  Briefcase,
  Settings,
  ChevronRight,
  X,
  Save,
  Upload,
  AlertCircle
} from "lucide-react";
import toast from "react-hot-toast";

const MyProfile = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const axiosSecure = useAxiosSecure();

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    location: "",
    image: null,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axiosSecure.get("/user/profile");
        setUser(data);
        // Initialize form data with user data
        setFormData({
          name: data.name || "",
          phone: data.phone || "",
          location: data.location || "",
          image: null,
        });
        setImagePreview(data.image);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching profile:", error);
        toast.error("Failed to load profile");
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, [axiosSecure]);

  const getRoleConfig = (role) => {
    const configs = {
      admin: {
        title: "Admin Dashboard",
        badgeGradient: "bg-gradient-to-r from-purple-500 to-pink-500",
        bgGradient: "from-purple-50 to-pink-50",
        icon: Shield,
        iconColor: "text-purple-600",
        borderColor: "border-purple-200",
      },
      vendor: {
        title: "Vendor Dashboard",
        badgeGradient: "bg-gradient-to-r from-green-500 to-emerald-500",
        bgGradient: "from-green-50 to-emerald-50",
        icon: Briefcase,
        iconColor: "text-green-600",
        borderColor: "border-green-200",
      },
      user: {
        title: "My Profile",
        badgeGradient: "bg-gradient-to-r from-blue-500 to-cyan-500",
        bgGradient: "from-blue-50 to-cyan-50",
        icon: User,
        iconColor: "text-blue-600",
        borderColor: "border-blue-200",
      },
    };
    return configs[role] || configs.user;
  };

  const roleConfig = getRoleConfig(user?.role);
  const RoleIcon = roleConfig.icon;

  // Calculate account age
  const accountAge = () => {
    const created = new Date(user?.created_at);
    const now = new Date();
    const diffTime = Math.abs(now - created);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 30) return `${diffDays} days`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months`;
    return `${Math.floor(diffDays / 365)} years`;
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error for this field
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }

      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast.error("Please select a valid image file");
        return;
      }

      setFormData({ ...formData, image: file });
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (formData.phone && !/^\+?[\d\s-()]+$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle profile update
  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    setIsSaving(true);

    try {
      // Create FormData for file upload
      const updateData = new FormData();
      updateData.append("name", formData.name);
      updateData.append("phone", formData.phone);
      updateData.append("location", formData.location);
      
      if (formData.image) {
        updateData.append("image", formData.image);
      }

      const { data } = await axiosSecure.put("/user/profile", updateData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setUser(data);
      setIsEditModalOpen(false);
      toast.success("Profile updated successfully!", {
        icon: "✅",
        duration: 3000,
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  // Open edit modal
  const openEditModal = () => {
    setFormData({
      name: user.name || "",
      phone: user.phone || "",
      location: user.location || "",
      image: null,
    });
    setImagePreview(user.image);
    setErrors({});
    setIsEditModalOpen(true);
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            {roleConfig.title}
          </h1>
          <p className="text-gray-600">Manage your account information and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
              {/* Profile Header with Gradient */}
              <div className={`bg-gradient-to-br ${roleConfig.bgGradient} p-6 relative`}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                
                {/* Profile Picture */}
                <div className="relative mx-auto w-32 h-32 mb-4">
                  <img
                    src={user?.image || "/default-profile.png"}
                    alt="Profile"
                    className="w-full h-full rounded-full object-cover border-4 border-white shadow-lg"
                    onError={(e) => { e.target.src = "/default-profile.png"; }}
                  />
                  <button 
                    onClick={openEditModal}
                    className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-all"
                  >
                    <Camera size={18} className="text-gray-700" />
                  </button>
                </div>

                {/* Name and Role Badge */}
                <div className="text-center relative z-10">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    {user?.name || "User"}
                  </h2>
                  <div className={`inline-flex items-center gap-2 ${roleConfig.badgeGradient} text-white px-4 py-1.5 rounded-full text-sm font-semibold shadow-lg`}>
                    <RoleIcon size={16} />
                    {user?.role?.toUpperCase()}
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Award size={20} className="text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Account Age</p>
                      <p className="font-semibold text-gray-800">{accountAge()}</p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2 pt-4 border-t">
                  <button 
                    onClick={openEditModal}
                    className="w-full flex items-center justify-between px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:shadow-lg transition-all hover:scale-[1.02]"
                  >
                    <span className="flex items-center gap-2">
                      <Edit size={18} />
                      Edit Profile
                    </span>
                    <ChevronRight size={18} />
                  </button>
                  
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Detailed Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information Card */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <User size={24} className="text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Personal Information</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Email */}
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="flex items-center gap-3 mb-2">
                    <Mail size={18} className="text-gray-400" />
                    <label className="text-sm font-medium text-gray-500">Email Address</label>
                  </div>
                  <p className="text-gray-800 font-medium truncate">{user?.email}</p>
                </div>

                {/* Role */}
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="flex items-center gap-3 mb-2">
                    <Shield size={18} className="text-gray-400" />
                    <label className="text-sm font-medium text-gray-500">Account Role</label>
                  </div>
                  <p className="text-gray-800 font-medium capitalize">{user?.role}</p>
                </div>

                {/* Phone */}
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="flex items-center gap-3 mb-2">
                    <Phone size={18} className="text-gray-400" />
                    <label className="text-sm font-medium text-gray-500">Phone Number</label>
                  </div>
                  <p className="text-gray-800 font-medium">{user?.phone || "Not provided"}</p>
                </div>

                {/* Location */}
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="flex items-center gap-3 mb-2">
                    <MapPin size={18} className="text-gray-400" />
                    <label className="text-sm font-medium text-gray-500">Location</label>
                  </div>
                  <p className="text-gray-800 font-medium">{user?.location || "Not provided"}</p>
                </div>
              </div>
            </div>

            {/* Account Activity Card */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Clock size={24} className="text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Account Activity</h3>
              </div>

              <div className="space-y-4">
                {/* Member Since */}
                <div className="flex items-start justify-between p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border border-purple-100">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-white rounded-lg shadow-sm">
                      <Calendar size={20} className="text-purple-600" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600 block mb-1">
                        Member Since
                      </label>
                      <p className="text-lg font-semibold text-gray-800">
                        {new Date(user?.created_at).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Joined {accountAge()} ago
                      </p>
                    </div>
                  </div>
                </div>

                {/* Last Login */}
                <div className="flex items-start justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-white rounded-lg shadow-sm">
                      <Clock size={20} className="text-green-600" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600 block mb-1">
                        Last Login
                      </label>
                      <p className="text-lg font-semibold text-gray-800">
                        {new Date(user?.last_loggedIn).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(user?.last_loggedIn).toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800">Edit Profile</h2>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={24} className="text-gray-600" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <div className="space-y-6">
                {/* Profile Picture Upload */}
                <div className="flex flex-col items-center">
                  <div className="relative">
                    <img
                      src={imagePreview || "/default-profile.png"}
                      alt="Profile Preview"
                      className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
                      onError={(e) => { e.target.src = "/default-profile.png"; }}
                    />
                    <label className="absolute bottom-0 right-0 p-2 bg-blue-600 text-white rounded-full shadow-lg cursor-pointer hover:bg-blue-700 transition-colors">
                      <Upload size={18} />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">Click to upload new photo</p>
                  <p className="text-xs text-gray-400">Max size: 5MB</p>
                </div>

                {/* Name Field */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <User size={16} />
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                      errors.name ? "border-red-300" : "border-gray-300"
                    }`}
                    placeholder="Enter your full name"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle size={14} />
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Phone Field */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <Phone size={16} />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                      errors.phone ? "border-red-300" : "border-gray-300"
                    }`}
                    placeholder="+1 (555) 123-4567"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle size={14} />
                      {errors.phone}
                    </p>
                  )}
                </div>

                {/* Location Field */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <MapPin size={16} />
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    placeholder="City, Country"
                  />
                </div>

                {/* Email (Read-only) */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <Mail size={16} />
                    Email Address (Cannot be changed)
                  </label>
                  <input
                    type="email"
                    value={user?.email}
                    disabled
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-50 text-gray-500 cursor-not-allowed"
                  />
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex gap-3">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors font-medium"
                disabled={isSaving}
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateProfile}
                disabled={isSaving}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:shadow-lg transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSaving ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={18} />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProfile;