import React from 'react';
import UploadCsv from './components/UploadCsv';
import ReceiverManager from './components/ReceiverManager';
import TemplateManager from './components/Template/TemplateManager';
import EmailSender from './components/EmailSender';

const App = () => {
  return (
    <div className="flex items-center justify-center min-h-screen w-screen ">
      <div className="p-6 bg-white rounded-lg shadow-lg w-5/6">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">COLDO</h1>
        <div className="space-y-6">
          <section className="p-6 bg-gray-50 rounded-lg shadow-md">
            <UploadCsv />
          </section>
          <section className="p-6 bg-gray-50 rounded-lg shadow-md">
            <ReceiverManager />
          </section>
          <section className="p-6 bg-gray-50 rounded-lg shadow-md">
            <TemplateManager />
          </section>
          <section className="p-6 bg-gray-50 rounded-lg shadow-md">
            <EmailSender />
          </section>
        </div>
      </div>
    </div>
  );
};

export default App;
