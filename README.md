# sign

## 创建uni-app
```
vue create -p dcloudio/uni-preset-vue my-project
```
此时，会提示选择项目模板，然后选择 hello uni-app

### 启动dome
```
npm run dev:mp-weixin
```
然后打开微信开发者工具，将文件夹中的mp-weixin导入，即可看到效果
```
|
|__dist
|  |
|__|__dev
|  |
|__|___.sourcemap
|  |
|__|___mp-weixin
```
### 注意
- vue-cli 版本必须是3.x
- cli 版本更新快于HBuilderX正式版。HBuilderX正式版所包含的uni-app编译器一般是在cli版发布一段时间并稳定后才会更新到HBuilderX正式版。
