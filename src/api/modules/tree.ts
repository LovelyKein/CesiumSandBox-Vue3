import request from "../interface";

// 获取 树结构 菜单
export function getTreeListById(id: number): any {
  return request({
    url: "/menu/getResourceById",
    method: 'GET',
    params: {
      id
    }
  });
}