export default function useBodyLock() {
  const htmlTag = document.querySelector('html');

  const lockBody = () => {
    if (!htmlTag) return;
    htmlTag.style.overflow = 'hidden';
  }

  const unlockBody = () => {
    const htmlTag = document.querySelector('html');
    if (!htmlTag) return;

    htmlTag.style.overflow = '';
  }

  return {
    lockBody,
    unlockBody
  }
}
