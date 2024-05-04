FROM node:18.17.1-alpine3.17

WORKDIR /opt/chat-server

COPY "package.json" .

RUN npm install

COPY . .

RUN npm run build

RUN chmod +x ./entrypoint.sh

EXPOSE 4000

USER node   

CMD ["./entrypoint.sh"]
