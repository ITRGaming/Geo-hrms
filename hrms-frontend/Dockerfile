# hrms-frontend/Dockerfile

FROM node:18-alpine

WORKDIR /app

# Copy package.json and package-lock.json first for caching
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Install Expo CLI globally (Expo now recommends npx expo, but global CLI can be useful)
# If you prefer npx, you can remove this line and adjust CMD below to `npx expo start`
RUN npm install --global expo-cli

# Copy the rest of your app's source code
COPY . .

# Expose Expo's default ports
# 19000: Expo Go app port
# 19001: Metro Bundler port
# 8081: Common React Native development server port (sometimes used)
EXPOSE 19000
EXPOSE 19001
EXPOSE 8081

# Set environment variable for the host IP (CRUCIAL for Expo Go connection)
# This will be overridden by docker-compose for dynamic host IP.
# We set a default here, but docker-compose will provide the actual host IP.
ENV REACT_NATIVE_PACKAGER_HOSTNAME=0.0.0.0

# Command to start the Expo development server
# --non-interactive: Prevents the CLI from waiting for input
# --host 0.0.0.0: Allows Metro to bind to all interfaces inside the container
CMD ["expo", "start", "--non-interactive", "--host", "0.0.0.0"]

# If you want to use Expo's tunnel service for easier external access (e.g., to phone not on same LAN)
# CMD ["expo", "start", "--non-interactive", "--host", "0.0.0.0", "--tunnel"]