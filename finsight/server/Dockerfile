# In finsight/server/Dockerfile

FROM node:20-alpine

# CORRECTED: Install only the necessary and available OpenSSL packages
RUN apk add --no-cache openssl openssl-dev

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

EXPOSE 3000

CMD ["npm", "run", "dev"]
