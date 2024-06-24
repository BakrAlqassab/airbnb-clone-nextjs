FROM node:18.20-alpine

WORKDIR /usr/src/app

COPY . .
RUN npm install --production

RUN apk update && apk add bash
SHELL ["/bin/bash", "-o", "pipefail", "-c"]

# CMD ["npm", "run"]

CMD ["/bin/bash"]