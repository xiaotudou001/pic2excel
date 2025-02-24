# 图片转Excel像素画工具

## 简介
这是一个将图片转换为Excel像素画的在线工具。它能够将您喜欢的图片转换成由Excel单元格组成的像素艺术作品，支持JPG、PNG等常见图片格式。

## 功能特点
- 🖼️ 支持多种常见图片格式（JPG、PNG等）
- 📱 响应式设计，同时支持电脑和手机
- 🎨 可调节输出图片的缩放比例
- ⚡ 实时预览效果
- 🔄 支持拖放上传

## 在线体验
访问 [在线演示](https://xiaotudou001.github.io/pic2excel/) 即可使用该工具。

## 本地部署

### 系统要求
- 支持现代浏览器（Chrome、Firefox、Safari、Edge等）
- Web服务器（可选）

### 安装步骤
1. 克隆或下载本项目到本地
2. 确保目录结构如下：
```
/
├── index.html
├── styles/
│   └── main.css
├── js/
│   ├── utils.js
│   ├── imageProcessor.js
│   ├── colorUtils.js
│   ├── excelGenerator.js
│   └── main.js
└── README.md
```
3. 使用Web服务器部署，或直接打开index.html文件

## 使用说明
1. 打开应用后，点击上传区域或将图片拖放到指定区域
2. 调整缩放比例（1-100%）以获得需要的像素效果
3. 预览区域会实时显示处理效果
4. 点击"生成Excel文件"按钮，等待处理完成
5. 文件会自动下载到本地

## 技术实现
- 前端技术：HTML5, CSS3, JavaScript (ES6+)
- 使用 xlsx-js-style 库处理Excel文件
- Canvas API 处理图片像素数据
- 响应式设计适配多种设备

## 注意事项
- 建议上传分辨率适中的图片，过大的图片可能导致处理时间较长
- 图片尺寸限制在4096×4096像素以内
- 生成的Excel文件可能较大，建议使用WiFi网络下载

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

This project uses the `xlsx-js-style` library via CDN, which is licensed under the Apache License 2.0.
