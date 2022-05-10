import Intro from "./components/Intro";
import "./App.scss";
import Layout from "./components/Layout";
import useApiCalls from "./Hooks/useApiCalls";
import { useState, useEffect } from "react";
import { CharactersProvider } from "./contexts/casts";

function App() {
  const { dataRecieved, loading, errorMsg } = useApiCalls();
  const [movieSelected, setMovieSelected] = useState("");
  console.log(movieSelected, "as selected movie");

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
