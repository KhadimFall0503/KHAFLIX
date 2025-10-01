import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // Récupération des catégories dès qu’on est authentifié
  useEffect(() => {
    if (isAuthenticated) {
      axios
        .get("http://localhost:8000/api/categories/")
        .then((res) => setCategories(res.data))
        .catch((err) => console.error(err));
    }
  }, [isAuthenticated]);

  const handleLogout = () => {
    logout();
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
        <Link to="/" className="text-[#E50914] text-2xl font-extrabold">
          KHAFLIX
        </Link>

        <div className="hidden md:flex space-x-6 text-white font-medium items-center">
          <Link to="/" className="hover:text-gray-300">
            Accueil
          </Link>

          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center hover:text-gray-300 transition"
            >
              Catégories <ChevronDown size={16} className="ml-1" />
            </button>
            {isDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 bg-[#141414] shadow-lg rounded-md py-2 w-48">
                {categories.length > 0 ? (
                  categories.map(renderCategoryLink)
                ) : (
                  <>
                    <Link
                      to="/categories/films"
                      className="block px-4 py-2 hover:bg-gray-700 transition"
                    >
                      Films
                    </Link>
                    <Link
                      to="/categories/series"
                      className="block px-4 py-2 hover:bg-gray-700 transition"
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

        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

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
                {categories.length > 0 ? (
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
