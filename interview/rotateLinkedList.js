/*
 * @Description: 
 * @Author: Tong Chen
 * @Date: 2022-09-27 21:36:42
 * @LastEditTime: 2022-09-27 22:04:10
 * @LastEditors:  
 */

/**
 * 输入：head = [1,2,3,4,5], k = 2, 输出：[4,5,1,2,3]
 * 输入：head = [0,1,2], k = 4, 输出：[2,0,1]
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */

// 美团一面
function rotateRight (head, k) {
  let length = 0
  let pointer = head

  // 获取链表长度
  while (pointer) {
    length++
    pointer = pointer.next
  }

  // 计算 第一个元素 在链表旋转后的位置
  let cutPosition = k % length

  // 快慢指针 - 慢指针走到切割位置前, 快指针走到链表末尾节点
  let slow = head
  let fast = head
  for (let i = 0; i < cutPosition - 1; i++) {
    fast = fast.next
  }
  while (fast.next) {
    slow = slow.next
    fast = fast.next
  }

  // 最后的旋转操作
  fast.next = head
  head = slow.next
  slow.next = null

  return head
}