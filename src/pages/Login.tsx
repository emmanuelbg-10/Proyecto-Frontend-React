// src/pages/Login.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Form,
  Button,
  Container,
  Alert,
  Row,
  Col,
  Spinner,
} from "react-bootstrap";
import { loginUser } from "../services/auth.service";
import { useTheme } from "../components/Theme/ThemeContext";
import { AuthResponse, LoginCredentials } from "../models/Auth";

export default function Login() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { darkMode } = useTheme();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const credentials: LoginCredentials = {
      username:
        (
          (e.target as HTMLFormElement).elements.namedItem(
            "username"
          ) as HTMLInputElement
        )?.value || "",
      password:
        (
          (e.target as HTMLFormElement).elements.namedItem(
            "password"
          ) as HTMLInputElement
        )?.value || "",
    };

    try {
      const result: AuthResponse = await loginUser(credentials);
      localStorage.setItem("authToken", result.token);

      navigate("/"); // Redirige a la página principal o dashboard
    } catch {
      setError("Usuario o contraseña incorrectos");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      className={`login-page ${darkMode ? "dark-mode" : ""}`}
      fluid
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Row
        className="justify-content-center align-items-center"
        style={{ width: "100%" }}
      >
        <Col xs={12} md={6} lg={4}>
          <div className={`login-container ${darkMode ? "dark-mode" : ""}`}>
            <h2 className="text-center mb-4">Iniciar sesión</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleLogin}>
              <Form.Group className="mb-3">
                <Form.Label>Nombre de usuario</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  placeholder="Ingresa tu nombre de usuario"
                  required
                  isInvalid={!!error}
                  className="input-field"
                />
                <Form.Control.Feedback type="invalid">
                  {error}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Ingresa tu contraseña"
                  required
                  isInvalid={!!error}
                  className="input-field"
                />
                <Form.Control.Feedback type="invalid">
                  {error}
                </Form.Control.Feedback>
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                className="w-100"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                      className="me-2"
                    />
                    Cargando...
                  </>
                ) : (
                  "Iniciar sesión"
                )}
              </Button>
            </Form>
            <div className="text-center mt-3">
              <span>¿No tienes una cuenta? </span>
              <a href="/register">Regístrate</a>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
