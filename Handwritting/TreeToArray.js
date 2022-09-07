/*
 * @Description: 
 * @Author: Tong Chen
 * @Date: 2022-09-07 22:28:47
 * @LastEditTime: 2022-09-07 22:37:00
 * @LastEditors:  
 */
const treeData = [
  {
    id: 2, title: '中国', parent_id: 0,
    children: [
      {
        id: 3, title: '广东省', parent_id: 2,
        children: [
          {
            id: 4, title: '广州市', parent_id: 3,
            children: [
              { id: 5, title: '天河区', parent_id: 4 }
            ]
          }
        ]
      },
      { id: 6, title: '湖南省', parent_id: 2 }
    ]
  },
  { id: 1, title: '俄罗斯', parent_id: 0, },
]

let arr = []

function t (children) {
  for (let item of children) {
    convert(item)
  }
}

function convert (item) {
  const a = {}
  a.id = item.id
  a.title = item.title
  a.parent_id = item.parent_id

  arr.push(a)

  // children
  if (item.children) {
    for (const ch of item.children) {
      convert(ch)
    }
  }
}

t(treeData)
console.log(arr)