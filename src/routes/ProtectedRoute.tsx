// src/routes/ProtectedRoute.tsx
import { JSX, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

// Función para verificar si el usuario está autenticado
const isAuthenticated = () => {
  return !!localStorage.getItem("authToken");
};

// Función para obtener el rol del usuario desde el token
const getUserRole = () => {
  const token = localStorage.getItem("authToken");
  if (token) {
    try {
      interface DecodedToken {
        role?: string;
      }
      const decoded: DecodedToken = jwtDecode<DecodedToken>(token);
      return decoded?.role || "USUARIO"; // Por defecto, si no hay rol, es "USUARIO"
    } catch {
      return "USUARIO"; // En caso de error, tratamos como usuario normal
    }
  }
  return "USUARIO";
};

// Lista de roles en orden jerárquico
const roleHierarchy: Record<string, number> = {
  USUARIO: 1,
  AUTOR: 2, // AUTOR puede hacer todo lo que USUARIO hace, más otras cosas
};

// Componente de ruta protegida
const ProtectedRoute = ({
  children,
  requiredRole,
}: {
  children: JSX.Element;
  requiredRole: string;
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login", { replace: true });
    } else {
      const userRole = getUserRole();
      if (roleHierarchy[userRole] < roleHierarchy[requiredRole]) {
        navigate("/", { replace: true }); // Redirigir al home si no tiene el rol necesario
      }
    }
  }, [navigate, requiredRole]);

  return isAuthenticated() &&
    roleHierarchy[getUserRole()] >= roleHierarchy[requiredRole]
    ? children
    : null;
};

export default ProtectedRoute;
