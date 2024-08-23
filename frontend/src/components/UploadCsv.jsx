import React from 'react';
import Papa from 'papaparse';
import { useDispatch } from 'react-redux';
import { setReceivers } from '../features/receiverSlice';

const UploadCsv = () => {
  const dispatch = useDispatch();

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        const emails = results.data.map(row => row.email).filter(email => email);
        dispatch(setReceivers(emails));
      },
    });
  };

  return (
    <div className="mb-4">
      <input type="file" accept=".csv" onChange={handleFileUpload} />
    </div>
  );
};

export default UploadCsv;
