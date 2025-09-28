import React from "react";
import { Facebook, Twitter, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#141414] text-gray-400 py-10 mt-12">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-3xl font-bold mb-4 text-red-600">KHAFLIX</h3>
          <p className="text-sm text-gray-400">
            Profitez des meilleurs films et séries depuis le confort de chez
            vous.
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Liens</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/" className="hover:text-red-600 transition-colors">
                Accueil
              </a>
            </li>
            <li>
              <a
                href="/categories"
                className="hover:text-red-600 transition-colors"
              >
                Catégories
              </a>
            </li>
            <li>
              <a
                href="/my-list"
                className="hover:text-red-600 transition-colors"
              >
                Ma liste
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Support</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-red-600 transition-colors">
                Aide
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-red-600 transition-colors">
                Contact
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-red-600 transition-colors">
                Confidentialité
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Suivez-nous</h4>
          <div className="flex space-x-4 text-lg">
            <a href="#" className="hover:text-red-600 transition-colors">
              <Facebook />
            </a>
            <a href="#" className="hover:text-red-600 transition-colors">
              <Twitter />
            </a>
            <a href="#" className="hover:text-red-600 transition-colors">
              <Instagram />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-10 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} KhaFlix. Tous droits réservés.
      </div>
    </footer>
  );
};

export default Footer;
