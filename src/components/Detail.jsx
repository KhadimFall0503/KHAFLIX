import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ImgDetail from "../assets/Detail.jpg";

const Detail = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  const fetchDetail = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/tendances/${id}/`
      );
      setItem(response.data);
    } catch (error) {
      console.error("Erreur récupération détails :", error);
    }
  };

  useEffect(() => {
    fetchDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  };

  const addToList = () => {
    if (!item) return;

    const type = item.film ? "film" : "serie";
    const idItem = item.film?.id || item.serie?.id;
    const title = item.film?.title || item.serie?.title;
    const description = item.film?.description || item.serie?.description;
    const image = item.film?.image || item.serie?.image;

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

  if (!item) {
    return (
      <div className="pt-24 text-center text-white">
        <p>Chargement...</p>
      </div>
    );
  }

  const title = item.film ? item.film.title : item.serie.title;
  const description = item.film
    ? item.film.description
    : item.serie.description;
  const date = item.film ? item.film.date_sortie : item.serie.date_sortie;
  const image = item.film ? item.film.image : item.serie.image;

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
            src={image}
            alt={title}
            className="w-full h-auto rounded-lg shadow-lg object-cover"
          />
        </div>
        <div className="flex-1 flex flex-col justify-center">
          <h1 className="text-4xl text-white font-bold mb-4">{title}</h1>
          <p className="text-white mb-4">{description}</p>
          <p className="text-white mb-4">Date de sortie: {date}</p>
          <button
            onClick={addToList}
            className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded font-semibold transition"
          >
            Ajouter à ma liste
          </button>
        </div>
      </div>

      {/* Toast Notification */}
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

export default Detail;
