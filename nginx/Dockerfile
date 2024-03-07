FROM nginx:1.25.4-alpine

# Error without workdir
WORKDIR /app/nginx

# Copy nginx.conf to the default Nginx configuration directory
COPY nginx.conf /etc/nginx/nginx.conf

# Copy SSL certificates to a directory inside the container
COPY attendex.shop.pem /etc/nginx/attendex.shop.pem
COPY attendex.shop.key /etc/nginx/attendex.shop.key

# Making log folder
RUN mkdir -p /etc/nginx/logs/

# Expose ports
EXPOSE 80
EXPOSE 443

# Start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]
