import { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Alert,
  Spinner,
  Card,
  Image,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getUsuario } from "../services/user.service";
import { Usuario } from "../models/Usuario";
import { getDecodedToken } from "../utils/authUtils";
import defaultAvatar from "../assets/avatar-default.svg";

export default function Cuenta() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<Usuario | null>(null);
  // const { darkMode } = useTheme();
  const [usuarioId, setUsuarioId] = useState<number | null>(null);
  const navigate = useNavigate();

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
    if (usuarioId) {
      setLoading(true);
      (async () => {
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
      })();
    }
  }, [usuarioId]);

  return (
    <Container
      className="cuenta-page"
      fluid
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Row className="justify-content-center" style={{ width: "100%" }}>
        <Col xs={12} md={8} lg={5}>
          <Card className={`shadow-lg p-4 text-center`}>
            <Card.Body>
              <Image
                src={defaultAvatar}
                roundedCircle
                width={100}
                height={100}
                className="mb-3"
              />
              <h2 className="mb-3">Mi Cuenta</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              {loading && <Spinner animation="border" variant="primary" />}
              {user && !loading && (
                <div>
                  <p className="mb-1">
                    <strong>Nombre:</strong> {user.username}
                  </p>
                  <p className="mb-1">
                    <strong>Correo:</strong> {user.correo}
                  </p>
                  <p className="mb-3">
                    <strong>Rol:</strong> {user.rol}
                  </p>
                  <Button
                    variant="primary"
                    className="w-100 mb-2"
                    onClick={() => navigate("/update-account")}
                  >
                    Actualizar Cuenta
                  </Button>
                  {user.rol === "AUTOR" && (
                    <Button
                      variant="success"
                      className="w-100"
                      onClick={() => navigate("/crear-libro")}
                    >
                      Crear Libro
                    </Button>
                  )}
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
