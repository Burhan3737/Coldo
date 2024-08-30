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
    <div className="mb-6 flex flex-col items-center">
      <label htmlFor="csv-upload" className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none">
        Upload CSV File
      </label>
      <input
        id="csv-upload"
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        className="hidden"
      />
    </div>
  );
};

export default UploadCsv;
