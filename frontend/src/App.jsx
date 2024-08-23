import React from 'react';
import UploadCsv from './components/UploadCsv';
import ReceiverManager from './components/ReceiverManager';
import TemplateManager from './components/TemplateManager';
import EmailSender from './components/EmailSender';

const App = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Cold Emailing Application</h1>
      <UploadCsv />
      <ReceiverManager />
      <TemplateManager />
      <EmailSender />
    </div>
  );
};

export default App;
