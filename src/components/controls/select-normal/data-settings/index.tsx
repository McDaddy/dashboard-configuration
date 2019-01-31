import React from 'react';
import { connect } from 'dva';
import { Form, Input, Checkbox } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import PropTypes from 'prop-types';
import { formItemLayout, panelControlPrefix } from '../../../utils';
import { checkFixedData } from '../utils';

const { TextArea } = Input;

type IProps = FormComponentProps & ReturnType<typeof mapStateToProps>;

class DataSettings extends React.PureComponent<IProps> {
  static contextTypes = {
    UrlComponent: PropTypes.func,
    urlItemLayout: PropTypes.object,
  };

  validateFixedData = (rule: any, value: string, callback: Function) => {
    if (checkFixedData(value)) {
      callback();
    }
    callback('请输入合法的数据格式，示例 [{"name": "lucy", "value": 1}]');
  }

  render() {
    const { UrlComponent, urlItemLayout } = this.context;
    const { editChartId, form: { getFieldDecorator } } = this.props;
    return (
      <React.Fragment>
        <Form.Item label="控件接口" {...urlItemLayout}>
          {getFieldDecorator(`${panelControlPrefix}url`, {
            rules: [{
              message: '请输入控件接口',
            }],
          })(<UrlComponent placeholder="请输入控件接口，用于动态获取控件数据" chartid={editChartId} />)}
        </Form.Item>
        <Form.Item label="固定数据" {...formItemLayout}>
          {getFieldDecorator(`${panelControlPrefix}fixedData`, {
            rules: [{
              message: '请输入固定数据',
            }, {
              validator: this.validateFixedData,
            }],
          })(<TextArea placeholder={`${''}请输入标准JSON格式的固定数据，用于静态的控件数据，示例：[{"name": 'lucy', "value": 1}]`} />)}
        </Form.Item>
        <Form.Item label="多选" {...formItemLayout}>
          {getFieldDecorator(`${panelControlPrefix}multiple`, {
            valuePropName: 'checked',
            initialValue: false,
          })(<Checkbox />)}
        </Form.Item>
        <Form.Item label="搜索" {...formItemLayout}>
          {getFieldDecorator(`${panelControlPrefix}canSearch`, {
            valuePropName: 'checked',
            initialValue: false,
          })(<Checkbox />)}
        </Form.Item>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({
  biDrawer: { editChartId },
}: any) => ({
  editChartId,
});

export default connect(mapStateToProps)(DataSettings);