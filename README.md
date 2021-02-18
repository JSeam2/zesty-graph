# Zesty Graph
Subgraphs for deployment on the graph

# Quickstart
1. Install dependencies
```
$ yarn
```

# Deploy Locally

## Set up contracts
1. Clone the zesty-contracts repo
```
$ git clone https://github.com/zestymarket/zesty-contracts.git
```

1. Install dependencies
```
$ cd zesty-contracts
$ yarn
```

1. Set up hardhat
```
$ npx hardhat
```

1. Build artifacts
```
$ npx hardhat compile
```

1. [Set up a ganache node](https://www.trufflesuite.com/ganache). Change the RPC Server to `HTTP://127.0.0.1:8545`. We will default to ganache for now as the hardhat node is not very reliable and weird bugs emerge

1. On a different terminal deploy contracts locally take note of the address. Modify the values in `config/local.json`
```
$ npx hardhat run scripts/deploy-local.js --network ganache
```

## Set up Graph-node
1. Clone the repo
```
$ git clone https://github.com/graphprotocol/graph-node.git
```

1. Setup [docker](https://docs.docker.com/get-docker/) and [docker-compose](https://docs.docker.com/compose/install/)

1. Access the docker folder in the repo
```
$ cd graph-node/docker
```

1. Run the docker-compose script
```
$ docker-compose up -d
```

1. Once done remember to shutdown and remove volumes. You might need to remove the data folder in the event you redeployed a new network.
```
$ docker-compose down -v
$ rm -rf data
```


## Deploy Graph
1. Prepare the the subgraph.yaml
```
$ yarn prepare:local
```

1. Create files
```
$ yarn create-local
```

1. Deploy local
```
$ yarn deploy-local
```

1. You should be able to access the graph node at `http://localhost:8000/subgraphs/name/zestymarket/zesty-graph`