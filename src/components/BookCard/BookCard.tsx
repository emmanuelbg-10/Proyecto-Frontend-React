import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Book } from "../../models/Book.ts";

const BookCard: React.FC<Book> = ({
  id,
  titulo,
  usuario,
  genero,
  imagenUrl,
}) => {
  return (
    <Card className="book-card shadow-sm border-0">
      <div className="book-card-img">
        <Card.Img
          variant="top"
          src={imagenUrl}
          alt={`Imagen de ${titulo} por ${usuario}`}
        />
      </div>
      <Card.Body className="d-flex flex-column">
        <Card.Title className="text-truncate fw-bold" title={titulo}>
          {titulo}
        </Card.Title>
        <Card.Title
          className="text-muted text-truncate"
          title={usuario?.username}
        >
          {usuario?.username}
        </Card.Title>
        <Card.Text
          className="text-truncate small text-secondary"
          title={genero}
        >
          {genero}
        </Card.Text>
        <Link to={`/libro/${id}`} className="mt-auto">
          <Button variant="primary" className="w-100">
            Ver Detalles
          </Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default BookCard;
