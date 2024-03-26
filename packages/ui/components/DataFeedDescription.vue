<template>
  <i18n-t
    v-if="description.i18nPath"
    :keypath="description.i18nPath"
    scope="global"
    tag="p"
    class="feed-description"
  >
    <template
      v-for="field in description.fields"
      :key="fieldToProp[field]"
      #[field]
    >
      <span v-if="description.i18nPath" :key="field.i18nPath" class="bold">{{
        fieldToProp[field]
      }}</span>
    </template>
  </i18n-t>
</template>

<script>
const fields = {
  name: 'name',
  network: 'network',
  value: 'value',
  date: 'date',
  heartbeat: 'heartbeat',
  deviation: 'deviation',
}

export default {
  props: {
    deviation: {
      type: String,
      required: true,
    },
    isRouted: {
      type: Boolean,
      required: true,
    },
    feedTimeToUpdate: {
      type: String,
      default: null,
    },
    lastResultDate: {
      type: String,
      required: true,
    },
    lastResultValue: {
      type: String,
      required: true,
    },
    networkName: {
      type: String,
      required: true,
    },
    feedName: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      fieldToProp: {
        [fields.name]: this.feedName,
        [fields.network]: this.networkName,
        [fields.value]: this.lastResultValue,
        [fields.date]: this.lastResultDate,
        [fields.heartbeat]: this.feedTimeToUpdate,
        [fields.deviation]: this.deviation,
      },
    }
  },
  computed: {
    description() {
      const routedFeedFields = [
        fields.name,
        fields.network,
        fields.value,
        fields.date,
        fields.heartbeat,
      ]
      if (this.isRouted && this.feedTimeToUpdate) {
        return {
          i18nPath: 'data_feed_details.feed_description_routed_cached',
          fields: routedFeedFields,
        }
      } else if (this.isRouted) {
        return {
          i18nPath: 'data_feed_details.feed_description_routed',
          fields: routedFeedFields,
        }
      } else {
        return {
          i18nPath: 'data_feed_details.feed_description',
          fields: [...routedFeedFields, fields.deviation],
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.feed-description {
  font-size: var(--text-size);
  padding: 16px;
  margin-top: 16px;
}
</style>
