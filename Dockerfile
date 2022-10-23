FROM node:16.17.0-bullseye-slim
RUN apt-get update && apt-get install -y --no-install-recommends dumb-init
ARG MUI_KEY
ENV MUI_KEY=$MUI_KEY
ENV NODE_ENV production
WORKDIR /app
RUN adduser --system --uid 1001 nextjs
RUN addgroup --system --gid 1001 nextjs
COPY --chown=nextjs:nextjs . .
RUN npm install
RUN npm run build
USER nextjs
EXPOSE 3000
CMD ["dumb-init", "npm", "start"]