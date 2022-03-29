<template>
  <div class="integrations-card-container">
    <PartnersCard
      v-for="integration in integrations"
      :key="integration.title"
      :name="integration.name"
      :link="integration.link"
      :title="integration.title"
      :src="integration.src"
      :brightness="integration.brightness"
      :scale="integration.scale"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      integrations: [
        {
          title: 'Boba Network',
          name: 'partner_boba',
          link: 'https://boba.network',
          scale: 0.8,
          brightness: 0.3,
        },
        {
          title: 'Aragon',
          name: 'partner_aragon',
          link: 'https://aragon.org/',
          brightness: 0.4,
        },
        {
          title: 'Conflux Network',
          name: 'partner_conflux',
          link: 'https://confluxnetwork.org/',
          scale: 1.2,
        },
        {
          title: 'TriAngle DAO',
          name: 'partner_triangle',
          link: 'https://www.triangledao.finance/',
          brightness: 0.7,
        },
        {
          title: 'Agora Space',
          name: 'partner_agora',
          link: 'https://agora.space/',
          scale: 0.7,
          brightness: 1.4,
        },
        {
          title: 'Gate.io',
          name: 'partner_gate',
          link: 'https://gate.io/',
          scale: 0.8,
          brightness: 0.4,
        },
        {
          title: 'Metis',
          name: 'partner_metis',
          link: 'https://metis.io/',
          scale: 0.8,
          brightness: 0.3,
        },
        {
          title: 'Celo',
          name: 'partner_celo',
          link: 'https://celo.org/',
          scale: 0.7,
          brightness: 0.5,
        },
        {
          title: 'KuCoin Community Chain',
          name: 'partner_kcc',
          link: 'https://kcc.io/',
          scale: 0.75,
          brightness: 0.3,
        },
        {
          title: 'Harmony',
          name: 'partner_harmony',
          link: 'https://harmony.one/',
          scale: 0.8,
          brightness: 0.3,
        },
        {
          title: 'Polygon',
          name: 'partner_polygon',
          link: 'https://polygon.technology/',
          scale: 0.8,
        },
        {
          title: 'RiveX',
          name: 'partner_rivex',
          link: 'https://rivex.io/',
          scale: 0.8,
          brightness: 0.5,
        },
        {
          title: 'MojitoSwap',
          name: 'partner_mojitoswap',
          link: 'https://www.mojitoswap.finance/',
          scale: 1,
          brightness: 0.5,
        },
      ]
        // This sorting algorithm is far for perfect (somehow biased), but it simply does the job here
        .sort(() => 0.5 - Math.random())
        // Limit the number of integrations shown, so they don't take too much space once we have dozens of them
        // TODO: raise limit to 16 or 20
        .slice(0, 12),
    }
  },
}
</script>

<style lang="scss" scoped>
.integrations-card-container {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  justify-content: center;
  row-gap: 30px;
  column-gap: 40px;
  justify-items: center;
  align-items: center;
}

@media (max-width: 1200px) {
  .integrations-card-container {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 790px) {
  .integrations-card-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 25px;
    justify-items: center;
  }
}

@media (max-width: 494px) {
  .integrations-card-container {
    grid-template-columns: 1fr;

    /* In the 1-column version, show only 10 logos */
    a:nth-of-type(n + 10) ~ a {
      display: none;
    }
  }
}
</style>
