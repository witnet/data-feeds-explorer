<template>
  <i18n-t
    v-if="description.i18nPath"
    :keypath="description.i18nPath"
    scope="global"
    tag="p"
    class="feed-description text"
  >
    <template
      v-for="field in description.fields"
      :key="fieldToProp[field]"
      #[field]
    >
      <span v-if="description.i18nPath" class="text-highlighted">{{
        fieldToProp[field]
      }}</span>
    </template>
  </i18n-t>
  <p class="p-md pt-0 text inline">
    {{ $t('data_feed_details.feed_sources', [sources.length]) }}
    <a
      v-for="(link, index) in sources"
      :key="link.toString()"
      :href="link.toString()"
      target="_blank"
      class="text-highlighted"
      >{{ formatedLink(link.toString())
      }}<span v-if="index != sources.length - 1">, </span></a
    >.
  </p>
</template>

<script setup lang="ts">
type LocalizationField = {
  i18nPath: string
  fields: string[]
}
const fields = {
  name: 'name',
  network: 'network',
  value: 'value',
  date: 'date',
  heartbeat: 'heartbeat',
  deviation: 'deviation',
}
const props = defineProps({
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
  sources: {
    type: Array<String>,
    required: true,
  },
})

const fieldToProp: Ref<Record<string, any>> = computed(() => {
  return {
    [fields.name]: props.feedName,
    [fields.network]: props.networkName,
    [fields.value]: props.lastResultValue,
    [fields.date]: props.lastResultDate,
    [fields.heartbeat]: props.feedTimeToUpdate,
    [fields.deviation]: props.deviation,
  }
})
const description: Ref<LocalizationField> = computed(() => {
  const routedFeedFields = [
    fields.name,
    fields.network,
    fields.value,
    fields.date,
    fields.heartbeat,
  ]
  if (props.isRouted && props.feedTimeToUpdate) {
    return {
      i18nPath: 'data_feed_details.feed_description_routed_cached',
      fields: routedFeedFields,
    }
  } else if (props.isRouted) {
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
})
function formatedLink(url: string) {
  const match = url.match(/(?<=\/\/)[^/]+(?=\/)/)
  return match ? match[0] : url
}
</script>

<style lang="scss" scoped>
.feed-description {
  padding: 16px;
  margin-top: 16px;
}
</style>
