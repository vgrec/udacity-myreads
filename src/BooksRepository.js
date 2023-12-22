import { getAll, search, update } from "./BooksAPI";

export const fetchAllShelves = async () => {
    try {
        const remoteShelves = await getAll();
        return groupBooksByShelfs(remoteShelves);
    } catch (error) {
        console.log("Error fetching shelfs:", error);
        return [];
    }
}

export const searchBooks = async (query) => {
    try {
        const res = await search(query.trim(), 20);
        console.log("search results:", res);
        return res.map((book) => ({
            bookId: book.id,
            bookTitle: book.title,
            bookAuthor: book.authors ? book.authors.join(", ") : "",
            bookImage: book.imageLinks ? book.imageLinks.thumbnail : "",
        }));
    } catch (error) {
        console.log("Error performing search:", error);
        return [];
    }
}

export const moveBookToShelf = async (bookId, shelfId) => {
    try {
        await update({ id: bookId }, shelfId);
    } catch (error) {
        console.log("Error updating book:", error);
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