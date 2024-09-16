#older
# ARG NODE_VERSION=20.11.1
# FROM node:${NODE_VERSION}-alpine

# ENV NODE_ENV production

# WORKDIR /usr/src/app

# # Run the application as a root user to install nodemon.
# USER root

# # Copy the rest of the source files into the image.
# COPY . .

# # Copy certificates
# COPY cert2.pem /usr/src/app/cert2.pem
# COPY chain2.pem /usr/src/app/chain2.pem
# COPY privkey2.pem /usr/src/app/privkey2.pem
# COPY fullchain2.pem /usr/src/app/fullchain2.pem

# # Expose the port that the application listens on.
# EXPOSE 5050

# # Install all packages
# RUN npm install 

# # Change back to non root user
# USER node

# # Run the application.
# CMD npm start
############    
ARG NODE_VERSION=20.11.1
FROM node:${NODE_VERSION}-alpine

# Set environment variables
ENV NODE_ENV production


RUN apk add --no-cache \
    python3 \
    make \
    g++ \
    cairo-dev \
    jpeg-dev \
    pango-dev \
    giflib-dev

ENV PYTHON=/usr/bin/python    


# Create a non-root user and set as the default user
RUN addgroup -S app && adduser -S app -G app
USER app

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json first for dependency installation
COPY --chown=app:app package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the source files and certificates
COPY --chown=app:app . .

# Copy certificates (ensure these are secured properly)
COPY --chown=app:app cert2.pem /usr/src/app/cert2.pem
COPY --chown=app:app chain2.pem /usr/src/app/chain2.pem
COPY --chown=app:app privkey2.pem /usr/src/app/privkey2.pem
COPY --chown=app:app fullchain2.pem /usr/src/app/fullchain2.pem

# Expose the port that the application listens on
EXPOSE 5050

# Run the application
CMD ["npm", "start"]
