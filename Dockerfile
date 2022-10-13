FROM node:16.17.0-bullseye-slim
RUN apt-get update && apt-get install -y --no-install-recommends dumb-init
ENV NODE_ENV production
ENV MIDDLEWARE_SCHEME http
ENV MIDDLEWARE_HOST localhost
ENV MIDDLEWARE_PORT 8080
WORKDIR /app
RUN adduser --system --uid 1001 nextjs
RUN addgroup --system --gid 1001 nextjs
COPY --chown=nextjs:nextjs . .
RUN npm install
RUN npm run build
USER nextjs
EXPOSE 3000
CMD ["dumb-init", "npm", "start"]