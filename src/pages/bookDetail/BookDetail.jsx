import { useParams } from "react-router-dom";
import { useBookStore } from "../../store/bookStore";
import { useEffect, useState } from "react";
import { IoTrendingUp } from "react-icons/io5";
import { IoTrendingDownOutline } from "react-icons/io5";
import useCartStore from "../../store/cartStore";
import { toast } from "react-toastify";
import Footer from "../../components/footer/Footer";

const BookDetail = () => {
  const { id } = useParams();
  const { singleBook, fetchSingleBook, isLoading } = useBookStore();
  const [bookObj, setBookObj] = useState({});
  const { addItem, cartItems } = useCartStore();

  useEffect(() => {
    fetchSingleBook(id);
  }, [fetchSingleBook, id]);

  useEffect(() => {
    // console.log(singleBook);
    if (singleBook?.data) {
      setBookObj({
        title: singleBook.data.title,
        description: singleBook.data.description,
        category: singleBook.data.category,
        coverImg: singleBook.data.coverImage,
        newPrice: singleBook.data.newPrice,
        oldPrice: singleBook.data.oldPrice,
        trending: singleBook.data.trending,
      });
    }
  }, [singleBook]);

  const handleAddToCart = () => {
    const item = {
      _id: id,
      title: bookObj.title,
      description: bookObj.description,
      category: bookObj.category,
      coverImage: bookObj.coverImg,
      newPrice: bookObj.newPrice,
      oldPrice: bookObj.oldPrice,
    };
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

  if (isLoading) {
    return (
      <>
        <div className="mx-auto w-24">
          Loading...
          <div className="mr-3 size-20 border-2 border-slate-700 border-t-slate-200 rounded-full animate-spin"></div>
        </div>
      </>
    );
  }
  return (
    <>
      {" "}
      <div className="relative h-screen flex flex-col">
        {/* book details below */}
        <div className="w-96 md:w-1/2 mx-auto mt-10 mb-50 bg-[#fcf0f2] drop-shadow-lg ">
          {/* book detes */}
          {/* trending */}
          <div className="relative flex justify-between">
            <h1 className="text-2xl md:text-4xl font-bold underline underline-offset-2">
              {bookObj.title}
            </h1>
            <div>
              {bookObj.trending ? (
                <IoTrendingUp className="text-red-600 text-4xl" />
              ) : (
                <IoTrendingDownOutline className="text-blue-800 text-4xl" />
              )}
            </div>
          </div>
          {/* trending */}
          {/* wrapper for two columns */}
          <div className=" flex flex-col items-center md:grid md:grid-cols-2 lg:items-start">
            {/* image */}
            <div className="w-28 md:w-40 lg:w-68 p-1 mt-3 flex items-center">
              <img
                src={bookObj.coverImg}
                alt=""
                className="rounded-2xl drop-shadow-2xl border border-gray-200 bg-white aspect-[3/4] object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            {/* image */}

            <div className="grid border-t border-slate-400 md:border-none size-full p-5 justify-center">
              <div className="flex flex-col justify-between">
                <p>{bookObj.description}</p>
                <p>
                  {" "}
                  <span className="text-2xl md:text-3xl font-medium">
                    ${bookObj.newPrice}
                  </span>{" "}
                  <span className="text-md text-gray-400 line-through">
                    ${bookObj.oldPrice}
                  </span>
                </p>
              </div>

              {/* add to cart */}
              <button
                className="mt-5 py-1 self-end text-black font-semibold rounded-md transition-all duration-200 bg-pink hover:bg-[#634f52] hover:text-slate-200 focus:outline-none"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
            </div>

            {/* add to cart */}
          </div>
          {/* wrapper for two coumns */}
        </div>
        {/* wrapper underneath  */}
        <div className="mt-auto">
          <Footer />
        </div>
      </div>
    </>
  );
};
export default BookDetail;
