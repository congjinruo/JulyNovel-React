<p align="center">
  <a href="https://www.kuaijiajin.club">
    <img width="80" src="https://oss.kuaijiajin.club/favicon.ico">
  </a>
</p>

<h1 align="center">七月小说网</h1>

<div align="center">
July Novel是一个React Web前端项目，基于Ant-Design和React-Relay开发
</div>  
<div align="center">
体验地址：https://www.kuaijiajin.club
</div>  

## 运行说明
### 本地测试
```shell
yarn install
yarn run relay
yarn start
```
### 注意事项 
本项目的后端前端需要后端配合，后端是由Python Flask开发  
[这是July Novel后端项目](https://github.com/congjinruo/JulyNovel)  

如果您没有后端，目前已开放我的后端，没有跨域限制。可以直接用于测试。  
[这是我搭建的Flask Graphql后端](https://api.kuaijiajin.club:4433/graphql) 

如果您想搭建自己的后端，这里提供了我自己用爬虫爬的数据库表结构和数据  
[这是novel.sql文件](https://cloud.kuaijiajin.club/s/2r9ffbewH8bZEaz) 
### 服务器部署
执行
```shell
yarn build
```
将build文件夹内的静态资源部署到服务器上即可

## 性能优化

### 分享一下我做的网站性能优化指南
由于小说网站首页加载了大量图片，以及单页面应用首次加载需要缓存js和css，本就缓慢，导致我的站点在PageSpeedInsights得分贼低，仅有51分。  

1. 优化不可缺少  
2. 并且迫在眉睫  

### 思路
1. nginx开启gzip（已实现）
```sql
    #开启此压缩能显著提升web加载速度，建议开启。不足之处在于会增加服务端CPU开销。 
    gzip  on;
    gzip_min_length 1k;
    gzip_buffers 4 16k;
    #gzip_http_version 1.0;
    gzip_comp_level 2;
    gzip_types text/plain application/x-javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png application/javascript application/json;
    gzip_vary off;
    gzip_disable "MSIE [1-6]\.";
 ```
2. 静态资源如图片，单独存储到OSS上（已实现）  
由于本人服务器1核2g，带宽仅1Mbps，这是硬伤，故而将小说网站的书籍封面图和横幅图等通过后端托管到OSS上，访问速度更佳
3. 图片格式处理（已实现）  
JPEG 2000、JPEG XR、WEBP等格式能有效降低图片大小，节省用户下载时间。  
以阿里云OSS为例，调用图像处理域名规则  
`域名/sample.jpg?x-oss-process=style/stylename`  
在页面需要加载大量图片时，有效提高页面加载速度
4. 静态资源缓存（已实现）
优化首屏加载后的用户体验。给这些不需要经常更新的静态资源设置响应头  
`Cache-Control="max-age: 7776000"，#三个月不去请求服务器，直接使用本地缓存`
5. CDN加速（已实现）  
不同地区节点缓存源站资源，当终端用户请求访问和获取这些资源时，无需回源，自动调用CDN节点上已经缓存的资源。  目前七月小说网前端已全面启用阿里云CDN加速。  
注意须得重新在控制台设置智能压缩（gzip）和缓存策略。
6. 图片Lazy Load（已实现）
浏览器视窗看不见的地方实现懒加载，节省首次请求数。
7. 缩短服务端首字节响应时间（TTFB）（已实现）
如七月小说网数据库处理：给CONTENT表内的CHAPTER_ID加索引，阅读页速度提升。
8. 减少重定向、减小DOM节点数量等  

### 最后结果
实测F12  首屏加载Load从5s平均下降到1s，使用缓存从1.5s下降到0.38s，效果显著。
PageSpeedInsights跑分从51上升到71  

![优化后](https://img2018.cnblogs.com/blog/1054457/201902/1054457-20190221100839030-1899759839.jpg)


## 预览图

![首页1](https://oss.kuaijiajin.club/JulyNovel_ReadMe_1.jpg?x-oss-process=style/yasuo80)   

![首页2](https://oss.kuaijiajin.club/JulyNovel_ReadMe_2.jpg?x-oss-process=style/yasuo80)  

![小说简介页](https://oss.kuaijiajin.club/JulyNovel_ReadMe_3.jpg?x-oss-process=style/yasuo80)  

![分类](https://oss.kuaijiajin.club/JulyNovel_ReadMe_4.jpg?x-oss-process=style/yasuo80)  

![阅读页](https://oss.kuaijiajin.club/JulyNovel_ReadMe_5.jpg?x-oss-process=style/yasuo80)  