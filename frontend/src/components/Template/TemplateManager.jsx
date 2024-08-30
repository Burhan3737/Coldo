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
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Templates</h2>
      
      <div className="mb-6 flex flex-col space-y-4">
        <input
          type="text"
          placeholder="Template Name"
          value={newTemplate.name}
          onChange={(e) =>
            setNewTemplate({ ...newTemplate, name: e.target.value })
          }
          className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          className="border border-gray-300 rounded-lg"
        />

        <button
          onClick={handleCreate}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none"
        >
          Create Template
        </button>
      </div>

      <ul className="space-y-4">
        {templates.map((template) => (
          <li key={template.id} className="p-4 bg-gray-100 rounded-lg shadow-sm">
            <h3 className="text-xl font-medium mb-2">{template.name}</h3>
            <div dangerouslySetInnerHTML={{ __html: template.content }} className="mb-4"></div>
            <div className="flex space-x-2">
              <button
                onClick={() => handleUpdate(template.id)}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 focus:ring-2 focus:ring-green-400 focus:outline-none"
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(template.id)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:ring-2 focus:ring-red-400 focus:outline-none"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TemplateManager;
