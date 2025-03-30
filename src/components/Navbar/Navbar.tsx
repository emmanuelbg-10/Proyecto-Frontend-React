import { Container, Nav, Navbar, Button, NavDropdown } from "react-bootstrap";
import { useTheme } from "../Theme/ThemeContext";
import { FaUser, FaBook, FaMoon, FaSun } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import GenresDropdown from "./GenresDropdown"; // 🔹 Importa el componente
import "./Navbar.css";

function Navigation() {
  const { darkMode, toggleDarkMode } = useTheme();
  const navigate = useNavigate();
  const authToken = localStorage.getItem("authToken");

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userId");
    window.location.reload();
  };

  const handleLoginRedirect = () => {
    navigate("/login", { replace: true });
  };

  return (
    <Navbar
      expand="lg"
      className={`sticky-top ${
        darkMode ? "bg-dark navbar-dark" : "bg-light navbar-light"
      }`}
      style={{
        boxShadow: "0 2px 4px rgba(0,0,0,.1)",
        marginBottom: "2rem",
      }}
    >
      <Container>
        <Navbar.Brand href="/" className="d-flex align-items-center">
          <FaBook className="me-2" size={24} />
          <span className="brand-text">BibliotecAtos</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/catalog">Catálogo</Nav.Link>
            <GenresDropdown />
          </Nav>

          <Nav>
            <Button
              variant={darkMode ? "light" : "dark"}
              className="me-2"
              onClick={toggleDarkMode}
            >
              {darkMode ? <FaSun /> : <FaMoon />}
            </Button>

            <NavDropdown title={<FaUser />} id="user-dropdown" align="end">
              {authToken ? (
                <>
                  <NavDropdown.Item href="/prestamos">
                    Mis Préstamos
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/resenas">
                    Mis Reseñas
                  </NavDropdown.Item>

                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/account">Mi Cuenta</NavDropdown.Item>
                  <NavDropdown.Item onClick={handleLogout}>
                    Cerrar Sesión
                  </NavDropdown.Item>
                </>
              ) : (
                <>
                  <NavDropdown.Item onClick={handleLoginRedirect}>
                    Iniciar Sesión
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/register">
                    Registrarse
                  </NavDropdown.Item>
                </>
              )}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
