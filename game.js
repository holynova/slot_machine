// 闭区间
const log = console.log
function randBetween(min, max) {

}


function initStripe(ul, max = 10) {
  let blocks = []
  for (let i = 0; i < max; i += 1) {
    blocks.push(`<li class = "block">${i}</li>`)
  }

  ul.innerHTML = blocks.join('')
}


function getTop(el) {
  let top = window.getComputedStyle(el).top
  top = parseInt(top, 10)
  return top
  // log('top=', top)
}
function setTop(el, top) {
  el.style.top = top + 'px'
}

function oneLoop(ul) {
  let speed = -1
  let fps = 60
  setTimeout(function () {
    // log('loop')
    // log(ul.style.top)
    // ul.style.top = '-100px'
    let top = getTop(ul)
    setTop(ul, top + speed)
    oneLoop(ul)
  }, 1000 / fps)
}

function registBtn(strips) {
  const startBtn = document.querySelector('.startBtn')
  const stopBtn = document.querySelector('.stopBtn')
  startBtn.addEventListener('click', function () {
    log('start')
    for (let i = 0; i < strips.length; i++) {
      strips[i].start()
      // strips[i].setAcc(-0.04)
    }
    // strip.start()
    // strip.setAcc(-0.03)
  }, false)

  stopBtn.addEventListener('click', function () {
    log('stop')
    for (let i = 0; i < strips.length; i++) {
      setTimeout(function () {
        strips[i].setAcc(0.02)
      }, i * 2000);
    }
  }, false)
}

function __main() {
  log('ready')
  let slots = document.querySelectorAll('.slot')
  let firstSlot = slots[0]
  let stripe = firstSlot.children[0]
  window.fps = 60

  let s1 = Stripe.new(stripe, '1234567'.split(''), 0, -2.1, -0.02 * 5)
  // s1.start()
  let s2 = Stripe.new(slots[1].children[0], '1234567'.split(''), 0, -3, -0.01 * 5)
  // s2.start()
  let s3 = Stripe.new(slots[2].children[0], '1234567'.split(''), 0, -5, -0.015 * 5)
  // s3.move()
  // setTimeout(function () {
  //   s3.start()
  // }, 3000)
  const stripes = [s1, s2, s3];
  registBtn(stripes)
}

window.onload = __main