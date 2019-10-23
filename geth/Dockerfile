FROM ethereum/cpp-build-env

COPY install_cmake.sh /

RUN bash /install_cmake.sh

ENV PATH="/root/.local/bin:${PATH}"

USER root

RUN curl https://dl.google.com/go/go1.12.5.linux-amd64.tar.gz > go.tar.gz \
	&& tar -C /usr/local -xvf go.tar.gz

ENV PATH="/usr/local/go/bin:${PATH}"

# hera 0.2.3 and ewasm-go-ethereum ewasm branch on 5/9/2019
RUN git clone https://github.com/ewasm/hera \
	&& cd hera \
	&& git reset 3a9b8cd5eda1d00205af1a14fca1dbfa0bddff9b --hard \
	&& git submodule update --init \
	&& mkdir build \
	&& cd build \
	&& cmake -DBUILD_SHARED_LIBS=ON -DHERA_DEBUGGING=ON .. \
	&& make -j2 \
	&& cd ../.. \
	&& git clone https://github.com/ewasm/go-ethereum \
	&& cd go-ethereum \
	&& git reset 2cbecfcb65d428bc5d0ac590a6e4f03f2c12173a --hard \
	&& make -j2 \
	&& cd .. \
	&& cp go-ethereum/build/bin/geth /root/ \
	&& cp hera/build/src/libhera.so /root/ \
	&& rm -rf go-ethereum hera

ENTRYPOINT ["/root/geth"]
