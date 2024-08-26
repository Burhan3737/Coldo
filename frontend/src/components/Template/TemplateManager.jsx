import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { MyUploadAdapter } from "./UploadAdapter";
import {
  setTemplates,
  addTemplate,
  editTemplate,
  removeTemplate,
} from "../../features/templateSlice";
import {
  fetchTemplates,
  createTemplate,
  updateTemplate as apiUpdateTemplate,
  deleteTemplate,
} from "../../api/api";

const TemplateManager = () => {
  const templates = useSelector((state) => state.templates);
  const dispatch = useDispatch();
  const [newTemplate, setNewTemplate] = useState({ name: "", content: "" });

  useEffect(() => {
    fetchTemplates().then((response) => {
      dispatch(setTemplates(response.data));
    });
  }, [dispatch]);

  const handleCreate = () => {
    createTemplate(newTemplate).then((response) => {
      dispatch(addTemplate(response.data));
      setNewTemplate({ name: "", content: "" }); // Clear the editor after creating a template
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
  function MyCustomUploadAdapterPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return new MyUploadAdapter(loader);
    };
  }
  return (
    <div>
      <h2>Templates</h2>
      <input
        type="text"
        placeholder="Template Name"
        value={newTemplate.name}
        onChange={(e) =>
          setNewTemplate({ ...newTemplate, name: e.target.value })
        }
      />
      <CKEditor
        editor={ClassicEditor}
        data={newTemplate.content}
        onChange={(event, editor) => {
          const data = editor.getData();
          setNewTemplate({ ...newTemplate, content: data });
        }}
        config={{
          placeholder: "Compose your email template here...",
          toolbar: [
            "heading",
            "|",
            "bold",
            "italic",
            "underline",
            "strikethrough",
            "code",
            "|",
            "link",
            "bulletedList",
            "numberedList",
            "blockQuote",
            "|",
            "alignment",
            "indent",
            "outdent",
            "insertTable",
            "|",
            "imageUpload",
            "mediaEmbed",
            "|",
            "undo",
            "redo",
          ],
          extraPlugins: [MyCustomUploadAdapterPlugin],
        }}
      />

      <button onClick={handleCreate}>Create Template</button>

      <ul>
        {templates.map((template) => (
          <li key={template.id}>
            <h3>{template.name}</h3>
            <div dangerouslySetInnerHTML={{ __html: template.content }}></div>
            <button onClick={() => handleUpdate(template.id)}>Update</button>
            <button onClick={() => handleDelete(template.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TemplateManager;
