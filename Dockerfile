ARG NODE_VERSION=22.12.0
FROM node:${NODE_VERSION}-alpine AS base

ENV NODE_ENV=production
ENV YARN_VERSION=4.5.3

# Set the working directory
WORKDIR /app/

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock .yarnrc.yml ./
RUN corepack enable && corepack prepare yarn@${YARN_VERSION}
RUN yarn install --immutable

# Copy the source code
COPY ./index.js /app/index.js

ENV PORT=80

EXPOSE 80
CMD ["yarn", "start"]
