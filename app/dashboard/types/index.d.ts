type Func = (...args: any[]) => any;

interface EventMap {
  [key: string]: Func,
}

interface ObjectMap {
  [key: string]: any,
}

interface OptsMap {
  devicePixelRatio?: number,
  renderer?: 'canvas' | 'svg',
  width?: number | null | undefined | 'auto',
  height?: number | null | undefined | 'auto',
}

export interface ReactEchartsPropsTypes {
  option?: ObjectMap;
  notMerge?: boolean;
  lazyUpdate?: boolean;
  style?: ObjectMap;
  className?: string;
  theme?: string | null;
  onChartReady?: Func;
  showLoading?: boolean;
  loadingOption?: ObjectMap;
  onEvents?: EventMap;
  echarts?: object;
  opts?: OptsMap;
  shouldSetOption?: Func;
}

export interface ISizeMe {
  size: { width: number, height: number }
}