import { NavDropdown } from "react-bootstrap";
import { genres } from "../../constants/genres"; // Asegúrate de importar el array desde su ubicación

export default function GenresDropdown() {
  return (
    <NavDropdown title="Géneros" id="genres-dropdown">
      {genres.map((genre, index) => (
        <NavDropdown.Item
          key={index}
          href={`/genero/${genre.toLowerCase().replace(/\s+/g, "-")}`}
        >
          {genre}
        </NavDropdown.Item>
      ))}
      <NavDropdown.Divider />
      <NavDropdown.Item href="/generos">Ver todos</NavDropdown.Item>
    </NavDropdown>
  );
}
