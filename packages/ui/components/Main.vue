<template>
  <div>
    <div class="section-header">
      <p class="section-title">{{ $t('data_feeds') }}</p>
      <Select
        :options="options"
        :default-option="selected"
        @update-selected="updateSelected"
      />
    </div>
    <DataFeeds :feeds="dataFeeds" class="data-feeds" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [
        { time: '2019-04-11', value: 80.01 },
        { time: '2019-04-12', value: 96.63 },
        { time: '2019-04-13', value: 76.64 },
        { time: '2019-04-14', value: 81.89 },
        { time: '2019-04-15', value: 74.43 },
        { time: '2019-04-16', value: 80.01 },
        { time: '2019-04-17', value: 96.63 },
        { time: '2019-04-18', value: 76.64 },
        { time: '2019-04-19', value: 81.89 },
        { time: '2019-04-20', value: 74.43 },
      ],
      dataFeeds: [],
      allFeeds: [
        {
          detailsPath: {
            name: 'feeds-id',
            params: { id: 'id1' },
          },
          name: 'USD/BTC0',
          value: '38213.18',
          label: '$',
          img: {
            name: 'bitcoin',
            alt: 'BTC/USD',
          },
          network: 'mainnet',
        },
        {
          detailsPath: { name: 'feeds-id', params: { id: 'id2' } },
          name: 'USD/BTC1',
          value: '38213.18',
          label: '$',
          img: {
            name: 'bitcoin',
            alt: 'BTC/USD',
          },
          network: 'mainnet',
        },
        {
          detailsPath: { name: 'feeds-id', params: { id: 'id3' } },
          name: 'USD/BTC2',
          value: '38213.18',
          label: '$',
          img: {
            name: 'bitcoin',
            alt: 'BTC/USD',
          },
          network: 'mainnet',
        },
        {
          detailsPath: { name: 'feeds-id', params: { id: 'id4' } },
          name: 'USD/BTC3',
          value: '38213.18',
          label: '$',
          img: {
            name: 'bitcoin',
            alt: 'BTC/USD',
          },
          network: 'mainnet',
        },
        {
          detailsPath: { name: 'feeds-id', params: { id: 'id5' } },
          name: 'USD/BTC4',
          value: '38213.18',
          label: '$',
          img: {
            name: 'bitcoin',
            alt: 'BTC/USD',
          },
          network: 'mainnet',
        },
        {
          detailsPath: { name: 'feeds-id', params: { id: 'id6' } },
          name: 'USD/BTC5',
          value: '38213.18',
          label: '$',
          img: {
            name: 'bitcoin',
            alt: 'BTC/USD',
          },
          network: 'mainnet',
        },
        {
          detailsPath: { name: 'feeds-id', params: { id: 'id7' } },
          name: 'USD/BTC6',
          value: '38213.18',
          label: '$',
          img: {
            name: 'bitcoin',
            alt: 'BTC/USD',
          },
          network: 'mainnet',
        },
        {
          detailsPath: { name: 'feeds-id', params: { id: 'id8' } },
          name: 'USD/BTC7',
          value: '38213.18',
          label: '$',
          img: {
            name: 'bitcoin',
            alt: 'BTC/USD',
          },
          network: 'mainnet',
        },
        {
          detailsPath: { name: 'feeds-id', params: { id: 'id9' } },
          name: 'USD/BTC8',
          value: '38213.18',
          label: '$',
          img: {
            name: 'bitcoin',
            alt: 'BTC/USD',
          },
          network: 'mainnet',
        },
      ],
      options: [
        { label: 'All' },
        { label: 'Rinkeby' },
        { label: 'Goerly' },
        { label: 'Mainnet' },
      ],
      selected: { label: 'All' },
    }
  },
  mounted() {
    this.dataFeeds = this.allFeeds
    setTimeout(() => {
      this.data = [
        { time: '2019-04-11', value: 80.01 },
        { time: '2019-04-12', value: 96.63 },
        { time: '2019-04-13', value: 76.64 },
        { time: '2019-04-14', value: 81.89 },
        { time: '2019-04-15', value: 74.43 },
        { time: '2019-04-16', value: 80.01 },
        { time: '2019-04-17', value: 96.63 },
        { time: '2019-04-18', value: 76.64 },
        { time: '2019-04-19', value: 81.89 },
        { time: '2019-04-20', value: 74.43 },
        { time: '2019-04-21', value: 5.43 },
        { time: '2019-04-22', value: 6.43 },
        { time: '2019-04-23', value: 7.43 },
        { time: '2019-04-24', value: 8.43 },
        { time: '2019-04-25', value: 9.43 },
      ]
    }, 10000)
  },
  methods: {
    updateSelected(selectedOption) {
      this.selected = selectedOption
      if (this.selected.label === 'All') {
        this.dataFeeds = this.allFeeds
      } else {
        this.dataFeeds = this.allFeeds.filter((feed) => {
          return feed.network === this.selected.label.toLowerCase()
        })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.section-header {
  padding: 0 16px 24px 16px;
  display: flex;
  justify-content: space-between;
  width: 100%;
  .section-title {
    font-size: 20px;
    align-self: flex-end;
    font-weight: 600;
  }
}

.data-feeds {
  height: 100vh;
}

@media (max-width: 1200px) {
  .section-header {
    padding: 0 32px 24px 32px;
  }
}
@media (max-width: 600px) {
  .section-header {
    padding: 0 16px 24px 16px;
  }
}
</style>
