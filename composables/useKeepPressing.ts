import { ref } from '@nuxtjs/composition-api';

const INITIAL_TIME = 800;

export function useKeepPressing() {
  const keep = ref(true);
  const time = ref(INITIAL_TIME);

  const whilePress = async (callback: () => void) => {
    console.log('PRESSING');
    keep.value = true;
    callback();
    await sleep();

    if (!keep.value) return;
    whilePress(callback);
  };

  const relese = () => {
    console.log('RELESE');
    keep.value = false;
    time.value = INITIAL_TIME;
  };

  const sleep = async () => {
    if (time.value > 150) time.value = time.value * 0.75;
    await new Promise((r) => setTimeout(r, time.value));
  };

  return {
    whilePress,
    relese,
  };
}
