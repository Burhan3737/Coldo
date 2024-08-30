import React, { useState } from "react";
import { useSelector } from "react-redux";
import { sendEmail } from "../api/api";

const EmailSender = () => {
  const receivers = useSelector((state) => state.receivers);
  const templates = useSelector((state) => state.templates);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [senderEmail, setSenderEmail] = useState("");

  const handleSend = () => {
    sendEmail({
      emails: receivers,
      template: selectedTemplate,
      sender: senderEmail,
    }).then((response) => {
      console.log("Emails sent:", response.data);
    });
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Send Email</h2>
      
      <div className="mb-4">
        <input
          type="email"
          placeholder="Sender Email"
          value={senderEmail}
          onChange={(e) => setSenderEmail(e.target.value)}
          className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      <div className="mb-4">
        <select
          onChange={(e) =>
            setSelectedTemplate(templates.find((t) => t.id === e.target.value))
          }
          className="border border-gray-300 rounded-lg p-3 w-full bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Template</option>
          {templates.map((template) => (
            <option key={template.id} value={template.id}>
              {template.name}
            </option>
          ))}
        </select>
      </div>
      
      <button
        onClick={handleSend}
        className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none"
      >
        Send
      </button>
    </div>
  );
};

export default EmailSender;
