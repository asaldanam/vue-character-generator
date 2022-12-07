<template>
  <main>
    <h1 style="margin: 1rem 0">Reglas del sistema</h1>
    <section>
      <h2>Estadísticas</h2>
      <table>
        <thead>
          <tr>
            <td>Atributo</td>
            <td>Descripción</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="([stat, config]) in stats" :key="stat">
            <td>{{ config.txt.es.name }}</td>
            <td v-html="config.txt.es.desc"></td>
          </tr>
        </tbody>
      </table>
    </section>
  </main>
</template>
<script>
import { defineComponent } from '@vue/composition-api'
import { CHARACTER_STATS_CONFIG } from '~/core/Character/domain/Stats/statsConfig'

export default defineComponent({
  setup() {
    return {
      stats: Object.entries(CHARACTER_STATS_CONFIG.getStats())
    }
  },
})
</script>
<style lang="scss" scoped>
main {
  max-width: 720px;
  margin: 0 auto;
}

table {
}

td {
  padding: 16px 8px;
  border-bottom: 1px solid white;
}

strong {
  white-space: nowrap;
}
</style>
