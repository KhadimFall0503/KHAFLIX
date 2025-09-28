import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const Categorie = () => {
  const { name } = useParams(); // "films" ou "series"
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        let url = "";

        if (name === "films") {
          url = "http://localhost:8000/api/films/";
        } else if (name === "series") {
          url = "http://localhost:8000/api/series/";
        }

        if (url) {
          const res = await axios.get(url);
          const withType = res.data.map((item) => ({
            ...item,
            type: name.slice(0, -1), // "film" ou "serie"
          }));
          setItems(withType);
        }
      } catch (error) {
        console.error("Erreur récupération :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [name]);

  const addToList = (item) => {
    let myList = JSON.parse(localStorage.getItem("myList")) || [];
    const exists = myList.some(
      (el) => el.id === item.id && el.type === item.type
    );

    if (!exists) {
      myList.push(item);
      localStorage.setItem("myList", JSON.stringify(myList));
      alert(`${item.title} a été ajouté à votre liste ✅`);
    } else {
      alert(`${item.title} est déjà dans votre liste ⚡`);
    }
  };

  if (loading) {
    return <p className="text-white text-center mt-10">Chargement...</p>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 pt-16">
      <h1 className="text-4xl font-bold text-white mb-6">
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
              {/* Lien uniquement sur l'image */}
              <Link to={`/detail/${item.id}`}>
                <img
                  src={item.image || "/default-image.jpg"}
                  alt={item.title}
                  className="w-full h-64 object-cover"
                />
              </Link>

              {/* Détails texte */}
              <div className="p-4 text-white">
                <h3 className="font-bold text-lg text-[#E50914]">
                  {item.title}
                </h3>
                <p className="text-sm mt-2">{item.description}</p>

                {/* Bouton Ajouter à ma liste */}
                <button
                  onClick={() => addToList(item)}
                  className="mt-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white font-semibold transition w-full"
                >
                  Ajouter à ma liste
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Categorie;
