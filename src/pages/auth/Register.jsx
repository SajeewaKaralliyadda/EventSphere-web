import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import Card from "../../components/common/Card";
import { USER_ROLES, FACULTIES } from "../../utils/constants";
import { isValidEmail, isValidPhone } from "../../utils/helpers";

const Register = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { register } = useAuth();

  const initialUserType =
    searchParams.get("type") === "organizer" ? "organizer" : "student";

  const [userType, setUserType] = useState(initialUserType);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    faculty: "",
    studentId: "",
    clubName: "",
    clubDescription: "",
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear error for this field
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: "",
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!isValidPhone(formData.phone)) {
      newErrors.phone = "Please enter a valid Sri Lankan phone number";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.faculty) {
      newErrors.faculty = "Please select a faculty";
    }

    if (userType === "student" && !formData.studentId.trim()) {
      newErrors.studentId = "Student ID is required";
    }

    if (userType === "organizer") {
      if (!formData.clubName.trim()) {
        newErrors.clubName = "Club/Society name is required";
      }
      if (!formData.clubDescription.trim()) {
        newErrors.clubDescription = "Description is required";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setSuccessMessage("");

    const userData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
      faculty: formData.faculty,
      role:
        userType === "organizer" ? USER_ROLES.ORGANIZER : USER_ROLES.STUDENT,
    };

    if (userType === "student") {
      userData.studentId = formData.studentId;
    } else {
      userData.clubName = formData.clubName;
      userData.clubDescription = formData.clubDescription;
    }

    const result = await register(userData);

    if (result.success) {
      setSuccessMessage(
        userType === "organizer"
          ? "Registration successful! Your account is pending admin approval. You will be notified via email once approved."
          : "Registration successful! Please check your email to verify your account."
      );
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } else {
      setErrors({ submit: result.error });
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-2xl">ES</span>
            </div>
            <span className="text-3xl font-heading font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              EventSphere
            </span>
          </Link>
          <h2 className="text-3xl font-heading font-bold text-gray-900 mb-2">
            Create Your Account
          </h2>
          <p className="text-gray-600">
            Join EventSphere and start your journey
          </p>
        </div>

        <Card>
          {/* User Type Selector */}
          <div className="flex gap-4 mb-6">
            <button
              type="button"
              onClick={() => setUserType("student")}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
                userType === "student"
                  ? "bg-primary-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Student
            </button>
            <button
              type="button"
              onClick={() => setUserType("organizer")}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
                userType === "organizer"
                  ? "bg-primary-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Organizer
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            {errors.submit && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-error">{errors.submit}</p>
              </div>
            )}

            {successMessage && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-success">{successMessage}</p>
              </div>
            )}

            <Input
              label="Full Name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              error={errors.name}
              required
            />

            <Input
              label="Email Address"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your.email@university.edu"
              error={errors.email}
              required
            />

            <Input
              label="Phone Number"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+94 77 123 4567"
              error={errors.phone}
              required
            />

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Faculty <span className="text-error">*</span>
              </label>
              <select
                name="faculty"
                value={formData.faculty}
                onChange={handleChange}
                className="block w-full rounded-lg border border-gray-300 py-2.5 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                required
              >
                <option value="">Select Faculty</option>
                {FACULTIES.map((faculty) => (
                  <option key={faculty.value} value={faculty.value}>
                    {faculty.label}
                  </option>
                ))}
              </select>
              {errors.faculty && (
                <p className="mt-1 text-sm text-error">{errors.faculty}</p>
              )}
            </div>

            {userType === "student" ? (
              <Input
                label="Student ID"
                type="text"
                name="studentId"
                value={formData.studentId}
                onChange={handleChange}
                placeholder="e.g., 20XX/CS/XXX"
                error={errors.studentId}
                required
              />
            ) : (
              <>
                <Input
                  label="Club/Society Name"
                  type="text"
                  name="clubName"
                  value={formData.clubName}
                  onChange={handleChange}
                  placeholder="Enter your club or society name"
                  error={errors.clubName}
                  required
                />

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Club Description <span className="text-error">*</span>
                  </label>
                  <textarea
                    name="clubDescription"
                    value={formData.clubDescription}
                    onChange={handleChange}
                    placeholder="Tell us about your club or society..."
                    rows="3"
                    className="block w-full rounded-lg border border-gray-300 py-2.5 px-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    required
                  />
                  {errors.clubDescription && (
                    <p className="mt-1 text-sm text-error">
                      {errors.clubDescription}
                    </p>
                  )}
                </div>
              </>
            )}

            <Input
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a strong password"
              error={errors.password}
              helperText="At least 8 characters"
              required
            />

            <Input
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              error={errors.confirmPassword}
              required
            />

            <Button
              type="submit"
              variant="primary"
              fullWidth
              loading={loading}
              disabled={loading}
            >
              {userType === "organizer"
                ? "Register & Request Approval"
                : "Create Account"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Register;
