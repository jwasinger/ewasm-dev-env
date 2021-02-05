const HDWalletProvider = require('@truffle/hdwallet-provider')

module.exports = {
    networks: {
        development: {
            host: '127.0.0.1',     // Localhost (default: none)
            port: 8545,            // Standard Ethereum port (default: none)
            network_id: '*',       // Any network (default: none)
            provider: () => new HDWalletProvider({
                privateKeys: ["cbfee4ca4db6cf6120e50eff7033ed6c65168ae4bd93bb66788ed1f50ff270fb"],
                providerOrUrl: "http://localhost:8545"
            })
        }
    }
};
