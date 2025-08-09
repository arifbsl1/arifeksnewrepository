# Stage 1: Build the Angular application
FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Build the application for production
RUN NODE_OPTIONS=--openssl-legacy-provider node --max-old-space-size=4096 ./node_modules/@angular/cli/bin/ng build --configuration production

# Stage 2: Serve the application with Nginx
FROM nginx:alpine

# Copy the built static files from the build stage to the Nginx server directory
COPY --from=build /app/dist/employee-management-system /usr/share/nginx/html
# Copy the custom Nginx configuration file
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
# Expose port 80 for the Nginx server
EXPOSE 80