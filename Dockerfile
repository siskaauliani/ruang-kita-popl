# Stage 1: Build
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package.json & lock
COPY package*.json ./

# INSTALL SEMUA dependency (TERMASUK dev)
RUN npm ci

# Copy source code
COPY . .

# Build Vite app
RUN npm run build

# Stage 2: Production (Nginx)
FROM nginx:alpine

# Copy hasil build ke nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
