export const fadeIn = (delay = 0, duration = 0.5) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { delay, duration, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
});

export const slideUp = (delay = 0, duration = 0.5) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { delay, duration, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
});
