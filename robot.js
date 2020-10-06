const calculateRobotSafeArea = () => {
  let iterate = true
  let x = 0, y = 0, area = 0
  const reducer = (a, c) => parseInt(a) + parseInt(c)
  const safePoint = (X, Y) => [X.toString().split(''), Y.toString().split('')].flat().reduce(reducer) <= 23

  /**
      | (x, y + 1)  | (x + 1, y +1)
      |             |
      |             |
      | (x, y)      | (x + 1, y)
      |             |
      |             |
  ____|_____________|_________
  */

  while (iterate) {
    const allPointsSafe = safePoint(x, y) && safePoint(x, y + 1) && safePoint(x + 1, y + 1) && safePoint(x + 1, y)
    if (!safePoint(x, y)) {
      x += 1
      y = 0 
    } else if (safePoint(x, y) && !allPointsSafe) {
      y += 1
    } else if (safePoint(x, y) && allPointsSafe) {
      y += 1
      area += 1
    }
    iterate = x !== 598 
  }
  return area * 4
}



console.log("final answer", calculateRobotSafeArea()) // 154260