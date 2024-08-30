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
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Manage Receivers</h2>

      <div className="mb-4 flex space-x-2">
        <input
          type="email"
          placeholder="Add new receiver"
          value={newReceiver}
          onChange={(e) => setNewReceiver(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 flex-1"
        />
        <button
          onClick={handleAddReceiver}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none"
        >
          Add Receiver
        </button>
      </div>

      <ul className="list-disc pl-5 space-y-2">
        {receivers.map((receiver, index) => (
          <li key={index} className="flex items-center space-x-2">
            {editingIndex === index ? (
              <>
                <input
                  type="email"
                  value={editingReceiver}
                  onChange={(e) => setEditingReceiver(e.target.value)}
                  className="border border-gray-300 rounded-lg p-2 flex-1"
                />
                <button
                  onClick={handleUpdateReceiver}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 focus:ring-2 focus:ring-green-400 focus:outline-none"
                >
                  Update
                </button>
              </>
            ) : (
              <>
                <span className="flex-1">{receiver}</span>
                <button
                  onClick={() => handleEditReceiver(index)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleRemoveReceiver(index)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:ring-2 focus:ring-red-400 focus:outline-none"
                >
                  Remove
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReceiverManager;
