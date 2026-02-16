# Stage 1: Build the React application
FROM node:20-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve the build using Nginx (Production standard)
FROM nginx:stable-alpine
# Vite builds to 'dist' by default
COPY --from=build /app/dist /usr/share/nginx/html
# Copy a simple nginx config if you have custom routing (otherwise default is fine)
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]