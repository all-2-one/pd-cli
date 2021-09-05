# cli-template
脚手架模板

## 目录结构
```
build: webpack配置
  base.ts: 通用环境
  dev.ts: 开发环境
  prod.ts: 生成环境
docs: 开发文档
public
src
  assets
  base
  components
  core
  e2e
  layout
  pages
  router
  services
  store
  utils
  App.tsx
  global.less
  main.tsx
  typings.d.ts
.eslintignore
.eslintrc.js
.gitignore
babel.config.json
package.json
tsconfig.json
```

## feature
- [x] typescript
- [x] eslint
  - [x] 代码提交钩子验证
  - [ ] 项目初次运行的命令
- [x] webpack
  - [x] 区分环境
- [x] react-router-dom(App.tsx)
  - [x] 根据router/index.ts生成路由
  - [x] 支持嵌套
  - [x] 在App.tsx支持原生的写法
  - [x] 懒加载
- [ ] react-redux(main.tsx)
  - [x] 支持saga
  - [x] 支持原生和dva-model的写法
  - [ ] 缺少动态注入model的功能
  - [ ] 缺少subscribe
  - [ ] model的effect缺少类型支持
- [ ] 测试

## lint
- eslint-plugin-typescript: https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin



networksetup -setv6off Wi-Fi