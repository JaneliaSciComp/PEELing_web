FROM node:18 AS builder
WORKDIR /app
COPY package.json .
RUN npm install --force
COPY src ./src
COPY public ./public
RUN npm run build

FROM nginx:1.20
MAINTAINER Jody Clements "clementsj@janelia.hhmi.org"
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html/
