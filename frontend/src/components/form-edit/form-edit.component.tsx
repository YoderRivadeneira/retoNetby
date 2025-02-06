import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, InputField } from "../../types";

const API_URL = "http://localhost:5123/api/forms";

const FormEdit: React.FC = () => {
  const { formId } = useParams<{ formId: string }>();
  const navigate = useNavigate();
  const [form, setForm] = useState<Form | null>(null);

  useEffect(() => {
    if (!formId) {
      console.error("Error: formId es undefined");
      return;
    }

    fetch(`${API_URL}/${formId}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Error al cargar el formulario: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (!data || !data.inputs) {
          throw new Error("Error: No se encontraron datos válidos.");
        }

        setForm({
          _id: String(data.id), 
          name: data.name || "Formulario sin nombre",
          inputs: (data.inputs || []).map((input: any) => ({
            id: String(input.id) || String(Date.now()), 
            name: input.name || "Campo sin nombre",
            type: input.type || "text",
            placeholder: input.placeholder || "",
            required: input.required || false,
          })),
        });
      })
      .catch((error) => console.error("Error cargando formulario:", error));
  }, [formId]);

  if (!form) {
    return <p className="text-danger">Cargando formulario...</p>;
  }

  
  const handleAddInput = () => {
    setForm((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        inputs: [
          ...prev.inputs,
          {
            id: String(Date.now()), 
            name: "",
            type: "text",
            placeholder: "Nuevo campo",
            required: false,
          },
        ],
      };
    });
  };


  const handleDeleteInput = (inputId: string) => {
    setForm((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        inputs: prev.inputs.filter((input) => input.id !== inputId),
      };
    });
  };

  
  const handleSave = () => {
    if (!form || !form._id) {
      console.error("Error: No hay formulario cargado o el ID no es válido.");
      return;
    }

    if (!form.name.trim() || form.inputs.some((input) => !input.name.trim())) {
      alert("El nombre del formulario y los campos no pueden estar vacíos.");
      return;
    }

    fetch(`${API_URL}/personas/${form._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: form._id,
        name: form.name.trim(),
        inputs: form.inputs.map((input) => ({
          id: String(input.id),
          name: input.name.trim(),
          type: input.type,
          placeholder: input.placeholder,
          required: input.required,
        })),
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Error en la actualización: ${res.status}`);
        }
        return res.text();
      })
      .then((data) => {
        console.log("Respuesta del backend:", data);
        alert("Formulario actualizado correctamente.");
        navigate("/");
      })
      .catch((error) => console.error("Error al actualizar:", error));
  };

  return (
    <div className="container">
      <h2>✏️ Editar Formulario</h2>


      <input
        type="text"
        className="form-control mb-3"
        value={form.name}
        onChange={(e) => setForm((prev) => prev && { ...prev, name: e.target.value })}
      />

      <h4>📋 Campos del Formulario</h4>

     
      {form.inputs.map((input, index) => (
        <div key={input.id} className="mb-3">
          <label className="form-label">Nombre del Campo</label>
          <input
            type="text"
            className="form-control mb-2"
            value={input.name}
            placeholder="Nombre del campo"
            onChange={(e) =>
              setForm((prev) => {
                if (!prev) return prev;
                const updatedInputs = [...prev.inputs];
                updatedInputs[index] = { ...updatedInputs[index], name: e.target.value };
                return { ...prev, inputs: updatedInputs };
              })
            }
          />

          <label className="form-label">Tipo de Campo</label>
          <select
            className="form-select mb-2"
            value={input.type}
            onChange={(e) =>
              setForm((prev) => {
                if (!prev) return prev;
                const updatedInputs = [...prev.inputs];
                updatedInputs[index] = { ...updatedInputs[index], type: e.target.value };
                return { ...prev, inputs: updatedInputs };
              })
            }
          >
            <option value="text">Texto</option>
            <option value="number">Número</option>
            <option value="email">Correo</option>
            <option value="password">Contraseña</option>
            <option value="date">Fecha</option>
          </select>

        
          <label className="form-label">Placeholder</label>
          <input
            type="text"
            className="form-control mb-2"
            value={input.placeholder}
            placeholder="Ejemplo: Ingresa tu dato aquí"
            onChange={(e) =>
              setForm((prev) => {
                if (!prev) return prev;
                const updatedInputs = [...prev.inputs];
                updatedInputs[index] = { ...updatedInputs[index], placeholder: e.target.value };
                return { ...prev, inputs: updatedInputs };
              })
            }
          />

    
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              checked={input.required}
              onChange={() =>
                setForm((prev) => {
                  if (!prev) return prev;
                  const updatedInputs = [...prev.inputs];
                  updatedInputs[index] = { ...updatedInputs[index], required: !updatedInputs[index].required };
                  return { ...prev, inputs: updatedInputs };
                })
              }
            />
            <label className="form-check-label">Requerido</label>
          </div>

         
          <button
            className="btn btn-danger btn-sm mt-2"
            onClick={() => handleDeleteInput(String(input.id))}
            disabled={form.inputs.length === 1}
          >
            ❌ Eliminar
          </button>
        </div>
      ))}

  
      <button className="btn btn-success mt-2" onClick={handleAddInput}>
        ➕ Agregar Campo
      </button>

   
      <div className="mt-4">
        <button className="btn btn-primary me-2" onClick={handleSave}>
          💾 Guardar Cambios
        </button>
        <button className="btn btn-secondary" onClick={() => navigate("/")}>
          🔙 Volver
        </button>
      </div>
    </div>
  );
};

export default FormEdit;
