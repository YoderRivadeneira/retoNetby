import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FormList from "./components/form-list/form-list.component.tsx";
import FormInputList from "./components/form-input-list/form-input-list.component.tsx";
import FormInputEdit from "./components/form-input-edit/form-input-edit.component.tsx";
import FormEdit from "./components/form-edit/form-edit.component.tsx";

const App: React.FC = () => {
  return (
    <Router>
      <div className="container mt-5">
        <h1 className="text-center">Gestor de Formularios NetBy</h1>
        <Routes>
          <Route path="/" element={<FormList />} />
          <Route path="/form/:id" element={<FormInputList />} />
          <Route path="/edit-input/:formId" element={<FormInputEdit />} />
          <Route path="/edit-form/:formId" element={<FormEdit />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
