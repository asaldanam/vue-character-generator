import { ref } from '@nuxtjs/composition-api';

const INITIAL_TIME = 800;

export function useKeepPressing() {
  const keep = ref(true);
  const time = ref(INITIAL_TIME);

  const whilePress = async (e: Event, callback: () => void) => {
    e.preventDefault();
    keep.value = true;
    console.log('PRESSING');
    await sleep();
    callback();

    if (!keep.value) return;
    whilePress(e, callback);
  };

  const release = () => {
    console.log('RELESE');
    keep.value = false;
    time.value = INITIAL_TIME;
  };

  const sleep = async (fixedTime?: number) => {
    if (time.value > 150 && !fixedTime) {
      time.value = time.value * 0.75;
    }

    await new Promise((r) => setTimeout(r, fixedTime || time.value));
  };

  return {
    whilePress,
    release,
  };
}
