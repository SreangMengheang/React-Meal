import React, { useEffect, useRef } from "react";

function SearchForm({  handleSearch, search, setSearch }) {
  
  const inputRef = useRef(null);

  const onSearch = (e) => {
    e.preventDefault()
    handleSearch(search);
  };
  
  

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <form onSubmit={onSearch} className="flex items-center gap-2">
      <input
        className="px-3 py-2 text-white bg-gray-800 rounded focus:outline-none focus:ring-2 border border-white"
        type="text"
        ref={inputRef}
        value={search}
        onInput={(e => setSearch(e.target.value))}
        placeholder="Search..."
      />
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors"
      >
        Search
      </button>
    </form>
  );
}

export default SearchForm;