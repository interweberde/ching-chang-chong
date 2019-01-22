FROM node:9-slim
WORKDIR /usr/src/app
COPY . .
CMD ["npm", "run", "build"]

FROM nginx:alpine
ENV PORT 8080
EXPOSE 8080
COPY /usr/src/app/build /usr/share/nginx/html