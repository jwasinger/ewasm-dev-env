#! /bin/bash
(cd geth && \
  ./init_geth.sh && \
  docker logs --follow $(./run_geth.sh))
