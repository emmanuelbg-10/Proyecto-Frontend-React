# Usar una imagen base de Node.js (alpine para tamaño reducido)
FROM node:23-alpine as DEV_IMAGE

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos package.json y package-lock.json (si existen) para aprovechar la caché de Docker durante la instalación
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copia el resto de los archivos del proyecto (sin node_modules)
COPY . .

# Expone el puerto 3000 para que se pueda acceder a la aplicación React
EXPOSE 3000

# Comando por defecto para iniciar Vite en modo desarrollo
CMD ["npm", "run", "dev", "--", "--port", "3000", "--host"]
