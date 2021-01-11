import * as React from 'react';
import { Drawer, Button, Popover } from '@terminus/nusi';
import { Choose, When, Otherwise } from 'tsx-control-statements/components';
import { getConfig } from '../../../config';
import DataConfigurator from '../data-config';
import DcContainer from '../../DcContainer';

import ChartEditorStore from '../../../stores/chart-editor';
import DashboardStore from '../../../stores/dash-board';

import './index.scss';

const noop = () => null;

const textMap = DashboardStore.getState((s) => s.textMap);

const EditorPanel = () => {
  const [
    viewCopy,
    editChartId,
    isTouched,
  ] = ChartEditorStore.useStore((s) => [
    s.viewCopy,
    s.editChartId,
    s.isTouched,
  ]);

  if (!viewCopy || !editChartId) return null;

  const { saveEditor, resetEditor } = ChartEditorStore;
  const info = getConfig('chartConfigMap')[viewCopy.chartType];
  const { Configurator: CommonConfigForm = noop, Component: ChartComponent } = info;
  const completeEditor = () => {
    saveEditor();
    resetEditor();
  };

  return (
    <Drawer
      className="dc-editor"
      visible
      width="100%"
      closable={false}
      maskClosable={false}
      bodyStyle={{ height: '100%', background: '#f4f3f7', padding: 0 }}
    >
      <div className="dc-editor-wp v-flex-box flex-space-between full-height auto-overflow">
        <div className="dc-editor-header px16 py12 border-bottom color-text-sub white-bg fz22">{textMap['config charts']}</div>
        <div className="dc-editor-content flex-1 auto-overflow pa4">
          <div className="dc-editor-common-setting v-flex-box py0 px12 auto-overflow border-radius white-bg">
            <div className="dc-editor-setting-title bold-500 color-text-sub fz14 mb8 py8 border-bottom">
              {textMap['common configuration']}
            </div>
            <div className="auto-y-overflow flex-1">
              <CommonConfigForm />
            </div>
          </div>
          <div className="dc-editor-previewer flex-1 mx4 auto-overflow border-radius white-bg box-shadow">
            <DcContainer viewId={editChartId} view={viewCopy}>
              <ChartComponent />
            </DcContainer>
          </div>
          <div className="dc-editor-data-setting v-flex-box py0 px12 border-radius white-bg">
            <div className="dc-editor-setting-title bold-500 color-text-sub fz14 mb8 py8 border-bottom">
              {textMap['datasource configuration']}
            </div>
            <div className="auto-y-overflow flex-1">
              <DataConfigurator />
            </div>
          </div>
        </div>
        <div className="dc-editor-footer px12 py8 white-bg border-top">
          <Button onClick={completeEditor} type="primary">{textMap.ok}</Button>
          <Choose>
            <When condition={isTouched}>
              <Popover
                okText={textMap.ok}
                cancelText={textMap.cancel}
                placement="top"
                trigger="click"
                content={textMap['confirm to drop data']}
                onOk={resetEditor}
              >
                <Button style={{ marginRight: 8 }}>{textMap.cancel}</Button>
              </Popover>
            </When>
            <Otherwise>
              <Button style={{ marginRight: 8 }} onClick={resetEditor}>{textMap.cancel}</Button>
            </Otherwise>
          </Choose>
        </div>
      </div>
    </Drawer>
  );
};

export default EditorPanel;