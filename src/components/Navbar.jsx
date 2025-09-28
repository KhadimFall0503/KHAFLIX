import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Search, ChevronDown } from "lucide-react";
import axios from "axios";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false); // menu mobile
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // dropdown categories
  const [categories, setCategories] = useState([]); // categories depuis API

  // Récupérer catégories depuis API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/categories/"
        );
        setCategories(response.data); // supposé renvoyer [{id, name}]
      } catch (error) {
        console.error("Erreur récupération catégories :", error);
      }
    };

    fetchCategories();
  }, []);

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

          {/* Dropdown Categories */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center hover:text-gray-300 transition"
            >
              Categories <ChevronDown size={16} className="ml-1" />
            </button>

            {isDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 bg-[#141414] shadow-lg rounded-md py-2 w-48">
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    to={`/categories/${cat.name.toLowerCase()}`}
                    className="block px-4 py-2 hover:bg-gray-700 transition"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link to="/my-list" className="hover:text-gray-300">
            Ma liste
          </Link>
        </div>

        {/* Recherche + Profil */}
        <div className="hidden md:flex items-center space-x-4 text-white">
          <button className="hover:text-gray-300 transition">
            <Search size={20} />
          </button>
          <div className="w-8 h-8 bg-gray-600 rounded-full cursor-pointer hover:opacity-80 transition"></div>
        </div>

        {/* Burger mobile */}
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

          {/* Dropdown mobile */}
          <div className="space-y-1">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center justify-between w-full hover:text-gray-300"
            >
              Categories <ChevronDown size={16} />
            </button>
            {isDropdownOpen &&
              categories.map((cat) => (
                <Link
                  key={cat.id}
                  to={`/categories/${cat.name.toLowerCase()}`}
                  className="block pl-4 py-1 hover:bg-gray-700 rounded"
                  onClick={() => setIsOpen(false)}
                >
                  {cat.name}
                </Link>
              ))}
          </div>

          <Link
            to="/my-list"
            className="block hover:text-gray-300"
            onClick={() => setIsOpen(false)}
          >
            Ma liste
          </Link>

          <div className="flex items-center space-x-3 pt-2">
            <Search size={20} />
            <div className="w-8 h-8 bg-gray-600 rounded-full"></div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
