import { cloneDeep, forEach } from 'lodash';

const defaultState = {
  linkId: '',
  linkMap: {}, // 联动设置信息
  linkDataMap: {}, // 联动数据信息
};

export default {
  namespace: 'linkSetting',
  state: cloneDeep(defaultState),
  reducers: {
    init(state, { linkMap }) {
      return { ...state, linkMap };
    },
    deleteLinkMap(state, { linkId }) {
      const { linkMap } = state;
      delete linkMap[linkId];
      forEach(linkMap, ((linkInfo) => {
        delete linkInfo[linkId];
      }));
      return { ...state, linkMap: { ...linkMap } };
    },
    updateLinkMap(state, { linkId, values }) {
      return { ...state, linkMap: { ...state.linkMap, [linkId]: values } };
    },
    updateLinkDataMap(state, { linkId, values }) {
      return { ...state, linkMap: { ...state.linkDataMap, [linkId]: values } };
    },
    openLinkSetting(state, { linkId }) {
      return { ...state, linkId };
    },
    closeLinkSetting(state) {
      return { ...state, linkId: '' };
    },
    reset() {
      return { ...cloneDeep(defaultState) };
    },
  },
};
