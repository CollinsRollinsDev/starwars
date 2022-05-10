import React, { useState, useLayoutEffect } from "react";

const useApiCalls = (url = "https://swapi.dev/api/films") => {
  const [dataRecieved, setDataRecieved] = useState([]);

  const getMovies = async () => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log(data.results, "As data");
      if (!data?.results) {
        // do nothing for now
        return;
      }
      setDataRecieved(data?.results);
    } catch (error) {
      console.log(error, "As srror found and caught");
    }
  };

  useLayoutEffect(() => {
    getMovies();
    //   return () => {
    //     second
    //   };
  }, []);

  return { dataRecieved };
};

export default useApiCalls;
