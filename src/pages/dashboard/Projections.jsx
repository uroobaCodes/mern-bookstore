import { useState, useEffect } from "react";
import { MdIncompleteCircle } from "react-icons/md";

const Projections = () => {
  const [loading, setLoading] = useState(true);
  const [mongoData, setMongoData] = useState({});
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/auth/admin`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          const errorMessage = await response.text();
          console.log("error fetching data: " + errorMessage);
          setLoading(false);
          return;
        }
        const data = await response.json();

        setLoading(false);
        setMongoData(data);
      } catch (error) {
        console.log("Error:" + error);
        setLoading(false);
      }
    }; //fetch function ends, we are still in useEffect

    if (token) {
      fetchData();
    } else {
      setLoading(false);
    }
  }, [token]);

  if (loading) {
    return (
      <>
        <div className="mx-auto w-24 mt-20">
          Loading...
          <div className="mr-3 size-20 border-2 border-slate-700 border-t-slate-200 rounded-full animate-spin"></div>
        </div>
      </>
    );
  }

  const totalSalesFixed = mongoData?.totalSales.toFixed(2);

  return (
    <>
      <div className="relative">
        <section className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
          <div className="flex items-center p-8 bg-white shadow rounded-lg">
            <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-purple-600 bg-purple-100 rounded-full mr-6">
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
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <div>
              <span className="block text-2xl font-bold">
                {mongoData?.totalBooks}
              </span>
              <span className="block text-gray-500">Products</span>
            </div>
          </div>
          <div className="flex items-center p-8 bg-white shadow rounded-lg">
            <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-green-600 bg-green-100 rounded-full mr-6">
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
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
            </div>
            <div>
              <span className="block text-2xl font-bold">
                ${totalSalesFixed}
              </span>
              <span className="block text-gray-500">Total Sales</span>
            </div>
          </div>
          <div className="flex items-center p-8 bg-white shadow rounded-lg">
            <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-red-600 bg-red-100 rounded-full mr-6">
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
                  d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
                />
              </svg>
            </div>
            <div>
              <span className="inline-block text-2xl font-bold">
                {mongoData?.trendingBooksPlainNumber}
              </span>
              <span className="inline-block text-xl text-gray-500 font-semibold">
                (13%)
              </span>
              <span className="block text-gray-500">
                Trending Books in This Month
              </span>
            </div>
          </div>
          <div className="flex items-center p-8 bg-white shadow rounded-lg">
            <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-blue-600 bg-blue-100 rounded-full mr-6">
              <MdIncompleteCircle className="size-6" />
            </div>
            <div>
              <span className="block text-2xl font-bold">
                {mongoData?.totalOrders}
              </span>
              <span className="block text-gray-500">Total Orders</span>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
export default Projections;
