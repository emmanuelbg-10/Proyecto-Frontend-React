import React, { useEffect, useState } from "react";
import { Container, Row, Col, Alert } from "react-bootstrap";
import BookCard from "../components/BookCard/BookCard";
import { fetchBooks } from "../services/catalog.service";
import { Book } from "../models/Book";
import LoadingErrorHandler from "../components/LoadingErrorHandler/LoadingErrorHandler";

const Catalog: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const loadBooks = async () => {
      const { books, error } = await fetchBooks();
      setBooks(books);
      if (error) setError(error);
      setLoading(false);
    };

    loadBooks();
  }, []);

  return (
    <LoadingErrorHandler loading={loading} error={error}>
      <Container className="mt-4">
        {/* Resumen del catálogo con estilo de Card pero sin fondo blanco */}
        <div className="mb-4 border-0 rounded-3 p-4">
          <h2 className="text-center display-4">Catálogo de Libros</h2>
          <p className="text-center fs-5">
            Explora nuestra amplia selección de libros y descubre nuevas
            historias. Haz clic en "Ver Detalles" para conocer más sobre cada
            título.
          </p>
        </div>

        {/* Grid de libros con mejor espaciado */}
        <Row className="gy-4">
          {books.length > 0 ? (
            books.map((book) => (
              <Col
                key={book.id}
                sm={12}
                md={6}
                lg={4}
                className="d-flex justify-content-center mb-4"
              >
                <BookCard
                  id={book.id}
                  titulo={book.titulo}
                  usuario={book.usuario}
                  genero={book.genero}
                  imagenUrl={book.imagenUrl}
                />
              </Col>
            ))
          ) : (
            <Col sm={12} className="text-center">
              <Alert variant="info">
                No se encontraron libros disponibles en este momento.
              </Alert>
            </Col>
          )}
        </Row>
      </Container>
    </LoadingErrorHandler>
  );
};

export default Catalog;
