FROM nginx:1.25.4-alpine

# Error without workdir
WORKDIR /app/nginx

# Copy nginx.conf to the default Nginx configuration directory
COPY nginx.conf /etc/nginx/nginx.conf

# Copy SSL certificates to a directory inside the container
COPY cert2.pem /etc/nginx/cert2.pem
COPY chain2.pem /etc/nginx/chain2.pem
COPY privkey2.pem /etc/nginx/privkey2.pem
COPY fullchain2.pem /etc/nginx/fullchain2.pem

# Making log folder
RUN mkdir -p /etc/nginx/logs/

# Expose ports
EXPOSE 80
EXPOSE 443

# Start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]
