import "./App.css";
import { useState, useEffect } from "react";
import SearchPage from "./components/SearchPage";
import BooksPage from "./components/BooksPage";
import { Route, Routes } from "react-router-dom";
import { getAll, search } from "./BooksAPI";

/*
    {
      title: "Currently Reading",
      books: [
        {
          bookTitle: "To Kill a Mockingbird",
          bookAuthor: "Harper Lee",
          bookImage: "http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api"
        },
        {
          bookTitle: "Ender's Game",
          bookAuthor: "Orson Scott Card",
          bookImage: "http://books.google.com/books/content?id=yDtCuFHXbAYC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72RRiTR6U5OUg3IY_LpHTL2NztVWAuZYNFE8dUuC0VlYabeyegLzpAnDPeWxE6RHi0C2ehrR9Gv20LH2dtjpbcUcs8YnH5VCCAH0Y2ICaKOTvrZTCObQbsfp4UbDqQyGISCZfGN&source=gbs_api"
        }
      ]
    },
    */

function App() {
  const [shelfs, setShelfs] = useState([])

  useEffect(() => {
    const fetchAllBooks = async () => {
      const res = await getAll();
      console.log(res);

      return res;
    }

    fetchAllBooks().then(remoteShelves => {
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

      const shelfs = Object.keys(dictionary).map(key => ({
        shelfId: key,
        title: key,
        books: dictionary[key]
      }));

      setShelfs(shelfs);
    });

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
            onOptionsSelected={(option) => console.log("selected: " + option)} />
        } />

        <Route path="/search" element={
          <SearchPage />
        } />
      </Routes>
    </div>
  );
}

export default App;
