<!-- Please remove this file from your project -->
<template>
  <div class="root" @click="toggleDesc">
    <div class="background">
      <img src="~/assets/img/character-stat-bg.png" />
    </div>

    <div class="stat">
      <div class="stat-value">{{ statValue }}</div>
      <div class="stat-name">{{ text.name }}</div>
      <div class="stat-calculated">{{ calculatedValue }}</div>
    </div>

    <div
      class="description"
      :class="[{ '--active': showDesc || editMode }]"
      v-html="text.desc"
    ></div>

    <div v-if="editMode" class="slider-container">
      <v-slider v-model="statValue" min="1" max="15" ticks="always"></v-slider>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, toRefs, useRouter, watch } from '@nuxtjs/composition-api';
import useCharacterSheet from '~/composables/stores/useCharacterStore';
import { Stat } from '~/models/character/types';
import getStatCalculated from '~/models/character/utils/getStatCalculated';
import getStatTxt from '~/models/character/utils/getStatTxt';

export default defineComponent({
  props: {
    statId: {
      type: String,
      required: true,
    },
    editMode: {
      type: Boolean,
    },
  },
  setup(props) {
    const { statId, editMode } = toRefs(props);
    const router = useRouter();
    const [character, { updateStat, getDataAsBase64 }] = useCharacterSheet.injectors();

    const showDesc = ref(false);
    const statValue = ref(1);

    watch(character, () => {
      const newVal = character.data?.stats[statId.value];
      if (newVal === statValue.value) return;
      console.log({ stat: statValue.value, newVal });
      statValue.value = character.data?.stats[statId.value];
    });

    watch([statId, statValue], () => {
      const payload = { stat: statId.value as Stat, value: statValue.value };
      console.log(payload);
      updateStat(payload);

      /** TODO: Aquí en realidad debería habilitar el botón de guardar, y el guardado debería hacerse a través del botón */
      const characterAsBase64 = getDataAsBase64();
      router.push({
        query: {
          name: character.data?.info.name,
          character: characterAsBase64,
        },
      });
    });

    return {
      showDesc,
      statValue,
      text: computed(() =>
        getStatTxt({ statId: statId.value, character: character.data, lang: 'es' }),
      ),
      calculatedValue: computed(() =>
        getStatCalculated({ statId: statId.value, character: character.data }),
      ),
      toggleDesc: () => {
        if (editMode.value) return;
        showDesc.value = !showDesc.value;
      },
    };
  },
});
</script>

<style lang="scss" scoped>
.root {
  position: relative;
  padding: 0.8rem 1rem 0.8rem 0;
  min-height: 56px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* margin-bottom: 0.75rem; */
}

.background {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  overflow: hidden;
  img {
    position: absolute;
    bottom: 0;
    left: 0;
    transform: scaleY(-1);
    height: 56px;
    width: 600px;
  }
}

.stat {
  position: relative;
  display: flex;
  height: 100%;
  align-items: center;
  font-size: 1.25rem;
  color: var(--theme-color-text);

  &-value {
    width: 3rem;
    text-align: center;
    color: var(--theme-color-primary);
  }

  &-name {
    padding-left: 0.5rem;
  }

  &-calculated {
    margin-left: auto;
  }
}

.description {
  position: relative;
  padding-left: 3.5rem;
  font-size: 0.875rem;
  padding-bottom: 0.25rem;
  line-height: 130%;
  color: #828282;
  opacity: 0;
  height: 0px;

  &.--active {
    opacity: 1;
    height: auto;
    transition: opacity 0.2s linear 0.1s;
  }
}

.slider-container {
  position: absolute;
  left: 0;
  bottom: -2.25rem;
  width: 100%;
  overflow-x: hidden;
  padding: 1rem 1rem 0;
  /* padding: 0 32px; */
}
</style>
