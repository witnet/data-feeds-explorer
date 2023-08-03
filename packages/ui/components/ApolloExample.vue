<template>
  <div>{{networks}}</div>
</template>

<script setup>
import { gql } from "@apollo/client/core"
import { useQuery } from '@vue/apollo-composable'
const networksQuery = gql`
  query networks {
    networks {
      label,
      key,
      chain,
      logo
    }
  }`
const { loading, result } = useQuery(networksQuery)   
const networks = computed(() => {
  console.log(result);
  return result
}) 
</script>