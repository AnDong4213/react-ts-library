` 类型断言不是类型转换，断言成一个联合类型中不存在的类型会报错的。 `

```java
  // TS语法 
  jQuery('#foo')；// 获取id为foo的元素，这样写会报错

  // 使用 declare 来定义jQuery的类型，通常放到 .d.ts 文件中去
  declare var jQuery: (selector: string) => any
```