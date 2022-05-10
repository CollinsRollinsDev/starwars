import React, { useState, useLayoutEffect } from "react";

const useApiCalls = (url = "https://swapi.dev/api/films") => {
  const [dataRecieved, setDataRecieved] = useState([]);
  const [loading, setLoading] = useState(true)
  const [errorMsg, setErrorMsg] = useState(true)

  const getMovies = async () => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      // console.log(data.results, "As to sor data");
      if (!data?.results) {
        // do nothing for now
        setLoading(false)
        setErrorMsg('')
        return "done";
      }
      setDataRecieved(data?.results.reverse());
      setLoading(false)
      setErrorMsg('')
      return "done"
    } catch (error) {
      setLoading(false)
      setErrorMsg("Sorry, Unable to get data at this time.")
      console.log(error, "As srror found and caught");
    }
  };

  useLayoutEffect(() => {
    getMovies();
    //   return () => {
    //     second
    //   };
  }, []);

  return { dataRecieved, loading, errorMsg };
};

export default useApiCalls;
