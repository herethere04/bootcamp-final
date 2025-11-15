# Estágio 1: Build (Isto está correto)
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Estágio 2: Servir (Com a correção)
FROM nginx:alpine

# Copia o CONTEÚDO da pasta 'dist' para a raiz do Nginx
# Esta é a correção nº 1
COPY --from=build /app/dist/ /usr/share/nginx/html/

# Copia o nosso ficheiro de configuração personalizado do Nginx
# Esta é a correção nº 2, que força o 'index.html'
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80