# Base on offical Node.js Alpine image
FROM node:alpine

RUN mkdir /work
# Set working directory
WORKDIR /work

# Install PM2 globally
RUN yarn global add pm2

# Copy package.json and package-lock.json before other files
# Utilise Docker cache to save re-installing dependencies if unchanged
COPY package.json .
COPY yarn.lock .

# Install dependencies
RUN yarn

# Copy all files
COPY . .


# Expose the listening port
EXPOSE 1935 8888

# Run container as non-root (unprivileged) user
# The node user is provided in the Node.js Alpine base image
USER node

# Run npm start script with PM2 when container starts
CMD [ "pm2-runtime", "npm", "--", "start" ]