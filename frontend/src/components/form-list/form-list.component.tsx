import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Form, InputField } from "../../types";

const API_URL = "http://localhost:5123/api/forms"; 

const FormList: React.FC = () => {
  const [forms, setForms] = useState<Form[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newForm, setNewForm] = useState<Form>({
    id: "",
    name: "",
    inputs: [],
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        const formattedForms = data.map((form: any) => ({
          id: form.id ?? "",
          name: form.name || "Formulario sin nombre",
          inputs: (form.inputs || []).map((input: any) => ({
            id: String(input.id),
            name: input.name || "Campo sin nombre",
            type: input.type || "text",
            placeholder: input.placeholder || "",
            required: input.required || false,
          })),
        }));
        setForms(formattedForms);
      })
      .catch((error) => console.error("Error al obtener formularios:", error));
  }, []);

  const handleDelete = async (id: string) => {
    if (!id) return;
    const confirmDelete = window.confirm("¿Estás seguro de eliminar este formulario?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`${API_URL}/personas/${id}`, { method: "DELETE" });

      if (!response.ok) {
        throw new Error("Error al eliminar el formulario");
      }

      setForms(forms.filter((form) => form.id !== id));
      alert("Formulario eliminado correctamente.");
    } catch (error) {
      console.error("Error eliminando el formulario:", error);
      alert("No se pudo eliminar el formulario.");
    }
  };

 
  const validateFields = () => {
    let newErrors: { [key: string]: string } = {};

    if (newForm.name.trim().length < 5) {
      newErrors["name"] = "El nombre del formulario debe tener al menos 5 caracteres.";
    }

    newForm.inputs.forEach((input, index) => {
      if (input.name.trim().length < 5) {
        newErrors[`input-${index}`] = "El nombre del campo debe tener al menos 5 caracteres.";
      }

      if (/^\d+$/.test(input.name.trim())) {
        newErrors[`input-${index}`] = "El nombre del campo no puede ser solo números.";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveForm = () => {
    if (!validateFields()) {
      alert("Corrige los errores antes de guardar.");
      return;
    }

    fetch(`${API_URL}/personas`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newForm),
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Formulario creado correctamente.");
        setForms([...forms, { ...newForm, id: data.id }]);
        setShowModal(false);
        setNewForm({ id: "", name: "", inputs: [] });
      })
      .catch((error) => console.error("Error al crear formulario:", error));
  };

  const handleAddField = () => {
    setNewForm((prev) => ({
      ...prev,
      inputs: [
        ...prev.inputs,
        {
          id: String(Date.now()),
          name: "",
          type: "text",
          placeholder: "",
          required: false,
        },
      ],
    }));
  };

  return (
    <div className="container">
      <h2 className="mb-4">📄 Formularios Disponibles</h2>
      <div className="list-group">
        {forms.length === 0 ? (
          <p>No hay formularios disponibles</p>
        ) : (
          forms.map((form: Form) => (
            <div key={form.id} className="d-flex justify-content-between align-items-center list-group-item">
              <Link to={`/form/${form.id}`} className="text-decoration-none">
                {form.name}
              </Link>

              <div>
                <Link to={`/edit-form/${form.id}`} className="btn btn-sm btn-warning me-2">
                  ✏️ Editar
                </Link>
                <button className="btn btn-sm btn-danger" onClick={() => form.id && handleDelete(form.id)}>
                  🗑️ Eliminar
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-4">
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          ➕ Crear Formulario
        </button>
      </div>

      {showModal && (
        <div className="modal fade show d-block" tabIndex={-1} role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">🆕 Crear Nuevo Formulario</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <label className="form-label">📄 Nombre del Formulario</label>
                <input
                  type="text"
                  className="form-control mb-3"
                  value={newForm.name}
                  onChange={(e) => setNewForm((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="Ejemplo: Registro de Usuarios"
                />
                {errors["name"] && <div className="text-danger">{errors["name"]}</div>}

                <h5>📋 Campos del Formulario</h5>
                {newForm.inputs.map((input, index) => (
                  <div key={input.id} className="mb-3">
                    <label className="form-label">📝 Nombre del Campo</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Ejemplo: Nombre"
                      value={input.name}
                      onChange={(e) => {
                        const updatedInputs = [...newForm.inputs];
                        updatedInputs[index].name = e.target.value;
                        setNewForm((prev) => ({ ...prev, inputs: updatedInputs }));
                      }}
                    />
                    {errors[`input-${index}`] && <div className="text-danger">{errors[`input-${index}`]}</div>}

                    <label className="form-label mt-2">🛠️ Tipo de Campo</label>
                    <select
                      className="form-select"
                      value={input.type}
                      onChange={(e) => {
                        const updatedInputs = [...newForm.inputs];
                        updatedInputs[index].type = e.target.value;
                        setNewForm((prev) => ({ ...prev, inputs: updatedInputs }));
                      }}
                    >
                      <option value="text">Texto</option>
                      <option value="number">Número</option>
                      <option value="email">Correo</option>
                      <option value="password">Contraseña</option>
                      <option value="date">Fecha</option>
                    </select>

                    <label className="form-label mt-2">🔍 Placeholder</label>
                    <input
                      type="text"
                      className="form-control"
                      value={input.placeholder}
                      placeholder="Ejemplo: Ingresa tu dato"
                      onChange={(e) => {
                        const updatedInputs = [...newForm.inputs];
                        updatedInputs[index].placeholder = e.target.value;
                        setNewForm((prev) => ({ ...prev, inputs: updatedInputs }));
                      }}
                    />
                  </div>
                ))}

                <button className="btn btn-success mt-2" onClick={handleAddField}>
                  ➕ Agregar Campo
                </button>
              </div>
              <div className="modal-footer">
                <button className="btn btn-primary" onClick={handleSaveForm}>
                  💾 Guardar Formulario
                </button>
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  ❌ Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormList;
