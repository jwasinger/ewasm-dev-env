FROM ethereum/cpp-build-env

COPY install_cmake.sh /

RUN bash /install_cmake.sh

ENV PATH="/root/.local/bin:${PATH}"

USER root

RUN curl https://dl.google.com/go/go1.15.7.linux-amd64.tar.gz > go.tar.gz \
	&& tar -C /usr/local -xvf go.tar.gz

ENV PATH="/usr/local/go/bin:${PATH}"

RUN git clone https://github.com/ethereum/go-ethereum \
	&& cd go-ethereum \
	&& make -j2 \
	&& cd .. \
	&& cp go-ethereum/build/bin/geth /root/

ENTRYPOINT ["/root/geth"]
