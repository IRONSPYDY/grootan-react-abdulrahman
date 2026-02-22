import "./App.css";
import WikiSearch from "./components/WikiSearch/WikiSearch";
import Accordion from "./components/Accordion/Accordion";
import Dropdown from "./components/Dropdown/Dropdown";
import Counter from "./components/Counter/Counter";

function App() {
  return (
    <div className="app">
      <header className="header">
        <h1>WikiLens</h1>
        <p>Multi-Widget React Dashboard</p>
      </header>

      <main className="dashboard">
  <div className="card">
    <WikiSearch />
  </div>

  <div className="card">
    <Accordion />
  </div>

  <div className="card">
    <Dropdown />
  </div>

  <div className="card">
    <Counter />
  </div>
</main>

      <footer className="footer">
        Built with React Hooks 🚀
      </footer>
    </div>
  );
}

export default App;