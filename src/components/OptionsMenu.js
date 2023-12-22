import { useState, useEffect } from "react";

const OptionsMenu = ({ defaultSelectedOption = 'none', onOptionSelected }) => {
    const [selectedOption, setSelectedOption] = useState('none');

    useEffect(() => {
        setSelectedOption(defaultSelectedOption);
    }, [defaultSelectedOption]);

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
                <option value="header" disabled>
                    Move to...
                </option>
                <option value="currentlyReading">
                    Currently Reading
                </option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
            </select>
        </div>
    );
}

export default OptionsMenu;