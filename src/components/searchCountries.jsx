// components/SearchCountries.js

import React, { useState ,useEffect } from 'react';
import SearchBox from './SearchBox';
import CountriesTable from './CountriesTable';
import Pagination from './Pagination';
import { useDebounce } from '../hooks/useDebounce';
import { fetchData } from '../services/api';

export const SearchCountries = () =>{
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const deBounceSearch = useDebounce(searchQuery, 400);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    
  const [totalPages, setTotalPages] = useState(0);
 

  useEffect(() => {
    if(deBounceSearch?.length){
        apiCall()
    }
  }, [deBounceSearch]);

   const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const apiCall = async () => {
    try {
setLoading(true);
     const response = await fetchData(deBounceSearch)
     setData(response)
     const total = Math.ceil(response.length / itemsPerPage)
     setTotalPages(total)
     setLoading(false);
    } catch (e){
        setLoading(false);
        setData([])
     
    }
  }


  return (
    <div className="search-countries-container">
      <SearchBox setSearchQuery={setSearchQuery} />
     
      <CountriesTable data={data} loading={loading} currentPage={currentPage} itemsPerPage={itemsPerPage} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

