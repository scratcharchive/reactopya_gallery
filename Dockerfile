FROM ubuntu:18.04

#########################################
### Python                                                               
RUN apt-get update && apt-get -y install git wget build-essential
RUN apt-get install -y python3 python3-pip
RUN ln -s python3 /usr/bin/python
RUN ln -s pip3 /usr/bin/pip
RUN DEBIAN_FRONTEND=noninteractive apt-get install -y python3-tk

#########################################
### Node
RUN apt-get update && apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash - && apt-get update && apt-get install -y nodejs

RUN npm install -g yarn

RUN mkdir /src
COPY package.json /src/package.json
COPY webpack.config.js /src/webpack.config.js
COPY src /src/src
COPY server /src/server
COPY reactopya /src/reactopya
COPY setup.py /src/setup.py
COPY reactopya_gallery /src/reactopya_gallery
WORKDIR /src
RUN yarn install && yarn build

RUN rm /usr/bin/python && ln -s python3 /usr/bin/python
RUN rm /usr/bin/pip && ln -s pip3 /usr/bin/pip

RUN pip install spikeforest
RUN pip install mountaintools
RUN cd reactopya && pip install -e .
RUN pip install -e .

EXPOSE 8080
CMD PORT=8080 yarn start
