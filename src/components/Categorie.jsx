import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const Categorie = () => {
  const { name } = useParams(); // "films" ou "series"
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        let url = "";
        if (name === "films") url = "http://localhost:8000/api/films/";
        else if (name === "series") url = "http://localhost:8000/api/series/";

        if (url) {
          const res = await axios.get(url);
          const itemsWithType = res.data.map((item) => ({
            ...item,
            type: name.slice(0, -1), // "film" ou "serie"
          }));
          setItems(itemsWithType);
        } else {
          setItems([]); // param invalide
        }
      } catch (error) {
        console.error("Erreur récupération :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [name]);

  if (loading)
    return <p className="text-white text-center mt-10">Chargement...</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 pt-16">
      <h1 className="text-4xl font-bold text-white mb-6 mt-6 ">
        {name === "films"
          ? "Tous les Films"
          : name === "series"
          ? "Toutes les Séries"
          : "Catégorie inconnue"}
      </h1>

      {items.length === 0 ? (
        <p className="text-gray-400 text-center">Aucun élément trouvé.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-[#141414] rounded overflow-hidden shadow-lg hover:scale-105 transition-transform cursor-pointer"
            >
              <Link to={`/detail/${item.type}/${item.id}`}>
                <img
                  src={item.image || "/default-image.jpg"}
                  alt={item.title}
                  className="w-full h-64 object-cover"
                />
              </Link>
              <div className="p-4 text-white">
                <h3 className="font-bold text-lg text-[#E50914]">
                  {item.title}
                </h3>
                <p className="text-sm mt-2">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Categorie;
