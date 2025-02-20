import { useEffect, useState } from "react";
import { getUniqueCategories } from "../../utils/uniqueCategories";
import Card from "../card/Card";
import { useBookStore } from "../../store/bookStore";
// swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const TopSellers = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("marketing");
  const [sameBooks, setSameBooks] = useState([]);

  // get state from zustand store
  const { fetchBooks, bookData, fetchSingleBook, singleBook } = useBookStore();

  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    if (bookData.length > 0) {
      const uniqueCategories = getUniqueCategories(bookData);
      setCategories(uniqueCategories);
    }
  }, [bookData]);

  useEffect(() => {
    function filterBooks(arr, str) {
      const stringOne = str.toString();
      const filteredBooks = arr.filter((item) => item.category === stringOne);
      return filteredBooks;
    }

    // Ensure books are fetched before filtering
    if (bookData.length > 0) {
      setSameBooks(filterBooks(bookData, selectedCategory));
    }
  }, [selectedCategory, bookData]);

  return (
    <div className="py-5 px-5">
      <h2 className="text-3xl font-semibold mb-6">Top Sellers</h2>

      {/* category filtering in drop down */}
      <div className="mb-8 flex items-center">
        <label htmlFor="category">Choose a genre:</label>

        <select
          name="category"
          id="category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border bg-slate-100 border-gray-200 rounded-md px-4 py-2 ml-2 focus:outline-none"
        >
          {categories.map((category, index) => (
            <option value={category} key={index}>
              {category}
            </option>
          ))}
        </select>
      </div>
      {/* dropdown ends */}

      {/* slider */}

      <Swiper
        modules={[Navigation]}
        navigation={true} // Enables arrows
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          775: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="mySwiper"
      >
        {sameBooks.length > 0 &&
          sameBooks.map((item) => (
            <SwiperSlide key={item._id}>
              <Card {...item} />
            </SwiperSlide>
          ))}
      </Swiper>
      {/* slider */}
    </div>
  );
};
export default TopSellers;
