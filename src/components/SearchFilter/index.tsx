import React from 'react';

// ** Components
import Dropdown from './../Dropdown';
import SearchInput from './../SearchInput';

interface ISearchFilterProps {
  searchTerm: string;
  statusFilter: string[];
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onStatusFilterChange: (selectedStatuses: string[]) => void;
}

const SearchFilter = ( props: ISearchFilterProps) => {
  const {
    searchTerm,
    statusFilter,
    onSearchChange,
    onStatusFilterChange,
  } = props;

  return (
    <div className="search-filter-container">
      <div className="search-container">
        <SearchInput
          value={searchTerm}
          onChange={onSearchChange}
          placeholder="Type to search"
        />
      </div>

      <div className="filter-container">
        <Dropdown
          isMultiSelect
          selectedStatuses={statusFilter}
          onSelectChange={onStatusFilterChange}
          customClass="status-filter-dropdown"
        />
      </div>
    </div>
  );
};

export default SearchFilter;
