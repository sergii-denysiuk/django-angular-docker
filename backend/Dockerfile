FROM ubuntu:16.04

# Print all output immediately, instead of buffering
ENV PYTHONUNBUFFERED 1

# Local directory with project source
ENV SRC=api
# Directory in container for all project files
ENV SRVHOME=/srv
# Directory in container for project source files
ENV SRVPROJ=/srv/api

# Update the default application repository sources list
RUN apt-get clean \
    && apt-get update -y \
    && apt-get install -y locales && locale-gen en_US.UTF-8
ENV LANG en_US.UTF-8
ENV LANGUAGE en_US:en
ENV LC_ALL en_US.UTF-8

# Install python
RUN apt-get install -y \
    python3-pip \
    build-essential \
    libssl-dev \
    libffi-dev \
    python3-dev

# Set application workdir
WORKDIR $SRVPROJ

# Copy application source code to SRCDIR
COPY $SRC $SRVPROJ

# Install Python dependencies
RUN pip3 install -r requirements.txt

# Copy entrypoint scripts into the image
COPY ./test.sh /
COPY ./run.sh /
COPY ./wait_for_postgres.py /

# Give execure permissions for entrypoint scripts
RUN chmod +x /test.sh
RUN chmod +x /run.sh
RUN chmod +x /wait_for_postgres.py

# Run container
ENTRYPOINT ["/bin/bash"]
CMD ["/run.sh"]
