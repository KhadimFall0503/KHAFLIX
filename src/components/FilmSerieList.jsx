import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const FilmSerieList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Récupération films et séries
        const [filmsRes, seriesRes] = await Promise.all([
          axios.get("http://localhost:8000/api/films/"),
          axios.get("http://localhost:8000/api/series/"),
        ]);

        // Combiner films et séries
        const combined = [
          ...filmsRes.data.map((film) => ({ ...film, type: "film" })),
          ...seriesRes.data.map((serie) => ({ ...serie, type: "serie" })),
        ];

        setItems(combined);
      } catch (error) {
        console.error("Erreur récupération films et séries :", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="pt-12 max-w-7xl mx-auto px-4">
      <h2 className="text-3xl font-bold mb-2 text-white">Films & Séries</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((item) => (
          <Link
            key={item.id}
            to={`/detail/${item.type}/${item.id}`}
            className="bg-[#141414] rounded overflow-hidden shadow-lg hover:scale-105 transition-transform cursor-pointer"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-64 object-cover"
            />
            <div className="p-4 text-white">
              <h3 className="font-bold text-lg text-[#E50914]">{item.title}</h3>
              <p className="text-sm mt-2">{item.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FilmSerieList;
