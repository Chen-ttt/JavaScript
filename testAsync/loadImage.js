/*
 * @Description: 
 * @Author: Tong Chen
 * @Date: 2022-09-04 16:27:55
 * @LastEditTime: 2022-09-04 16:35:55
 * @LastEditors:  
 */
function loadImg (imgSrc) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => {
      console.log("load success")
      resolve(img)
    }

    img.onerror = () => {
      console.log("load error")
      reject(new Error("Could not load img at", imgSrc))
    }

    img.src = imgSrc
  })
}