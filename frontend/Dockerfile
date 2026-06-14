# --- Build stage: produce the static React build ---
FROM node:18-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci

# Backend URL is baked in at build time (Vite inlines VITE_* vars).
# Pass it with: --build-arg VITE_API_URL=https://<backend-host>
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

COPY . .
RUN npm run build

# --- Runtime stage: serve the build with nginx ---
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
