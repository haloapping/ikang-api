# Use a base image with Bun pre-installed or install it manually
FROM oven/bun:latest

# Set the working directory
WORKDIR /app

# Copy package.json and bun.lockb (if using Bun's lockfile)
COPY package.json bun.lock ./

# Install dependencies using Bun
RUN bun install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Define the command to run the app
CMD ["bun", "start"]