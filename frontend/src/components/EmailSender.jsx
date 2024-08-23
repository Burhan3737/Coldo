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
    <div>
      <h2>Send Email</h2>
      <input
        type="email"
        placeholder="Sender Email"
        value={senderEmail}
        onChange={(e) => setSenderEmail(e.target.value)}
      />
      <select
        onChange={(e) =>
          setSelectedTemplate(templates.find((t) => t.id === e.target.value))
        }
      >
        <option value="">Select Template</option>
        {templates.map((template) => (
          <option key={template.id} value={template.id}>
            {template.name}
          </option>
        ))}
      </select>
      <button onClick={handleSend}>Send</button>
    </div>
  );
};

export default EmailSender;
