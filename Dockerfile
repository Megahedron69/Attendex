ARG NODE_VERSION=20.11.1
FROM node:${NODE_VERSION}-alpine

ENV NODE_ENV production

WORKDIR /usr/src/app

# Run the application as a root user to install nodemon.
USER root

# Copy the rest of the source files into the image.
COPY . .

# Copy certificates
COPY attendex.shop.key /usr/src/app/attendex.shop.key
COPY attendex.shop.pem /usr/src/app/attendex.shop.pem
COPY attendex.shop.pem /usr/src/app/attendex.shop.crt

# Expose the port that the application listens on.
EXPOSE 5050

# Install all packages
RUN npm install 

# Change back to non root user
USER node

# Run the application.
CMD npm start
