import { Form } from "../types"
export const formsMock: Form[] = [
  {
    _id: "1",
    name: "Personas",
    inputs: [
      { id: 1, name: "Nombre", type: "text", placeholder: "Ingresa tu nombre", required: true },
      { id: 2, name: "Fecha de nacimiento", type: "date", placeholder: "", required: true },
      { id: 3, name: "Estatura", type: "number", placeholder: "Ingresa tu estatura en cm", required: false }
    ]
  },
  {
    _id: "2",
    name: "Mascotas",
    inputs: [
      { id: 4, name: "Especie", type: "text", placeholder: "Ingresa la especie", required: true },
      { id: 5, name: "Raza", type: "text", placeholder: "Ingresa la raza", required: false },
      { id: 6, name: "Color", type: "text", placeholder: "Ingresa el color", required: false }
    ]
  }
];  
;
