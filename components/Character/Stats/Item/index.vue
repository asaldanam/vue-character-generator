<!-- Please remove this file from your project -->
<template>
  <div
    class="CharacterStatsItem"
    :class="{ '--faded': !editMode && statValue === 1, '--editMode': editMode }"
    @click="toggleDesc"
  >
    <SideButton v-if="editMode" :variant="'decrement'" @click="decrement" />
    <div class="Container">
      <div class="Stat u-text-lighted">
        <div class="Stat-value u-text-alt">{{ statValue }}</div>
        <div class="Stat-name">{{ text.name }}</div>
        <div class="Stat-calculated u-text-alt u-text-lighted-alt">{{ calculatedValue }}</div>
      </div>

      <div
        class="Description"
        :class="[{ '--active': showDesc || editMode }]"
        v-html="text.desc"
      ></div>
    </div>
    <SideButton v-if="editMode" :variant="'increment'" @click="increment" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, toRefs } from '@nuxtjs/composition-api';
import useCharacterSheet from '~/composables/stores/useCharacterStore';
import { Stat } from '~/models/character/types';
import getStatCalculated from '~/models/character/utils/getStatCalculated';
import getStatTxt from '~/models/character/utils/getStatTxt';
import SideButton from '~/components/Ui/SideButton.vue';

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
    const showDesc = ref(false);
    const statValue = computed(() => character.data?.stats[statId.value]);

    const increment = () => {
      updateStat({ stat: statId.value as Stat, value: statValue.value + 1 });
    };

    const decrement = () => {
      updateStat({ stat: statId.value as Stat, value: statValue.value - 1 });
    };

    const toggleDesc = () => {
      if (character.editMode) return;
      showDesc.value = !showDesc.value;
    };

    return {
      character,
      showDesc,
      editMode: computed(() => character.editMode),
      statValue,
      increment,
      decrement,
      toggleDesc,
      text: computed(() =>
        getStatTxt({ statId: statId.value, character: character.data, lang: 'es' }),
      ),
      calculatedValue: computed(() =>
        getStatCalculated({ statId: statId.value, character: character.data }),
      ),
    };
  },
  components: { SideButton },
});
</script>

<style lang="scss" scoped>
.CharacterStatsItem {
  display: flex;
  width: 100%;
  padding: 12px 12px;
  position: relative;

  &:after {
    content: '';
    display: block;
    height: 1px;
    width: calc(100% - 24px);
    position: absolute;
    background: transparentize(white, $amount: 0.85);
    bottom: 0;
    right: 0;
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
}

.Container {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0px 12px;

  &.--faded {
    opacity: 0.35;
  }
}

.Stat {
  position: relative;
  display: flex;
  height: 100%;
  align-items: center;
  color: var(--theme-color-text);
  font-size: 16px;
  width: 100%;

  & > *:not(:last-child) {
    margin-right: 8px;
  }

  &-value {
    font-size: 20px;
  }

  &-name {
    position: relative;
    top: 1px;
  }

  &-calculated {
    margin-left: auto;
    font-size: 14px;
  }
}

.Description {
  position: relative;
  font-size: 13px;
  padding-top: 4px;
  line-height: 140%;
  opacity: 0;
  height: 0px;

  &.--active {
    opacity: 1;
    height: auto;
    transition: opacity 0.2s linear 0.1s;
  }
}

.Button {
  width: 24px;

  &.--increment {
    border-radius: 6px 0 0 6px;
  }
}
</style>
