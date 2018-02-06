FROM ubuntu:16.04

# Local directory with project source
ENV SRC=src
# Directory in container for all project files
ENV SRVHOME=/srv
# Directory in container for project source files
ENV SRVPROJ=/srv/src

# Update the default application repository sources list
RUN apt-get clean \
    && apt-get update -y

# Install system required packages
RUN apt-get install -y \
        git \
        nodejs \
        nodejs-legacy \
        npm

# Install application required packages
RUN npm install -g \
    bower \
    gulp

# Set application workdir
WORKDIR $SRVPROJ

# Copy application source code to SRCDIR
COPY $SRC $SRVPROJ

# Install app dependencies
RUN npm install
RUN bower install --allow-root --force

# Copy entrypoint scripts into the image
COPY ./run.sh /

# Give execure permissions for entrypoint scripts
RUN chmod +x /run.sh

# Run server
CMD ["/run.sh"]
