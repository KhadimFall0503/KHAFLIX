import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Tendances = () => {
  const [tendances, setTendances] = useState([]);

  useEffect(() => {
    const fetchTendances = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/tendances/"
        );
        setTendances(response.data);
      } catch (error) {
        console.error("Erreur récupération tendances :", error);
      }
    };
    fetchTendances();
  }, []);

  const addToList = (item) => {
    const type = item.film ? "film" : "serie";
    const id = item.film ? item.film.id : item.serie.id;
    const title = item.film ? item.film.title : item.serie.title;
    const description = item.film
      ? item.film.description
      : item.serie.description;
    const image = item.film ? item.film.image : item.serie.image;

    let myList = JSON.parse(localStorage.getItem("myList")) || [];
    const exists = myList.some((el) => el.id === id && el.type === type);

    if (!exists) {
      myList.push({ id, type, title, description, image });
      localStorage.setItem("myList", JSON.stringify(myList));
      alert(`${title} a été ajouté à votre liste ✅`);
    } else {
      alert(`${title} est déjà dans votre liste ⚡`);
    }
  };

  return (
    <div className="pt-12 max-w-7xl mx-auto px-4">
      <h2 className="text-3xl font-bold mb-2 text-white">
        Tendances Actuelles
      </h2>
      <p className="text-gray-400 mb-6 font-semibold">
        Découvrez les films et séries les plus populaires du moment
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tendances.map((item) => {
          const title = item.film ? item.film.title : item.serie.title;
          const description = item.film
            ? item.film.description
            : item.serie.description;
          const image = item.film ? item.film.image : item.serie.image;
          const id = item.film ? item.film.id : item.serie.id;

          return (
            <div
              key={item.id}
              className="bg-[#141414] rounded overflow-hidden shadow-lg hover:scale-105 transition-transform cursor-pointer"
            >
              <Link to={`/detail/${id}`}>
                <img
                  src={image || "/default-image.jpg"}
                  alt={title}
                  className="w-full h-64 object-cover"
                />
              </Link>
              <div className="p-4 text-white">
                <h3 className="font-bold text-lg text-[#E50914]">{title}</h3>
                <p className="text-sm mt-2">{description}</p>
                <button
                  onClick={() => addToList(item)}
                  className="mt-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white font-semibold transition w-full"
                >
                  Ajouter à ma liste
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Tendances;
