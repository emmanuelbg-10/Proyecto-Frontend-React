import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Alert,
} from "react-bootstrap";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import LoadingErrorHandler from "../components/LoadingErrorHandler/LoadingErrorHandler";
import { sendEmail } from "../services/email.service";
import { ContactFormData, ApiResponse } from "../models/Contact";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    message: "",
  });
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const result = await sendEmail(formData);
      setResponse(result);
      if (result.success) {
        setFormData({ name: "", email: "", message: "" }); // Limpiar el formulario
      }
    } catch {
      setError("Error al enviar el mensaje. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoadingErrorHandler loading={loading} error={error}>
      <Container className="mt-5">
        <h1 className="text-center mb-4">Contáctanos</h1>
        <p className="text-center">
          ¿Tienes preguntas? Envíanos un mensaje y te responderemos lo antes
          posible.
        </p>

        <Row className="mt-4">
          {/* Información de contacto */}
          <Col md={4}>
            <ContactInfo />
          </Col>

          {/* Formulario de contacto */}
          <Col md={8}>
            <Card className="p-4 shadow-sm">
              <h3 className="mb-3 text-center">Envíanos un mensaje</h3>

              {response && (
                <Alert variant={response.success ? "success" : "danger"}>
                  {response.message}
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                <FormField
                  label="Nombre"
                  type="text"
                  name="name"
                  placeholder="Tu nombre"
                  value={formData.name}
                  onChange={handleChange}
                />
                <FormField
                  label="Email"
                  type="email"
                  name="email"
                  placeholder="tu@email.com"
                  value={formData.email}
                  onChange={handleChange}
                />
                <FormField
                  label="Mensaje"
                  as="textarea"
                  name="message"
                  placeholder="Escribe tu mensaje aquí..."
                  value={formData.message}
                  onChange={handleChange}
                />
                <Button
                  variant="primary"
                  type="submit"
                  className="w-100"
                  disabled={loading}
                >
                  {loading ? "Enviando..." : "Enviar Mensaje"}
                </Button>
              </Form>
            </Card>
          </Col>
        </Row>

        {/* Mapa de ubicación */}
        <LocationMap />
      </Container>
    </LoadingErrorHandler>
  );
};

const ContactInfo = () => (
  <>
    <InfoCard
      icon={<FaMapMarkerAlt />}
      title="Ubicación"
      text="Calle de Felipe IV, s/n, 28014 Madrid, España"
    />
    <InfoCard icon={<FaPhoneAlt />} title="Teléfono" text="+34 690 19 94 25" />
    <InfoCard
      icon={<FaEnvelope />}
      title="Email"
      text="bibliotecatos@gmail.com"
    />
  </>
);

const InfoCard = ({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) => (
  <Card className="mb-4 shadow-sm text-center contact-card">
    <Card.Body>
      {icon}
      <Card.Title>{title}</Card.Title>
      <Card.Text>{text}</Card.Text>
    </Card.Body>
  </Card>
);

const FormField = ({
  label,
  ...props
}: { label: string } & React.ComponentPropsWithoutRef<typeof Form.Control>) => (
  <Form.Group className="mb-3">
    <Form.Label>{label}</Form.Label>
    <Form.Control {...props} required />
  </Form.Group>
);

const LocationMap = () => (
  <Row className="mt-5">
    <Col>
      <h3 className="text-center mb-3">Nuestra Ubicación</h3>
      <iframe
        title="Ubicación"
        className="w-100 contact-map"
        height="300"
        style={{ border: 0 }}
        loading="lazy"
        allowFullScreen
        src="https://www.google.com/maps/embed/v1/place?q=Biblioteca+Nacional&key=AIzaSyCCNxpkKEaplaQQjH-XUNxt-TDgpLqwct0"
      ></iframe>
    </Col>
  </Row>
);

export default Contact;
