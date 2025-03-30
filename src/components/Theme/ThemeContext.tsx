import {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react"; // Añade useEffect

interface ThemeContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Añade el hook personalizado
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  // Inicializa el estado con el valor guardado en localStorage, si existe
  const storedTheme = localStorage.getItem("darkMode");
  const [darkMode, setDarkMode] = useState<boolean>(storedTheme === "true");

  // Efecto para aplicar el tema en el cuerpo y guardar la preferencia en localStorage
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("darkMode", "true");
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("darkMode", "false");
    }
  }, [darkMode]); // El efecto se ejecuta cada vez que cambia `darkMode`

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
