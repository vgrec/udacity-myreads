import { Link, useNavigate } from "react-router-dom";
import BookItem from "./BookItem";

const SearchPage = ({ textQuery, onTextQueryChange, searchResults, onOptionsSelected, bookIdsToShelfIds }) => {
    console.log(searchResults);

    const handleChange = (event) => {
        onTextQueryChange(event.target.value);
    };

    const navigate = useNavigate();

    return (
        <div className="search-books">
            <div className="search-books-bar">
                <Link
                    className="close-search"
                    onClick={() => { navigate(-1) }}>
                    Close
                </Link>
                <div className="search-books-input-wrapper">
                    <input
                        type="text"
                        placeholder="Search by title, author, or ISBN"
                        onChange={handleChange}
                        value={textQuery}
                    />
                </div>
            </div>
            <div className="search-books-results">
                <ol className="books-grid">
                    {searchResults.map((book) => (
                        <li key={book.bookId}>
                            <BookItem
                                bookTitle={book.bookTitle}
                                bookAuthor={book.bookAuthor}
                                bookImage={book.bookImage}
                                onOptionSelected={(option) => onOptionsSelected(option, book)}
                                shelfId={bookIdsToShelfIds[book.bookId] || "none"}
                            />
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    )
}

export default SearchPage;