# docker build -t stackql-playground .
# docker run -p 3000:3000 stackql-playground
# docker stop $(docker ps -l -q --filter status=running --filter ancestor=stackql-playground)
FROM node:16.17.0-bullseye-slim
RUN apt-get update && apt-get install -y --no-install-recommends dumb-init
ENV NODE_ENV production
WORKDIR /app
RUN adduser --system --uid 1001 nextjs
COPY --chown=nextjs:nextjs . .
RUN npm install
RUN npm ci --only=production
USER nextjs
EXPOSE 3000
CMD ["dumb-init", "npm", "start"]