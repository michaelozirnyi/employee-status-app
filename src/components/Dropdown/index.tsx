import React, {
  useState,
  useRef,
  useEffect,
} from 'react';

// ** Helpers
import { availableUserStatusTypes } from '../../helpers/constants';

interface IDropdown {
  selectedStatuses: string[];
  customClass?: string;
  defaultButtonText?: string;
  isMultiSelect?: boolean;
  isShowBadge?: boolean;
  onSelectChange: (selectedStatuses: string[]) => void;
}

const Dropdown = (props: IDropdown) => {
  const {
    selectedStatuses,
    customClass,
    defaultButtonText = 'Filter by status',
    isMultiSelect = false,
    isShowBadge = false,
    onSelectChange,
  } = props;

  // ** State
  const [isOpen, setIsOpen] = useState(false);

  // ** Refs
  const dropdownRef = useRef<HTMLDivElement>(null);

  // ** handlers
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleCheckboxChange = (statusId: string) => {
    let newSelectedStatuses;

    if (isMultiSelect) {
      newSelectedStatuses = selectedStatuses.includes(statusId)
        ? selectedStatuses.filter(id => id !== statusId)
        : [...selectedStatuses, statusId];
    } else {
      newSelectedStatuses = [statusId];
    }

    onSelectChange(newSelectedStatuses);

    if (!isMultiSelect) {
      toggleDropdown();
    }
  };

  const handleClearAll = () => {
    onSelectChange([]);
  };

  const getButtonText = () => {
    switch (true) {
      case selectedStatuses.length === 0:
        return defaultButtonText;

      case selectedStatuses.length === 1:
        const selectedStatus = availableUserStatusTypes.find(status => status.id === selectedStatuses[0]);
        return selectedStatus ? selectedStatus.name : defaultButtonText;

      default:
        return `${selectedStatuses.length} statuses selected`;
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={`dropdown ${customClass || ''}`} ref={dropdownRef}>
      <button 
        className="dropdown-toggle" 
        onClick={toggleDropdown}
        type="button"
      >
        {isShowBadge && selectedStatuses.length > 0 && (
          <span className={`status-badge status-${selectedStatuses[0]}`} />
        )}
        <span className="dropdown-toggle-text">{getButtonText()}</span>
        <span className="dropdown-arrow">▼</span>
      </button>
      
      {isOpen && (
        <div className="dropdown-menu">
          {isMultiSelect && (
            <div className="dropdown-header">
              <span>Select Status</span>
              <button
                className="dropdown-clear-all-button"
                onClick={handleClearAll}
                type="button"
              >
                Clear All
              </button>
            </div>
          )}

          <div className="dropdown-options">
            {availableUserStatusTypes.map(status => (
              <div key={status.id} className="dropdown-option">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={selectedStatuses.includes(status.id)}
                    onChange={() => handleCheckboxChange(status.id)}
                  />
                  <span className="checkbox-text">{status.name}</span>
                </label>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
