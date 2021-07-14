export default function ({ $config }) {
  return {
    httpEndpoint: $config.baseUrl,
  }
}
