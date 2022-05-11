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

  // function to get character and push to an array of existing characters
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
        // creating a backup data to avoid loss of data when sorting
        setBackupData((prevItems) => [
          ...prevItems,
          {
            name: data.name,
            gender: data.gender,
            height: data.height,
          },
        ]);
      });
      // making sure no code runs until the map function is completed
      const awaited = await Promise.all(keepWatch)
      setLoading(false)
      return
    } catch (error) {
      setLoading(false)
      return
    }

  };

  // useEffect(() => {

  // }, []);

  // function to sort people/characters 
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
      // clearing initial/existing data to avoid messing up the data at times
      setCharacters([]);
      let newCharacters;
      newCharacters = await cahcedCharecters
        .sort((a, b) => (a.name > b.name ? 1 : -1))
        .reverse();
        // setting up new and updated data
      setCharacters(newCharacters);
    }
  };

  const updateCharacters = async (item) => {
    setCharacters([]);
    setBackupData([]);
    await getCharacters(item);
  };


  const sortByGender = async (incomingGender) => {
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

  // returning neccessary values to children components
  return (
    <CharactersContext.Provider
      value={{ characters_context, updateCharacters, sortPeople, sortByGender, loadingData }}
    >
      {children}
    </CharactersContext.Provider>
  );
};
