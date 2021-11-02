## `2-性能优化的指标和工具`

[WPO stats](https://wpostats.com/)

```java
  web性能优化（WPO-web performance optimization ）对用户体验和业务指标的影响。

  question1：项目的首页是加载了一个视频作为背景动画。然后如果比较频繁的切换首页和其他页面的时候。就会导致浏览器黑屏，无法再点击。只能通过资源管理器关闭进程?
  // 可以试一下visibility API，切换页面的时候把视频暂停，回来时再play.
  // https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API
  // 页面可见性 API  对于节省资源和提高性能特别有用，它使页面在文档不可见时避免执行不必要的任务。
```

### `2-3 RAIL测量模型`

`让良好的用户体验成为性能优化的目标`

> R-Response-用户与网站进行交互时，网站有没有及时的给用户一个反馈，网站给用户响应的体验。（处理事件应在 50ms 以内完成）<br />
> A-Animation-添加动画效果不卡顿 （每 10m 产生一帧）<br />
> I-Idle-主线程空闲时间 (空闲-尽可能增加空闲时间)<br />
> L-Load-资源网络加载时间 (加载：在 5 秒内完成内容加载并可以交互)

## `3-渲染优化`

```js
// animation frame fired(动画帧激发)
// recalculate style(重新计算样式)
//  composite layers 复合层

// 浏览器为了提高布局性能，会尽量的的把修改布局相关属性操作推迟。
// 批量进行，把读的操作进行完，批量在进行写的操作。

// 页面抖动是连续发生强制同步布局造成过多过大无用的渲染开销。强制同步布局主要是布局相关样式修改后马上去获取布局相关信息（不一定是之前修改的那个属性），导致浏览器必需在读取前立即进行重新布局计算以保证你读取到最新的值。本可以推迟批量进行的布局优化不能进行。

// dom连续的读写操作就会导致出现强制的布局更新，连续强制的布局更新（回流）就会出现页面抖动。导致页面卡顿
// fastdom主要做读写的分离，读样式不触发layout，修改样式才有可能触发layout。fastDom不是把1000次读变成1次读，它主要作用是将读操作和写操作缓存后分别批量进行。这样就不会因为某个读操作的时候发现前面有写操作要先强制回流一下。

// 浏览器重新布局就是为了希望读的准确，如果进行读写分离，先进行读，但是后边写的数据影响了读的数据，这样会不会出现读的不准确的问题？
  关键的一点是读和写涉及的属性不同或者没有真正的相互影响。比如例子中width是不受offsetTop影响的，所以才可以确信的做读写分离。
```

```js
window.onload = function () {
  var spans = document.getElementsByTagName("span");
  // 第一种代码
  /* for (let i = 0; i < spans.length; i++) {
    const ele = spans[i];
    ele.style.width = ele.offsetWidth + "px";
  } */

  // 第二种代码
  var arr = [];
  for (let i = 0; i < spans.length; i++) {
    arr.push(spans[i].offsetWidth + "px");
  }

  for (let i = 0; i < arr.length; i++) {
    spans[i].style.width = arr[i];
  }
};
// 第一种每次要先读取offsetWidth，layout engine不能确定上一个元素的修改会不会影响下一个元素的offsetWidth，所以每个元素的recalculate style/layout是依次进行的。
// 第二种width赋值是从数组直接取值，layout engine只需要一次样式计算，可涉及所有受影响元素。这里是它本身的优化。
// 样式重计算越少越好，每次样式重计算影响的元素和样式的复杂度越小越好。
```

### `3-4 复合线程与图层【深入渲染流水线的最后一站】`

#### 摘要

- 为了提高绘制的效率，浏览器才有了复合层，把页面拆解成不同的图层。
- 只有 translate 和 opacity 目前可以被硬件加速支持，可以避免重绘，结合 will-change 创建独立图层达到优化的结果。
- transform:translateZ(0)和 will change 都会将元素提取单独图层，使用 GPU 加速。translateZ 以前是一个副作用，而 will-change 才是标准，原来可能还会支持更多的属性。
