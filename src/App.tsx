import React, {
  useState,
  useEffect,
} from 'react';
import axios from 'axios';

// ** Components
import Header from './components/Header';
import ListControls from './components/ListControls';
import EmployeeList from './components/EmployeeList';

function App() {
  // ** State
  const [employees, setEmployees] = useState<UserType[]>([]);
  const [filteredEmployees, setFilteredEmployees] = useState<UserType[]>([]);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string[]>([]);

  // ** Handlers
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusFilterChange = (selectedStatuses: string[]) => {
    setStatusFilter(selectedStatuses);
  };

  const handleStatusUpdate = async (userId: number, newStatus: UserStatusType): Promise<void> => {
    try {
      const response = await axios.post<UserType[]>(`/users/${userId}`, { status: newStatus });

      // Update employees with the response data from the server
      setEmployees(response.data);
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || 'Error updating employee status';
      console.error(errorMessage, err);
      setError(errorMessage);
    }
  };

  const fetchEmployees = async (
    setEmployees: React.Dispatch<React.SetStateAction<UserType[]>>,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setError: React.Dispatch<React.SetStateAction<string | null>>
  ) => {
    try {
      setLoading(true);

      const response = await axios.get<UserType[]>('/users');

      setEmployees(response.data);
      setError(null);
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || 'Failed to fetch employees';
      setError(errorMessage);
      console.error('Error fetching employees:', err);
    } finally {
      setLoading(false);
    }
  };

  // Filter employees based on search term and status filter
  useEffect(() => {
    let result = employees;

    // Apply search filter
    if (searchTerm) {
      result = result.filter(employee =>
        employee.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter.length > 0) {
      result = result.filter(employee => statusFilter.includes(employee.status));
    }

    setFilteredEmployees(result);
  }, [searchTerm, statusFilter, employees]);

  // Fetch employees from the server
  useEffect(() => {
    fetchEmployees(setEmployees, setLoading, setError);
  }, []);

  return (
    <>
      <Header />

      <div className="container">
        <ListControls
          searchTerm={searchTerm}
          statusFilter={statusFilter}
          onSearchChange={handleSearchChange}
          onStatusFilterChange={handleStatusFilterChange}
        />

        {loading ? (
          <p>Loading employees...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : (
          <EmployeeList
            employees={filteredEmployees}
            onStatusUpdate={handleStatusUpdate}
          />
        )}
      </div>
    </>
  );
}

export default App;
