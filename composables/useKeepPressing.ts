import { ref } from '@nuxtjs/composition-api';

const INITIAL_TIME = 500;

export function useKeepPressing() {
  const started = ref(false);
  const keep = ref(true);
  const time = ref(INITIAL_TIME);

  const whilePress = async (e: Event, callback: () => void) => {
    e.preventDefault();
    if (!started.value) {
      // First fired (simulates click event)
      callback();
      console.log('START PRESSING');
      started.value = true;
      keep.value = true;
      await sleep(1000);

      // if cancelled, exits
      if (!keep.value) return;
    }

    console.log('PRESSING');
    keep.value = true;
    await sleep();
    callback();

    // if cancelled, exits
    if (!keep.value) return;

    // Fires event again
    whilePress(e, callback);
  };

  const cancelTouch = () => {
    console.log('CANCEL');
    keep.value = false;
    started.value = false;
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
    cancelTouch,
  };
}
