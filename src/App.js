import Intro from "./components/Intro";
import "./App.scss";
import Layout from "./components/Layout";
import useApiCalls from "./Hooks/useApiCalls";
import { useState, useEffect } from "react";
import { CharactersProvider } from "./contexts/casts";

function App() {
  // setting up neccessary states
  // calling the custom hook to load up dropdown contents
  const { dataRecieved, loading, errorMsg } = useApiCalls();
  const [movieSelected, setMovieSelected] = useState("");

  return (
    <CharactersProvider>
      <section className="App">
        <Intro
        errorMsg={errorMsg}
        loading={loading}
          setMovieSelected={setMovieSelected}
          dataRecieved={dataRecieved}
        />
        <Layout dataRecieved={dataRecieved} movieSelected={movieSelected} />
      </section>
    </CharactersProvider>
  );
}

export default App;
