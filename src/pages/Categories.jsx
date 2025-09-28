import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Récupérer toutes les catégories
        const categoriesRes = await axios.get(
          "http://localhost:8000/api/categories/"
        );
        setCategories(categoriesRes.data);

        // Récupérer films et séries
        const filmsRes = await axios.get("http://localhost:8000/api/films/");
        const seriesRes = await axios.get("http://localhost:8000/api/series/");

        // Ajouter type pour différencier film/serie
        const combined = [
          ...filmsRes.data.map((f) => ({ ...f, type: "film" })),
          ...seriesRes.data.map((s) => ({ ...s, type: "serie" })),
        ];

        setItems(combined);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading)
    return <p className="text-white text-center mt-10">Chargement...</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 pt-16">
      {categories.map((cat) => {
        // Filtrer les items pour cette catégorie
        const catItems = items.filter((item) =>
          item.categories.some((c) => c.name === cat.name)
        );

        if (catItems.length === 0) return null;

        return (
          <div key={cat.id} className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">{cat.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {catItems.map((item) => (
                <Link
                  key={item.id}
                  to={`/detail/${item.type}/${item.id}`}
                  className="bg-[#141414] rounded overflow-hidden shadow-lg hover:scale-105 transition-transform cursor-pointer"
                >
                  <img
                    src={item.image || "/default-image.jpg"}
                    alt={item.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-4 text-white">
                    <h3 className="font-bold text-lg text-[#E50914]">
                      {item.title}
                    </h3>
                    <p className="text-sm mt-2">{item.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Categories;
