# hrms-backend/Dockerfile

# --- Stage 1: Dependencies and Prisma Client Generation ---
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker cache
# This layer only rebuilds if package.json or package-lock.json changes
COPY package.json package-lock.json ./

# Install backend dependencies
RUN npm install

# Copy Prisma schema and generate client
# This ensures the Prisma client is generated inside the container's environment
COPY prisma ./prisma/
RUN npx prisma generate --data-proxy-provider=postgresql # Ensure correct provider

# Copy the rest of the backend source code (assuming your main server file is at the root)
# This layer rebuilds if any source files change
COPY . .

# --- Stage 2: Production-ready image (leaner) ---
FROM node:18-alpine AS runner

WORKDIR /app

# Copy only necessary files from the builder stage
# This keeps the final image size down by not including build tools/dev dependencies
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/package-lock.json ./package-lock.json
COPY --from=builder /app/prisma ./prisma 
# Prisma schema and client are needed at runtime

# **IMPORTANT**: If your main server file (e.g., app.js or server.js) is directly
# in the root of your hrms-backend folder, you need to copy it here.
# Assuming your main entry point is index.js in the root of /hrms-backend
COPY --from=builder /app/index.js ./index.js 
# Adjust 'index.js' to your actual main file name

# Expose the port your Express app will listen on (e.g., 5000)
EXPOSE 5000

# Command to run the application
# This assumes you have a "start" script in your package.json (e.g., "node index.js")
CMD ["npm", "start"]