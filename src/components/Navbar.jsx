import { NavLink, useNavigate } from "react-router-dom";
import logo from '../assets/images/Cook_logo.png';
import { logoutUser } from "../features/userSlicer";
import { clearStorage } from "../services/helper";
import { useDispatch, useSelector } from "react-redux";
import { GoSignIn, GoSignOut } from "react-icons/go";
import { persistor } from "../app/store";
const Navbar = () => {
  const { isAuthenticated } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async() => {
    dispatch(logoutUser());
    clearStorage();
    persistor.purge();

    navigate('/signin');
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-900 shadow-sm z-40">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-4 h-16">
        <div className="flex  items-center justify-between">
          <div className="md:flex md:items-center md:gap-12">
            <NavLink to="/">
              <img
                className="h-5 w-auto"
                src={logo}
                alt="logo"
              />
            </NavLink>
          </div>

          <div>
            <nav aria-label="Global">
              <ul className="flex items-center gap-6 text-sm">
                <NavLink 
                  to="/" 
                  className={({ isActive }) =>
                    isActive 
                      ? "font-poppins-medium text-lg uppercase transition text-Primary dark:text-white" 
                      : "font-poppins-medium text-lg uppercase transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                  }
                >
                  Home
                </NavLink>

                <NavLink 
                  to="/favourite" 
                  className={({ isActive }) =>
                    isActive 
                      ? "font-poppins-medium text-lg uppercase transition text-Primary dark:text-white" 
                      : "font-poppins-medium text-lg uppercase transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                  }
                >
                  Favourite
                </NavLink>
              </ul>
            </nav>
          </div>

         {/* <div className=""> */}
          {isAuthenticated ? (
            <NavLink className="flex items-center gap-4 cursor-pointer"
            onClick={handleLogout}
            >
              {/* username */}
              <h1 className="hidden md:block font-poppins-medium text-lg uppercase">Kugan</h1>
              
              <GoSignOut size={30} />
            </NavLink>
          ) : (
            <NavLink to="/signin" className="flex items-center gap-4 cursor-pointer">
               {/* sign in */}
               <h1 className="hidden md:block font-poppins-medium text-lg uppercase">Sign In</h1>
              <GoSignIn size={30} />
            </NavLink>
          )}

        </div>
      </div>
    </header>
  );
};

export default Navbar;
