import { useEffect, useState } from "react";
import { API_USERS } from "../services/apiUrl";
import { getDecodedToken } from "../utils/authUtils";
import { Alert, Spinner, Card, Container, Row, Col } from "react-bootstrap";
import { Prestamo } from "../models/Loan";

const PrestamosUsuario = () => {
  const [prestamos, setPrestamos] = useState<Prestamo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrestamos = async () => {
      const token = localStorage.getItem("authToken");
      const { decoded, error: tokenError } = getDecodedToken(token);

      if (tokenError || !decoded?.sub) {
        setError("No estás autenticado.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${API_USERS}/${decoded.sub}/prestamos`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          throw new Error("Error al obtener los préstamos.");
        }

        const data: Prestamo[] = await response.json();
        setPrestamos(data);
      } catch {
        setError("No se pudieron cargar los préstamos.");
      } finally {
        setLoading(false);
      }
    };

    fetchPrestamos();
  }, []);

  return (
    <Container className="mt-4">
      <h2 className="text-center">Mis Préstamos</h2>
      {loading && (
        <Spinner animation="border" role="status" className="d-block mx-auto" />
      )}
      {error && (
        <Alert variant="danger" className="mt-3">
          {error}
        </Alert>
      )}

      {!loading &&
        !error &&
        (prestamos.length === 0 ? (
          <Alert variant="info" className="mt-3">
            No tienes préstamos activos.
          </Alert>
        ) : (
          <>
            <Alert variant="success" className="mt-3">
              Tienes {prestamos.length} préstamo(s).
            </Alert>
            <Row className="mt-3">
              {prestamos.map((prestamo) => (
                <Col md={4} key={prestamo.id} className="mb-3">
                  <Card>
                    <Card.Body>
                      <Card.Title>Préstamo #{prestamo.id}</Card.Title>
                      <Card.Text>
                        <strong>Inicio:</strong> {prestamo.fechaInicio} <br />
                        <strong>Vencimiento:</strong>{" "}
                        {prestamo.fechaVencimiento} <br />
                        <strong>Devuelto:</strong>{" "}
                        {prestamo.devuelto ? "Sí" : "No"}
                      </Card.Text>
                      {prestamo.fechaDevolucion && (
                        <Card.Text>
                          <strong>Fecha de devolución:</strong>{" "}
                          {prestamo.fechaDevolucion}
                        </Card.Text>
                      )}
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </>
        ))}
    </Container>
  );
};

export default PrestamosUsuario;
