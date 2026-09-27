# ---------------------------------------------------
# Build Stage
# ---------------------------------------------------
FROM node:22-alpine AS build

WORKDIR /app
ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

# Copy dependancy files first for Docker caching
COPY src/frontend/web/package*.json ./

RUN npm ci

# Copy frontend source
COPY src/frontend/web .

# Build React application
RUN npm run build


# ----------------------------------------------------
# Runtime Stage
# ----------------------------------------------------

FROM nginx:alpine AS final

# Copy the built React files into Nginx
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]