import { Outlet } from "react-router-dom";
import Navigation from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import LoadingErrorHandler from "../components/LoadingErrorHandler/LoadingErrorHandler";
import { useLoading } from "../context/LoadingContext";

const DefaultLayout = () => {
  const { loading, error } = useLoading(); // Accede al contexto

  return (
    <div className="app-container">
      <Navigation />
      <div className="main-content">
        <LoadingErrorHandler loading={loading} error={error}>
          <Outlet />
        </LoadingErrorHandler>
      </div>
      <Footer />
    </div>
  );
};

export default DefaultLayout;
