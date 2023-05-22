FROM node:alpine

# Set working directory

WORKDIR /app

# Install app dependencies

COPY package.json ./

RUN npm install

RUN npm install swagger-ui-express

# Bundle app source

COPY . .

# Expose port 3000

EXPOSE 3000

# Run app

CMD ["npm", "container"]