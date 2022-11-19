import { useEffect, useState } from "react";
import { CartoonCharacter } from "../models/interface";

export default function useCartoonSearch(
  name: string,
  status: string,
  pageNumber: number
) {
  const [loading, setLoading] = useState(true);
  const [characters, setCharacters] = useState<CartoonCharacter[]>([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setCharacters([]);
  }, [name, status]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    setLoading(true);

    const fetchData = () => {
      fetch(
        `https://rickandmortyapi.com/api/character/?page=${pageNumber}&${name}&${status}`,
        { signal }
      )
        .then((res) => {
          if (!res.ok) {
            throw new Error();
          }
          return res.json();
        })
        .then((data) => {
          setCharacters((prev) => {
            return [...prev, ...data.results];
          });
          setHasMore(data.results.length > 0);
          setLoading(false);
          console.log(data);
        })
        .catch((e) => {
          if (e.name === "AbortError") {
            console.log("Request aborted!");
          }
          setLoading(false);
          setHasMore(false);
        });
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [name, status, pageNumber]);

  return { loading, characters, hasMore };
}
