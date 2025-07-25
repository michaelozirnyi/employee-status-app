import React, {
  useState,
  useRef,
} from 'react';

// ** Components
import Dropdown from '../Dropdown';

interface IAddEmployeeModal {
  onClose: () => void;
  onCreate: (newEmployee: UserType) => void;
}

const AddEmployeeModal = (props: IAddEmployeeModal) => {
  const { onClose, onCreate } = props;

  // ** State
  const [name, setName] = useState<string>('');
  const [status, setStatus] = useState<UserStatusType>('Working' as UserStatusType);
  const [error, setError] = useState<string>('');

  // ** Refs
  const modalContentRef = useRef<HTMLDivElement>(null);

  // ** Handlers
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Check if the click is on the backdrop (not on the modal content)
    if (modalContentRef.current && !modalContentRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);

    // Validate: only English alphabetical characters
    if (value && !/^[a-zA-Z\s]+$/.test(value)) {
      setError('Only English alphabetical characters are allowed');
    } else {
      setError('');
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedName = name.trim();

    // Validate before submission
    if (!trimmedName) {
      setError('Name is required');
      return;
    }

    const newEmployee: UserType = {
      id: Date.now(),
      name: trimmedName,
      status,
      img: '',
    }

    onCreate(newEmployee);
  };

  return (
    <div className="modal" onClick={handleBackdropClick}>
      <div className="modal-content" ref={modalContentRef}>
        <div className="modal-header">
          <h2>Create New User</h2>
        </div>

        <div className="modal-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">User Name:</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={handleNameChange}
                placeholder="Enter user name"
              />
              {error && <p className="error-message">{error}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="status">Status:</label>
              <Dropdown
                selectedStatuses={[status]}
                onSelectChange={(value: string[]) => setStatus(value[0] as UserStatusType)}
              />
            </div>

            <div className="modal-footer">
              <button
                type="submit"
                className="button button-primary"
              >
                Create
              </button>
              <button
                type="button"
                className="button button-transparent"
                onClick={onClose}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEmployeeModal;
