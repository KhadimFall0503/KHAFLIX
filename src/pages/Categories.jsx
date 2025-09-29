import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const Categories = () => {
  const { name } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        const param = name?.toLowerCase();
        let url = "";

        if (param === "films") url = "http://localhost:8000/api/films/";
        else if (param === "series") url = "http://localhost:8000/api/series/";

        if (url) {
          const res = await axios.get(url);
          setItems(
            res.data.map((item) => ({ ...item, type: param.slice(0, -1) }))
          );
        } else {
          setItems([]);
        }
      } catch (error) {
        console.error("Erreur récupération :", error);
        setItems([]);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, [name]);

  if (loading)
    return <p className="text-white text-center mt-10">Chargement...</p>;

  const title =
    name?.toLowerCase() === "films"
      ? "Tous les Films"
      : name?.toLowerCase() === "series"
      ? "Toutes les Séries"
      : "Catégorie inconnue";

  // Fonction pour ajouter un item à la liste dans localStorage
  const addToList = (item) => {
    if (!item) return;
    const { id, type, title, description, image } = item;

    let myList = JSON.parse(localStorage.getItem("myList")) || [];
    const exists = myList.some((el) => el.id === id && el.type === type);

    if (!exists) {
      myList.push({ id, type, title, description, image });
      localStorage.setItem("myList", JSON.stringify(myList));
      alert(`${title} ajouté à votre liste ✅`);
    } else {
      alert(`${title} est déjà dans votre liste ⚡`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 pt-16">
      <h1 className="text-4xl font-bold text-white mb-6 mt-6">{title}</h1>

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

export default Categories;
