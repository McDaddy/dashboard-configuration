import { cutStr } from './components/common/utils';

export const NEW_CHART_VIEW_MAP = {
  name: 'Chart Name',
  chartType: 'chart:line',
  hideHeader: true,
  hideReload: true,
  title: 'Chart Title',
  description: 'Some descriptions for your chart',
  dataConvertor: 'line',
  controls: ['input', 'input2'],
  config: {
    option: {
      tooltip: {
        trigger: 'axis',
        transitionDuration: 0,
        confine: true,
        axisPointer: {
          type: 'none',
        },
      },
      legend: {
        bottom: 0,
        padding: [15, 5, 0, 5],
        orient: 'horizontal',
        align: 'left',
        type: 'scroll',
        tooltip: {
          show: true,
          formatter: (t: any) => cutStr(t.name, 100),
        },
      },
      textStyle: {
        fontFamily: 'arial',
      },
      yAxis: [
        {
          type: 'value',
          name: 'Y-Axis: Left',
          min: 0,
          max: 1,
          interval: 0.1,
          axisLabel: {
            formatter: '{value} unit',
          },
        },
      ],
    },
  },
  staticData: {
    xData: [
      '13:39',
      '13:40',
      '13:41',
      '13:42',
      '13:43',
      '13:44',
      '13:45',
      '13:46',
      '13:47',
      '13:48',
      '13:49',
      '13:50',
      '13:51',
      '13:52',
      '13:53',
      '13:54',
      '13:55',
      '13:56',
      '13:57',
      '13:58',
      '13:59',
      '14:00',
      '14:01',
      '14:02',
      '14:03',
      '14:04',
      '14:05',
      '14:06',
      '14:07',
      '14:08',
      '14:09',
      '14:10',
      '14:11',
      '14:12',
      '14:13',
      '14:14',
      '14:15',
      '14:16',
      '14:17',
      '14:18',
      '14:19',
      '14:20',
      '14:21',
      '14:22',
      '14:23',
      '14:24',
      '14:25',
      '14:26',
      '14:27',
      '14:28',
      '14:29',
      '14:30',
      '14:31',
      '14:32',
      '14:33',
      '14:34',
      '14:35',
      '14:36',
      '14:37',
      '14:38',
    ],
    metricData: [
      {
        name: 'plotA',
        type: 'line',
        data: [
          '0.03',
          '0.03',
          '0.03',
          '0.03',
          '0.03',
          '0.03',
          '0.03',
          '0.03',
          '0.03',
          '0.03',
          '0.03',
          '0.03',
          '0.03',
          '0.03',
          '0.03',
          '0.03',
          '0.03',
          '0.03',
          '0.03',
          '0.03',
          '0.03',
          '0.03',
          '0.03',
          '0.03',
          '0.03',
          '0.03',
          '0.03',
          '0.03',
          '0.03',
          '0.03',
          '0.03',
          '0.03',
          '0.03',
          '0.03',
          '0.03',
          '0.03',
          '0.03',
          '0.03',
          '0.03',
          '0.03',
          '0.03',
          '0.03',
          '0.03',
          '0.03',
          '0.03',
          '0.03',
          '0.03',
          '0.03',
          '0.03',
          '0.03',
          '0.03',
          '0.43',
          '0.53',
          '0.33',
          '0.33',
          '0.40',
          '0.43',
          '0.45',
          '0.49',
          '0.53',
        ],
      },
      {
        name: 'plotB',
        type: 'bar',
        data: [
          '0.08',
          '0.08',
          '0.08',
          '0.18',
          '0.18',
          '0.17',
          '0.18',
          '0.18',
          '0.18',
          '0.38',
          '0.38',
          '0.38',
          '0.38',
          '0.38',
          '0.38',
          '0.38',
          '0.38',
          '0.38',
          '0.38',
          '0.38',
          '0.38',
          '0.38',
          '0.38',
          '0.58',
          '0.58',
          '0.58',
          '0.58',
          '0.58',
          '0.58',
          '0.58',
          '0.58',
          '0.58',
          '0.58',
          '0.58',
          '0.58',
          '0.58',
          '0.58',
          '0.78',
          '0.78',
          '0.78',
          '0.78',
          '0.78',
          '0.78',
          '0.78',
          '0.78',
          '0.78',
          '0.78',
          '0.78',
          '0.78',
          '0.78',
          '0.77',
          '0.78',
          '0.78',
          '0.78',
          '0.78',
          '0.78',
          '0.78',
          '0.78',
          '0.78',
          '0.78',
        ],
      },
    ],
  },
};