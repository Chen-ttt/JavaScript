/*
 * @Description: 
 * @Author: Tong Chen
 * @Date: 2022-09-26 11:36:40
 * @LastEditTime: 2022-09-27 08:15:37
 * @LastEditors:  
 */
class Router {
  constuctor (opts) {
    this.routes = {}
    this.historyPointer = 0
    this.historyStack = []
    opts.forEach(item => this.subscibe(item, () => { console.log("Render", item, "...") }))
  }

  updateView () {
    const curURL = window.location.pathname || "/"
    this.routes[curURL] && this.routes[curURL]()

  }

  push (url) {
    window.history.pushState({ pathName: url }, null, url)
    this.historyStack.push(url)
    this.historyPointer = this.historyStack.length - 1
    this.updateView()
  }

  back () {
    this.historyPointer--
    const lastURL = this.historyStack[this.historyPointer]
    window.history.pushState({ pathName: lastURL }, null, lastURL)
    this.updateView()
  }

  subscibe (url, fn) {
    this.routes[url] = fn
  }
}

const router = new Router(["/a/1", '/p/o', "/:id"])
router.push
router.back
router.subscibe("/newURL", () => { console.log("Render newURL...") })