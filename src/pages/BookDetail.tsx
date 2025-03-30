import React, { useState, useEffect } from "react";
import { Container, Card, Button, ListGroup } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { Book } from "../models/Book";
import { Review } from "../models/Review";
import {
  fetchBook,
  fetchReviews,
  fetchBookCopy,
  createLoan,
} from "../services/book.service";
import { FaStar, FaRegStar } from "react-icons/fa";
import LoadingErrorHandler from "../components/LoadingErrorHandler/LoadingErrorHandler";
import { getDecodedToken } from "../utils/authUtils"; // Asegúrate de importar la función

const BookDetail: React.FC = () => {
  const { idLibro } = useParams<{ idLibro: string }>();
  const navigate = useNavigate();
  const [book, setBook] = useState<Book | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isBuying, setIsBuying] = useState<boolean>(false);
  const [availableCopies, setAvailableCopies] = useState<number>(0);

  useEffect(() => {
    const loadBookData = async () => {
      try {
        const data = await fetchBook(Number(idLibro));
        setBook(data);
        const reviewData = await fetchReviews(Number(idLibro));
        setReviews(reviewData);

        const bookCopies = await fetchBookCopy(Number(idLibro));
        setAvailableCopies(bookCopies.length);
      } catch {
        setError("Error al cargar los datos.");
      } finally {
        setLoading(false);
      }
    };
    loadBookData();
  }, [idLibro]);

  const handleBuy = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setTimeout(() => setError(null), 3000);
      navigate("/login");
      return;
    }

    // Decodificar el token y obtener el id del usuario
    const { decoded, error } = getDecodedToken(token);
    if (error) {
      setError(error);
      setTimeout(() => setError(null), 3000);
      return;
    }

    const userId = decoded?.sub;

    if (availableCopies === 0) {
      setError("Sin stock");
      setTimeout(() => setError(null), 3000);
      return;
    }

    if (book && userId) {
      setIsBuying(true);
      try {
        const bookCopies = await fetchBookCopy(Number(idLibro));
        if (bookCopies.length > 0) {
          // Pasamos el userId como parámetro
          await createLoan(userId, bookCopies[0].id);
          setSuccess("¡Compra exitosa!");
          setAvailableCopies(bookCopies.length - 1);
        } else {
          setError("No hay copias disponibles para este libro.");
        }
      } catch {
        setError("Error al realizar la compra.");
      } finally {
        setIsBuying(false);
        setTimeout(() => {
          setError(null);
          setSuccess(null);
        }, 3000);
      }
    }
  };

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const emptyStars = 5 - fullStars;
    const stars = [];
    for (let i = 0; i < fullStars; i++)
      stars.push(<FaStar key={`full-${i}`} />);
    for (let i = 0; i < emptyStars; i++)
      stars.push(<FaRegStar key={`empty-${i}`} />);
    return stars;
  };

  return (
    <LoadingErrorHandler loading={loading} error={error}>
      <Container className="my-4">
        {success && <div className="alert alert-success">{success}</div>}

        <Card
          className="shadow-lg border-0 rounded-lg"
          style={{ maxWidth: "750px", margin: "0 auto" }}
        >
          <Card.Img
            variant="top"
            src={book?.imagenUrl}
            alt={book?.titulo}
            style={{ height: "400px", objectFit: "cover" }}
          />
          <Card.Body>
            <Card.Title className="text-center">{book?.titulo}</Card.Title>
            <Card.Subtitle className="text-center text-muted">
              {book?.usuario.username}
            </Card.Subtitle>
            <Card.Text className="text-center">
              <strong>Género:</strong> {book?.genero}
            </Card.Text>
            <div className="d-flex justify-content-center gap-3">
              <Button variant="success" onClick={() => navigate(`resena`)}>
                Escribir Reseña
              </Button>
              <Button
                variant="primary"
                onClick={handleBuy}
                disabled={isBuying || availableCopies === 0}
              >
                {isBuying ? "Comprando..." : "Comprar Libro"}
              </Button>
            </div>
            <small className="text-muted d-block text-center mt-2">
              {availableCopies > 0
                ? `Quedan: ${availableCopies} copias disponibles`
                : "Sin stock"}
            </small>
          </Card.Body>
        </Card>

        <Card className="mt-4">
          <Card.Header>
            <h5>Reseñas</h5>
          </Card.Header>
          <Card.Body>
            {reviews.length === 0 ? (
              <div className="alert alert-info">
                Aún no hay reseñas para este libro.
              </div>
            ) : (
              <ListGroup>
                {reviews.map((review) => (
                  <ListGroup.Item key={review.id}>
                    Calificación:{" "}
                    <span>{renderStars(review.calificacion)}</span>
                    <p>{review.comentario}</p>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </Card.Body>
        </Card>
      </Container>
    </LoadingErrorHandler>
  );
};

export default BookDetail;
