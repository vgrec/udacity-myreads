import PropTypes from 'prop-types';
import Book from './Book';

const BooksShelf = ({ bookShelf }) => {
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{bookShelf.title}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {bookShelf.books.map((book) => (
                        <li key={book.bookTitle}>
                            <Book
                                bookTitle={book.bookTitle}
                                bookAuthor={book.bookAuthor}
                                bookImage={book.bookImage}
                            />
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    );
}

BooksShelf.propTypes = {
    bookShelf: PropTypes.shape({
        title: PropTypes.string.isRequired,
        books: PropTypes.arrayOf(
            PropTypes.shape({
                bookTitle: PropTypes.string.isRequired,
                bookAuthor: PropTypes.string.isRequired,
                bookImage: PropTypes.string.isRequired,
            })
        ).isRequired
    })
};

export default BooksShelf;