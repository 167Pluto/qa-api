FROM node:18

ENV NO_COLOR=true

WORKDIR /home/node/app

RUN apt-get update && apt-get install -y --no-install-recommends dumb-init && rm -rf /var/lib/apt/lists/*

COPY package*.json /home/node/app

RUN npm install

COPY . /home/node/app

RUN npm run build

ENTRYPOINT ["/usr/bin/dumb-init", "--"]
CMD ["sh", "docker_entrypoint.sh"]

EXPOSE 3010
