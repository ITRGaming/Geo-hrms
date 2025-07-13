# hrms-frontend/Dockerfile

FROM node:18-alpine

WORKDIR /app

# Copy package.json and package-lock.json first for caching
COPY package.json package-lock.json ./

# Install dependencies (this installs ALL dependencies, including devDependencies)
RUN npm install

# Install Expo CLI globally (Expo now recommends npx expo, but global CLI can be useful)
# RUN npm install --global expo-cli

# Copy the rest of your app's source code
COPY . .

# Expose Expo's default ports
EXPOSE 19000
EXPOSE 19001
EXPOSE 8081

ENV REACT_NATIVE_PACKAGER_HOSTNAME=0.0.0.0

CMD ["npx", "expo", "start", "--non-interactive", "--host", "0.0.0.0"]