<!-- Please remove this file from your project -->
<template>
  <div class="root" @click="toggleDesc">
    <div class="background">
      <img src="~/assets/img/character-stat-bg.png" />
    </div>

    <div class="stat">
      <div class="stat-value">{{ statValue }}</div>
      <div class="stat-name">{{ text.name }}</div>
      <div class="stat-calculated">100%</div>
    </div>

    <div
      class="description"
      :class="[{ '--active': showDesc || editMode }]"
      v-html="text.desc"
    ></div>

    <div v-if="editMode" class="slider-container">
      <v-slider v-model="statValue" min="0" max="15" ticks="always"></v-slider>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, toRefs, watch } from '@nuxtjs/composition-api';
import { CHARACTER_LITERALS } from '~/models/character/literals';
import useAccessor from '~/composables/useAccessor';
import { getStatTxt } from '~/models/character/utils';
import { Stat } from '~/models/character/types';

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
    const store = useAccessor();
    const character = computed(() => store.characters.detail.state.data);
    const literals = CHARACTER_LITERALS.es;

    const showDesc = ref(false);
    const statValue = ref(0);

    watch([statId, character], () => {
      statValue.value = character.value?.stats[statId.value];
    });

    watch([statId, statValue], () => {
      // Meter devounce a esto
      store.characters.detail.setStatValue({ stat: statId.value as Stat, value: statValue.value });
    });

    return {
      showDesc,
      statValue,
      text: computed(() =>
        getStatTxt({ statId: statId.value, character: character.value, lang: 'es' }),
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
