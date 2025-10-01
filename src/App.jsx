import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Pages
import Home from "./pages/Home";
import MyList from "./pages/MyList";
import Categories from "./pages/Categories";
import Detail from "./components/Detail";
import Login from "./pages/Login";
import DetailCategorie from "./components/DetailCategorie";
import FoireQuestions from "./components/FoireQuestions";

// Contexte Auth
import { AuthProvider } from "./context/AuthContext";

// PrivateRoute : protège les pages nécessitant authentification
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("access");
  return token ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          {/* Login accessible sans authentification */}
          <Route path="/login" element={<Login />} />

          {/* Pages privées */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/my-list"
            element={
              <PrivateRoute>
                <MyList />
              </PrivateRoute>
            }
          />
          <Route
            path="/categories"
            element={
              <PrivateRoute>
                <Categories />
              </PrivateRoute>
            }
          />
          <Route
            path="/categories/:name"
            element={
              <PrivateRoute>
                <Categories />
              </PrivateRoute>
            }
          />
          <Route
            path="/detail/:id"
            element={
              <PrivateRoute>
                <Detail />
              </PrivateRoute>
            }
          />
          <Route
            path="/detail/:type/:id"
            element={
              <PrivateRoute>
                <DetailCategorie />
              </PrivateRoute>
            }
          />

          {/* Redirection vers accueil si route non trouvée */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
