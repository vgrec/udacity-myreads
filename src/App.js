import "./App.css";
import { useState, useEffect } from "react";
import SearchPage from "./components/SearchPage";
import BooksPage from "./components/BooksPage";
import { Route, Routes } from "react-router-dom";
import { getAll, search, update } from "./BooksAPI";

function App() {
  const [shelfs, setShelfs] = useState([])
  const [textQuery, setTextQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const fetchAllShelves = async () => {
    try {
      const remoteShelves = await getAll();
      const shelfs = groupBooksByShelfs(remoteShelves);
      setShelfs(shelfs);
    } catch (error) {
      console.log(error);
      setShelfs([]);
    }
  }

  const groupBooksByShelfs = (remoteShelves) => {
    const shelfsStrings = {
      currentlyReading: "Currently Reading",
      wantToRead: "Want to Read",
      read: "Read"
    };

    const shelfData = remoteShelves.map(remoteShelf => ({
      shelfId: remoteShelf.shelf,
      bookId: remoteShelf.id,
      bookTitle: remoteShelf.title,
      bookAuthor: remoteShelf.authors ? remoteShelf.authors.join(", ") : "",
      bookImage: remoteShelf.imageLinks ? remoteShelf.imageLinks.thumbnail : ""
    }));

    let dictionary = {};
    shelfData.forEach(shelf => {
      if (dictionary[shelf.shelfId]) {
        dictionary[shelf.shelfId].push({
          shelfId: shelf.shelfId,
          bookId: shelf.bookId,
          bookTitle: shelf.bookTitle,
          bookAuthor: shelf.bookAuthor,
          bookImage: shelf.bookImage
        });
      } else {
        dictionary[shelf.shelfId] = [{
          shelfId: shelf.shelfId,
          bookId: shelf.bookId,
          bookTitle: shelf.bookTitle,
          bookAuthor: shelf.bookAuthor,
          bookImage: shelf.bookImage
        }];
      }
    });

    return Object.keys(dictionary).map(key => ({
      shelfId: key,
      title: shelfsStrings[key],
      books: dictionary[key]
    }));
  };

  const handleOptionsSelected = async (selectedShelfId, book) => {
    console.log("current: " + book.shelfId + ", move to: " + selectedShelfId + ", bookId: " + book.bookId);

    if (selectedShelfId === book.shelfId) {
      console.log("same shelf, no need to update");
      return;
    }

    await update({ id: book.bookId }, selectedShelfId);

    fetchAllShelves();
  };

  const handleTextQueryChange = (textQuery) => {
    setTextQuery(textQuery);
  }

  useEffect(() => {
    fetchAllShelves();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])



  useEffect(() => {
    const fetchSearchResults = async () => {
      if (textQuery.length === 0) {
        console.log("no text query, no need to search");
        setSearchResults([]);
        return;
      }

      console.log("searching for: " + textQuery);

      try {
        const res = await search(textQuery, 1);
        console.log(res);

        setSearchResults(
          res.map((book) => ({
            bookId: book.id,
            bookTitle: book.title,
            bookAuthor: book.authors ? book.authors.join(", ") : "",
            bookImage: book.imageLinks ? book.imageLinks.thumbnail : "",
          }))
        );
      } catch (error) {
        console.log("Error performing search:", error);
        setSearchResults([]);
      }
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
            }} />
        } />

        <Route path="/search" element={
          <SearchPage
            onTextQueryChange={(textQuery) => {
              handleTextQueryChange(textQuery);
            }}
            textQuery={textQuery}
            searchResults={searchResults}
          />
        } />
      </Routes>
    </div>
  );
}

export default App;
