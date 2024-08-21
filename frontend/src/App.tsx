import React from "react";
import { Provider } from "react-redux";
import { store } from "./store/store";
import TemplateManager from "./components/TemplateManager";
import EmailManager from "./components/EmailManager";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="p-4">
        <h1>Cold Emailing App</h1>
        <TemplateManager />
        <EmailManager />
      </div>
    </Provider>
  );
};

export default App;
