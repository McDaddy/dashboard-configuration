import React from 'react';
import { get } from 'lodash';
import { connect } from 'dva';
import { DatePicker } from 'antd';
import { panelControlPrefix } from '../../../utils/constants';

const { RangePicker } = DatePicker;

interface IProps extends ReturnType<typeof mapStateToProps>, ReturnType<typeof mapDispatchToProps> {
  onChange: (query: any) => void
  style?: React.CSSProperties
}

class SelectDateRange extends React.PureComponent<IProps> {
  onChange = (selectDateRange: any[]) => {
    const [start, end] = selectDateRange;
    const { onChange, searchName } = this.props;
    if (!onChange) return;
    onChange({ [searchName]: [start.format('YYYY-MM-DD'), end.format('YYYY-MM-DD')] });
  }

  render() {
    const { width, style } = this.props;
    return (
      <RangePicker style={{ ...style, width }}
        format="YYYY-MM-DD"
        placeholder={['开始时间', '结束时间']}
        onChange={this.onChange}
        allowClear={false}
      />
    );
  }
}

const mapStateToProps = ({ chartEditor: { viewMap } }: any, { viewId }: any) => ({
  width: `${get(viewMap, [viewId, `${panelControlPrefix}width`], 120)}px`,
  searchName: get(viewMap, [viewId, `${panelControlPrefix}searchName`], ''),
});

const mapDispatchToProps = (dispatch: any) => ({
  onChoose(controlType: string) {
    dispatch({ type: 'chartEditor/chooseControl', controlType });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectDateRange);
