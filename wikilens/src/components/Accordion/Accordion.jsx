import { useState } from "react";
import "./Accordion.css";

const faqData = [
  {
    id: 1,
    question: "What is React?",
    answer:
      "React is a JavaScript library for building user interfaces. It lets you create reusable UI components that update efficiently when your data changes.",
  },
  {
    id: 2,
    question: "What are React Hooks?",
    answer:
      "Hooks are functions that let you use state and other React features in functional components. Common hooks include useState and useEffect.",
  },
  {
    id: 3,
    question: "Difference between state and props?",
    answer:
      "Props are passed from parent to child and are read-only. State is managed inside a component and can change over time.",
  },
  {
    id: 4,
    question: "What is JSX?",
    answer:
      "JSX stands for JavaScript XML. It allows you to write HTML-like syntax inside JavaScript.",
  },
  {
    id: 5,
    question: "Why do lists need keys?",
    answer:
      "Keys help React identify which items changed, were added, or removed, improving rendering performance.",
  },
];

function Accordion() {
  const [activeId, setActiveId] = useState(null);

  const toggleItem = (id) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <div className="card">
      <h2>React FAQ</h2>

      {faqData.map((item) => (
        <div
          key={item.id}
          className={`accordion-item ${
            activeId === item.id ? "active" : ""
          }`}
        >
          <div
            className="accordion-question"
            onClick={() => toggleItem(item.id)}
          >
            <span>{item.question}</span>
            <span
              className={`arrow ${
                activeId === item.id ? "rotate" : ""
              }`}
            >
              ▼
            </span>
          </div>

          <div
            className={`accordion-answer ${
              activeId === item.id ? "open" : ""
            }`}
          >
            <p>{item.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Accordion;