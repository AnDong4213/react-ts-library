### `2-性能优化的指标和工具`

[WPO stats](https://wpostats.com/)

```java
  web性能优化（WPO-web performance optimization ）对用户体验和业务指标的影响。

  // question1：项目的首页是加载了一个视频作为背景动画。然后如果比较频繁的切换首页和其他页面的时候。就会导致浏览器黑屏，无法再点击。只能通过资源管理器关闭进程?
  可以试一下visibility API，切换页面的时候把视频暂停，回来时再play.
  // https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API
  // 页面可见性 API  对于节省资源和提高性能特别有用，它使页面在文档不可见时避免执行不必要的任务。
```

#### `2-3 RAIL测量模型`

`让良好的用户体验成为性能优化的目标`

> R-Response-用户与网站进行交互时，网站有没有及时的给用户一个反馈，网站给用户响应的体验。（处理事件应在 50ms 以内完成）<br />
> A-Animation-添加动画效果不卡顿 （每 10m 产生一帧）<br />
> I-Idle-主线程空闲时间 (空闲-尽可能增加空闲时间)<br />
> L-Load-资源网络加载时间 (加载：在 5 秒内完成内容加载并可以交互)
