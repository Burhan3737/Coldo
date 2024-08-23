import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setTemplates, addTemplate, editTemplate, removeTemplate } from '../features/templateSlice';
import { fetchTemplates, createTemplate, updateTemplate as apiUpdateTemplate, deleteTemplate } from '../api/api';

const TemplateManager = () => {
  const templates = useSelector(state => state.templates);
  const dispatch = useDispatch();
  const [newTemplate, setNewTemplate] = useState({ name: '', content: '' });

  useEffect(() => {
    fetchTemplates().then(response => {
      dispatch(setTemplates(response.data));
    });
  }, [dispatch]);

  const handleCreate = () => {
    createTemplate(newTemplate).then(response => {
      dispatch(addTemplate(response.data));
    });
  };

  const handleUpdate = (id) => {
    apiUpdateTemplate(id, { content: newTemplate.content }).then(() => {
      dispatch(editTemplate({ id, content: newTemplate.content }));
    });
  };

  const handleDelete = (id) => {
    deleteTemplate(id).then(() => {
      dispatch(removeTemplate(id));
    });
  };

  return (
    <div>
      <h2>Templates</h2>
      <input
        type="text"
        placeholder="Template Name"
        value={newTemplate.name}
        onChange={(e) => setNewTemplate({ ...newTemplate, name: e.target.value })}
      />
      <textarea
        placeholder="Template Content"
        value={newTemplate.content}
        onChange={(e) => setNewTemplate({ ...newTemplate, content: e.target.value })}
      />
      <button onClick={handleCreate}>Create Template</button>

      <ul>
        {templates.map(template => (
          <li key={template.id}>
            <h3>{template.name}</h3>
            <p>{template.content}</p>
            <button onClick={() => handleUpdate(template.id)}>Update</button>
            <button onClick={() => handleDelete(template.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TemplateManager;
