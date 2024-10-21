import { Link } from "react-router-dom";
import { IoLogOutOutline } from "react-icons/io5";
import logo from '../assets/images/Cook_logo.png';
const Navbar = () => {
  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm">
    <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-2 ">
      <div className="flex h-16 items-center justify-between">
        <div className="md:flex md:items-center  md:gap-12">
          <Link to={'/'}>
            <img
              className="h-5 w-auto"
              src={logo}
              alt="logo"
            />
           
          </Link>
        </div>
  
        <div>
          <nav aria-label="Global">
            <ul className="flex items-center gap-6 text-sm">
            <Link to={'/'}>
                <div
                  className="font-poppins-medium text-lg uppercase transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                
                >
                  Home
                </div>
              </Link>
  
              <Link to={'/favourite'}>
                <div
                  className="font-poppins-medium text-lg uppercase transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                  to="favourite"
                >
                  Favourite
                </div>
              </Link>
            </ul>
          </nav>
        </div>
  
        <div className="flex items-center gap-4">
        <IoLogOutOutline size={30} />
        </div>
      </div>
    </div>
  </header>
  );
};

export default Navbar;
