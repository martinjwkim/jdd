function scoreMultiplier(num) {
  if (num === '0') {
    return '-10'
  }
  else if (num > 0 && num <= 7) {
    return num
  }
  else if (num > 7 && num <= 9) {
    return num * 2
  }
  else if (num > 9 && num <= 11) {
    return num * 3
  }
  else if (num > 11 && num <= 13) {
    return num * 4
  }
}

function moneyCalc(arr) {
  let minNum = Math.min(...arr);
  let standArr = arr.map(num => num + Math.abs(minNum));
  let totalWon = standArr.reduce(function (a, b) {
    return a + b;
  }, 0);

  console.log(totalWon)
  console.log(standArr)
  return standArr.map(num => {
    if (num !== 0) {
      return totalWon - (num * 4)
    }
    else {
      return totalWon
    }
  })
}

function bgColor(num) {
  if (num === '0') {
    return 'lightgreen'
  }
  else if (num > 0 && num <= 7) {
    return 'white'
  }
  else if (num > 7 && num <= 9) {
    return 'yellow'
  }
  else if (num > 9 && num <= 11) {
    return 'orange'
  }
  else if (num > 11 && num <= 13) {
    return 'red'
  }
}

export { scoreMultiplier, moneyCalc, bgColor };