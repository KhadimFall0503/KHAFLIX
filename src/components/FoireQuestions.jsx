import { useState, useRef } from "react";

const FoireQuestions = () => {
  const faqData = [
    {
      question: "Khaflix, qu'est-ce que c'est ?",
      answer:
        "Khaflix est une plateforme de streaming qui vous permet de regarder vos films et séries préférés en ligne.",
    },
    {
      question: "Khaflix est-il adapté aux enfants ?",
      answer:
        "Oui, Khaflix propose une section dédiée aux enfants avec des contenus adaptés et un contrôle parental pour garantir une expérience sûre.",
    },
    {
      question: "Que puis-je regarder sur Khaflix ?",
      answer:
        "Khaflix offre une vaste bibliothèque de films et séries dans divers genres, y compris des nouveautés, des classiques, des documentaires et des contenus exclusifs.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);
  const contentRefs = useRef([]);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-4xl font-bold mb-10 text-center text-white">
        Foire aux Questions
      </h2>
      <div className="space-y-4">
        {faqData.map((item, index) => (
          <div
            key={index}
            className="bg-[#1e1e1e] rounded-xl shadow-md overflow-hidden"
          >
            <button
              onClick={() => toggleFaq(index)}
              className="w-full flex justify-between items-center p-5 text-left focus:outline-none hover:bg-[#2a2a2a] transition-colors"
            >
              <span className="text-lg font-semibold text-white">
                {item.question}
              </span>
              <span
                className={`text-2xl text-red-600 transform transition-transform duration-300 ${
                  openIndex === index ? "rotate-180" : "rotate-0"
                }`}
              >
                ▼
              </span>
            </button>
            <div
              ref={(el) => (contentRefs.current[index] = el)}
              className="overflow-hidden transition-all duration-500 ease-in-out bg-[#141414]"
              style={{
                maxHeight:
                  openIndex === index
                    ? `${contentRefs.current[index]?.scrollHeight}px`
                    : "0px",
              }}
            >
              <div className="p-5 text-gray-300">{item.answer}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoireQuestions;
