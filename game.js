// 闭区间
const log = console.log
function randBetween(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1))
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

// function oneLoop(ul) {
//   let speed = -1
//   let fps = 60
//   setTimeout(function () {
//     // log('loop')
//     // log(ul.style.top)
//     // ul.style.top = '-100px'
//     let top = getTop(ul)
//     setTop(ul, top + speed)
//     oneLoop(ul)
//   }, 1000 / fps)
// }

function registBtn(strips) {
  const startBtn = document.querySelector('.startBtn')
  const stopBtn = document.querySelector('.stopBtn')
  startBtn.addEventListener('click', function () {
    log('start')
    for (let i = 0; i < strips.length; i++) {
      setTimeout(function () {
        strips[i].start()
      }, i * 500);
    }
    // strip.start()
    // strip.setAcc(-0.03)
  }, false)

  stopBtn.addEventListener('click', function () {
    log('stop')
    for (let i = 0; i < strips.length; i++) {
      setTimeout(function () {
        strips[i].setAcc(0.1)
      }, i * 1000);
    }
  }, false)
}

function __main() {
  log('ready')
  let slots = document.querySelectorAll('ul')
  // let firstSlot = slots[0]
  // let stripe = firstSlot.children[0]
  window.fps = 60
  let options = [
    {
      dom: slots[0],
      contents: '1234567'.split(''),
      speed: -5.1,
      acc: -0.1,
      stopIndex: 0,
      endCallBack: () => {
        log('ended')
      }
    },
    {
      dom: slots[1],
      contents: '1234567'.split(''),
      speed: -5.1,
      acc: -0.1,
      stopIndex: 0,
      endCallBack: () => {
        log('ended')
      }
    },
    {
      dom: slots[2],
      contents: '1234567'.split(''),
      speed: -5.1,
      acc: -0.1,
      stopIndex: 0,
      endCallBack: () => {
        log('ended')
      }
    },
  ]
  const stripes = options.map((option) => (Stripe.new(option)))
  registBtn(stripes)
}

window.onload = __main