ARG NODE_VERSION=20.11.1
FROM node:${NODE_VERSION}-alpine

ENV NODE_ENV production

WORKDIR /usr/src/app

# Run the application as a root user to install nodemon.
USER root

# Copy the rest of the source files into the image.
COPY . .

# Copy certificates
COPY cert2.pem /usr/src/app/cert2.pem
COPY chain2.pem /usr/src/app/chain2.pem
COPY privkey2.pem /usr/src/app/privkey2.pem
COPY fullchain2.pem /usr/src/app/fullchain2.pem

# Expose the port that the application listens on.
EXPOSE 5050

# Install all packages
RUN npm install 

# Change back to non root user
USER node

# Run the application.
CMD npm start
