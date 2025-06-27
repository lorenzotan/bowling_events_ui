FROM node:20-slim

# Install Ionic CLI globally
RUN npm install -g @ionic/cli

WORKDIR /app

# Install dependencies
# RUN npm install

# Expose Ionic dev server port
EXPOSE 8100

# Start the app
CMD ["ionic", "serve", "--host=0.0.0.0"]
