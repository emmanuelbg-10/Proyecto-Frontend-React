import React, { useState } from "react";
import {
  Form,
  Button,
  Col,
  Row,
  Container,
  Alert,
  Image,
  Spinner,
} from "react-bootstrap";
import { getDecodedToken } from "../utils/authUtils";
import { createBook, createCopies } from "../services/createbook.service";
import { genres } from "../constants/genres";

const CreateBook: React.FC = () => {
  const token = localStorage.getItem("authToken");
  const { decoded } = getDecodedToken(token);
  const userId = decoded?.sub ? Number(decoded.sub) : null;

  const [formData, setFormData] = useState({
    title: "",
    genre: genres[0],
    file: null as File | null,
    copies: 1,
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [loadingBook, setLoadingBook] = useState(false);
  const [loadingCopies, setLoadingCopies] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const target = e.target as
      | HTMLInputElement
      | HTMLSelectElement
      | HTMLTextAreaElement;
    const { name, value } = target;

    if (name === "file") {
      const files = (e.target as HTMLInputElement).files;
      if (files && files[0]) {
        if (!files[0].type.startsWith("image/")) {
          setErrorMessage("El archivo seleccionado no es una imagen.");
          setFormData((prevData) => ({ ...prevData, file: null }));
          setImagePreview(null);
          return;
        }
        setFormData((prevData) => ({ ...prevData, file: files[0] }));
        setImagePreview(URL.createObjectURL(files[0]));
        setErrorMessage(null);
      }
    } else if (name === "copies") {
      const numCopies = Math.max(1, Math.min(100, Number(value)));
      setFormData((prevData) => ({ ...prevData, copies: numCopies }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) {
      setErrorMessage("No se ha podido obtener el ID de usuario.");
      return;
    }

    const form = new FormData();
    form.append("titulo", formData.title);
    form.append("genero", formData.genre);
    if (formData.file) {
      form.append("file", formData.file);
    }

    try {
      setLoadingBook(true);
      const createdBook = await createBook(userId, form);
      setSuccessMessage("Libro creado con éxito");
      setLoadingBook(false);

      setLoadingCopies(true);
      await createCopies(createdBook.id, formData.copies);
      setLoadingCopies(false);

      setFormData({ title: "", genre: genres[0], file: null, copies: 1 });
      setImagePreview(null);
      setErrorMessage(null);
    } catch {
      setErrorMessage("Error al conectar con el servidor.");
      setLoadingBook(false);
      setLoadingCopies(false);
    }
  };

  return (
    <Container>
      <h1 className="my-4 text-center">Crear un Nuevo Libro</h1>
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group controlId="title">
              <Form.Label>Título</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="genre">
              <Form.Label>Género</Form.Label>
              <Form.Select
                name="genre"
                value={formData.genre}
                onChange={handleChange}
                required
              >
                {genres.map((genre) => (
                  <option key={genre} value={genre}>
                    {genre}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <Form.Group controlId="file" className="mt-3">
          <Form.Label>Imagen del libro</Form.Label>
          <Form.Control
            type="file"
            name="file"
            onChange={handleChange}
            accept="image/*"
            required
          />
        </Form.Group>
        {imagePreview && (
          <div className="mt-3 text-center">
            <p>Vista previa de la imagen:</p>
            <Image
              src={imagePreview}
              alt="Vista previa"
              thumbnail
              style={{ maxWidth: "300px" }}
            />
          </div>
        )}
        <Form.Group controlId="copies" className="mt-3">
          <Form.Label>Cantidad de Copias</Form.Label>
          <Form.Control
            type="number"
            name="copies"
            value={formData.copies}
            onChange={handleChange}
            min={1}
            max={100}
            required
          />
        </Form.Group>
        <div className="d-flex justify-content-center mt-3">
          <Button
            type="submit"
            variant="primary"
            disabled={loadingBook || loadingCopies}
          >
            {loadingBook ? (
              <>
                <Spinner as="span" animation="border" size="sm" role="status" />
                {" Creando Libro..."}
              </>
            ) : loadingCopies ? (
              <>
                <Spinner as="span" animation="border" size="sm" role="status" />
                {" Creando Copias..."}
              </>
            ) : (
              "Crear Libro"
            )}
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default CreateBook;
