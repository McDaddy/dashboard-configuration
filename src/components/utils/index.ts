import { message } from 'antd';
import domtoimage from 'dom-to-image';
import { forEach, replace } from 'lodash';
import screenfull from 'screenfull';
import agent from 'agent';

export const formItemLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 20,
  },
};

export const panelDataPrefix = 'paneldata#';
export const panelControlPrefix = 'panelcontrol#';
export const panelSettingPrefix = 'panelsetting#';

export const positiveIntRegExp = /^[1-9]\d*$/;

class ParamsManage {
  private params: IParams | undefined;

  set(params: IParams | undefined) {
    this.params = params;
  }

  get() {
    return this.params || {};
  }
}

export const paramsManage = new ParamsManage();

function convertUrl(url: string) {
  let newUrl = url || '';
  forEach(paramsManage.get(), (value, key) => {
    const pattern = new RegExp(`{${key}}`, 'g');
    newUrl = replace(newUrl, pattern, value);
  });
  return newUrl;
}

export function getData(url: string, query?: any) {
  if (!url) return {};
  return agent.get(convertUrl(url))
    .query(query)
    .then((response: any) => response.body);
}

interface IParams { [name: string]: any }

let loadingMessage: any = null;

export function saveImage(dom: Element | null | Text, name: string) {
  if (loadingMessage) {
    return;
  }
  if (!dom) {
    message.error('页面为空,没有图表数据');
    return;
  }
  loadingMessage = message.loading('正在导出图片...', 0);
  domtoimage.toJpeg(dom, {
    quality: 1,
  }).then((url: string) => {
    const link = document.createElement('a');
    link.download = `${name}.jpeg`;
    link.href = url;
    loadingMessage();
    loadingMessage = null;
    link.click();
  });
}


export function setScreenFull(dom: Element | null | Text, isFullscreen: boolean) {
  if (dom && !isFullscreen) {
    screenfull.request(dom);
  } else {
    screenfull.exit();
  }
}

export function plainArrayValidator(_rule: any, text: string, callback: any): void {
  if (!text) {
    callback();
    return;
  }
  try {
    const arrayData = strToObject(text);
    if (Array.isArray(arrayData) && arrayData.every(x => typeof x === 'string')) {
      callback();
      return;
    }
    callback('请输入正确的字符串数组');
  } catch (e) {
    callback('请输入正确的字符串数组');
  }
}

export function strToObject(str: string) {
  // eslint-disable-next-line
  return  (new Function(`return ${str}`))();
}