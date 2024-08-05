# Etapa de construcción
FROM node:18 AS build

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos del proyecto
COPY package.json yarn.lock ./
COPY nuxt.config.ts ./
COPY assets ./assets
COPY composables ./composables
COPY layouts ./layouts
COPY pages ./pages
COPY public ./public
COPY server ./server
COPY store ./store
COPY tsconfig.json ./

# Instala las dependencias
RUN yarn install

# Construye la aplicación
RUN yarn build

# Etapa de producción
FROM node:18 AS production

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos necesarios desde la etapa de construcción
COPY --from=build /app/.nuxt ./.nuxt
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/static ./static
COPY --from=build /app/package.json ./package.json

# Instala solo las dependencias de producción
RUN yarn install --production

# Expone el puerto en el que la aplicación se ejecutará
EXPOSE 3000

# Define el comando para ejecutar la aplicación
CMD ["yarn", "start"]
