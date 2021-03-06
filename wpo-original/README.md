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

### `3-4 复合线程与图层`

#### 摘要

- 为了提高绘制的效率，浏览器才有了复合层，把页面拆解成不同的图层。
- 只有 translate 和 opacity 目前可以被硬件加速支持，可以避免重绘，结合 will-change 创建独立图层达到优化的结果。
- transform:translateZ(0)和 will change 都会将元素提取单独图层，使用 GPU 加速。translateZ 以前是一个副作用，而 will-change 才是标准，原来可能还会支持更多的属性。
- requestAnimationFrame 主要就是用来优化执行过长的视觉任务的刷新同步问题的，尤其是动画。利用它可以将任务的执行与帧对齐，与刷新频率尽量同步。虽然动画还是会受影响，但和掉帧(Dropped Frame)的卡顿比要好很多

### `3-7 React时间调度实现`

- 16 版本 fiber 的实现机制，将 dom 的修改，一个批量的任务拆解成许多的小任务，然后通过时间调度去进行完成，在既保证高效率的同时，还能够保证用户的交互有足够的空闲时间。
- React 时间调度实现方法是借用 requestAnimationFrame。实现思路：模拟 requestIdleCallback，希望一帧 16 毫秒的时间内，如果还有空余的时间，16 毫秒没用完，让它做一些其他的事情，但 requestIdleCallback 的浏览器支持不是很好，兼容性并不是很好，于是通过 requestAnimationFrame 模拟实现了 requestIdleCallback。
- 在一帧的关键渲染周期之内，requestIdleCallback 在一帧之内如果所有事情做完了还有剩余的时间，可以做一些其他的事情。requestAnimationFrame 是在 Layout 和 paint 之前触发的，一帧要开始渲染之前触发的。requestIdleCallback 是在渲染之后触发的，一帧已经画完了还有时间，可以去做一些额外的东西。
- window.requestAnimationFrame() 告诉浏览器——你希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。该方法需要传入一个回调函数作为参数，该回调函数会在浏览器下一次重绘之前执行。

## `4-代码优化`

### `4-1 JS开销和如何缩短解析时间`

- 白屏时间通常指的是从 url 输入到页面内容加载出来之前的时间。常用的参考指标是 FCP: first contentful paint.
- 行间脚本(inline script)，也叫内嵌脚本，指的是直接写在 html 里的 javascript，它们会造成解析阻塞，应该避免较多较长的行间脚本。

### `4-2 V8引擎`

- 懒解析不是跳过什么都不做，而是进行预解析，只处理作用域等基本信息，知道有这个函数，但不会完全解析它的具体内容逻辑。

### `4-4 对象优化`

- Hidden Class 隐藏类型是 V8 为提高查询速度而生的。替代动态查询，在一个对象创建/改变/删除时，都会造成对应的 HC 发生变化。V8 运行时为会每个对象创建 HC，主要是为了记录一个对象的结构。
- 越界在 JS 里有明显的性能影响

### `4-6 CSS对性能的影响`

- contain: layout; 主要就是用来告知浏览器元素的独立性，与页面其他部分无关。
- 如果要验证硬件加速功能是否启用或被禁用，可以在 Chrome 地址栏中执行 chrome://gpu/，
- contain 和 BFC 有什么区别呢？
- 举个例子，有时因为浮动的子元素脱离文档流导致布局的问题，出现父元素包不住子元素。最常见的就是在父元素上用 overflow: auto;来搞定。其实这就是创建了一个 BFC 来解决的。BFC 是一个块级布局解决方案的概念，它的实现有很多方式，contain 也是其中一种。BFC 就是要让父元素能够按块级布局的方式包含(contain)住子元素的特性---浮动，margin 等
- 块格式化上下文（Block Formatting Context，BFC） 是 Web 页面的可视 CSS 渲染的一部分，是块盒子布局过程发生的区域，也是浮动元素与其他元素交互的区域。

#### `创建块格式化上下文的常用方式`

- 浮动元素（元素的 float 不是 none）
- 绝对定位元素（元素的 position 为 absolute 或 fixed）
- 行内块元素（元素的 display 为 inline-block）
- overflow 计算值(Computed)不为 visible 的块元素 ‘hidden scroll auto’
- display 值为 flow-root 的元素
- 弹性元素（display 为 flex 或 inline-flex 元素的直接子元素）
- 网格元素（display 为 grid 或 inline-grid 元素的直接子元素）
- contain 值为 layout、content 或 paint 的元素

```java
  // 块格式化上下文包含创建它的元素内部的所有内容.
  // 块格式化上下文对浮动定位（参见 float）与清除浮动（参见 clear）都很重要。浮动定位和清除浮动时只会应用于同一个BFC内的元素。浮动不会影响其它BFC中元素的布局，而清除浮动只能清除同一BFC中在它前面的元素的浮动。外边距折叠（Margin collapsing）也只会发生在属于同一BFC的块级元素之间。

  // 用overflow创建BFC，可能会发现一些不想要的问题，比如滚动条或者一些剪切的阴影。一个新的 display 属性的值，它可以创建无副作用的 BFC。在父级块中使用 display: flow-root 可以创建新的 BFC。
```
