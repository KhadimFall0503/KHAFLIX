import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; // importer le contexte

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const { login } = useContext(AuthContext); // utiliser login du contexte

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login/", {
        username,
        password,
      });

      // Utiliser la fonction login du contexte
      login(response.data.access);

      setMessage("✅ Connexion réussie !");

      // Rediriger vers l'accueil après 1 seconde
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      console.error(error);
      setMessage("❌ Nom d’utilisateur ou mot de passe invalide.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 px-4 pt-16">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-10 rounded-2xl shadow-xl w-full max-w-lg"
      >
        <h2 className="text-4xl font-extrabold mb-6 text-white text-center">
          Connexion
        </h2>
        <p className="text-gray-400 text-center mb-8">
          Entrez vos identifiants pour continuer
        </p>

        <div className="mb-6">
          <label className="block text-gray-300 mb-2 text-lg">
            Nom d’utilisateur
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white text-lg focus:outline-none focus:ring-2 focus:ring-red-600"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-300 mb-2 text-lg">
            Mot de passe
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white text-lg focus:outline-none focus:ring-2 focus:ring-red-600"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg text-lg font-semibold transition"
        >
          Se connecter
        </button>

        {message && (
          <p className="mt-6 text-center text-gray-300 text-lg">{message}</p>
        )}
      </form>
    </div>
  );
};

export default Login;
