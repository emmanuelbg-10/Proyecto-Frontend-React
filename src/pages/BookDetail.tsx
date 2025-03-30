import React, { useState, useEffect } from "react";
import {
  Container,
  Card,
  Button,
  Alert,
  Spinner,
  ListGroup,
} from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { Book } from "../models/Book";
import { Review } from "../models/Review";
import { fetchBook, fetchReviews } from "../services/book.service";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const BookDetail: React.FC = () => {
  const { idLibro } = useParams<{ idLibro: string }>();
  const navigate = useNavigate();
  const [book, setBook] = useState<Book | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadBookData = async () => {
      try {
        const data = await fetchBook(Number(idLibro));
        setBook(data);
        const reviewData = await fetchReviews(Number(idLibro));
        setReviews(reviewData);
      } catch {
        setError("Error al cargar los datos.");
      } finally {
        setLoading(false);
      }
    };
    loadBookData();
  }, [idLibro]);

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;
  if (!book) return <Alert variant="warning">Libro no encontrado</Alert>;

  // Función para mostrar las estrellas según la calificación
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;

    const stars = [];
    for (let i = 0; i < fullStars; i++)
      stars.push(<FaStar key={`full-${i}`} />);
    if (halfStar) stars.push(<FaStarHalfAlt key="half" />);
    for (let i = 0; i < emptyStars; i++)
      stars.push(<FaRegStar key={`empty-${i}`} />);

    return stars;
  };

  return (
    <Container className="my-4">
      <Card
        className="shadow-lg border-0 rounded-lg"
        style={{ maxWidth: "750px", margin: "0 auto" }}
      >
        <Card.Img
          variant="top"
          src={book.imagenUrl}
          alt={book.titulo}
          style={{ height: "400px", objectFit: "cover" }}
        />
        <Card.Body>
          <Card.Title className="text-center">{book.titulo}</Card.Title>
          <Card.Subtitle className="text-center text-muted">
            {book.usuario.username}
          </Card.Subtitle>
          <Card.Text className="text-center">
            <strong>Género:</strong> {book.genero}
          </Card.Text>
          <div className="d-flex justify-content-center gap-3">
            <Button variant="success" onClick={() => navigate(`resena`)}>
              Crear Reseña
            </Button>
            <Button variant="primary" onClick={() => navigate(`compra-libro`)}>
              Comprar Libro
            </Button>
          </div>
        </Card.Body>
      </Card>

      {/* Sección de reseñas */}
      <Card className="mt-4">
        <Card.Header>
          <h5>Reseñas</h5>
        </Card.Header>
        <Card.Body>
          {reviews.length === 0 ? (
            <Alert variant="info">Aún no hay reseñas para este libro.</Alert>
          ) : (
            <ListGroup>
              {reviews.map((review) => (
                <ListGroup.Item key={review.id}>
                  (Calificación: <span>{renderStars(review.calificacion)}</span>
                  ):
                  <p>{review.comentario}</p>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default BookDetail;
