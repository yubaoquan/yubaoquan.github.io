---
layout: post
title: 一些我之前不知道的前端知识点
---

以为自己了解挺多, 其实是盲目自我感觉良好;
比如, 下面这些东西, 是从同事的代码里发现的, 自己并不知道有这些有用的东西;

1.`globalCompositeOperation`: canvas的一个属性, 处理目标图像和源图像的表现行为;
    源图像 = 您打算放置到画布上的绘图。
    目标图像 = 您已经放置在画布上的绘图。

| 值 | 描述 |
| :-------| :---- |
|source-over | 默认。在目标图像上显示源图像。|
|source-atop | 在目标图像顶部显示源图像。源图像位于目标图像之外的部分是不可见的。|
|source-in | 在目标图像中显示源图像。只有目标图像内的源图像部分会显示，目标图像是透明的。|
|source-out | 在目标图像之外显示源图像。只会显示目标图像之外源图像部分，目标图像是透明的。|
|destination-over | 在源图像上方显示目标图像。|
|destination-atop | 在源图像顶部显示目标图像。源图像之外的目标图像部分不会被显示。|
|destination-in | 在源图像中显示目标图像。只有源图像内的目标图像部分会被显示，源图像是透明的。|
|destination-out | 在源图像外显示目标图像。只有源图像外的目标图像部分会被显示，源图像是透明的。|
|lighter | 显示源图像 + 目标图像。|
|copy | 显示源图像。忽略目标图像。|
|source-over | 使用异或操作对源图像与目标图像进行组合。|

详细看<a href="http://www.w3school.com.cn/tags/canvas_globalcompositeoperation.asp" target="_blank">这里</a>


2.`dataset`: 往dom元素上存取自定义属性/数据的方式;
相关介绍如下:

<a href="http://www.cnblogs.com/ATree/archive/2011/08/24/HTML5-Dataset.html" target="_blank">这个</a><br>
<a href="http://www.zhangxinxu.com/wordpress/2010/08/翻译-你必须知道的28个html5特征、窍门和技术/" target="_blank">还有这个</a><br>


3.从canvas画的图像中获取图像数据:

```js

    var imgData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);

    for (i=0, len=imgData.data.length; i<len; i++)

    imgData.data[i+0] R

    imgData.data[i+1] G

    imgData.data[i+2] B

    imgData.data[i+3] A

```

跨域的图片(canvas所在的域和图片的域不同)获取不到数据;

4.to be continued...
