import React, { useState } from 'react';

// ** Components
import Dropdown from './../Dropdown';

interface IEmployeeList {
  employees: UserType[];
  onStatusUpdate: (userId: number, newStatus: UserStatusType) => Promise<boolean>;
}

const EmployeeList = (props: IEmployeeList) => {
  const { employees, onStatusUpdate } = props;

  // ** State
  const [updatingEmployee, setUpdatingEmployee] = useState<number[]>([]);

  // ** Handlers
  const handleStatusChange = ({ employeeId, selectedStatuses }: { employeeId: number, selectedStatuses: string[] }) => {
    if (selectedStatuses.length > 0 && employeeId) {
      handleApplyStatusChanges({ userId: employeeId, newStatus: selectedStatuses[0] as UserStatusType  });
    }
  };

  const handleApplyStatusChanges = async ({ userId, newStatus }: { userId: number, newStatus: UserStatusType }) => {
    if (updatingEmployee.includes(userId) || employees.some(employee => employee.id === userId && employee.status === newStatus)) return;

    setUpdatingEmployee(prev => [...prev, userId]);
    const success = await onStatusUpdate(userId, newStatus);

    if (success) {
      setUpdatingEmployee(prev => prev.filter(id => id !== userId));
    } else {
      console.log('Error updating status ', userId);
    }
  };

  if (employees.length === 0) {
    return <p>No employees found.</p>;
  }

  // Helper function to generate avatar URL based on employee name and img property
  const getAvatarUrl = (employee: UserType) => {
    // Using placeholder images from UI Avatars API
    // Use the employee's name for the avatar, which will create a more meaningful avatar
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(employee.name)}&background=random&color=fff&size=64`;
  };

  return (
    <div className="employee-list">
      <div className="employee-grid">
        {employees.map(employee => (
          <div key={employee.id} className="employee-item">
            <div className="employee-card">
              <div className="employee-avatar">
                <img src={getAvatarUrl(employee)} alt={`${employee.name}'s avatar`} />
              </div>
              <div className="employee-info">
                <h3>{employee.name}</h3>
                <Dropdown
                  selectedStatuses={[employee.status]}
                  defaultButtonText="Select status"
                  isShowBadge
                  onSelectChange={(selectedStatuses) => handleStatusChange({ employeeId: employee.id, selectedStatuses })}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeeList;
