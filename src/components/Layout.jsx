/* eslint-disable array-callback-return */
/* eslint-disable no-unused-expressions */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import "./Layout.scss";
import TableData from "./TableData";
import { useCharacters } from "../contexts/casts";

const Layout = ({ dataRecieved, movieSelected }) => {
  const { characters_context, updateCharacters, sortPeople, sortByGender } =
    useCharacters();
  const [direction, setDirection] = useState("descending");
  const [currentChild, setCurrentChild] = useState("all");
  const [totalHeight, setTotalHeight] = useState(0);
  console.log(totalHeight, "dataRecieved...........");

  const getCharacters = () => {
    dataRecieved?.filter((item) => {
      if (item.title === movieSelected) {
        updateCharacters(item.characters);
        return;
      }
    });
  };

  const getAllHeight = async () => {
    const newCharacter = characters_context.filter(
      (item) => item.height !== "unknown"
    );
    const allSum = newCharacter.reduce((a, b) => +a + +b.height, 0);
    setTotalHeight((prevState) => (prevState = allSum));
  };

  const sortingCasts = () => {
    if (direction === "assending") {
      sortPeople("descending");
      setDirection("descending");
      return;
    }
    sortPeople("assending");
    setDirection("assending");
  };

  useEffect(() => {
    currentChild === "Male Only"
      ? sortByGender("male")
      : currentChild === "Female Only"
      ? sortByGender("female")
      : sortByGender("all");
  }, [currentChild]);

  const displayCharacters = characters_context.map((item) => {
    return (
      <TableData name={item.name} height={item.height} gender={item.gender} />
    );
  });

  useEffect(() => {
    getAllHeight();
    
  }, [characters_context]);

  useEffect(() => {
    const unsub = getCharacters();
    setCurrentChild("all")
    // getAllHeight();
    return () => {
      unsub;
    };
  }, [movieSelected]);

  // const getEachMovieData = dataRecieved?.map

  return (
    <>
      <section className="maintable">
        {characters_context.length > 0 && (
          <div className="selection">
            <button
              onClick={(e) => setCurrentChild("all")}
              className={currentChild === "all" ? "selected" : "non_selected"}
            >
              All
            </button>
            <button
              onClick={(e) => setCurrentChild("Male Only")}
              className={
                currentChild === "Male Only" ? "selected" : "non_selected"
              }
            >
              Male Only
            </button>
            <button
              onClick={(e) => setCurrentChild("Female Only")}
              className={
                currentChild === "Female Only" ? "selected" : "non_selected"
              }
            >
              Female Only
            </button>
          </div>
        )}
        {characters_context.length > 0 && (
          <table>
            <thead>
              <tr onClick={() => sortingCasts()}>
                <th>Name</th>
                <th>Gender</th>
                <th>Height</th>
              </tr>
            </thead>

            <tbody>
              {displayCharacters}
              <tr>
                <td>Total Characters: {characters_context.length}</td>
                <td></td>
                <td>
                  Total Heights: {totalHeight}cm
                  {`(${Math.round(totalHeight / 30.48)}ft/${Math.round(
                    totalHeight / 2.54
                  )}in)`}
                </td>
              </tr>
            </tbody>
          </table>
        )}
      </section>
    </>
  );
};

export default Layout;
