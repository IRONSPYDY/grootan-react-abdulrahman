import { useState, useRef, useEffect } from "react";
import useClickOutside from "../../hooks/useClickOutside";
import "./Dropdown.css";

const languages = [
  { flag: "🇬🇧", name: "English", code: "en" },
  { flag: "🇪🇸", name: "Spanish", code: "es" },
  { flag: "🇫🇷", name: "French", code: "fr" },
  { flag: "🇩🇪", name: "German", code: "de" },
  { flag: "🇯🇵", name: "Japanese", code: "ja" },
  { flag: "🇰🇷", name: "Korean", code: "ko" },
  { flag: "🇨🇳", name: "Chinese", code: "zh" },
  { flag: "🇮🇳", name: "Hindi", code: "hi" },
  { flag: "🇸🇦", name: "Arabic", code: "ar" },
  { flag: "🇧🇷", name: "Portuguese", code: "pt" },
];

function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(languages[0]);

  const dropdownRef = useRef(null);

  // Click outside hook
  useClickOutside(dropdownRef, () => setIsOpen(false));

  // Escape key handling
  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("keydown", handleKey);

    return () => {
      document.removeEventListener("keydown", handleKey);
    };
  }, []);

  const handleSelect = (lang) => {
    setSelected(lang);
    setIsOpen(false);
  };

  return (
    <div className="card">
      <h2>Language Selector</h2>

      <div
        className="dropdown"
        ref={dropdownRef}
      >
        <button
          className="dropdown-trigger"
          onClick={() => setIsOpen(!isOpen)}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          {selected.flag} {selected.name}
          <span className={`arrow ${isOpen ? "rotate" : ""}`}>▼</span>
        </button>

        {isOpen && (
          <ul
            className="dropdown-menu"
            role="listbox"
          >
            {languages.map((lang) => (
              <li
                key={lang.code}
                role="option"
                aria-selected={selected.code === lang.code}
                className={`dropdown-item ${
                  selected.code === lang.code ? "selected" : ""
                }`}
                onClick={() => handleSelect(lang)}
              >
                {lang.flag} {lang.name}
                {selected.code === lang.code && (
                  <span className="checkmark">✔</span>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      <p className="selected-text">
        Selected: {selected.flag} {selected.name} ({selected.code})
      </p>
    </div>
  );
}

export default Dropdown;