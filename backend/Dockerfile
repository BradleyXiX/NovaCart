# 1. Use a lightweight Node image for 2026
FROM node:20-alpine

# 2. Optimization: Use a non-root user for security (Senior best practice)
USER node
WORKDIR /home/node/app

# 3. Copy only dependency files first to utilize Docker's cache
COPY --chown=node:node package*.json ./

# 4. Install production dependencies
RUN npm install --omit=dev

# 5. Copy the rest of the backend source code
COPY --chown=node:node . .

# 6. Expose the port from your server.js (default 5000)
EXPOSE 5000

# 7. Start the server
CMD ["node", "server.js"]