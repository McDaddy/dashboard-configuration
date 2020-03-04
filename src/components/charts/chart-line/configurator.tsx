/**
 * 2D 线形图：折线、柱状、曲线
 */
import { merge, map, get } from 'lodash';
import { Form } from 'antd';
import React from 'react';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import { connect } from 'dva';
// import { convertSettingToOption } from '../utils';
import { mockDataLine } from './utils';
import { RenderPureForm } from '../../common';
import { collectFields } from '../../common/utils';
import { getDefaultOption } from './option';

type IType = 'line' | 'bar' | 'area';

interface IData {
  type?: IType
  data: number[]
  smooth?: boolean
  areaStyle?: object // 基本面积图时，传入空的{}即可
}

// tslint:disable-next-line: no-use-before-declare
interface IProps extends ReturnType<typeof mapStateToProps>, ReturnType<typeof mapDispatchToProps> {
  viewId: string;
  isMock: boolean;
  defaultOption: object;
  currentChart: IChart;
  form: WrappedFormUtils;
  forwardedRef: { current: any };
}

const LineConfigurator = (props: IProps) => {
  const { form, forwardedRef, currentChart, setTouched, isTouched } = props;
  React.useEffect(() => {
    forwardedRef.current = form;
    if (!isTouched && form.isFieldsTouched()) {
      setTouched(true);
    }
  }, [form]);

  React.useEffect(() => {
    setTimeout(() => {
      // const defaultOption = getDefaultOption();
      form.setFieldsValue(currentChart);
    }, 0);
  }, [currentChart]);

  const fields = [
    {
      label: '标题',
      name: 'title',
      type: 'input',
      size: 'small',
    },
    {
      label: '描述',
      name: 'description',
      type: 'textArea',
      size: 'small',
    },
    {
      label: '指示参数',
      subList: [
        [
          {
            label: 'trigger',
            tooltip: '触发类型',
            name: 'config.option.tooltip.trigger',
            type: 'select',
            options: ['item', 'axis', 'none'].map(d => ({ name: d, value: d })),
            itemProps: {
              span: 3,
            },
            size: 'small',
          },
          {
            label: 'transitionDuration',
            tooltip: '提示框浮层的移动动画过渡时间，单位是 s，设置为 0 的时候会紧跟着鼠标移动。',
            name: 'config.option.tooltip.transitionDuration',
            type: 'inputNumber',
            itemProps: {
              span: 5,
            },
            size: 'small',
          },
          {
            label: 'confine',
            tooltip: '是否将 tooltip 框限制在图表的区域内。',
            name: 'config.option.tooltip.confine',
            type: 'select',
            options: [{ name: 'true', value: true }, { name: 'false', value: false }],
            itemProps: {
              span: 4,
            },
            size: 'small',
          },
        ],
      ],
    },
    {
      label: '图例参数',
      subList: [
        [
          {
            label: 'bottom',
            name: 'config.option.legend.bottom',
            tooltip: '图例组件离容器下侧的距离。',
            type: 'inputNumber',
            itemProps: {
              span: 4,
            },
            size: 'small',
          },
          {
            label: 'orient',
            name: 'config.option.legend.orient',
            tooltip: '图例列表的布局朝向。',
            type: 'select',
            options: ['horizontal', 'vertical'].map(d => ({ name: d, value: d })),
            itemProps: {
              span: 4,
            },
            size: 'small',
          },
          {
            label: 'align',
            name: 'config.option.legend.align',
            type: 'select',
            options: ['auto', 'left', 'right'].map(d => ({ name: d, value: d })),
            tooltip: '图例标记和文本的对齐。默认自动，根据组件的位置和 orient 决定，当组件的 left 值为 \'right\' 以及纵向布局（orient 为 \'vertical\'）的时候为右对齐，及为 \'right\'。',
            itemProps: {
              span: 4,
            },
            size: 'small',
          },
          {
            label: 'type',
            name: 'config.option.legend.type',
            type: 'select',
            options: ['plain', 'scroll'].map(d => ({ name: d, value: d })),
            tooltip: '图例的类型',
            itemProps: {
              span: 4,
            },
            size: 'small',
          },
        ],
      ],
    },
  ];

  return (
    <section className="configurator-section">
      <RenderPureForm
        list={fields}
        form={form}
      />
    </section>
  );
};

const mapStateToProps = ({ chartEditor: { viewMap, editChartId, isTouched } }: any) => ({
  currentChart: get(viewMap, [editChartId]),
  isTouched,
});

const mapDispatchToProps = (dispatch: any) => ({
  setTouched(isTouched: any) {
    dispatch({ type: 'chartEditor/setTouched', payload: isTouched });
  },
});

const Configurator = connect(mapStateToProps, mapDispatchToProps)(Form.create()(LineConfigurator));

export default React.forwardRef((props, ref) => (
  <Configurator forwardedRef={ref} {...props} />
));
