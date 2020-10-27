// 初始化数据默认 mock 一份，或根据结构随机生成一份
export const NEW_CHART_VIEW_MAP = {
  'chart:line': {
    chartType: 'chart:line',
    title: 'line chart',
    description: '',
    hideHeader: true,
    hideReload: true,
    dataSourceType: 'api',
    api: {},
  },
  'chart:area': {
    chartType: 'chart:area',
    title: 'area chart',
    description: '',
    hideHeader: true,
    hideReload: true,
    dataSourceType: 'api',
    api: {},
  },
  'chart:bar': {
    chartType: 'chart:bar',
    title: 'bar chart',
    description: '',
    hideHeader: true,
    hideReload: true,
    dataSourceType: 'api',
    api: {},
  },
  'chart:pie': {
    chartType: 'chart:pie',
    title: 'pie chart',
    description: '',
    hideHeader: true,
    hideReload: true,
    dataSourceType: 'api',
    api: {},
  },
  'chart:map': {
    chartType: 'chart:map',
    title: 'map111',
    description: '',
    hideHeader: true,
    hideReload: true,
    dataSourceType: 'api',
    api: {},
    staticData: {
      metricData: [],
    },
  },
  'chart:scatter': {
    chartType: 'chart:scatter',
    title: 'scatter chart',
    description: '',
    hideHeader: true,
    hideReload: true,
    dataSourceType: 'api',
    api: {},
  },
  table: {
    chartType: 'table',
    title: 'table chart',
    description: '',
    dataSourceType: 'api',
    api: {},
    config: {
      optionProps: {
        isMoreThanOneDay: true,
        moreThanOneDayFormat: 'M/D',
      },
    },
  },
  card: {
    title: 'card chart',
    description: '',
    chartType: 'card',
    dataSourceType: 'api',
    config: {},
    api: {},
  },
};

export const TEXT_ZH_MAP = {
  add: '新增',
  save: '保存',
  cancel: '取消',
  edit: '编辑',
  delete: '删除',
  ok: '确认',
  move: '移动',
  'exit fullscreen': '退出全屏',
  fullscreen: '全屏',
  export: '导出',
  'confirm to delete': '确认删除',
  'parameter configuration': '参数配置',
  'datasource configuration': '数据源配置',
  'controls configuration': '控件配置',
  controls: '控件',
  'field name': '字段名',
  select: '选择框',
  'control data': '控件数据',
  value: '值',
  name: '名称',
  action: '操作',
  'confirm to drop data': '确认丢弃数据',
  title: '标题',
  description: '描述',
  'select chart type': '选择图表类型',
  label: '标签',
  line: '线形图',
  area: '面积图',
  bar: '柱状图',
  pie: '饼图',
  table: '表格',
  metric: '指标',
  'failed to get data': '数据获取失败',
  loading: '加载中',
  'show mock data': '模拟数据展示',
  'no chart data': '页面为空,没有图表数据',
  'exporting picture': '正在导出图片...',
};

export const TEXT_EN_MAP = {
  add: 'add',
  save: 'save',
  cancel: 'cancel',
  edit: 'edit',
  delete: 'delete',
  ok: 'ok',
  move: 'move',
  'exit fullscreen': 'exit fullscreen',
  fullscreen: 'fullscreen',
  export: 'export',
  'confirm to delete': 'confirm to delete',
  'parameter configuration': 'parameter configuration',
  'datasource configuration': 'datasource configuration',
  'controls configuration': 'controls configuration',
  controls: 'controls',
  'field name': 'field name',
  select: 'select',
  'control data': 'control data',
  value: 'value',
  name: 'name',
  action: 'action',
  'confirm to drop data': 'confirm to drop data',
  title: 'title',
  description: 'description',
  'select chart type': 'select chart type',
  label: 'label',
  line: 'line',
  area: 'area',
  bar: 'bar',
  pie: 'pie',
  table: 'table',
  metric: 'metric',
  'failed to get data': 'failed to get data',
  loading: 'loading',
  'show mock data': 'show mock data',
  'no chart data': 'no chart data',
  'exporting picture': 'exporting picture...',
};
