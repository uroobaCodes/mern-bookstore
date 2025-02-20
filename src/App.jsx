// book-store app

import { RouterProvider } from "react-router-dom";
import router from "./routers/Router.jsx";
import { ToastContainer } from "react-toastify"; // Import ToastContainer
import "react-toastify/dist/ReactToastify.css";
// user authorization
import { useAuthStore } from "./store/AuthContext.js";
// initialize admin state
import { useAdminAppContext } from "./store/adminAppContext.js";
import { useEffect } from "react";

function App() {
  // firebase user state
  const { initAuth } = useAuthStore();
  // Call initAuth once when the app is mounted: firebase
  useEffect(() => {
    const unsubscribe = initAuth();

    // Cleanup function to stop listening when component unmounts
    return () => {
      unsubscribe();
    };
  }, [initAuth]);

  // to have a global admin state
  const { initializeAdminState } = useAdminAppContext();
  // admin app wide state:
  useEffect(() => {
    initializeAdminState();
  }, [initializeAdminState]);
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
      <ToastContainer />
    </>
  );
}

export default App;
