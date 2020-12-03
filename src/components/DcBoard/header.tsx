/* Dashboard 工具栏
 * @Author: licao
 * @Date: 2020-12-03 16:19:32
 * @Last Modified by: licao
 * @Last Modified time: 2020-12-03 18:01:55
 */
import React, { RefObject, useCallback, useMemo } from 'react';
import { Button, Tooltip } from '@terminus/nusi';
import { useForceUpdate, DcIcon } from '../../common';
import { insertWhen } from '../../common/utils';
import { setScreenFull, saveImage } from '../../utils/comp';

import DashboardStore from '../../stores/dash-board';
import ChartEditorStore from '../../stores/chart-editor';

import './header.scss';

interface IProps {
  contentRef: RefObject<HTMLDivElement>;
  dashboardName?: string;
  readOnly?: boolean;
  afterEdit?: () => void;
  beforeSave?: () => boolean; // 返回 false 来拦截 onSave
  onSave?: (layout: any[], extra: { singleLayouts: any[]; viewMap: any }) => void; // 保存
  onCancel?: () => void; // 取消编辑
}

const DashboardHeader = ({
  contentRef,
  dashboardName,
  readOnly,
  afterEdit,
  beforeSave,
  onSave,
  onCancel,
}: IProps) => {
  const forceUpdate = useForceUpdate();
  // 编辑态
  const [isEditMode, textMap] = DashboardStore.useStore((s) => [s.isEditMode, s.textMap]);
  const [viewMap] = ChartEditorStore.useStore((s) => [s.viewMap]);
  const { setEditMode, saveEdit } = DashboardStore;
  const { setPickChartModalVisible } = ChartEditorStore;

  const handleTriggerEditMode = useCallback(() => {
    setEditMode(true);
    afterEdit && afterEdit();
  }, [afterEdit, setEditMode]);

  const handleSetScreenFull = (dom: HTMLDivElement | null) => {
    setScreenFull(dom);
  };

  const handleSaveImg = useCallback((dom: HTMLDivElement | null, name?: string) => {
    saveImage(dom, name || textMap['unnamed dashboard']);
  }, [textMap]);

  const handleCancel = useCallback(() => {
    setEditMode(false);
    onCancel && onCancel();
  }, [onCancel, setEditMode]);

  const doSaveDashboard = useCallback(() => {
    saveEdit().then((full: { layout: any[]; viewMap: { [k: string]: any } }) => {
      if (onSave) {
        const { layout: singleLayouts, viewMap: _viewMap } = full;
        const fullLayouts = singleLayouts.map((_layout) => ({
          ..._layout,
          view: _viewMap[_layout.i],
        }));
        onSave(fullLayouts, { singleLayouts, viewMap });
      }
    });
  }, [onSave, saveEdit, viewMap]);

  const handleSaveDashboard = useCallback(() => {
    if (beforeSave) {
      const isContinue = beforeSave();
      if (isContinue) {
        doSaveDashboard();
      }
    } else {
      doSaveDashboard();
    }
  }, [beforeSave, doSaveDashboard]);

  const leftTools: DC_BOARD_HEADER.Tool[] = useMemo(() => [
    {
      icon: 'fullscreen',
      text: textMap.fullscreen,
      onClick: () => handleSetScreenFull(contentRef.current),
    },
    ...insertWhen<DC_BOARD_HEADER.Tool>(!isEditMode, [
      {
        icon: 'camera',
        text: textMap['export picture'],
        onClick: () => handleSaveImg(contentRef.current, dashboardName),
      },
    ]),
  ], [contentRef, dashboardName, handleSaveImg, isEditMode, textMap]);

  const editTools = useMemo(() => [
    ...insertWhen<DC_BOARD_HEADER.Tool>(!isEditMode, [
      {
        icon: 'edit',
        text: textMap['edit mode'],
        onClick: () => handleTriggerEditMode(),
      },
    ]),
    ...insertWhen<DC_BOARD_HEADER.Tool>(isEditMode, [
      {
        icon: 'plus',
        text: textMap['add charts'],
        onClick: () => setPickChartModalVisible(true),
      },
      {
        icon: 'save',
        text: textMap['save dashboard'],
        onClick: () => handleSaveDashboard(),
      },
      {
        icon: 'close',
        text: textMap['exit edit mode'],
        onClick: () => handleCancel(),
      },
    ]),
  ], [textMap, isEditMode, handleTriggerEditMode, handleSaveDashboard, handleCancel, setPickChartModalVisible]);

  const renderTools = (tools: DC_BOARD_HEADER.Tool[]) => tools.map(({ text, icon, onClick }) => (
    <Tooltip title={text} key={icon} >
      <Button type="text" onClick={onClick}>
        <DcIcon type={icon} />
      </Button>
    </Tooltip>
  ));

  return (
    <>
      <div className="dc-dashboard-header flex-box">
        <div className="dc-dashboard-tools dc-dashboard-left-tools">
          {renderTools(leftTools)}
        </div>
        <div className="dc-dashboard-tools dc-dashboard-right-tools">
          {!readOnly && renderTools(editTools)}
        </div>
      </div>
    </>
  );
};

export default DashboardHeader;
