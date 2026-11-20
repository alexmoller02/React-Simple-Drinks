import { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import { useAPI } from "../../Contexts/APIContext";
import { DrinkCard } from "../../Components";
import "./styles.css";

function Drinks() {
  const { getDrinks, searchDrinks } = useAPI();
  const [drinks, setDrinks] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const searchTerm = search.trim();

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    setLoading(true);
    setError("");

    async function fetchDrinks() {
      try {
        const results = searchTerm
          ? await searchDrinks(searchTerm, signal)
          : await getDrinks(signal);
        if (!signal.aborted) setDrinks(results);
      } catch {
        if (!signal.aborted) {
          setError("Unable to load drinks. Please try again later.");
        }
      } finally {
        if (!signal.aborted) setLoading(false);
      }
    }

    const timeout = setTimeout(fetchDrinks, searchTerm ? 300 : 0);

    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, [getDrinks, searchDrinks, searchTerm]);

  return (
    <div className="App">
      <h1>Drinks</h1>
      <TextField
        id="standard-basic"
        label="Search"
        type="search"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        variant="standard"
        sx={{
          "& label.Mui-focused": {
            color: "#61fb8f",
          },
          "& .MuiInput-underline:after": {
            borderBottomColor: "#61fb8f",
          },
          width: "100%",
          maxWidth: "40vw",
          "& .MuiInputBase-root": {
            fontSize: "2rem",
          },
          "& .MuiInputLabel-root + .MuiInputBase-root": {
            marginTop: "1.5rem",
          },
          "& .MuiInputLabel-root": {
            fontSize: "2rem",
          },
          "& .MuiInputLabel-shrink": {
            fontSize: "1.25rem",
          },
        }}
      />
      {loading && <p>Loading drinks...</p>}
      {error && <p role="alert">{error}</p>}
      {!loading && !error && searchTerm && drinks.length === 0 && (
        <p role="status">No drinks match your search.</p>
      )}
      {!loading && !error && drinks.length > 0 && (
        <ul className="drinks-grid">
          {drinks.map((drink) => (
            <DrinkCard
              key={drink.idDrink}
              id={drink.idDrink}
              drink={drink.strDrink}
              image={drink.strDrinkThumb}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default Drinks;
