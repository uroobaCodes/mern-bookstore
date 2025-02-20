import humming from "../../assets/humming.jpg";
import Banner from "../../components/Banner/Banner";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/footer/Footer";
import SearchBooks from "../../components/openLibraryAPI/SearchBooks";
import TopSellers from "../../components/topselling/TopSellers";

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
