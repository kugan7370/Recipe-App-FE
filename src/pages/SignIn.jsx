import  { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from '../assets/images/Cook_logo.png';
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../features/userSlicer";
function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
    const user = {
      email,
      password,
    };
    dispatch(fetchUser(user));
  };

  return (
    <div className="login mt-32">
      <div className="m-auto md:w-2/5 w-full h-full shadow-md p-10 rounded-md">
      {/* logo */}
      <div className="flex items-center justify-center md:gap-12 mb-6">
            <img
              className="h-5 w-auto"
              src={logo}
              alt="logo"
            />
        
        </div>
        <h1 className="text-2xl font-poppins-medium my-6">Login</h1>
        <form
          onSubmit={onSubmit}
          // className="flex flex-col gap-4" 
        
        >
          <p className="mb-4 font-poppins">Email</p>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="outline-none font-poppins border-[1px] mb-2 w-full p-2"
            type="text"
          />

          <p className="mb-4 font-poppins ">Password</p>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="outline-none font-poppins border-[1px] mb-2 w-full p-2"
            type="password"
          />

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
