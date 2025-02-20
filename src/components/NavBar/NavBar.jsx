import { NavLink } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { FcSignature } from "react-icons/fc";
import { HiUser } from "react-icons/hi2";
import { GrUserAdmin } from "react-icons/gr";
import { FaShoppingCart } from "react-icons/fa";
import { useEffect, useState } from "react";
import avatar from "../../assets/avatar.png";
import useCartStore from "../../store/cartStore";
// working on user profile pic and sign in
import { useAuthStore } from "../../store/AuthContext";
import { useNavigate } from "react-router-dom";
import { useAdminAppContext } from "../../store/adminAppContext";
import adminavatar from "../../assets/adminavatar.png";
// bringing books for search bar:
import { useBookStore } from "../../store/bookStore";

const navigation = [
  { name: "Orders", href: "/orders" },
  { name: "Cart Page", href: "/cart" },
  { name: "Checkout", href: "/checkout" },
];

const NavBar = () => {
  // const [userAvailable, setUserAvailable] = useState(false);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  // search bar query to find books with

  const [query, setQuery] = useState("");
  const { bookData, fetchBooks } = useBookStore();
  const [filteredBooks, setFilteredBooks] = useState([]);

  // only show the hint when user clicks the search query and make it disappear
  const [showHint, setShowHint] = useState(false);

  // useEffect(() => {
  //   let timerId;
  //   if (showHint) {
  //     timerId = setTimeout(() => {
  //       alert("categories: ");
  //       setShowHint(false);
  //     }, 3000);
  //   }

  //   return () => clearTimeout(timerId);
  // }, [showHint]);

  // bring the cart from store, so we can show the item.length near the icon
  const { cartItems } = useCartStore();

  // bring the user variable and logout function from zustand store:
  const { currentUser, logoutUser } = useAuthStore();

  // handle admin access only
  const { admin, initializeAdminState } = useAdminAppContext();
  useEffect(() => {
    initializeAdminState();
  }, []);
  const navigate = useNavigate();
  const handleAdminAccess = () => {
    navigate("/admin");
  };

  // fetch books
  useEffect(() => {
    fetchBooks();
  }, []);

  // console.log(bookData[0].category);
  // handle search
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setQuery(value);
    // setShowHint(false);
    if (bookData) {
      const filteredBooks = bookData.filter((book) =>
        book.category.includes(value)
      );
      setFilteredBooks(filteredBooks);
    }
  };

  return (
    <header className="relative mx-auto max-w-7xl px-2 py-2 sm:px-6 lg:px-8 bg-white/20 backdrop-blur-xs z-60">
      <nav className="flex justify-between items-center">
        {/* left side */}
        <div className="flex items-center gap-4 md:gap-16">
          <NavLink to="/">
            <FcSignature className="size-16" />
          </NavLink>
          {/* Search Input */}
          {/* the search container class here will help clos the dorp down on click */}
          <div className="relative w-40 sm:w-72 search-container">
            <FaSearch className="absolute top-2 left-1" />
            <input
              type="text"
              placeholder="marketing, fiction, business, science, horror"
              value={query}
              onChange={handleSearch}
              // onClick={() => setShowHint(true)}
              className="bg-slate-100 text-xs py-1 md:px-8 px-7 rounded focus:outline-none w-full"
            />
          </div>

          {/* showing search results */}
          {query && (
            <div className="h-24 w-40 sm:w-72 absolute top-15 left-21  bg-white/40 backdrop-blur-xs rounded-2xl">
              {filteredBooks.length > 0 ? (
                filteredBooks.map((book) => (
                  <NavLink to={`/books/${book._id}`}>
                    <p
                      key={book._id}
                      className="text-xs font-bold p-2 hover:bg-gray-100"
                    >
                      {book.title} -{" "}
                      <span className="text-blue">{book.category}</span>
                    </p>
                  </NavLink>
                ))
              ) : (
                <p className="p-2 text-gray-500">No results found.</p>
              )}
            </div>
          )}
        </div>

        {/* right side */}
        <div className="relative flex items-center space-x-1 md:space-x-3">
          {/* if the user is available, we will render a buton, if not, an icon */}
          {currentUser ? (
            <button
              onClick={() => setIsDropDownOpen(!isDropDownOpen)}
              className="cursor-pointer"
            >
              <img
                src={currentUser.photoURL || avatar}
                alt="user avatar"
                className={`size-12`}
              />
            </button>
          ) : (
            // after clicking the button, the drop down should appear.
            // I will write it away from this part but
            // I need to check both the user availability and dropdown tru state

            <NavLink to="/login">
              <HiUser className="size-6" />
            </NavLink>
          )}
          {/* admin access only */}
          {admin ? (
            <NavLink to="/dashboard">
              <img src={adminavatar} className="size-7" />
            </NavLink>
          ) : (
            <div className="relative group">
              <button
                className="sm:block cursor-pointer"
                onClick={handleAdminAccess}
              >
                <GrUserAdmin className="size-5" />
              </button>

              {/* Tooltip text */}
              <span className="absolute top-10 right-1 mb-10  text-xs text-white bg-black rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                Admin access only
              </span>
            </div>
          )}
          {/* admin access only */}

          {/* shopping cart */}
          <div className="bg-pink p-1 sm:px-6 py-2 rounded">
            <NavLink to="/cart" className={"flex items-center"}>
              <FaShoppingCart />
              {/* show the num of items in cart number */}
              {cartItems.length > 0 ? (
                <span className="text-sm font-semibold sm:ml-1">
                  {cartItems.length}
                </span>
              ) : (
                <span className="text-sm font-semibold sm:ml-1">0</span>
              )}
              {/* if no length in cart, show this span */}
            </NavLink>
          </div>
        </div>
        {/* right side dev */}
      </nav>
      {/* add the drop down here: */}
      {currentUser && isDropDownOpen && (
        <div className="absolute right-0 p-2 mt-2 mr-10 w-60 rounded-bl-md rounded-br-md z-50 shadow-lg  bg-white/92 backdrop-blur-xs">
          <ul>
            {navigation.map((item) => {
              return (
                <li
                  key={item.name}
                  className="py-2 px-1 test-sm hover:bg-pink"
                  onClick={() => setIsDropDownOpen(false)}
                >
                  <NavLink to={item.href}>{item.name}</NavLink>
                </li>
              );
            })}
            {/* logout button using zustand store */}
            <li>
              <button
                className="py-2 px-4 block w-full test-sm hover:bg-pink cursor-pointer mx-auto"
                onClick={() => {
                  logoutUser();
                  setIsDropDownOpen(false);
                }}
              >
                Logout
              </button>
            </li>
            {/* logout button using zustand store */}
          </ul>
        </div>
      )}
    </header>
  );
};

export default NavBar;
