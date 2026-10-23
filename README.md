# 六绪之味

移动端美食沙龙：六道菜的原材料图库、制作小游戏、文章和多媒体链接。

## 本地开发

```sh
npm install
npm run dev
```

## 更新 GitHub Pages

```sh
npm run build -- --outDir docs
```

保留 docs/.nojekyll，将源码和 docs 一起提交。GitHub Settings → Pages 选择 main 分支的 /docs 目录。

使用相对资源路径及 HashRouter，可部署到 GitHub Pages 子目录。
