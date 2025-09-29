import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import axios from "axios";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false); // menu mobile
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // dropdown catégories
  const [categories, setCategories] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Vérification du token et récupération des catégories
  useEffect(() => {
    const token = localStorage.getItem("access");
    setIsAuthenticated(!!token);

    if (token) {
      axios
        .get("http://localhost:8000/api/categories/")
        .then((res) => setCategories(res.data))
        .catch((err) => console.error(err));
    }
  }, []);

  // Déconnexion
  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setIsAuthenticated(false); // met à jour la navbar immédiatement
    navigate("/login");
  };

  const renderCategoryLink = (cat) => (
    <Link
      key={cat.id}
      to={`/categories/${cat.name.toLowerCase()}`}
      className="block px-4 py-2 hover:bg-gray-700 transition"
      onClick={() => {
        setIsDropdownOpen(false);
        setIsOpen(false);
      }}
    >
      {cat.name}
    </Link>
  );

  return (
    <nav className="bg-[#141414] fixed w-full z-50 shadow-md">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link to="/" className="text-[#E50914] text-2xl font-extrabold">
          KHAFLIX
        </Link>

        {/* Menu desktop */}
        <div className="hidden md:flex space-x-6 text-white font-medium items-center">
          <Link to="/" className="hover:text-gray-300">
            Accueil
          </Link>

          {/* Dropdown catégories */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center hover:text-gray-300 transition"
            >
              Catégories <ChevronDown size={16} className="ml-1" />
            </button>
            {isDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 bg-[#141414] shadow-lg rounded-md py-2 w-48">
                {isAuthenticated && categories.length > 0 ? (
                  categories.map(renderCategoryLink)
                ) : (
                  <>
                    <Link
                      to="/categories/films"
                      className="block px-4 py-2 hover:bg-gray-700 transition"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Films
                    </Link>
                    <Link
                      to="/categories/series"
                      className="block px-4 py-2 hover:bg-gray-700 transition"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Séries
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>

          <Link to="/my-list" className="hover:text-gray-300">
            Ma liste
          </Link>

          {isAuthenticated && (
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded transition"
            >
              Déconnexion
            </button>
          )}
        </div>

        {/* Burger menu mobile */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Menu mobile */}
      {isOpen && (
        <div className="md:hidden bg-[#141414] text-white px-6 pb-4 space-y-3 transition-all duration-300 ease-in-out">
          <Link
            to="/"
            className="block hover:text-gray-300"
            onClick={() => setIsOpen(false)}
          >
            Accueil
          </Link>

          <div className="space-y-1">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center justify-between w-full hover:text-gray-300"
            >
              Catégories <ChevronDown size={16} />
            </button>
            {isDropdownOpen && (
              <>
                {isAuthenticated && categories.length > 0 ? (
                  categories.map(renderCategoryLink)
                ) : (
                  <>
                    <Link
                      to="/categories/films"
                      className="block pl-4 py-1 hover:bg-gray-700 rounded"
                      onClick={() => setIsOpen(false)}
                    >
                      Films
                    </Link>
                    <Link
                      to="/categories/series"
                      className="block pl-4 py-1 hover:bg-gray-700 rounded"
                      onClick={() => setIsOpen(false)}
                    >
                      Séries
                    </Link>
                  </>
                )}
              </>
            )}
          </div>

          <Link
            to="/my-list"
            className="block hover:text-gray-300"
            onClick={() => setIsOpen(false)}
          >
            Ma liste
          </Link>

          {isAuthenticated && (
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 w-full py-1 rounded transition"
            >
              Déconnexion
            </button>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
