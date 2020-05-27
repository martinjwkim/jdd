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

export { scoreMultiplier };