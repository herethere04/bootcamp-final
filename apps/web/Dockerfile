# Estágio 1: Build (Esta parte está correta)
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Estágio 2: Servir (Aqui está a correção)
FROM nginx:alpine

# A CORREÇÃO É ESTA LINHA:
# Copia APENAS o *conteúdo* da pasta 'dist' (com a barra / no final)
# para o diretório raiz do Nginx.
COPY --from=build /app/dist/ /usr/share/nginx/html/

# As outras linhas 'COPY' (manifest, service-worker, icons) foram removidas
# porque o 'npm run build' (Vite) já inclui todos os arquivos da pasta 'public/'
# dentro da pasta 'dist/' automaticamente.

EXPOSE 80