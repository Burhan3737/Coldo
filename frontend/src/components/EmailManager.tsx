import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { setEmails, sendEmails } from "../store/emailSlice";
import {
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload"; // Correct import

const EmailManager: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const [emails, setEmailsState] = useState<string[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [template, setTemplate] = useState<string | null>(null);
  const [manualEmail, setManualEmail] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch("/api/emails/upload", {
          method: "POST",
          body: formData,
        });
        if (response.ok) {
          const data = await response.json();
          setEmailsState(data);
        } else {
          console.error("Error uploading file");
        }
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  const handleAddEmail = () => {
    if (manualEmail) {
      setEmailsState((prevEmails) => [...prevEmails, manualEmail]);
      setManualEmail("");
    }
  };

  const handleSend = () => {
    dispatch(setEmails(emails));
    dispatch(sendEmails({ emails, template: template || "" }));
  };

  return (
    <div>
      <TextField
        label="Enter Email"
        value={manualEmail}
        onChange={(e) => setManualEmail(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button onClick={handleAddEmail} variant="contained" color="primary">
        Add Email
      </Button>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      <Button
        onClick={handleUpload}
        variant="contained"
        color="primary"
        startIcon={<UploadIcon />}
      >
        Upload CSV
      </Button>
      <TextField
        label="Template ID (optional)"
        value={template || ""}
        onChange={(e) => setTemplate(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button onClick={handleSend} variant="contained" color="primary">
        Send Emails
      </Button>
      <List>
        {emails.map((email, index) => (
          <ListItem key={index}>
            <ListItemText primary={email} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default EmailManager;
