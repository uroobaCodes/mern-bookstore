import { FaShoppingCart } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import useCartStore from "../../store/cartStore";
import { toast } from "react-toastify";

const Card = ({
  _id,
  title,
  description,
  category,
  coverImage,
  newPrice,
  oldPrice,
}) => {
  // bringing the additems from zustand cart store
  const { addItem, cartItems } = useCartStore();

  // make the item object here:
  const item = {
    _id,
    title,
    description,
    category,
    coverImage,
    newPrice,
    oldPrice,
  };

  // handle the book being added to the cart
  const handleAddToCart = (item) => {
    const existingItem = cartItems.find(
      (cartItem) => cartItem._id === item._id
    );
    if (existingItem) {
      toast.success(`${item.title} is already in the cart!`, {
        position: "bottom-left",
      });
    } else {
      addItem(item);
      toast.success(`${item.title} has been added to the cart!`, {
        position: "bottom-left",
      });
    }
  };
  // add item ended

  return (
    <div className="flex flex-col justify-center items-center md:flex-row border border-gray-400 rounded-lg overflow-hidden shadow-md w-[300px] md:w-[300px] lg:w-[350px] box-border">
      {/* Left: Product Image */}
      <div className="w-64 h-64 flex justify-center items-center overflow-hidden sm:mt-2 [@media(min-width:768px)]:mt-0">
        <NavLink to={`/books/${_id}`}>
          <img
            src={coverImage}
            alt={title}
            className="w-full h-full object-contain"
          />
        </NavLink>
      </div>

      {/* Right: Product Details */}
      <div className="w-full md:w-2/3 p-4 flex flex-col justify-between h-full">
        <div className="flex flex-col justify-between h-full">
          <NavLink to={`/books/${_id}`}>
            <h3 className="text-lg sm:text-xl font-bold mb-2 line-clamp-1 hover:text-blue-400">
              {title}
            </h3>
          </NavLink>
          <p className="text-gray-600 mb-4 line-clamp-2 text-sm sm:text-base">
            {description}
          </p>

          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium">${newPrice}</p>
            <p className="text-xs text-gray-400 line-through">${oldPrice}</p>
          </div>
        </div>

        {/* Add to Cart Button */}
        <button
          className="mt-4 px-3 py-1 text-black font-semibold rounded-md transition-all duration-200 text-sm p-2 w-40 self-center [@media(min-width:1021px):m-1]"
          style={{ backgroundColor: "#ffb6c1" }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#634f52")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#ffb6c1")}
          onClick={() => handleAddToCart(item)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};
export default Card;
