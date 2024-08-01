
#Stage 1 Creating angular build(dist folder). 
#as node means you are creating an alias for this stage to be accessed in the future stages

FROM node:alpine as node


WORKDIR /app

#WORKDIR will create the app directory if it doesnt already exist

# node is the base image from which Docker will include all functionality into the image we will be crearting
# Its like a parent class from which we are inheriting all features into the child class
COPY package.json package-lock.json ./
RUN npm cache clean --force
RUN npm install
COPY . .
#copy all the files and folders from the directory where the Dockerfile is present into the working directory i.e /app
#RUN npm run test

RUN npm run build
#Stage 2

FROM nginx:alpine

#caching files
VOLUME /var/cache/nginx 

RUN rm -r /usr/share/nginx/html/*

#Now I need to access the dist folder from the previous stage. 
# I copy the dist folder into the folder that nginx uses to refer static files.
COPY --from=node /app/dist/angular-i18-translate/de /usr/share/nginx/html/de
COPY --from=node /app/dist/angular-i18-translate/fr /usr/share/nginx/html/fr
COPY --from=node /app/dist/angular-i18-translate/hi /usr/share/nginx/html/hi
COPY --from=node /app/dist/angular-i18-translate/en-US /usr/share/nginx/html/en-US


# to replace the default nginx config file with our config file. In our config file we
# have added an additional check. When we are routing to other components with different paths,
# nginx might think its a server side path and return 404. In such cases we instruct nginx to 
# redirect to index.html file. This is very important
RUN rm /etc/nginx/nginx.conf
COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY nginx/nginx.custom.config /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"] 
#uncomment incase you want to use docker cp
#the command to be executed when the docker container starts. -g daemon off indicates that nginx must run in the foreground
#this command must execute execute successfully. Otherwise you cannot open the application in the browser.