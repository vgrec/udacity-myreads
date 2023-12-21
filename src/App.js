import "./App.css";
import { useState, useEffect } from "react";
import SearchPage from "./components/SearchPage";
import BooksPage from "./components/BooksPage";
import { Route, Routes } from "react-router-dom";
import { getAll, update } from "./BooksAPI";

function App() {
  const [shelfs, setShelfs] = useState([])

  const fetchAllShelves = async () => {
    await getAll().then(remoteShelves => {
      const shelfs = groupBooksByShelfs(remoteShelves);
      setShelfs(shelfs);
    });
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
      bookAuthor: remoteShelf.authors.join(", "),
      bookImage: remoteShelf.imageLinks.thumbnail
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



  useEffect(() => {
    fetchAllShelves();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
          <SearchPage />
        } />
      </Routes>
    </div>
  );
}

export default App;
