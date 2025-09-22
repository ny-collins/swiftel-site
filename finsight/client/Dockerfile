# In finsight/client/Dockerfile

# 1. Use an official Node.js 20 image as the base
FROM node:20-alpine

# 2. Set the working directory
WORKDIR /app

# 3. Copy package.json and package-lock.json for dependency installation
COPY package*.json ./

# 4. Install dependencies
RUN npm install

# 5. Copy the rest of the application code
COPY . .

# 6. Expose the port Vite runs on
EXPOSE 5173

# 7. The command to start the Vite development server
CMD ["npm", "run", "dev"]
