<!-- eslint-disable vue/no-v-html -->
<template>
  <div
    v-if="editMode || statValue !== 1"
    class="CharacterStatsItem"
    :class="{
      '--faded': statValue === 1,
      [`--${type}`]: true,
    }"
    @click="toggleDesc"
  >
    <div class="Container">
      <div class="Stat u-text-lighted">
        <div class="Stat-name">
          <span v-if="info.short" class="Stat-short" :style="{ background: info.color }">{{info.short}}</span>
          <span>{{ info.name }}</span>
        </div>
        <div v-if="type === 'skill'" class="Stat-calculated">{{ calculatedValue }}</div>
        <div v-if="editMode || type === 'attribute'" class="Stat-value">{{ statValue }}</div>
      </div>

      <div
        class="Description"
        :class="[{ '--open': showDesc || editMode }]"
        v-html="info.desc"
      ></div>
    </div>

    <footer v-if="editMode" class="Footer">
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
import getStatInfo from '~/models/character/utils/getStatInfo';

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
    const type = computed(() => {
      if (statId.value.startsWith('attr_')) return 'attribute';
      if (statId.value.startsWith('skill_')) return 'skill';
    })

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
      type,
      updateValue,
      toggleDesc,
      info: computed(() =>
        getStatInfo({ statId: statId.value, character: character.data, lang: 'es' }),
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
    width: 100%;
    position: absolute;
    background: transparentize(white, $amount: 0.95);
    bottom: 0;
    right: 0;
  }

  &.--skill {
    @media (min-width: 600px) {
      &:after {
        display: none;
      }

      padding: 24px;
      border: 1px solid var(--theme-color-bg-medium-light);
      background: var(--theme-color-bg-darkblue-backdrop);
    }
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
  /* margin-bottom: 8px; */

  & > *:not(:last-child) {
    margin-right: 8px;
  }

  &-value {
    flex: 0 0 auto;
    font-weight: bolder;
    background: var(--theme-color-primary);
    color: var(--theme-color-bg-medium-light);
    font-size: 12px;
    height: 19px;
    width: 19px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    font-weight: bold;
  }

  &-short {
    text-transform: uppercase;
    color: var(--theme-color-text-inverse);
    padding: 4px 6px;
    border-radius: 99px;
    align-self: center;
    font-size: 11px;
    position: relative;
    bottom: 2px;
    margin-right: 2px;
  }

  &-name {
    line-height: 1.2;
    font-weight: 900;
    font-size: 18px;
    margin-right: auto !important;
  }

  &-calculated {
    position: relative;
    bottom: 2px;
    font-weight: 900;
    flex: 0 0 auto;
    margin-left: auto;
    color: var(--theme-color-accent);
  }
}

@mixin open() {
  opacity: 1;
  height: auto;
  padding-top: 12px;
}

.Description {
  position: relative;
  font-size: 13px;
  line-height: 1.5;
  opacity: 0;
  height: 0px;

  &.--open {
    @include open();
    transition: opacity 0.2s linear 0.1s;
  }

  @media (min-width: 600px) {
    @include open();
    font-size: 15px;
  }

}

::v-deep .Description {
  strong {
    white-space: nowrap;
    /* color: var(--theme-color-accent); */
  }

  .attr {
    align-items: center;
    text-transform: uppercase;
    color: var(--theme-color-text-inverse);
    border-radius: 19px;
    padding: 0 6px;
    display: inline-flex;
    font-size: 11px;
    position: relative;
    bottom: 0.5px;
  }
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
