/* eslint-disable array-callback-return */
import React, { useContext, useEffect, useState } from "react";
const CharactersContext = React.createContext();
export const useCharacters = () => {
  return useContext(CharactersContext);
};

export const CharactersProvider = ({ children }) => {
  const [inProgressCharacter, setInprogressCharacter] = useState([]);
  const [characters_context, setCharacters] = useState([]);
  const [backupData, setBackupData] = useState([]);
  const [loadingData, setLoading] = useState(false)
  console.log(characters_context, "as passed items");

  const getCharacters = async (links) => {
    setLoading(true)
    try {
        const keepWatch = await links.map(async (link) => {
        const res = await fetch(link);
        const data = await res.json();
        setCharacters((prevItems) => [
          ...prevItems,
          {
            name: data.name,
            gender: data.gender,
            height: data.height,
          },
        ]);
        setBackupData((prevItems) => [
          ...prevItems,
          {
            name: data.name,
            gender: data.gender,
            height: data.height,
          },
        ]);
      });
      const awaited = await Promise.all(keepWatch)
      setLoading(false)
      console.log("done and dusted")
    } catch (error) {
      setLoading(false)
      console.log(error, "An error found and caught");
    }

  };

  // useEffect(() => {

  // }, []);

  const sortPeople = async (direction) => {
    if (direction === "assending") {
      let cahcedCharecters = characters_context;
      setCharacters([]);
      let newCharacters;
      newCharacters = await cahcedCharecters.sort((a, b) =>
        a.name > b.name ? 1 : -1
      );
      setCharacters(newCharacters);
    } else {
      let cahcedCharecters = characters_context;
      setCharacters([]);
      let newCharacters;
      newCharacters = await cahcedCharecters
        .sort((a, b) => (a.name > b.name ? 1 : -1))
        .reverse();
      setCharacters(newCharacters);
    }
  };

  const updateCharacters = async (item) => {
    setCharacters([]);
    setBackupData([]);
    await getCharacters(item);
  };

  const getOpeningCrawl = (selectedMovie) => {

  }

  const sortByGender = async (incomingGender) => {
    console.log(incomingGender, "incoming");
    if (incomingGender === "all" && backupData.length > 0) {
      await setCharacters([]);
      setCharacters(backupData);
      return;
    }

    setCharacters([]);
    const newCharacters = await backupData.filter(
      (item) => item.gender === incomingGender
    );
    setCharacters(newCharacters);
  };

  return (
    <CharactersContext.Provider
      value={{ characters_context, updateCharacters, sortPeople, sortByGender, loadingData }}
    >
      {children}
    </CharactersContext.Provider>
  );
};
