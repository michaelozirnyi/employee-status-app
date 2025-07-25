import React, { useState } from 'react';

// ** Components
import Dropdown from './../Dropdown';

// ** Helpers
import getAvatarUrl from '../../helpers/getAvatarUrl';

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

    // Add employee to updating list
    setUpdatingEmployee(prev => [...prev, userId]);

    try {
      await onStatusUpdate(userId, newStatus);
    } finally {
      setUpdatingEmployee(prev => prev.filter(id => id !== userId));
    }
  };

  if (employees.length === 0) {
    return <p>No employees found.</p>;
  }

  return (
    <div className="employee-list">
      <div className="employee-grid">
        {employees.map(employee => (
          <div key={employee.id} className="employee-item">
            <div className="employee-card">
              <div className="employee-avatar">
                <img src={getAvatarUrl(employee)} alt={`${employee.name}'s avatar`} />
                {updatingEmployee.includes(employee.id) && (
                  <div className="updating-overlay">
                    <span>Updating...</span>
                  </div>
                )}
              </div>
              <div className="employee-info">
                <h3>{employee.name}</h3>
                <Dropdown
                  selectedStatuses={[employee.status]}
                  defaultButtonText="Select status"
                  isShowBadge
                  onSelectChange={(selectedStatuses) => handleStatusChange({ employeeId: employee.id, selectedStatuses })}
                  disabled={updatingEmployee.includes(employee.id)}
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
