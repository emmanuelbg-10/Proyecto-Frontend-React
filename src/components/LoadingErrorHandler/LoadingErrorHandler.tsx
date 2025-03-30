import React from "react";
import { Container, Spinner, Alert } from "react-bootstrap";
import { Loading } from "../../models/Loading";

const LoadingErrorHandler: React.FC<Loading> = ({
  loading,
  error,
  children,
}) => {
  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Cargando...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return <>{children}</>;
};

export default LoadingErrorHandler;
