export type IconName = 'search' | 'arrow' | 'close' | 'info';

export const icons: Record<IconName, string> = {
  search: 'M10 18a8 8 0 100-16 8 8 0 000 16zM21 21l-4.35-4.35',
  arrow: 'M5 12h14M12 5l7 7-7 7',
  close: 'M6 18L18 6M6 6l12 12',
  info: 'M12 10v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
};
