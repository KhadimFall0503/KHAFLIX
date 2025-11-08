import React from "react";
import home from "../assets/home.jpg";
import Tendances from "../components/Tendances";
import About from "../components/About";
import FoireQuestions from "../components/FoireQuestions";

const Home = () => {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section
        className="relative w-full h-[90vh] flex items-center justify-center text-center text-white"
        style={{
          backgroundImage: `url(${home})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay sombre */}
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>

        {/* Contenu du Hero */}
        <div className="relative z-10 max-w-3xl px-4">
          <h1 className="text-5xl font-bold mb-4">
            Films et séries en illimité
          </h1>
          <p className="text-lg mb-6">
            Regardez où vous voulez. Annulez à tout moment.
          </p>
          <button className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded text-white font-semibold transition">
            Voir la Categorie
          </button>
        </div>
      </section>
      <Tendances />
      <About />
      <FoireQuestions />
    </div>
  );
};

export default Home;
