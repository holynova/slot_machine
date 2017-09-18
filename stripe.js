class Stripe {
  constructor(dom, contents, offsetY, speed, acc) {
    this.dom = dom
    this.contents = contents
    this.offsetY = offsetY
    this.y = 0
    this.speed = speed
    this.originSpeed = speed
    this.acc = acc
    this.originAcc = acc

    this.blockHeight = 300
    this.height = this.blockHeight * this.contents.length

    // this.isMoveing = false
    this.maxSpeed = -20
    this.over = true
    this.initDom()
    // this.move()
  }
  static new(dom, contents, y, speed, acc) {
    return new this(dom, contents, y, speed, acc)
  }
  initDom() {
    let blocks = []
    for (let i = 0; i < this.contents.length; i += 1) {
      blocks.push(`<li class = "block">${this.contents[i]}</li>`)
    }
    //为了形成循环, 在最后再加一个最初的block
    blocks.push(`<li class = "block">${this.contents[0]}</li>`)
    blocks.push(`<li class = "block">${this.contents[1]}</li>`)
    this.dom.innerHTML = blocks.join('')
  }
  setSpeed(speed) {
    this.speed = speed
  }
  update() {

  }

  stop() {
    // this.isMoveing = false
  }
  stopAt(index) {
    this.endIndex = index
  }
  start() {
    // this.isMoveing = true
    this.over = false

    this.speed = this.originSpeed
    this.y = this.offsetY
    this.acc = this.originAcc
    this.move()
  }

  //设置加速度
  setAcc(acc) {
    this.acc = acc
  }
  frame() {
    // if (this.isMoveing) {
    this.speed += this.acc

    //加速到最大速度后匀速运行
    if (this.speed <= this.maxSpeed) {
      this.speed = this.maxSpeed
    }

    // 速度小到一定程度时,保持匀速,滑到目标格子, 再停下
    if (this.speed >= -2) {
      this.speed = -2
      this.acc = 0
      let stopIndex = 1
      let endY = -stopIndex * this.blockHeight;
      log('this.y =', this.y)
      if ((this.y > endY + this.speed) && (this.y < endY - this.speed)) {
        this.speed = 0
        this.y = endY
        this.over = true
      }
    }
    // 停止
    if (this.speed >= 0) {
      this.speed = 0

    }
    this.y += this.speed


    // 切换底端 形成循环
    if (this.speed < 0 && -this.y >= this.height) {
      this.y = 0
    }
    setTop(this.dom, this.y + this.offsetY)
    // }
  }

  move() {
    let that = this
    if (!this.over) {
      setTimeout(function () {
        that.frame()
        that.move()
      }, 1000 / window.fps)
    }

  }

}