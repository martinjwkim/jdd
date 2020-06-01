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

function moneyCalc(arr, multiplier) {
  let minNum = Math.min(...arr);
  let standArr = arr.map(num => num + Math.abs(minNum));
  let totalWon = standArr.reduce(function (a, b) {
    return a + b;
  }, 0);
  return standArr.map(num => {
    if (num !== 0) {
      return ((totalWon - (num * 4))*multiplier).toFixed(2)
    }
    else {
      return (totalWon*multiplier).toFixed(2)
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
    return 'lightcoral'
  }
  else if (num > 9 && num <= 11) {
    return 'crimson'
  }
  else if (num > 11 && num <= 13) {
    return 'red'
  }
}

function finalScoreColor(num) {
  if (num<0){
    return 'lightcoral'
  }
  else if (num>0){
    return 'lightgreen'
  }
  else {
    return 'white'
  }
}

function getCurrentDate(){

  let newDate = new Date()
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  
  return `${month<10?`0${month}`:`${month}`}-${date}`
  }

export { scoreMultiplier, moneyCalc, bgColor, finalScoreColor, getCurrentDate };