# Estágio 1: Build
# Esta parte usa o Node.js para "compilar" seu site React
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
# A VITE_API_URL será passada pelo docker-compose, mas não é necessária para o build
RUN npm run build

# Estágio 2: Servir
# Esta parte pega os arquivos "compilados" e os serve com um servidor web Nginx
FROM nginx:alpine

# Copia os arquivos do site prontos (da pasta 'dist') do estágio anterior
COPY --from=build /app/dist /usr/share/nginx/html

# Copia os arquivos estáticos importantes do PWA (manifesto, service worker, ícones)
COPY --from=build /app/public/manifest.webmanifest /usr/share/nginx/html/
COPY --from=build /app/public/service-worker.js /usr/share/nginx/html/
COPY --from=build /app/public/icons /usr/share/nginx/html/icons
    
EXPOSE 80