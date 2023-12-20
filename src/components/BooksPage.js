import { Link } from "react-router-dom";
import BooksShelf from "./BooksShelf";

const BooksPage = ({ shelfs, onOptionsSelected }) => {

    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <div>
                    {shelfs.map((shelf) =>
                    (
                        <BooksShelf
                            key={shelf.shelfId}
                            bookShelf={shelf}
                            onOptionsSelected={(option, book) => onOptionsSelected(option, book)} />
                    )
                    )}
                </div>
            </div>
            <div className="open-search">
                <Link to="/search">Add a book</Link>
            </div>
        </div>
    )
}

export default BooksPage;