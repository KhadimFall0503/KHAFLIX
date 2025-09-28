import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const MyList = () => {
  const [myList, setMyList] = useState([]);

  useEffect(() => {
    const storedList = JSON.parse(localStorage.getItem("myList")) || [];
    setMyList(storedList);
  }, []);

  const removeFromList = (id, type) => {
    const updatedList = myList.filter(
      (item) => !(item.id === id && item.type === type)
    );
    setMyList(updatedList);
    localStorage.setItem("myList", JSON.stringify(updatedList));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 pt-16">
      <h1 className="text-4xl font-bold text-white mb-6">Ma Liste</h1>

      {myList.length === 0 ? (
        <p className="text-gray-400 text-center">Votre liste est vide.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {myList.map((item) => (
            <div
              key={`${item.type}-${item.id}`}
              className="bg-[#141414] rounded overflow-hidden shadow-lg hover:scale-105 transition-transform cursor-pointer"
            >
              <img
                src={item.image || "/default-image.jpg"}
                alt={item.title}
                className="w-full h-64 object-cover"
              />

              <div className="p-4 text-white">
                <h3 className="font-bold text-lg text-[#E50914]">
                  {item.title}
                </h3>
                <p className="text-sm mt-2">{item.description}</p>
                <button
                  onClick={() => removeFromList(item.id, item.type)}
                  className="mt-3 bg-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-600"
                >
                  Retirer
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyList;
