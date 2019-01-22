FROM node:11-slim as build-stage
WORKDIR /usr/src/app
COPY . .
RUN npm run build

FROM nginx:alpine
EXPOSE 80
COPY --from=build-stage /usr/src/app/build/ /usr/share/nginx/html