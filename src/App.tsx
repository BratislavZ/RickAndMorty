import React, { useRef, useState, useCallback } from "react";
import Card from "./components/Card/Card";
import RadioGroup from "./components/RadioGroup/RadioGroup";
import SearchBar from "./components/SearchBar/SearchBar";
import useCartoonSearch from "./hooks/useCartoonSearch";
import { CartoonCharacter } from "./models/interface";
import "./App.css";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";

const App: React.FC = () => {
  const observer = useRef<IntersectionObserver | null>(null);
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [pageNumber, setPageNumber] = useState(1);

  const { characters, hasMore, loading } = useCartoonSearch(
    name,
    status,
    pageNumber
  );

  const selectHandler = (selectedStatus: string) => {
    let status = "";
    if (selectedStatus !== "any") {
      status = `status=${selectedStatus}`;
    }
    setStatus(status);
    setPageNumber(1);
  };

  const searchHandler = (searchValue: string) => {
    let name = "";
    if (searchValue !== "") {
      name = `name=${searchValue}`;
    }
    setName(name);
    setPageNumber(1);
  };

  const lastCardRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading) return;
      if (observer.current) {
        observer.current?.disconnect();
      }
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) {
        observer.current.observe(node);
      }
    },
    [loading, hasMore]
  );

  return (
    <div className="App">
      <SearchBar onSearch={searchHandler} />
      <main>
        <RadioGroup onSelect={selectHandler} />
        <div className="cards">
          {characters.map((char: CartoonCharacter, index: number) => {
            if (characters.length === index + 1) {
              return <Card key={char.id} ref={lastCardRef} character={char} />;
            } else {
              return <Card key={char.id} character={char} />;
            }
          })}
        </div>
        {loading && <LoadingSpinner />}
      </main>
    </div>
  );
};

export default App;
