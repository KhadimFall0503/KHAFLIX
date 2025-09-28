import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Detail from "./components/Detail";
import Categorie from "./components/Categorie";

// Pages
import Home from "./pages/Home";
import MyList from "./pages/MyList";
import Categories from "./pages/Categories";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/my-list" element={<MyList />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/categories/:name" element={<Categorie />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
