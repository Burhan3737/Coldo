import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addReceiver, updateReceiver, removeReceiver } from '../features/receiverSlice';

const ReceiverManager = () => {
  const receivers = useSelector(state => state.receivers);
  const dispatch = useDispatch();

  const [newReceiver, setNewReceiver] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingReceiver, setEditingReceiver] = useState('');

  const handleAddReceiver = () => {
    if (newReceiver.trim() !== '') {
      dispatch(addReceiver(newReceiver.trim()));
      setNewReceiver('');
    }
  };

  const handleEditReceiver = (index) => {
    setEditingIndex(index);
    setEditingReceiver(receivers[index]);
  };

  const handleUpdateReceiver = () => {
    if (editingReceiver.trim() !== '') {
      dispatch(updateReceiver({ index: editingIndex, email: editingReceiver.trim() }));
      setEditingIndex(null);
      setEditingReceiver('');
    }
  };

  const handleRemoveReceiver = (index) => {
    dispatch(removeReceiver(index));
  };

  return (
    <div>
      <h2>Manage Receivers</h2>
      
      <input
        type="email"
        placeholder="Add new receiver"
        value={newReceiver}
        onChange={(e) => setNewReceiver(e.target.value)}
      />
      <button onClick={handleAddReceiver}>Add Receiver</button>

      <ul>
        {receivers.map((receiver, index) => (
          <li key={index}>
            {editingIndex === index ? (
              <>
                <input
                  type="email"
                  value={editingReceiver}
                  onChange={(e) => setEditingReceiver(e.target.value)}
                />
                <button onClick={handleUpdateReceiver}>Update</button>
              </>
            ) : (
              <>
                {receiver}
                <button onClick={() => handleEditReceiver(index)}>Edit</button>
                <button onClick={() => handleRemoveReceiver(index)}>Remove</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReceiverManager;
