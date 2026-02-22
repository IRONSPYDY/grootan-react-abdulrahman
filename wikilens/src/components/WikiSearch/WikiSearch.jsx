import { useState, useEffect } from "react";
import axios from "axios";
import useDebounce from "../../hooks/useDebounce";
import "./WikiSearch.css";

function WikiSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    if (!debouncedQuery) return;

    const controller = new AbortController();

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(
          "https://en.wikipedia.org/w/api.php",
          {
            params: {
              action: "query",
              list: "search",
              srsearch: debouncedQuery,
              format: "json",
              origin: "*",
              srlimit: 10,
            },
            signal: controller.signal,
          }
        );

        setResults(response.data.query.search);
      } catch (err) {
        if (!axios.isCancel(err)) {
          setError("Something went wrong. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [debouncedQuery]);

  return (
    <div className="card">
      <h2>Wikipedia Search</h2>

      <input
        type="text"
        placeholder="Search Wikipedia articles..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search-input"
      />

      <div className="results-container">
        {!query && <p>Type something to search</p>}

        {loading && <p>Searching...</p>}

        {error && (
          <div className="error">
            <p>{error}</p>
            <button onClick={() => setQuery(query)}>Try Again</button>
          </div>
        )}

        {!loading && query && results.length === 0 && (
          <p>No articles found for "{query}"</p>
        )}

        {results.map((result) => (
          <div key={result.pageid} className="result-card">
            <h3>{result.title}</h3>

            <p
              dangerouslySetInnerHTML={{
                __html: result.snippet,
              }}
            ></p>

            <a
              href={`https://en.wikipedia.org/wiki/${result.title}`}
              target="_blank"
              rel="noreferrer"
            >
              Read full article
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WikiSearch;