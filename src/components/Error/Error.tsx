import { useNavigate } from "react-router-dom";
import { Button, Alert } from "react-bootstrap"; // Usa Bootstrap para mejor estilo
import { FaExclamationTriangle } from "react-icons/fa"; // Icono de error

const Error = () => {
  const navigate = useNavigate();

  // Función para redirigir al usuario a la página principal
  const goHome = () => {
    navigate("/");
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh", // Asegura que ocupe toda la altura de la pantalla
        margin: 0,
        padding: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center", // Centrado vertical
        textAlign: "center",
      }}
    >
      <Alert
        variant="danger"
        className="mb-4"
        style={{
          borderRadius: "15px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", // Sombra suave
          padding: "40px 30px", // Asegura buen espaciado
          width: "100%",
          maxWidth: "500px", // Limita el ancho
          margin: "0 auto", // Centrado horizontal
        }}
      >
        <FaExclamationTriangle
          size={80}
          className="mb-3"
          style={{ color: "#d9534f" }}
        />
        <h2 style={{ fontSize: "2.5rem", fontWeight: "700", color: "#d9534f" }}>
          Error 404
        </h2>
        <p style={{ fontSize: "1.2rem", color: "#495057" }}>
          La página que estás buscando no existe o no se pudo cargar.
        </p>
        <Button
          variant="outline-danger"
          onClick={goHome}
          className="me-2"
          style={{
            borderRadius: "25px",
            padding: "12px 35px",
            fontSize: "1.1rem",
            fontWeight: "600",
            border: "2px solid #d9534f", // Borde destacado
            color: "#d9534f", // Color de texto
            textTransform: "uppercase", // Texto en mayúsculas
            transition: "all 0.3s ease", // Suaviza la transición del hover
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "white"; // Cambio de color a blanco
            e.currentTarget.style.backgroundColor = "#d9534f"; // Fondo rojo
            e.currentTarget.style.borderColor = "#d9534f"; // Mantén borde rojo
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "#d9534f"; // Vuelve al color inicial
            e.currentTarget.style.backgroundColor = "transparent"; // Fondo transparente
            e.currentTarget.style.borderColor = "#d9534f"; // Vuelve al borde rojo
          }}
        >
          Volver al inicio
        </Button>
      </Alert>
    </div>
  );
};

export default Error;
