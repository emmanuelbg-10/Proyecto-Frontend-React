import React from "react";
import { Container, Row, Col, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  FaBook,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";
import { useTheme } from "../Theme/ThemeContext";
import "./Footer.css";

const Footer: React.FC = () => {
  const { darkMode } = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={`py-4 ${
        darkMode ? "bg-dark text-light" : "bg-light text-dark"
      }`}
      style={{
        boxShadow: "0 2px 4px rgba(0,0,0,.1)",
        marginTop: "2.5rem",
      }}
    >
      <Container>
        <Row className="py-4">
          <Col lg={4} md={6}>
            <Nav.Link
              as={Link}
              to="/"
              className="d-flex align-items-center mb-2 text-decoration-none"
            >
              <FaBook size={24} className="me-2" />
              <h5 className="mb-0 brand-text">BibliotecAtos</h5>
            </Nav.Link>
            <p className="mb-0">
              Tu biblioteca digital de confianza. Descubre, aprende y explora
              nuestra extensa colección de libros y recursos.
            </p>
          </Col>

          <Col lg={2} md={6}>
            <h6 className="text-uppercase fw-bold mb-2">Enlaces</h6>
            <Nav className="flex-column footer-nav-links">
              <Nav.Link as={Link} to="/catalog">
                Catálogo
              </Nav.Link>

              <Nav.Link
                as={Link}
                to="/contact"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                Contacto
              </Nav.Link>
            </Nav>
          </Col>

          <Col lg={3} md={6}>
            <h6 className="text-uppercase fw-bold mb-2">Servicios</h6>
            <Nav className="flex-column footer-nav-links">
              <Nav.Link as={Link} to="/prestamos">
                Préstamos
              </Nav.Link>
              <Nav.Link as={Link} to="/ayuda">
                Ayuda
              </Nav.Link>
            </Nav>
          </Col>

          <Col lg={3} md={6}>
            <h6 className="text-uppercase fw-bold mb-2">Contacto</h6>
            <Nav className="flex-column footer-nav-links">
              <Nav.Link
                href="mailto:bibliotecatos@gmail.com"
                className="d-flex align-items-center"
              >
                <FaEnvelope className="me-2" />
                bibliotecatos@gmail.com
              </Nav.Link>
              <Nav.Link
                href="tel:123-456-7890"
                className="d-flex align-items-center"
              >
                <FaPhone className="me-2" /> (+34) 690 19 94 25
              </Nav.Link>
            </Nav>
            <div className="d-flex gap-3 mt-2">
              <Nav.Link href="#" target="_blank">
                <FaFacebook size={20} />
              </Nav.Link>
              <Nav.Link href="#" target="_blank">
                <FaTwitter size={20} />
              </Nav.Link>
              <Nav.Link href="#" target="_blank">
                <FaInstagram size={20} />
              </Nav.Link>
              <Nav.Link href="#" target="_blank">
                <FaLinkedin size={20} />
              </Nav.Link>
            </div>
          </Col>
        </Row>

        <Row className="py-3">
          <Col className="text-center">
            <small>
              © {currentYear} BibliotecAtos. Todos los derechos reservados.
            </small>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
