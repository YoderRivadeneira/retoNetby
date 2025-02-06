import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { formsMock } from "../../mock/data.ts";
import { Form, InputField } from "../../types";

const FormInputEdit: React.FC = () => {
  const { formId } = useParams<{ formId: string }>(); 
  const navigate = useNavigate(); 

  const selectedForm: Form | undefined = formsMock.find((form) => form._id === formId);

  if (!selectedForm) {
    return <p className="text-danger">Formulario no encontrado</p>;
  }

  const [inputs, setInputs] = useState<InputField[]>(selectedForm.inputs);

  const handleInputChange = (index: number, field: keyof InputField, value: string | boolean) => {
    const updatedInputs = [...inputs];
    updatedInputs[index] = { ...updatedInputs[index], [field]: value };
    setInputs(updatedInputs);
  };

  const handleSave = () => {
  
    console.log("Inputs actualizados:", inputs);
    navigate(`/form/${formId}`);
  };

  return (
    <div className="container">
      <h2 className="mb-4">Editar Campos - {selectedForm.name}</h2>
      <form>
        {inputs.map((input, index) => (
          <div key={input.id} className="mb-3">
            <label className="form-label">Nombre del Campo</label>
            <input
              type="text"
              className="form-control"
              value={input.name}
              onChange={(e) => handleInputChange(index, "name", e.target.value)}
            />
            <label className="form-label mt-2">Tipo de Input</label>
            <select
              className="form-select"
              value={input.type}
              onChange={(e) => handleInputChange(index, "type", e.target.value)}
            >
              <option value="text">Texto</option>
              <option value="number">Número</option>
              <option value="date">Fecha</option>
            </select>
            <label className="form-label mt-2">Placeholder</label>
            <input
              type="text"
              className="form-control"
              value={input.placeholder}
              onChange={(e) => handleInputChange(index, "placeholder", e.target.value)}
            />
            <div className="form-check mt-2">
              <input
                type="checkbox"
                className="form-check-input"
                checked={input.required}
                onChange={(e) => handleInputChange(index, "required", e.target.checked)}
              />
              <label className="form-check-label">Campo Requerido</label>
            </div>
          </div>
        ))}
        <button type="button" className="btn btn-primary mt-3" onClick={handleSave}>
          Guardar Cambios
        </button>
      </form>
    </div>
  );
};

export default FormInputEdit;
