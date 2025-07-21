# Estágio de construção
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --prod

# Estágio de produção
FROM nginx:alpine
COPY --from=build /app/dist/ARtic-frontend /usr/share/nginx/html
COPY nginx-custom.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
