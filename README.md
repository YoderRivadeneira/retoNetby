# 🚀 Proyecto: Gestor de Formularios Dinámicos

Este proyecto es un **frontend desarrollado en React con TypeScript, Bootstrap y net core** que permite la creación, edición e ingreso de datos en formularios de manera dinámica.

---

## 📌 1. Requisitos

Para ejecutar este proyecto en un ambiente de desarrollo local, necesitas tener instalado:


### FRONTAL(react): Este frontend está preparado para conectarse con un backend en .NET Core 8, donde se obtienen y almacenan los formularios dinámicamente en una base de datos.

- **Node.js** (versión recomendada: 18 o superior) [Descargar Node.js](https://nodejs.org/)
- **npm** (viene con Node.js) o **Yarn** (opcional)
- **Git** (para clonar el repositorio si es necesario)
- **React 18** 

Para verificar si tienes Node.js instalado, usa el siguiente comando en tu terminal:
```bash
node -v
```

Para verificar npm:
```bash
npm -v
```

---






### BACKEND (API en NetCore 8): Esta API está preparado para conectarse con el frontal en react y provee las funcionalidades necesarias al front para la gestión de formularios.

- **NetCore** (versión recomendada: 8) [DescargarNetCore 8](https://dotnet.microsoft.com/es-es/download/dotnet/8.0)
- **npm** (viene con Node.js) o **Yarn** (opcional)
- **Git** (para clonar el repositorio si es necesario)

Para verificar si tienes .NET SDK instalado, usa el siguiente comando en tu terminal:
```bash
dotnet --version
```

**Docker** (Opcional, si deseas correr el API en un contenedor) → El proyecto cuenta con su dockerfile y es totalmente funcional en un contenedor docker en caso de que se desee levantarlo en docker



**Base de Datos**: MongoDB (En la nube con MongoDB Atlas) → el proyecto usa una base de datos en la nube con mongoAtlas por lo cual no es necesario tener instalado mongo, se puede realizar la conexion a la base desde cualquier gestor de bases de datos utilizando la siguiente cadena de conexion


 "ConnectionString":
 
```bash
mongodb+srv://netby:netby@cluster0.zfdjr.mongodb.net/
```
 
---

"DatabaseName":
```
"netbyDB
---
Postman o cualquier cliente HTTP para probar los endpoints




## 📌 2. Ejecución del Backend y Frontend

### **1️⃣ Clonar el repositorio**
Si aún no tienes el código en tu computadora, clónalo con el siguiente comando:
```bash
git clone https://github.com/YoderRivadeneira/retoNetby
```

### PARA EL BACKEND

Luego de clonar el proyecto, accede al directorio del proyecto backend:
```bash
cd reto_netby/netbyApi
```

### **2️⃣ Instalar las dependencias**
Ejecuta el siguiente comando para instalar todas las dependencias necesarias:
```bash
dotnet restore
```

o

```bash
dotnet build
```

### **3️⃣ Ejecutar la aplicación**
Una vez instaladas las dependencias, inicia el servidor de desarrollo con:
```bash
dotnet run
```
Esto levantará la aplicación localmente, se implemento swagger por lo tanto se puede comprobar que la aplicación se levanta correctamente si se abre la documentación del Api con swagger.


swagger

![image](https://github.com/user-attachments/assets/0e939750-52d3-429f-b7dc-097d1c3d3525)

(opcional)También se puede usar el dockerfile con los siguientes comandos

# Construir la imagen
```bash
docker build -t netby-api .
```

# Ejecutar el contenedor

```bash

docker run -d -p 5123:5123 --name backend netby-api
```

---



### PARA EL FRONTEND

Luego de clonar el proyecto, accede al directorio del proyecto front:
```bash
cd reto_netby/frontend
```

### **2️⃣ Instalar las dependencias**
Ejecuta el siguiente comando para instalar todas las dependencias necesarias:
```bash
npm install
```

### **3️⃣ Ejecutar la aplicación**
Una vez instaladas las dependencias, inicia el servidor de desarrollo con:
```bash
npm start
```
Esto levantará la aplicación localmente, por lo general en **http://localhost:3000** y podrás ver la interfaz del frontend.

---

## 📌 3. Características Implementadas

✅ **Listado de formularios disponibles** 📋

✅ **Creación y edición de formularios** 📝

✅ **Agregar y eliminar campos en formularios** ➕✏️

✅ **Ingresar datos en los formularios** ✅

✅ **Validaciones básicas en los formularios** ⚠️



---

## 📌 4. Evidencias del Frontend 📸

A continuación, se presentan capturas de pantalla de las principales funcionalidades:

### **📍 Pantalla de Listado de Formularios**

✅ Muestra los formularios disponibles.

✅ Permite seleccionar un formulario para visualizarlo a detalle


![image](https://github.com/user-attachments/assets/fc86a35a-ba04-4f52-b40c-6d5897fb1237)



### **📍 Pantalla de Creación de Formularios**

✅ Permite crear un nuevo formulario.

✅ Permite agregar campos dinámicamente.


![image](https://github.com/user-attachments/assets/8659dd96-2ef9-4f4b-8c8b-430003ca3c0a)
![image](https://github.com/user-attachments/assets/620c481a-4404-4054-bb2c-6092206f1201)
![image](https://github.com/user-attachments/assets/2348dbce-7d23-4a2b-81d8-70757f903b7b)
![image](https://github.com/user-attachments/assets/e770f3e7-c3a0-47d3-b390-f93bdff255ad)





### **📍 Pantalla de Edición de Formularios**

✅ Permite editar el nombre y los campos de un formulario existente.

✅ Valida los campos antes de guardarlos.

![image](https://github.com/user-attachments/assets/b74f1a71-fa8a-43f0-bd91-b337b9053180)
![image](https://github.com/user-attachments/assets/cdb6b1b3-d263-48d9-b928-d094bde6a1ab)
![image](https://github.com/user-attachments/assets/83ad8016-5b0a-4b91-93d9-384d1822e30a)
![image](https://github.com/user-attachments/assets/17b7ef38-6427-401c-bbb7-1dc10e460868)
![image](https://github.com/user-attachments/assets/f6cb1b2d-24cc-4b4c-b55d-e63a49327733)
![image](https://github.com/user-attachments/assets/257a4ce9-59ec-4e00-8b25-0eed5d63b72f)





### **📍 Pantalla de Consulta de Datos Ingresados**

✅ Muestra los datos de un form

![image](https://github.com/user-attachments/assets/f1595f53-87d0-4acf-8dea-e19c34cfc569)

![image](https://github.com/user-attachments/assets/d70aee97-d731-44b9-ad14-1217f48277ee)







### **📍 Funcionalidad para eliminar Formularios**

![image](https://github.com/user-attachments/assets/8d30acd2-2adb-40a1-b545-e41261bc480a)


![image](https://github.com/user-attachments/assets/77ff9524-b8e4-4f70-ba4f-d11ba05048fa)

![image](https://github.com/user-attachments/assets/e7fccc71-51d5-41fa-8964-ee298e08b6c0)
![image](https://github.com/user-attachments/assets/1b5d45a6-0c6c-484a-8a69-a1b9b26d6cbc)






---

## 📌 5. Consideraciones Futuros

🚀 **Este frontend está preparado para conectarse con un backend en .NET Core 8, donde se obtendrán y almacenarán los formularios dinámicamente en una base de datos.



📍 **Si tienes dudascontáctame.** 😊

---

## 📌 6. Contacto
Si tienes alguna duda o sugerencia, puedes contactarme a través de mi correo electrónico.

📧 Email: [coryorc@yahoo.es](mailto:coryorc@yahoo.es)


