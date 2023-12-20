import { Link, useNavigate } from "react-router-dom";

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