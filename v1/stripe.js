class Stripe {
  constructor(settingObj, dom, contents, offsetY, speed, acc) {
    let defaultSetting = {
      // contents:[1,2,3,4,5,6,7],
      offsetY: 0,
      speed: 0,
      acc: -0.2,
      maxSpeed: -30,
      // minSpeed: -5,
    };
    let setting = Object.assign({}, defaultSetting, settingObj)
    log('setting', setting)
    for (let itemKey in setting) {
      if (Object.prototype.hasOwnProperty.call(setting, itemKey)) {
        this[itemKey] = setting[itemKey]
      }
    }
    // this.dom = dom
    // this.contents = contents
    // this.offsetY = offsetY
    this.y = 0
    this.originSpeed = this.speed
    this.originAcc = this.acc
    this.blockHeight = 300

    this.height = this.blockHeight * this.contents.length
    // this.isMoveing = false
    // this.maxSpeed = -20
    this.minSpeed = this.originSpeed

    this.over = true

    this.initDom()
    // this.move()
  }


  static new(dom, contents, y, speed, acc) {
    return new this(dom, contents, y, speed, acc)
  }
  setTop(top) {
    this.dom.style.top = top + 'px'
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

  setStopIndex(index) {
    this.stopIndex = index
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
    this.speed += this.acc

    //加速到最大速度后减速运行
    if (this.speed <= this.maxSpeed) {
      this.speed = this.maxSpeed
      this.acc = -this.acc
    }

    // 速度小到一定程度时,保持匀速,滑到目标格子, 再停下
    if (this.speed >= this.minSpeed) {
      this.speed = this.minSpeed
      this.acc = 0
      let endY = -this.stopIndex * this.blockHeight;
      if ((this.y > endY + this.speed) && (this.y < endY - this.speed)) {
        this.speed = 0
        this.y = endY
        this.over = true
        if (typeof this.endCallBack === 'function') {
          this.endCallBack()
        }
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
    this.setTop(this.y + this.offsetY)
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