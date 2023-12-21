import OptionsMenu from "./OptionsMenu";

const Book = ({ bookTitle, bookAuthor, bookImage, onOptionSelected }) => {

    return (
        <div className="book">
            <div className="book-top">
                <div
                    className="book-cover"
                    style={{
                        width: 128,
                        height: 193,
                        backgroundImage: `url("${bookImage}}")`,
                    }}
                ></div>
                <OptionsMenu onOptionSelected={(selectedShelfId) => onOptionSelected(selectedShelfId)} />
            </div>
            <div className="book-title">{bookTitle}</div>
            <div className="book-authors">{bookAuthor}</div>
        </div>
    )
}

export default Book;