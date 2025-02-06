export interface InputField {
  id: number | string; 
  name: string;
  type: string;
  placeholder: string;
  required: boolean;
}

export interface Form {
  _id?: string; 
  id?: string;  
  name: string;
  inputs: InputField[];
}
