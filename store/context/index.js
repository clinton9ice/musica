import { createContext, useState } from "react";

const musicContext = createContext();

export function MusicStore({ children }) {
  const [history, setHistories] = useState([
    "ayrra",
    "tems",
    "akon",
    "burnaboy",
    "rudeboi",
    "davido",
    "jason derulo",
    "justin bieber",
    "justin timberlake",
  ]);
  const [navOpen, OpenNav] = useState(false);

  const setHistory = (e) => {
    // Check if the arg is an array and clear the history if empty
    if (Array.isArray(e) && e.length === 0) setHistories([]);

    // Make sure the provided parameter is not an array
    if (!Array.isArray(e)) {
      // Check if the provided parameter already exists
      let exists =
        history.includes(e.toLowerCase()) ||
        localStorage.getItem(e.toLowerCase()) != null;

      if (!exists) {
        //   Set New History
        setHistories([e, ...history]);
        //   Set the history data in your browser local storage
        localStorage.setItem("histories", history);
      }
    }
  };
  const toggleNav = () => OpenNav(!navOpen);

  const rmHistory = (e) => setHistories(history.filter((i) => i !== e));

  return (
    <musicContext.Provider
      value={{ history, setHistory, rmHistory, navOpen, toggleNav }}
    >
      {children}
    </musicContext.Provider>
  );
}

export default musicContext;
