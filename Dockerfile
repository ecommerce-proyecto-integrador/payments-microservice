# Utiliza una imagen de Node.js como base
FROM node:18.18.2-alpine3.17

# Establece el directorio de trabajo en /app
WORKDIR /app

# Copia el archivo package.json y package-lock.json al directorio de trabajo
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia todo el código fuente de tu microservicio al directorio de trabajo
COPY . .

# Expone el puerto en el que escucha tu aplicación (ajusta el puerto según tu configuración)
EXPOSE 3002


# Comando para iniciar la aplicación (ajusta según tu script de inicio)
CMD [ "npm", "run" ,"start:dev" ]

