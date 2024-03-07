FROM node:20.11.1-alpine
# Install pnpm globally
RUN npm install -g pnpm

# Not setting workzdir causes infinite restart
WORKDIR /app/client/attendex-web

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN pnpm install

# Bundle your source code inside the Docker image
COPY . .

# Install Git
RUN apk add --no-cache git

# Expose the port your app runs on
EXPOSE 5173

# Run the setup script
RUN pnpm run setup

# Define the command to run your app
CMD ["pnpm", "run", "dev"]