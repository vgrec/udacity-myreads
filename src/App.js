import "./App.css";
import { useState, useEffect, useMemo } from "react";
import SearchPage from "./components/SearchPage";
import BooksPage from "./components/BooksPage";
import { Route, Routes } from "react-router-dom";
import { fetchAllShelves, searchBooks, moveBookToShelf } from "./BooksRepository";

function App() {
  const [shelfs, setShelfs] = useState([])
  const [textQuery, setTextQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleOptionsSelected = (selectedShelfId, book) => {
    console.log("current: " + book.shelfId + ", move to: " + selectedShelfId + ", bookId: " + book.bookId);

    if (selectedShelfId === book.shelfId) {
      console.log("same shelf, no need to update");
      return;
    }

    moveBookToShelf(book.bookId, selectedShelfId);
    fetchAllShelves().then(shelfs => {
      setShelfs(shelfs);
    });
  };

  const handleTextQueryChange = (textQuery) => {
    setTextQuery(textQuery);
  }

  const bookIdsToShelfIds = useMemo(() => {
    return shelfs.reduce((acc, shelf) => {
      shelf.books.forEach(book => {
        acc[book.bookId] = shelf.shelfId;
      });
      return acc;
    }, {});
  }, [shelfs]);

  useEffect(() => {
    fetchAllShelves().then(shelfs => {
      setShelfs(shelfs);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const fetchSearchResults = () => {
      if (textQuery.length === 0) {
        console.log("no text query, no need to search");
        setSearchResults([]);
        return;
      }

      console.log("searching for: " + textQuery);

      searchBooks(textQuery).then(res => {
        console.log("results:", res);
        setSearchResults(res)
      });
    };

    const timerId = setTimeout(fetchSearchResults, 500);

    return () => clearTimeout(timerId); // cleanup on unmount or on next run
  }, [textQuery]);

  return (
    <div className="app">
      <Routes>
        <Route exact path="/" element={
          <BooksPage
            shelfs={shelfs}
            onOptionsSelected={(option, book) => {
              handleOptionsSelected(option, book);
            }}
            bookIdsToShelfIds={bookIdsToShelfIds}
          />
        } />

        <Route path="/search" element={
          <SearchPage
            onTextQueryChange={(textQuery) => {
              handleTextQueryChange(textQuery);
            }}
            textQuery={textQuery}
            searchResults={searchResults}
            onOptionsSelected={(option, book) => {
              handleOptionsSelected(option, book);
            }}
          />
        } />
      </Routes>
    </div>
  );
}

export default App;
