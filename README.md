# Data Feeds Explorer

## Feeds Configuration File

The configuration file for the monitored networks is located the [API package](https://github.com/witnet/data-feeds-explorer/blob/main/packages/api/src/dataFeedsRouter.json).

The networks still using the old witnet price router are marked using legacy: true in the network configuration. The feeds key consists of a map with the default values of the existing price feeds. According to that, the price feeds deployed using the default configuration have been deleted from the network feeds section. If a feed configuration appears in the network feeds, it will overwrite the default configuration. 

All the available price feeds in a network called the supportedFeeds method.