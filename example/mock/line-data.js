import * as React from 'react';
import { DatePicker } from 'antd';
import './index.scss';

const staticData = {
  xData: [
    '13:39sasasasasas',
    '13:40fdfdfdfdfdf',
    '13:41fdfdsdsdsdsdsdsd',
    '13:42dfdfdfdf',
    '13:4fdfdfd3',
    '13:44fdfdfdfdfdfd',
  ],
  metricData: [
    {
      name: 'tset1',
      // type: 'bar',
      data: [
        '0.03',
        '0.03',
        '0.03',
        '0.03',
        '0.03',
        '0.03',
      ],
    },
    {
      name: 'tset2',
      // type: 'bar',
      data: [
        '0.78',
        '0.78',
        '0.78',
        '0.78',
        '0.78',
        '0.77',
      ],
    }, {
      name: 'tset3',
      // type: 'bar',
      data: [
        '0.03',
        '0.03',
        '0.03',
        '0.03',
        '0.03',
        '0.03',
      ],
    },
  ],
};

export default [
  {
    w: 9,
    h: 9,
    x: 8,
    y: 4,
    i: 'view-1',
    moved: false,
    static: false,
    view: {
      name: 'test',
      chartType: 'chart:line',
      title: () => (
        <div className="chart-title flex-box full-width">
          <DatePicker />
          <div>stttt</div>
        </div>
      ),
      // description: '这里配置图表的一些描述',
      // loadData() {
      //   return new Promise((resolve) => {
      //     setTimeout(() => {
      //       resolve(staticData);
      //     }, 1000);
      //   });
      // },
      staticData,
      // dataConvertor: 'line',
      config: {
        option: {
          tooltip: {
            // transitionDuration: 5,
          },
          legend: {
            bottom: 0,
            align: 'left',
          },
          yAxis: [
            {
              type: 'value',
              name: '水量',
              min: 0,
              max: 1,
              interval: 0.1,
              axisLabel: {
                formatter: '{value} ml',
              },
            },
            {
              type: 'value',
              name: '温度',
              min: 0,
              max: 2,
              interval: 0.2,
              axisLabel: {
                formatter: '{value} °C',
              },
            },
          ],
          xAxis: [{
            axisLabel: {
              interval: 0,
              rotate: 45,
            },
          }],
        },
      },
    },
  },
  {
    w: 9,
    h: 9,
    x: 8,
    y: 14,
    i: 'view-3',
    moved: false,
    static: false,
    view: {
      name: 'test',
      chartType: 'table',
      title: '表格图',
      description: 'sasasa',
      staticData: {
        metricData: [
          { id: 1, modelType: 'ods', score: 1 },
        ],
        cols: [
          { title: '模型名称', dataIndex: 'modelType' },
          { title: '质量分', dataIndex: 'score' },
        ],
      },
    },
  },
  {
    w: 9,
    h: 4,
    x: 8,
    y: 0,
    i: 'view-2',
    moved: false,
    static: false,
    view: {
      name: 'test',
      chartType: 'card',
      hideHeader: true,
      hideReload: true,
      // title: '卡片图',
      // customRender: chartNode => (
      //   <div>
      //     <span>查看详情</span>
      //     {chartNode}
      //   </div>
      // ),
      staticData: {
        metricData: [
          { name: '数据1', value: 820, unit: 'MB', status: 'rise', color: 'error' },
          { name: '数据2', value: 932, color: 'warning' },
          { name: '数据3', value: 24, unit: 'KB', status: 'fall', color: 'cancel' },
        ],
        proportion: [[1, 1, 1, 1], [1, 1]],
      },
    },
  },
];
