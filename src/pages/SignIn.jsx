import  { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from '../assets/images/Cook_logo.png';
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../features/userSlicer";
function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });

  const dispatch = useDispatch();

  const {loading,isAuthenticated,error} = useSelector((state) => state.user);
 
  const navigate = useNavigate();

  const location = useLocation();
  
  const from = location.state?.from?.pathname || '/';
  useEffect(() => {
    if (isAuthenticated) {
      navigate(from);
    }
  }, [isAuthenticated, navigate, from]);

  
  const onSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const user = {
        email,
        password,
      };
      dispatch(fetchUser(user));
    }
  };

  const validate = () => {
    const newErrors = { email: "", password: "" };
    let isValid = true;

    if (!email) {
      newErrors.email = "Email is required.";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email address is invalid.";
      isValid = false;
    }

    if (!password) {
      newErrors.password = "Password is required.";
      isValid = false;
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  return (
    <div className="login mt-20">
      <div className="m-auto md:w-2/5 w-full h-full shadow-md px-10 py-4 rounded-md">
      {/* logo */}
      <div className="flex items-center justify-center md:gap-12 mb-2">
            <img
              className="h-4 w-auto"
              src={logo}
              alt="logo"
            />
        
        </div>
        <h1 className="text-xl font-poppins-medium my-4">Sign In</h1>
        <form
          onSubmit={onSubmit}
        >
          <p className="mb-2 font-poppins">Email</p>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="outline-none font-poppins border-[1px] mb-2 w-full p-2"
            type="text"
          />
           {errors.email && <p className="text-red-500 text-sm mb-2">{errors.email}</p>}

          <p className="mb-4 font-poppins ">Password</p>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="outline-none font-poppins border-[1px] mb-2 w-full p-2"
            type="password"
          />
          {errors.password && <p className="text-red-500 text-sm mb-2">{errors.password}</p>}

          <button
            type="submit"
            className="p-3 rounded-sm text-center bg-Primary mt-5 w-full"
            title="Sign In"
          
          >
            <p className="font-poppins-medium text-white uppercase">
              {loading ? "Loading..." : "Sign In"}
            </p>
          </button>

          {/* errror */}
          {error && (
            <div className="mt-4">
              <p className="text-red-500 font-poppins">{error}</p>
            </div>
          )}

          <div className="mt-6 text-center">
            <small className="font-poppins">Don&apos;t you have an account?
              <Link to="/signup">
                <span className="font-poppins-medium text-Primary"> Create an account</span>
              </Link>
            </small>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
