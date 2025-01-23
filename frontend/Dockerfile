FROM node:20-slim as builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:20-slim as runner
WORKDIR /app
COPY --from=builder /app/build ./build
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/public ./public
RUN npm install --production

ENV PORT=8080
ENV NODE_ENV=production

CMD ["npm", "run", "start"] 