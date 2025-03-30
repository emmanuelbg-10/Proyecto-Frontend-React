import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Catalog from "./pages/Catalog";
import UpdateAccount from "./pages/UpdateAccount";
import Error from "./components/Error/Error";
import DefaultLayout from "./layouts/DefaultLayout"; // Adjust the path as needed
import EmptyLayout from "./layouts/EmptyLayout"; // Adjust the path as needed
import { ThemeProvider } from "./components/Theme/ThemeContext";
import ProtectedRoute from "./routes/ProtectedRoute"; // Importar el ProtectedRoute
import Login from "./pages/Login";
import { LoadingProvider } from "./context/LoadingContext";
import Cuenta from "./pages/Account";
import CreateBook from "./pages/CreateBook";
import BookDetail from "./pages/BookDetail"; // Ajusta la ruta según tu estructura
import CreateReview from "./pages/CreateReview";
import Register from "./pages/Register";
import Loan from "./pages/Loan";

const App = () => {
  const isAuthenticated = !!localStorage.getItem("authToken");

  return (
    <LoadingProvider>
      <ThemeProvider>
        <Routes>
          <Route path="/" element={<DefaultLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="libro/:idLibro" element={<BookDetail />} />
            <Route path="prestamos" element={<Loan />} />

            <Route
              path="crear-libro"
              element={
                <ProtectedRoute requiredRole="AUTOR">
                  <CreateBook />
                </ProtectedRoute>
              }
            />

            <Route
              path="libro/:idLibro/resena"
              element={
                <ProtectedRoute requiredRole="USUARIO">
                  <CreateReview />
                </ProtectedRoute>
              }
            />

            <Route
              path="update-account"
              element={
                <ProtectedRoute requiredRole="USUARIO">
                  <UpdateAccount />
                </ProtectedRoute>
              }
            />
            <Route
              path="account"
              element={
                <ProtectedRoute requiredRole="USUARIO">
                  <Cuenta />
                </ProtectedRoute>
              }
            />
            <Route path="catalog" element={<Catalog />} />
          </Route>

          {/* Rutas sin Navbar ni Footer */}
          <Route path="/" element={<EmptyLayout />}>
            <Route
              path="login"
              element={isAuthenticated ? <Navigate to="/" /> : <Login />}
            />
            <Route
              path="register"
              element={isAuthenticated ? <Navigate to="/" /> : <Register />}
            />

            <Route path="*" element={<Error />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </LoadingProvider>
  );
};

export default App;
