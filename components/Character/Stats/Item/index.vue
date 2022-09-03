<!-- Please remove this file from your project -->
<template>
  <div
    v-if="editMode || statValue !== 1"
    class="CharacterStatsItem"
    :class="{ '--faded': statValue === 1 }"
    @click="toggleDesc"
  >
    <div class="Container">
      <div class="Stat u-text-lighted">
        <div class="Stat-value">{{ statValue }}</div>
        <div class="Stat-name">{{ text.name }}</div>
        <div class="Stat-calculated">{{ calculatedValue }}</div>
      </div>

      <div
        class="Description"
        :class="[{ '--open': showDesc || editMode }]"
        v-html="text.desc"
      ></div>
    </div>

    <footer class="Footer" v-if="editMode">
      <v-btn color="secondary" @click="() => updateValue('decrement')"> - </v-btn>
      <v-btn color="secondary" @click="() => updateValue('increment')"> + </v-btn>
    </footer>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, toRefs } from '@nuxtjs/composition-api';
import useCharacterSheet from '~/composables/stores/useCharacterStore';
import { useEditMode } from '~/composables/useEditMode';
import { Stat } from '~/models/character/types';
import getStatCalculated from '~/models/character/utils/getStatCalculated';
import getStatTxt from '~/models/character/utils/getStatTxt';

export default defineComponent({
  props: {
    statId: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const { statId } = toRefs(props);
    const [character, { updateStat }] = useCharacterSheet.injectors();
     const { editMode } = useEditMode();
    const showDesc = ref(false);
    const statValue = computed(() => character.data?.stats[statId.value]);

    const updateValue = (update: 'increment' | 'decrement') => {
      const value =
        (update === 'increment' && statValue.value + 1) ||
        (update === 'decrement' && statValue.value - 1);

      try {
        updateStat({ stat: statId.value as Stat, value });
      } catch (e) {
        window.alert(e);
      }
    };

    const toggleDesc = () => {
      if (editMode.value) return;
      showDesc.value = !showDesc.value;
    };

    return {
      character,
      showDesc,
      editMode,
      statValue,
      updateValue,
      toggleDesc,
      text: computed(() =>
        getStatTxt({ statId: statId.value, character: character.data, lang: 'es' }),
      ),
      calculatedValue: computed(() =>
        getStatCalculated({ statId: statId.value, character: character.data }),
      ),
    };
  },
});
</script>

<style lang="scss" scoped>
.CharacterStatsItem {
  width: 100%;
  /* padding: 14px 0px 16px; */
  position: relative;
  display: flex;
  flex-direction: column;
  padding-top: 14px;
  padding-bottom: 16px;

  &:after {
    content: '';
    display: block;
    height: 1px;
    width: calc(100% - 24px);
    position: absolute;
    background: transparentize(white, $amount: 0.95);
    bottom: 0;
    right: 0;
  }

  @media (min-width: 600px) {
    &:after {
      display: none;
    }

    padding: 24px;
    border: 1px solid var(--theme-color-bg-medium-light);
    background: var(--theme-color-bg-darkblue-backdrop);
  }

  &:last-child {
    &:after {
      display: none;
    }
  }

  &.--editMode {
    padding: 16px 0px;
    &:after {
      width: calc(100% - 32px);
    }
  }

  &.--faded {
    opacity: 0.65;
    filter: grayscale(1);
  }
}

.Container {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  &.--faded {
    opacity: 0.35;
  }
}

.Stat {
  position: relative;
  display: flex;
  height: 100%;
  /* align-items: center; */
  color: var(--theme-color-text);
  font-size: 16px;
  width: 100%;
  margin-bottom: 8px;

  & > *:not(:last-child) {
    margin-right: 8px;
  }

  &-value {
    flex: 0 0 auto;
    font-weight: bolder;
    color: var(--theme-color-primary);
    font-size: 12px;
    height: 20px;
    width: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    font-weight: bold;
    background: var(--theme-color-bg-medium-light);
  }

  &-name {
    line-height: 1.2;
    font-weight: 900;
    font-size: 18px;
  }

  &-calculated {
    position: relative;
    bottom: 2px;
    flex: 0 0 auto;
    margin-left: auto;
    color: var(--theme-color-accent);
  }
}

@mixin open() {
    opacity: 1;
    height: auto;
    padding-top: 8px;
}

.Description {
  position: relative;
  font-size: 13px;
  line-height: 140%;
  opacity: 0;
  height: 0px;

  &.--open {
    @include open();
    transition: opacity 0.2s linear 0.1s;
  }

  @media (min-width: 600px) {
    @include open();
    font-size: 15px;
    line-height: 1.5;
  }

}

::v-deep .Description strong {
  white-space: nowrap;
  color: var(--theme-color-accent);
}

.Footer {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 16px;
  padding-top: 16px;
  margin-top: auto;

  display: flex;
  justify-content: space-between;

  button {
    width: 56px;
  }

  @media (min-width: 600px) {
    padding-top: 24px;
  }
}

.Button {
  width: 24px;

  &.--increment {
    border-radius: 6px 0 0 6px;
  }
}
</style>
