import "./App.css";
import { useState, useEffect } from "react";
import SearchPage from "./components/SearchPage";
import BooksPage from "./components/BooksPage";
import { Route, Routes } from "react-router-dom";
import { getAll, search, update } from "./BooksAPI";

function App() {
  const [shelfs, setShelfs] = useState([])

  const fetchAllShelves = async () => {
    const res = await getAll();
    console.log(res);

    return res;
  }

  const groupBooksByShelfs = (remoteShelves) => {
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
      title: key,
      books: dictionary[key]
    }));
  };

  const refreshAllShelves = async () => {
    fetchAllShelves().then(remoteShelves => {
      const shelfs = groupBooksByShelfs(remoteShelves);
      setShelfs(shelfs);
    });
  };

  const handleOptionsSelected = async (option, book) => {
    console.log("selected: " + option + " shelf: " + book.shelfId + " bookId: " + book.bookId);

    await update({ id: book.bookId }, option);

    refreshAllShelves();
  };



  useEffect(() => {
    refreshAllShelves();

    // const searchBooks = async (query, maxResults) => {
    //   const res = await search(query, maxResults);
    //   console.log(res);
    // }
    // searchBooks("Linux", 20);

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
