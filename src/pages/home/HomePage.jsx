import humming from "../../assets/humming.jpg";
import NavBar from "../../components/NavBar/NavBar.jsx";
import Footer from "../../components/footer/Footer.jsx";
import SearchBooks from "../../components/openLibraryAPI/SearchBooks.jsx";
import TopSellers from "../../components/topselling/TopSellers.jsx";
import Banner from "../../components/Banner/Banner.jsx";

const HomePage = () => {
  return (
    <>
      <div className="relative h-full ">
        <img
          src={humming}
          alt=""
          className="absolute top-0 left-0 -z-10 bg-bottom object-cover"
        />

        <NavBar />
        <div className="w-sm md:w-3xl  mx-auto mt-30">
          <Banner />
        </div>

        <div className="mx-auto items-center mt-30">
          <TopSellers />
        </div>

        <SearchBooks />
        <Footer />
      </div>
    </>
  );
};
export default HomePage;
