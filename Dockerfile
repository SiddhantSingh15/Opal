FROM node:14-alpine AS development
ENV NODE_ENV development

# Add a work directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# Cache and Install dependencies
COPY package*.json ./
RUN npm install

# Copy app files
COPY . .

# Expose react port
EXPOSE 3000

# Start the app
CMD [ "npm", "start" ]