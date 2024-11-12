FROM node:22
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY ./src ./src
COPY ./public ./public
COPY tsconfig.json ./
COPY webpack.config.js ./
COPY .babelrc ./
RUN npm run build
FROM nginx:1.27
COPY --from=0 /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]