# Etapa 1: Construcción
FROM node:22-alpine AS builder

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de la aplicación
COPY package.json yarn.lock ./

# Instala las dependencias
RUN yarn install

# Copia el resto de los archivos de la aplicación
COPY . .

# Construye la aplicación Nuxt para producción
RUN yarn build

# Etapa 2: Ejecución
FROM node:22-alpine

# Establece el directorio de trabajo
WORKDIR /app

# Copia las dependencias de producción
COPY --from=builder /app/node_modules ./node_modules

# Copia la aplicación Nuxt construida
COPY --from=builder /app/.nuxt ./.nuxt
COPY --from=builder /app/public ./public
COPY --from=builder /app/nuxt.config.ts ./nuxt.config.ts

# Establece las variables de entorno necesarias para producción
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000
ENV NODE_ENV=production

# Expone el puerto
EXPOSE 3000

# Comando por defecto para iniciar la aplicación
CMD ["yarn", "start"]
