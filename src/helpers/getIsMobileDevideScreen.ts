export const getIsMobileDeviceScreen = () => {
  return window.matchMedia('(max-width: 767px)').matches;
};
