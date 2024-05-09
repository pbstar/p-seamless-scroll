## p-seamless-scroll 官方文档

### 安装引入
#### npm安装
```
npm i p-seamless-scroll

import pExportExcel from "p-seamless-scroll";
```
#### cdn引入
```
<script src="https://unpkg.com/p-seamless-scroll@1.0.0/lib/p-seamless-scroll.js"></script>
```
### 使用示例
```
let ShowLabel = [[{ text: '学员姓名' }, { text: '手机号' }]];
let list = []
for (let i = 0; i < 5; i++) {
  list.push([{
    text: "学员" + i
  }, {
    text: 18800000000 + i,
    style: "color:red"
  }])
}
list.push([{
  text: "注：此数据为p-seamless-scroll测试数据！",
  colspan: "2",
  align: "left"
}])
pExportExcel({
  fileName: "学员统计表",
  theadList: ShowLabel,
  tbodyList: list
})
```
### 配置项
#### excel配置项
fileName--文件名<br>
footName--表名<br>
theadList--表头信息<br>
tbodyList--内容数据信息<br>
#### 单元格配置项
text--内容<br>
colspan--水平合并单元格<br>
rowspan--垂直合并单元格<br>
style--样式<br>
align--对齐方式<br>