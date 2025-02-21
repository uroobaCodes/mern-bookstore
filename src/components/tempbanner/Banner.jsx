import { useEffect, useState } from "react";
import bannerImg from "../../assets/banner.png";
import { useBookStore } from "../../store/bookStore.js";
import { NavLink } from "react-router-dom";

const Banner = () => {
  const { fetchWeeklyBook, weeklyBook } = useBookStore();
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [id, setId] = useState("");
  useEffect(() => {
    fetchWeeklyBook();
  }, []);
  useEffect(() => {
    if (weeklyBook?.data?.length > 0) {
      setId(weeklyBook.data[0]._id);
      setTitle(weeklyBook.data[0].title);
      setImage(weeklyBook.data[0].coverImage);
    }
  }, [weeklyBook]);
  // console.log(weeklyBook);
  return (
    <>
      <div className="flex flex-col md:flex-row-reverse gap-12 mx-auto justify-between items-center px-20 py-3  bg-white/40 backdrop-blur-xs rounded-3xl">
        {/* images */}
        <div className="w-48 md:w-64 lg:w-96 flex items-center md:justify-end">
          <img
            src={image}
            alt=""
            className="rounded-2xl shadow-2xl border border-gray-200 bg-white aspect-[3/4] object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* text */}
        <div className="w-80 md:w-96">
          <h1 className="text-2xl md:text-4xl font-medium mb-7">
            New release this week:
            <NavLink to={`/books/${id}`}>
              <span className="text-blue hover:text-yellow hover:rotate-5 transition duration-500 block py-3 drop-shadow-[2.5px_2.5px_2px_rgba(0,0,0,0.8)]">
                {title}
              </span>
            </NavLink>
          </h1>

          <p className="mb-10 text-xs">
            New book releases are here, bringing fresh insights, thrilling
            stories, and exciting discoveries! Whether you're into cutting-edge
            technology, spine-chilling horror, thought-provoking science,
            compelling fiction, business strategies, or marketing trends,
            there's something for everyone. Don't miss out!
          </p>
          {/* <button className="btn-primary w-32 text-xs">Subscribe</button> */}
        </div>
      </div>
    </>
  );
};
export default Banner;
