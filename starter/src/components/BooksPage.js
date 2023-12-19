import BooksShelf from "./BooksShelf";

const BooksPage = ({ shelfs, onOpenSearchButtonPressed }) => {
    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <div>
                    {shelfs.map((shelf) => (
                        <BooksShelf key={shelf.bookTitle} bookShelf={shelf} />
                    ))
                    }
                </div>
            </div>
            <div className="open-search">
                <a onClick={() => onOpenSearchButtonPressed()}>Add a book</a>
            </div>
        </div>
    )
}

export default BooksPage;