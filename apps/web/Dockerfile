# Estágio 1: Build (Isto constrói o seu PWA)
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Estágio 2: Servir (Isto serve o PWA com Nginx)
FROM nginx:alpine

# A CORREÇÃO ESTÁ AQUI:
# Copia o *CONTEÚDO* da pasta 'dist' (note a barra / no final)
# para a pasta raiz do Nginx. O Vite já coloca tudo
# (index.html, manifest, service-worker, icons) dentro de 'dist'.
COPY --from=build /app/dist/ /usr/share/nginx/html/

EXPOSE 80