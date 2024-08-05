# Nuxt 3 builder
FROM node:22-alpine AS builder

WORKDIR /app

COPY . .

RUN yarn install --frozen-lockfile
RUN yarn build

# Nuxt 3 production
FROM node:lts

WORKDIR /app

COPY --from=builder /app/.output  /app/.output

ENV NITRO_PORT=80

EXPOSE 80

CMD [ "node", ".output/server/index.mjs" ]