/* 生成 echarts 导出的省级地图文件名和注册地图所用名的 Map
 * @Author: licao
 * @Date: 2020-10-26 10:57:42
 * @Last Modified by: licao
 * @Last Modified time: 2020-10-26 11:36:00
 */

const { walker } = require('./file-walker');
const path = require('path');
const fs = require('fs');

const registNameReg = /echarts\.registerMap\('(.*)'/;
const pathResolve = pathName => path.resolve(__dirname, pathName);
const errHandler = msg => (err) => {
  if (err) {
    console.log(`>>>>>> ${msg} generated fail! <<<<<< \n\n`, err);
  } else {
    console.log(`>>>>>> ${msg} generated ok. <<<<<<`);
  }
};

const genProvinceMap = async () => {
  const provinceMap = new Map();
  await new Promise((resolve) => {
    walker({
      root: pathResolve('../node_modules/echarts/map/js/province'),
      dealFile: (content, filePath, isEnd) => {
        const fileName = path.basename(filePath, '.js');
        const result = registNameReg.exec(content);

        result && provinceMap.set(fileName, result[1]);
        isEnd && resolve(provinceMap);
      },
      recursive: false,
    });
  });
  return provinceMap;
};

genProvinceMap().then((data) => {
  let initMapString = '';
  // eslint-disable-next-line no-return-assign
  data.forEach((v, k) => initMapString += `['${v}', '${k}'], `);

  fs.writeFile(
    pathResolve('../src/constants/province-name.ts'),
    `export const provinceNameMap = new Map([${initMapString}]);\r`,
    errHandler('province-name map')
  );
});
