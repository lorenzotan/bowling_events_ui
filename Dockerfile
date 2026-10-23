FROM node:26-slim

# Install Ionic CLI globally
RUN npm install -g @ionic/cli

# Copy ionic code into container
COPY bowling_ui /app/bowling_ui

WORKDIR /app/bowling_ui

# Install dependencies
RUN npm install

# Expose Ionic dev server port
EXPOSE 8100

# Start the app
CMD ["ionic", "serve", "--host=0.0.0.0"]
