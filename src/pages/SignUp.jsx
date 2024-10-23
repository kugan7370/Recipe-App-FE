import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from '../assets/images/Cook_logo.png';
import { useSelector } from "react-redux";
import { registerUser } from "../api/User";

function SignUp() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  
  const [errors, setErrors] = useState({});
  
  const { loading, isAuthenticated, error } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    let isValid = true;

    // Username validation
    if (!formData.username) {
      newErrors.username = "Username is required.";
      isValid = false;
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required.";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email address is invalid.";
      isValid = false;
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required.";
      isValid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long.";
      isValid = false;
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm Password is required.";
      isValid = false;
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        await registerUser(formData);
        navigate("/signin"); 
      } catch (error) {
        console.error("Error registering user:", error);
        setErrors((prevErrors) => ({ ...prevErrors, server:error.response.data.error || "Registration failed. Please try again." }));
      }
    }
  };

  return (
    <div className="signup mt-20">
      <div className="m-auto md:w-2/5 w-full h-full shadow-md px-10 py-4 rounded-md">
        <div className="flex items-center justify-center md:gap-12 mb-2">
          <img className="h-4 w-auto" src={logo} alt="logo" />
        </div>
        <h1 className="text-xl font-poppins-medium my-4">Sign Up</h1>
        <form onSubmit={onSubmit}>
          {Object.keys(formData).map((key) => (
            <div key={key} className="mb-2">
              <p className="font-poppins capitalize">{key}</p>
              <input
                name={key}
                value={formData[key]}
                onChange={handleChange}
                className={`outline-none font-poppins border-[1px] mb-1 w-full p-2 ${errors[key] ? "border-red-500" : "border-gray-300"}`}
                type={key === "password" || key === "confirmPassword" ? "password" : "text"}
              />
              {errors[key] && <p className="text-red-500 text-sm mb-2">{errors[key]}</p>}
            </div>
          ))}
          
          <button
            type="submit"
            className="p-3 rounded-sm text-center bg-Primary mt-5 w-full"
            title="Sign Up"
          >
            <p className="font-poppins-medium text-white uppercase">
              {loading ? "Loading..." : "Sign Up"}
            </p>
          </button>

          {/* Server error message */}
          {error && (
            <div className="mt-2">
              <p className="text-red-500 font-poppins">{error}</p>
            </div>
          )}
          {errors.server && (
            <div className="mt-2">
              <p className="text-red-500 font-poppins">{errors.server}</p>
            </div>
          )}

          <div className="mt-2 text-center">
            <small className="font-poppins">Already have an account?
              <Link to="/signin">
                <span className="font-poppins-medium text-Primary"> Sign In</span>
              </Link>
            </small>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
