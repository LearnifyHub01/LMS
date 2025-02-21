import { useUpdateUserRoleMutation } from '@/redux/features/user/userApi';
import React, { FC, useState, useEffect } from 'react';

type Props = {
  user: any;
};

const Teacher: FC<Props> = ({ user }) => {
  const [role, setRole] = useState(user.role); // Initialize with user's current role
  const [open, setOpen] = useState(false);
  const [updateUserRole, { error: updateError, isSuccess }] = useUpdateUserRoleMutation();

  const handleRoleUpdate = async () => {
    try {
      await updateUserRole({ 
        userId: user._id, 
        role: 'admin' 
      }).unwrap();
      setRole('admin');
      setOpen(false);
    } catch (err) {
      console.error('Failed to update role:', err);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      alert('Role updated successfully!');
    }
    if (updateError) {
      alert('Failed to update role');
    }
  }, [isSuccess, updateError]);

  return (
    <div>
      <p>Current Role: {role}</p>
      {role !== 'admin' && (
        <button 
          onClick={() => setOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Become Admin
        </button>
      )}
      {open && (
        <div className="modal">
          <p>Are you sure you want to become an admin?</p>
          <button 
            onClick={handleRoleUpdate}
            className="bg-green-500 text-white px-4 py-2 rounded mr-2"
          >
            Yes
          </button>
          <button 
            onClick={() => setOpen(false)}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            No
          </button>
        </div>
      )}
    </div>
  );x 
};

export default Teacher;