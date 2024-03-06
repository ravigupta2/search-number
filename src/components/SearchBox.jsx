/* eslint-disable react/prop-types */
// components/SearchBox.js

import React , {useRef , useEffect} from 'react';

function SearchBox({ setSearchQuery }) {
    const searchInputRef = useRef(null);
  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };
    useEffect(() => {
    const handleKeyPress = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        focusSearchBox();
      }
    };

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);
  const focusSearchBox = () => {
    searchInputRef.current.focus(); 
  };

  return (
    <div className="search-box">
      <input type="text" placeholder="Search..." onChange={handleChange}
      ref={searchInputRef} />
    </div>
  );
}

export default SearchBox;
