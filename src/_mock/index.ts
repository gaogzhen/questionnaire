import Mock from "mockjs";

Mock.mock("/api/test", "get", () => ({
  errno: 0,
  data: {
    name: `张三 ${Date.now()}`,
  },
}));
