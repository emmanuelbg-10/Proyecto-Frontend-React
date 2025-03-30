import React, { useEffect, useState } from "react";
import { Container, Row, Col, Carousel, Alert } from "react-bootstrap";
import BookCard from "../components/BookCard/BookCard";
import { fetchBooks } from "../services/home.service";
import { Book } from "../models/Book";
import LoadingErrorHandler from "../components/LoadingErrorHandler/LoadingErrorHandler";

const Home: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [shuffledBooks, setShuffledBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const loadBooks = async () => {
      setLoading(true);
      const result = await fetchBooks();
      if (result.error) {
        setError(result.error);
      } else {
        setBooks(result.books);
        setShuffledBooks(result.shuffledBooks);
      }
      setLoading(false);
    };

    loadBooks();
  }, []);

  return (
    <LoadingErrorHandler loading={loading} error={error}>
      <Container className="mt-4">
        {/* Encabezado principal */}
        <header className="text-center mb-4">
          <h1 className="fw-bold">Bienvenido a nuestra Biblioteca</h1>
          <p>Explora, descubre y disfruta de una gran colección de libros.</p>
        </header>

        {/* Carrusel de libros populares */}
        {shuffledBooks.length > 0 && (
          <Carousel className="custom-carousel mb-5">
            {shuffledBooks.map((book) => (
              <Carousel.Item key={book.id}>
                <img
                  className="d-block w-100 carousel-image"
                  src={book.imagenUrl}
                  alt={book.titulo ?? "Imagen no disponible"}
                />
                <Carousel.Caption className="carousel-caption-overlay">
                  <h3>{book.titulo}</h3>
                  <p>{book.usuario?.username ?? "Autor desconocido"}</p>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
        )}

        {/* Últimos libros agregados */}
        <section className="mt-4">
          <h2 className="text-center">Últimos libros agregados</h2>
          <Row className="justify-content-center">
            {books.length > 0 ? (
              books.map((book) => (
                <Col
                  key={book.id}
                  xs={12}
                  sm={6}
                  md={6}
                  lg={4}
                  className="d-flex justify-content-center mb-4"
                >
                  <BookCard
                    id={book.id}
                    titulo={book.titulo}
                    usuario={book.usuario ?? "Autor desconocido"}
                    genero={book.genero}
                    imagenUrl={book.imagenUrl}
                  />
                </Col>
              ))
            ) : (
              <Col sm={12} className="text-center">
                <Alert variant="info">
                  No se han agregado libros recientemente.
                </Alert>
              </Col>
            )}
          </Row>
        </section>
      </Container>
    </LoadingErrorHandler>
  );
};

export default Home;
