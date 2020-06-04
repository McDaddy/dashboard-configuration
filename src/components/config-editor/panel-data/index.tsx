import React from 'react';
import { get, map } from 'lodash';
import { FormComponentProps } from 'antd/lib/form';
import { pretty } from 'js-object-pretty-print';
import './index.scss';

type IProps = FormComponentProps & ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

class PanelData extends React.Component<IProps> {
  static contextTypes = {
    chartConfigMap: {},
  };

  render() {
    const { chartType, chooseChartType, form } = this.props;
    const { name, mockData, dataSettings } = get(this.context.chartConfigMap, [chartType], {});
    return (
      <React.Fragment>
        {chartType && (
          <a
            className="bi-demo-text"
            download={`mock-${chartType}.json`}
            href={`data:text/json;charset=utf-8,${pretty(mockData, 4, 'JSON', true)}`}
          >{`${name}数据示例下载`}
          </a>
        )}
        {map(dataSettings, (Setting, i) => <Setting form={form} key={i} />)}
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ chartEditor: { viewMap, editChartId } }: any) => ({
  chartType: get(viewMap, [editChartId, 'chartType'], ''),
});

const mapDispatchToProps = (dispatch: any) => ({
  chooseChartType() {
    dispatch({ type: 'chartEditor/chooseChartType' });
  },
});
