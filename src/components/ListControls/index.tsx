import React, { useState } from 'react';

// ** Components
import SearchFilter from '../SearchFilter';
import AddEmployeeModal from '../AddEmployeeModal';

interface IListControls {
  searchTerm: string;
  statusFilter: string[];
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onStatusFilterChange: (selectedStatuses: string[]) => void;
}

const ListControls = (props: IListControls) => {
  const {
    searchTerm,
    statusFilter,
    onSearchChange,
    onStatusFilterChange,
  } = props;

  // ** State
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // ** Handlers
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleCreateEmployee = (newEmployee: UserType) => {
    console.log(newEmployee, 'newEmployee');

    toggleModal();
  };

  return (
    <div className="list-controls-container">
      <button
        className="button button-primary button-xl"
        onClick={toggleModal}
      >
        Create +
      </button>

      <SearchFilter
        searchTerm={searchTerm}
        statusFilter={statusFilter}
        onSearchChange={onSearchChange}
        onStatusFilterChange={onStatusFilterChange}
      />

      {isModalOpen && (
        <AddEmployeeModal
          onClose={toggleModal}
          onCreate={handleCreateEmployee}
        />
      )}
    </div>
  );
};

export default ListControls;
