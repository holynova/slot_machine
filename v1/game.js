// 闭区间
const log = console.log
function randBetween(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1))
}

function registBtn(strips) {
  const startBtn = document.querySelector('.startBtn')
  const stopBtn = document.querySelector('.stopBtn')
  startBtn.addEventListener('click', function () {
    log('start')
    // setEndIndex(strips)
    for (let i = 0; i < strips.length; i++) {
      setTimeout(function () {
        strips[i].start()
      }, i * 500);
    }
  }, false)

  // stopBtn.addEventListener('click', function () {
  //   log('stop')
  //   for (let i = 0; i < strips.length; i++) {
  //     setTimeout(function () {
  //       strips[i].setAcc(0.1)
  //     }, i * 1000);
  //   }
  // }, false)
}


// function setEndIndex(stripeArr) {
//   let randomNums = []
//   for (let i = 0; i < stripeArr.length; i++) {
//     let randomNum = randBetween(1, 7)
//     randomNums.push(randomNum)
//     stripeArr[i].setStopIndex(randomNum)
//   }
//   log(randomNums)
// }

function __main() {
  log('ready')
  let slots = document.querySelectorAll('ul')
  window.fps = 60
  let options = [
    {
      dom: slots[0],
      contents: '举杯邀明月'.split(''),
      speed: -2.1,
      acc: -0.2,
      // stopIndex: randBetween(0, 7),
      endCallBack: () => {
        log('ended')
      }
    },
    {
      dom: slots[1],
      contents: '百盛通'.split(''),
      speed: -6.1,
      acc: -0.1,
      // stopIndex: randBetween(1, 7),
      endCallBack: () => {
        log('ended')
      }
    },
    {
      dom: slots[2],
      contents: '01234567'.split(''),
      speed: -7.1,
      acc: -0.1,
      // stopIndex: randBetween(1, 7),
      endCallBack: () => {
        log('ended')
      }
    },
  ]
  for (let i = 0; i < options.length; i++) {
    let option = options[i]
    let rand = randBetween(0, option.contents.length - 1)
    log(rand)
    option.stopIndex = rand
  }
  const stripes = options.map((option) => (Stripe.new(option)))
  registBtn(stripes)
}

window.onload = __main