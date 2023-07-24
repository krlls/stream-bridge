FROM node:12-alpine as build-stage

WORKDIR /app
COPY ./ /app/
RUN yarn
RUN yarn build


FROM node:12-alpine

COPY --from=build-stage /app/dist/ /app/
COPY --from=build-stage /app/package*.json /app/
WORKDIR /app
RUN yarn install --prod
RUN yarn global add forever
CMD [ "forever", "index.js" ]
