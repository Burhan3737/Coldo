import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import {
  fetchTemplates,
  deleteTemplate,
  createTemplate,
  updateTemplate,
} from "../store/templateSlice";
import {
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const TemplateManager: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { templates, loading, error } = useSelector(
    (state: RootState) => state.templates
  );
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(
    null
  );

  useEffect(() => {
    dispatch(fetchTemplates());
  }, [dispatch]);

  const handleSave = () => {
    const template = { name, content, _id: selectedTemplateId || "" };
    if (selectedTemplateId) {
      dispatch(updateTemplate(template));
    } else {
      dispatch(createTemplate(template));
    }
    setName("");
    setContent("");
    setSelectedTemplateId(null);
  };

  const handleDelete = (id: string) => {
    dispatch(deleteTemplate(id));
  };

  return (
    <div>
      <TextField
        label="Template Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Template Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        fullWidth
        margin="normal"
        multiline
        rows={4}
      />
      <Button onClick={handleSave} variant="contained" color="primary">
        {selectedTemplateId ? "Update Template" : "Save Template"}
      </Button>
      {loading && <p>Loading templates...</p>}
      {error && <p>Error: {error}</p>}
      <List>
        {templates.map((template) => (
          <ListItem key={template._id}>
            <ListItemText
              primary={template.name}
              secondary={template.content}
            />
            <IconButton
              onClick={() => {
                setName(template.name);
                setContent(template.content);
                setSelectedTemplateId(template._id);
              }}
            >
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => handleDelete(template._id)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default TemplateManager;
