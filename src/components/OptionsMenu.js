import { useState } from "react";

const OptionsMenu = ({ onOptionSelected }) => {
    const [selectedOption, setSelectedOption] = useState('none');

    const handleChange = (event) => {
        const selectedOption = event.target.value;
        setSelectedOption(selectedOption);
        onOptionSelected(selectedOption);
    }

    return (
        <div className="book-shelf-changer">
            <select
                value={selectedOption}
                onChange={handleChange}
            >
                <option value="none" disabled>
                    Move to...
                </option>
                <option value="currentlyReading">
                    Currently Reading
                </option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
            </select>
        </div>
    );
}

export default OptionsMenu;