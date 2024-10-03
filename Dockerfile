# Use an official Node.js base image for building
FROM node:14 AS build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the entire project to the container
COPY . .

# Build the React app for production
RUN npm run build


# Use an official Nginx base image
FROM nginx:latest

# Remove the default Nginx configuration
RUN rm /etc/nginx/conf.d/default.conf

# Copy the optimized build files from the build stage to the Nginx web root directory
COPY --from=build /app/dist /usr/share/nginx/html

# Copy the custom Nginx configuration file
COPY apply.conf /etc/nginx/conf.d/

# Expose the port your React app will run on
EXPOSE 19000

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]