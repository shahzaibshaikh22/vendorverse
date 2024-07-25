import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const Autocomplete = ({suggestions}) => {
  const [query, setQuery] = useState('');
  
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState('');

  const { mode } = useSelector((state) => state.auth)
  // const suggestions = [
  //   'Apple',
  //   'Banana',
  //   'Cherry',
  //   'Date',
  //   'Elderberry',
  //   'Fig',
  //   'Grape',
  //   'Honeydew',
  // ];

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value) {
      const filtered = suggestions.filter(item =>
        item.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setError('');
      setIsOpen(true);
    } else {
      setFilteredSuggestions([]);
      setError('Product not found.')
      setIsOpen(false);
    }
  };

  const handleSelect = (suggestion) => {
    setQuery(suggestion);
    setFilteredSuggestions([]);
    setIsOpen(false);
  };

  return (
    <div className="relative w-64 mx-auto">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        className={`${mode === "dark" ? 'bg-darkufg text-white' : 'bg-lightgray text-darkbg'} w-full p-2 border text-black border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500`}
        placeholder="Search..."
      />
      {filteredSuggestions.length > 0 ?(

          <ul className={`${mode === "dark" ? 'bg-darkufg text-white' : 'bg-lightgray text-darkbg'} absolute left-0 right-0 mt-2 p-1  border border-gray-300 rounded shadow-lg max-h-60 overflow-auto`}>
            {filteredSuggestions.map((suggestion, index) => (
              <li
                key={index}
                className="p-2 cursor-pointer"
                onClick={() => handleSelect(suggestion)}
              >
                {suggestion}
              </li>
            ))}
          </ul>
      ):<span>{error}</span>}
    </div>
  );
};

export default Autocomplete;