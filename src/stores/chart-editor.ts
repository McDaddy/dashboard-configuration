import { createStore } from 'src/cube';
import { cloneDeep, forEach, startsWith, set } from 'lodash';
import { generateUUID } from '../utils';
import { panelControlPrefix, panelSettingPrefix } from '../utils/constants';
import dashBoardStore from './dash-board';

interface IState {
  visible: boolean,
  editChartId: string,
  addMode: false,
  viewMap: any, // 所有图表配置信息
  codeVisible: boolean, // 代码编辑
  viewCopy: any, // 修改时用于恢复的复制对象
  isTouched: boolean,
}

const newChartTpl = {
  chartType: 'chart:line',
  staticData: {
    xData: [],
    yData: [],
    metricData: {},
  },
  config: {
    option: {},
  },
};

const initState: IState = {
  visible: false,
  editChartId: '',
  addMode: false,
  viewMap: {}, // 所有图表配置信息
  codeVisible: false, // 代码编辑
  viewCopy: {}, // 修改时用于恢复的复制对象
  isTouched: false,
};

const chartEditorStore = createStore({
  name: 'chartEditor',
  state: initState,
  effects: {
    async addEditor({ select }) {
      const viewId = `view-${generateUUID()}`;
      const viewMap = select(s => s.viewMap);

      chartEditorStore.reducers.updateState({
        visible: true,
        editChartId: viewId,
        addMode: true,
        viewMap: {
          ...viewMap,
          [viewId]: newChartTpl,
        },
      });

      dashBoardStore.effects.generateChart(viewId);
    },
    // 编辑时保存仅置空viewCopy即可，新增时保存无需处理（将values置回源数据中）
    async saveEditor({ select }, payload) {
      const [editChartId, viewMap] = select(s => [s.editChartId, s.viewMap]);
      const editChart = cloneDeep(viewMap[editChartId]);

      chartEditorStore.reducers.updateState({
        viewMap: { ...viewMap, [editChartId]: { ...editChart, ...payload } },
        visible: false,
        addMode: false,
        editChartId: '',
        viewCopy: {},
      });
      chartEditorStore.reducers.setTouched(false);
    },
    // 表单变化时自动保存
    async onEditorChange({ select }, payload) {
      const [editChartId, viewMap] = select(s => [s.editChartId, s.viewMap]);
      chartEditorStore.reducers.updateState({
        viewMap: {
          ...viewMap,
          [editChartId]: { ...viewMap[editChartId], ...payload },
        },
      });
    },
    // 编辑时关闭，恢复数据并置空viewCopy
    async closeEditor({ select }) {
      const [editChartId, viewMap, viewCopy] = select(s => [s.editChartId, s.viewMap, s.viewCopy]);
      // const isExist = find(layout, ({ i }) => i === editChartId);
      // if (!isExist) { // 创建时取消就移除
      //   yield put({ type: 'dashBoard/deleteView', viewId: editChartId });
      //   yield put({ type: 'updateState', payload: { visible: false, editChartId: '' } });
      // } else { // 编辑时取消恢复原有数据
      // }
      viewMap[editChartId] = viewCopy;

      chartEditorStore.reducers.updateState({
        visible: false,
        editChartId: '',
        viewMap: { ...viewMap },
        viewCopy: {},
      });
      chartEditorStore.reducers.setTouched(false);
    },
    // 添加时关闭直接移除新建的
    async deleteEditor({ select }) {
      const editChartId = select(s => s.editChartId);

      dashBoardStore.effects.deleteView(editChartId);
      chartEditorStore.reducers.updateState({ visible: false, editChartId: '' });
      chartEditorStore.reducers.setTouched(false);
    },
    async chooseChartType({ select }, chartType) { // 编辑时移除
      const [editChartId, viewMap] = select(s => [s.editChartId, s.viewMap]);
      const drawerInfo = viewMap[editChartId];
      let tempPayload = {};
      if (chartType === drawerInfo.chartType) {
        // forEach(drawerInfo, (value, key) => { // 移除填写的图表配置
        //   if (startsWith(key, panelDataPrefix)) {
        //     delete drawerInfo[key];
        //   }
        // });
        // yield put({ type: 'dashBoard/deleteLayout', viewId: editChartId });
        // tempPayload = { viewMap: { ...viewMap, [editChartId]: { ...drawerInfo, chartType: '' } } };
      } else {
        tempPayload = { viewMap: { ...viewMap, [editChartId]: { ...drawerInfo, chartType } } };
      }
      chartEditorStore.reducers.updateState(tempPayload);
    },
  },
  reducers: {
    updateState(state, payload: any) {
      return { ...state, ...payload };
    },
    editView(state, editChartId: string) {
      const viewCopy = cloneDeep(state.viewMap[editChartId]);
      return { ...state, visible: true, editChartId, viewCopy };
    },
    updateViewInfo(state, payload: any) { // 修改标题时editChartId还是空的，所以自己传要更新的viewId
      const { viewId, ...rest } = payload;
      if (viewId) {
        state.viewMap[viewId] = {
          ...state.viewMap[viewId],
          ...rest,
        };
      }
    },
    init(state, viewMap) {
      state.viewMap = viewMap;
    },
    chooseControl(state, controlType) {
      const { viewMap, editChartId } = state;
      const drawerInfo = viewMap[editChartId];
      if (controlType === drawerInfo.controlType) {
        forEach(drawerInfo, (value, key) => { // 移除填写的控件配置
          if (startsWith(key, panelControlPrefix)) {
            delete drawerInfo[key];
          }
        });
        return { ...state, viewMap: { ...viewMap, [editChartId]: { ...drawerInfo, controlType: '' } } };
      }
      return { ...state, viewMap: { ...viewMap, [editChartId]: { ...drawerInfo, controlType } } };
    },
    deleteEditorInfo(state, viewId: string) {
      delete state.viewMap[viewId];
    },
    openCodeModal(state) {
      return { ...state, codeVisible: true };
    },
    closeCodeModal(state) {
      return { ...state, codeVisible: false };
    },
    submitCode(state, settingInfo) {
      const { viewMap, editChartId } = state;
      const drawerInfo = viewMap[editChartId];
      forEach(drawerInfo, (value, key) => { // 移除过去设置的的Echarts配置信息
        if (startsWith(key, panelSettingPrefix)) {
          delete drawerInfo[key];
        }
      });
      return { ...state, viewMap: { ...viewMap, [editChartId]: { ...drawerInfo, ...settingInfo } } };
    },
    reset() {
      return { ...cloneDeep(initState) };
    },
    setTouched(state, isTouched: boolean) {
      state.isTouched = isTouched;
    },
  },
});

export default chartEditorStore;