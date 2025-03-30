import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Alert, Col, Spinner } from "react-bootstrap";
import { registerUser } from "../services/auth.service";
import { useTheme } from "../components/Theme/ThemeContext";
import { RegisterCredentials } from "../models/Auth";
import "../styles/Register.css";

export default function Register() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { darkMode } = useTheme();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    const form = e.target as HTMLFormElement;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      ?.value;
    const confirmPassword = (
      form.elements.namedItem("confirmPassword") as HTMLInputElement
    )?.value;

    if (password.length < 6) {
      setLoading(false);
      return setError("La contraseña debe tener al menos 6 caracteres.");
    }

    if (password !== confirmPassword) {
      setLoading(false);
      return setError("Las contraseñas no coinciden.");
    }

    const credentials: RegisterCredentials = {
      username:
        (form.elements.namedItem("username") as HTMLInputElement)?.value || "",
      correo:
        (form.elements.namedItem("correo") as HTMLInputElement)?.value || "",
      password,
      telefono:
        (form.elements.namedItem("telefono") as HTMLInputElement)?.value || "",
      rol: (form.elements.namedItem("rol") as HTMLSelectElement)?.value as
        | "USUARIO"
        | "AUTOR",
    };

    try {
      await registerUser(credentials);
      setSuccess("Registro exitoso. Redirigiendo...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error: unknown) {
      if (
        error instanceof Error &&
        "response" in error &&
        (error as { response: { data: { message: string } } }).response.data
          .message
      ) {
        const errorMessage = (
          error as { response: { data: { message: string } } }
        ).response.data.message;

        if (errorMessage.includes("correo")) {
          setError("Este correo ya está registrado.");
        } else if (errorMessage.includes("teléfono")) {
          setError("Este teléfono ya está registrado.");
        } else {
          setError(errorMessage);
        }
      } else {
        setError("Error al registrar usuario. Inténtalo nuevamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Col xs={12} md={6} lg={4}>
        <div className={`register-container ${darkMode ? "dark-mode" : ""}`}>
          <h2 className="text-center mb-4">Crea tu cuenta</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}
          <Form onSubmit={handleRegister}>
            <Form.Group className="mb-3">
              <Form.Label>Nombre de usuario</Form.Label>
              <Form.Control
                type="text"
                name="username"
                placeholder="Ingresa tu nombre de usuario"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Correo</Form.Label>
              <Form.Control
                type="email"
                name="correo"
                placeholder="Ingresa tu correo"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Ingresa tu contraseña"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Confirmar Contraseña</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                placeholder="Repite tu contraseña"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Teléfono</Form.Label>
              <Form.Control
                type="tel"
                name="telefono"
                placeholder="Ingresa tu número de teléfono"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Tipo de cuenta</Form.Label>
              <Form.Select name="rol" required>
                <option value="USUARIO">Usuario</option>
                <option value="AUTOR">Autor</option>
              </Form.Select>
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
                  Creando usuario...
                </>
              ) : (
                "Registrarse"
              )}
            </Button>
          </Form>
          <div className="text-center mt-3">
            <span>¿Ya tienes una cuenta? </span>
            <a href="/login">Inicia sesión</a>
          </div>
        </div>
      </Col>
    </Container>
  );
}
