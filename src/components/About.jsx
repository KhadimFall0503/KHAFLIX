import React from "react";
import MissionImage from "../assets/Hero.jpg";
import ValeursImage from "../assets/home.jpg";

const About = () => {
  return (
    <div className="w-full text-white py-20 px-6 bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="max-w-6xl mx-auto space-y-24">
        {/* Section Mission */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Texte */}
          <div>
            <h3 className="text-4xl font-bold text-red-600 mb-4">
              Notre mission
            </h3>
            <p className="text-gray-300 text-lg leading-relaxed mb-4">
              Chez <span className="text-white font-semibold">Khaflix</span>,
              notre mission est simple : offrir une plateforme de streaming
              fluide, rapide et accessible à tous. Nous réunissons les meilleurs
              contenus africains et internationaux dans une expérience moderne,
              élégante et personnalisée.
            </p>
            <p className="text-gray-400 text-lg leading-relaxed">
              Nous croyons au pouvoir du divertissement pour inspirer, connecter
              et faire découvrir de nouvelles cultures.
            </p>
          </div>

          {/* Image */}
          <div className="flex justify-center">
            <img
              src={MissionImage}
              alt="Notre mission"
              className="rounded-2xl shadow-xl w-full max-w-md object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        </section>

        {/* Section Valeurs */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Image */}
          <div className="flex justify-center order-1 md:order-none">
            <img
              src={ValeursImage}
              alt="Nos valeurs"
              className="rounded-2xl shadow-xl w-full max-w-md object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Texte */}
          <div>
            <h3 className="text-4xl font-bold text-red-600 mb-4">
              Nos valeurs
            </h3>
            <ul className="space-y-3 text-gray-300 text-lg">
              <li>
                <span className="font-semibold text-white">
                  🎬 Innovation :
                </span>{" "}
                réinventer la façon de regarder et partager le divertissement.
              </li>
              <li>
                <span className="font-semibold text-white">🌍 Diversité :</span>{" "}
                célébrer les talents et cultures du monde entier.
              </li>
              <li>
                <span className="font-semibold text-white">
                  ⚡ Accessibilité :
                </span>{" "}
                rendre le streaming de qualité disponible pour tous.
              </li>
              <li>
                <span className="font-semibold text-white">
                  💎 Excellence :
                </span>{" "}
                offrir une expérience fluide, immersive et sans limites.
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
