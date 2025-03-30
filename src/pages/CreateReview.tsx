import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Form, Button, Card, Alert } from "react-bootstrap";
import { getDecodedToken } from "../utils/authUtils";
import { createReview } from "../services/createreview.service";

const CreateReview: React.FC = () => {
  const { idLibro } = useParams<{ idLibro: string }>();
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");

  const [calificacion, setCalificacion] = useState<number>(5);
  const [comentario, setComentario] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const decodedToken = getDecodedToken(token);

  if (decodedToken.error) {
    return <Alert variant="danger">{decodedToken.error}</Alert>;
  }

  const userId = decodedToken.decoded?.sub;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      await createReview(userId!, idLibro!, calificacion, comentario, token!);
      setSuccess(true);
      setTimeout(() => navigate(`/libro/${idLibro}`), 2000);
    } catch {
      setError("Hubo un error al enviar la reseña. Inténtalo de nuevo.");
    }
  };

  return (
    <Container className="my-5">
      <Card className="shadow-sm border-0 rounded-lg p-4">
        <Card.Title className="text-center text-primary d-flex justify-content-center">
          Crear Reseña
        </Card.Title>
        <Card.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && (
            <Alert variant="success">
              Reseña enviada con éxito. Redirigiendo...
            </Alert>
          )}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Calificación</Form.Label>
              <Form.Select
                value={calificacion}
                onChange={(e) => setCalificacion(Number(e.target.value))}
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Comentario</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={comentario}
                onChange={(e) => setComentario(e.target.value)}
                placeholder="Escribe tu reseña aquí..."
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Enviar Reseña
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default CreateReview;
