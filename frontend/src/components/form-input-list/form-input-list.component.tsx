import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Form, InputField } from "../../types";

const API_URL = "http://localhost:5123/api/forms"; 

const FormInputList: React.FC = () => {
  const { id } = useParams<{ id: string }>(); 
  const [selectedForm, setSelectedForm] = useState<Form | null>(null);

  useEffect(() => {
    fetch(`${API_URL}/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setSelectedForm({
          id: data._id || data.id, 
          name: data.name || "Formulario sin nombre",
          inputs: data.inputs.map((input: any) => ({
            id: String(input.id), 
            name: input.name || "Campo sin nombre",
            type: input.type || "text",
            placeholder: input.placeholder || "",
            required: input.required || false,
          })),
        });
      })
      .catch((error) => console.error("Error cargando formulario:", error));
  }, [id]);

  if (!selectedForm) {
    return <p className="text-danger">Cargando formulario...</p>;
  }

  return (
    <div className="container">
      <h2 className="mb-4">📄 {selectedForm.name}</h2>
      
     
      <ul className="list-group">
        {selectedForm.inputs.map((input: InputField) => (
          <li key={input.id} className="list-group-item">
            <strong>{input.name}</strong> <br />
            <span className="text-muted">Tipo: {input.type}</span> <br />
            <span className="text-muted">Placeholder: {input.placeholder || "N/A"}</span> <br />
            <span className={input.required ? "text-danger" : "text-success"}>
              {input.required ? "Obligatorio" : "Opcional"}
            </span>
          </li>
        ))}
      </ul>

   
      <div className="mt-4">
        <Link to="/" className="btn btn-secondary">🔙 Volver</Link>
      </div>
    </div>
  );
};

export default FormInputList;
