import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ImgDetail from "../assets/Detail.jpg"; // image de fond

const DetailCategorie = () => {
  const { type, id } = useParams(); // type = "film" ou "serie"

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        let url = "";
        if (type === "film") url = `http://localhost:8000/api/films/${id}/`;
        else if (type === "serie")
          url = `http://localhost:8000/api/series/${id}/`;
        else return;

        const res = await axios.get(url);
        setItem(res.data);
      } catch (error) {
        console.error("Erreur récupération détails :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [type, id]);

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  };

  const addToList = () => {
    if (!item) return;
    const idItem = item.id;
    const title = item.title;
    const description = item.description;
    const image = item.image;

    let myList = JSON.parse(localStorage.getItem("myList")) || [];
    const exists = myList.some((el) => el.id === idItem && el.type === type);

    if (!exists) {
      myList.push({ id: idItem, type, title, description, image });
      localStorage.setItem("myList", JSON.stringify(myList));
      showToast(`${title} a été ajouté à votre liste ✅`, "success");
    } else {
      showToast(`${title} est déjà dans votre liste ⚡`, "error");
    }
  };

  if (loading)
    return <p className="text-white text-center mt-10">Chargement...</p>;

  if (!item)
    return <p className="text-white text-center mt-10">Aucun détail trouvé.</p>;

  return (
    <>
      {/* Hero */}
      <section
        className="relative w-full h-[90vh] flex items-center justify-center text-center text-white"
        style={{
          backgroundImage: `url(${ImgDetail})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>
        <div className="relative z-10 max-w-3xl px-4">
          <h1 className="text-5xl font-bold mb-4">Page Detail</h1>
          <p className="text-lg mb-6 text-gray-300">
            Ici vous trouverez tous les détails du film ou de la série
            sélectionnée.
          </p>
        </div>
      </section>

      {/* Détails */}
      <div className="pt-12 max-w-5xl mx-auto px-4 text-white flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          <img
            src={item.image || "/default-image.jpg"}
            alt={item.title}
            className="w-full h-96  rounded-lg shadow-lg object-cover"
          />
        </div>
        <div className="flex-1 flex flex-col justify-center">
          <h1 className="text-4xl text-white font-bold mb-4">{item.title}</h1>
          <p className="text-white mb-4">{item.description}</p>
          {item.date_sortie && (
            <p className="text-white mb-4">
              Date de sortie: {item.date_sortie}
            </p>
          )}
          <button
            onClick={addToList}
            className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded font-semibold transition"
          >
            Ajouter à ma liste
          </button>
        </div>
      </div>

      {/* Toast */}
      {toast.show && (
        <div
          className={`fixed bottom-5 right-5 px-6 py-4 rounded shadow-lg text-white font-semibold transition-all ${
            toast.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {toast.message}
        </div>
      )}
    </>
  );
};

export default DetailCategorie;
