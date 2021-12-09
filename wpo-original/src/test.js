export default (a, b) => {
  const add = ((a, b) => a + b); // 饥饿解析，加对圆括号

  return add(a, b);
};
