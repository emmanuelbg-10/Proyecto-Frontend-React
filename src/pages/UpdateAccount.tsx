import { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Alert,
  Spinner,
  Card,
} from "react-bootstrap";
import { getUsuario, updateUsuario } from "../services/user.service";
import { Usuario } from "../models/Usuario";
import { getDecodedToken } from "../utils/authUtils";

export default function UpdateAccount() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<Usuario | null>(null);
  const [usuarioId, setUsuarioId] = useState<number | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const { decoded, error } = getDecodedToken(token);

    if (error) {
      setError(error);
    } else if (decoded) {
      setUsuarioId(decoded.sub);
    }
  }, []);

  useEffect(() => {
    if (!usuarioId) return;

    const fetchUser = async () => {
      setLoading(true);
      try {
        const data = await getUsuario(usuarioId);
        setUser(data);
      } catch (err) {
        setError(
          `Error al cargar los datos del usuario: ${
            err instanceof Error ? err.message : "Error desconocido"
          }`
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [usuarioId]);

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) {
      setError("No se encontró el usuario.");
      return;
    }

    setError(null);
    setSuccess(null);
    setLoading(true);

    const formData = new FormData(e.target as HTMLFormElement);
    const updatedData: Usuario = {
      ...user,
      username: formData.get("username") as string,
      correo: formData.get("correo") as string,
    };

    try {
      if (usuarioId !== null) {
        const updatedUser = await updateUsuario(usuarioId, updatedData);
        setSuccess("Datos actualizados exitosamente.");
        setUser(updatedUser);
      } else {
        setError("El ID del usuario no es válido.");
      }
    } catch (err) {
      setError(
        `Error al actualizar los datos: ${
          err instanceof Error ? err.message : "Error desconocido"
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <Row className="justify-content-center w-100">
        <Col xs={12} md={6} lg={4}>
          <Card.Body>
            <h2 className="text-center mb-4">Actualizar Cuenta</h2>

            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}

            {loading ? (
              <div className="d-flex justify-content-center">
                <Spinner animation="border" variant="primary" />
              </div>
            ) : (
              user && (
                <Form onSubmit={handleUpdate}>
                  <Form.Group className="mb-3">
                    <Form.Label>Nombre de usuario</Form.Label>
                    <Form.Control
                      type="text"
                      name="username"
                      defaultValue={user.username}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Correo electrónico</Form.Label>
                    <Form.Control
                      type="email"
                      name="correo"
                      defaultValue={user.correo}
                      required
                    />
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
                        Actualizando...
                      </>
                    ) : (
                      "Actualizar"
                    )}
                  </Button>
                </Form>
              )
            )}
          </Card.Body>
        </Col>
      </Row>
    </Container>
  );
}
