import { Link, useNavigate } from "react-router-dom";
//import { search } from "./BooksAPI";


// const searchBooks = async (query, maxResults) => {
//   const res = await search(query, maxResults);
//   console.log(res);
// }
// searchBooks("Linux", 20);

const SearchPage = ({ onBackButtonPressed }) => {
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
                    />
                </div>
            </div>
            <div className="search-books-results">
                <ol className="books-grid"></ol>
            </div>
        </div>
    )
}

export default SearchPage;