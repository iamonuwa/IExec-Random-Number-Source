FROM node:11-alpine

COPY src/random_number.js /src/random_number.js
COPY entrypoint.sh /entrypoint.sh

RUN npm i https ethers fs

RUN chmod +x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]