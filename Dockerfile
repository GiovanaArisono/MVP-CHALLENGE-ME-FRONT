# Etapa 1: Build da aplicação Angular
FROM node:18 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build --prod

# Etapa 2: Servir os arquivos com Nginx
FROM nginx:stable-alpine

# Copia o build do Angular para o diretório padrão do Nginx
COPY --from=build /app/dist/challenge-me-front /usr/share/nginx/html

# Copia uma configuração personalizada do Nginx, se quiser (opcional)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
