import { NavLink, Outlet } from "react-router-dom";
import { HiViewGridAdd } from "react-icons/hi";
import { MdOutlineManageHistory } from "react-icons/md";
import { IoHomeOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useAdminAppContext } from "../../store/adminAppContext";

const Dashboard = () => {
  const navigate = useNavigate();

  // log out using global admin state:
  const { logoutAdmin } = useAdminAppContext();
  const handleLogout = () => {
    logoutAdmin();
    navigate("/");
  };
  return (
    <>
      {/* dashboard layout */}
      <div>
        <section className="flex md:bg-gray-100 min-h-screen overflow-hidden">
          <aside className="hidden sm:flex sm:flex-col">
            <NavLink
              to="/"
              className="inline-flex items-center justify-center h-20 w-20 bg-purple-600 hover:bg-purple-500 focus:bg-purple-500"
            >
              {/* <img src="/fav-icon.png" alt="" /> */}
              <IoHomeOutline className="size-8" />
            </NavLink>
            <div className="flex-grow flex flex-col justify-between text-gray-500 bg-gray-800">
              {/* NavBar */}
              <nav className="flex flex-col mx-4 my-6 space-y-4">
                <NavLink
                  to="/dashboard"
                  className="inline-flex items-center justify-center py-3 text-purple-600 bg-white rounded-lg"
                >
                  <span className="sr-only">Dashboard</span>
                  <svg
                    aria-hidden="true"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </NavLink>
                <NavLink
                  to="/dashboard/add-new-book"
                  className="inline-flex items-center justify-center py-3 hover:text-gray-400 hover:bg-gray-700 focus:text-gray-400 focus:bg-gray-700 rounded-lg"
                >
                  <span className="sr-only">Add Book</span>
                  <HiViewGridAdd className="h-6 w-6" />
                </NavLink>
                <NavLink
                  to="/dashboard/manage-books"
                  className="inline-flex items-center justify-center py-3 hover:text-gray-400 hover:bg-gray-700 focus:text-gray-400 focus:bg-gray-700 rounded-lg"
                >
                  <span className="sr-only">Documents</span>
                  <MdOutlineManageHistory className="h-6 w-6" />
                </NavLink>
              </nav>
              {/* NavBar */}
            </div>
          </aside>

          <div className="flex-grow text-gray-800">
            <header className="flex items-center h-20 px-6 sm:px-10 bg-white">
              <button className="block sm:hidden relative flex-shrink-0 p-2 mr-2 text-gray-600 hover:bg-gray-100 hover:text-gray-800 focus:bg-gray-100 focus:text-gray-800 rounded-full">
                <span className="sr-only">Menu</span>
                <svg
                  aria-hidden="true"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h7"
                  />
                </svg>
              </button>
              <div className="relative w-full max-w-md sm:-ml-2">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="absolute h-6 w-6 mt-2.5 ml-2 text-gray-400"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
                <input
                  type="text"
                  role="search"
                  placeholder="Search..."
                  className="py-2 pl-10 pr-4 w-full border-4 border-transparent placeholder-gray-400 focus:bg-gray-50 rounded-lg bg-slate-100"
                />
              </div>
              {/* Logout button */}
              <div className="flex flex-shrink-0 items-center ml-auto">
                <div className="pl-3 ml-3 space-x-1">
                  <button
                    onClick={handleLogout}
                    className="relative p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 focus:bg-gray-100 focus:text-gray-600 rounded-full"
                  >
                    <span className="sr-only">Log out</span>
                    <svg
                      aria-hidden="true"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="h-6 w-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              {/* logout button */}
            </header>

            <main className="p-6 sm:p-10 space-y-6 ">
              <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between">
                <div className="mr-6">
                  <h1 className="text-4xl font-semibold mb-2">Dashboard</h1>
                  <h2 className="text-gray-600 ml-0.5">Book Store Inventory</h2>
                </div>
                <div className="flex flex-col md:flex-row items-start justify-end -mb-3"></div>
              </div>
              <Outlet />
            </main>
          </div>
        </section>
      </div>

      {/* dashboard layout */}
    </>
  );
};
export default Dashboard;
