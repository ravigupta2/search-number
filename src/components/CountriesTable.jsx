import React , {useEffect, useState } from 'react';

const CountriesTable = ({ data, loading,currentPage, itemsPerPage}) => {
const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
    useEffect(() => {
 
  setCurrentPageData(data.slice(startIndex, endIndex))
    } , [currentPage ,data])
   
  const [sortDirection, setSortDirection] = useState('asc'); 
   const [sortedColumn, setSortedColumn] = useState(null);
   const [currentPageData, setCurrentPageData] = useState([])
  if (loading) {
    return <div className="spinner">Loading...</div>;
  }
 

  if (!data.length) {
    return <div>No result found</div>;
  }
  const renderSortIcon = (columnName) => {
    if (columnName === sortedColumn) {
      return sortDirection === 'asc' ? <span>&uarr;</span> : <span>&darr;</span>;
    }
    return null;
  };

  const handleNameClick = () => {
    const newSortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    setSortDirection(newSortDirection);
    const sortedData = [...data].sort((a, b) => {
      const nameA = a.name?.common.toLowerCase();
      const nameB = b.name?.common.toLowerCase();
      if (newSortDirection === 'asc') {
        return nameA.localeCompare(nameB);
      } else {
        return nameB.localeCompare(nameA);
      }
    });

    setCurrentPageData(sortedData);
     setSortedColumn('name');
  };

  
  return (
     <div className="table-container">
        <table className='table'>
      <thead>
        <tr>
          <th>No.</th>
          <th onClick={handleNameClick} >Country Name {renderSortIcon('name')}</th>
          <th>Country Flag</th>
        </tr>
      </thead>
      <tbody>
        {currentPageData.map((country, index) => (
          <tr key={country.name?.common}>
            <td>{startIndex + index + 1}</td>
            <td>{country.name?.common}</td>
            <td className="country-flag"><img src={country?.flags?.png} alt={country?.flags?.alt} /></td>
          </tr>
        ))}
      </tbody>
    </table>
      </div>
    
  );
};

export default CountriesTable;

