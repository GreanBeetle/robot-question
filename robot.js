const calculateRobotSafeArea = () => {
  const start = new Date().toLocaleTimeString()
  let z = 0 // remove 
  let index = 0 
  let iterate = true
  let points = [{ x: 0, y: 0, safe: true, examined: false }]

  const reducer = (a, c) => parseInt(a) + parseInt(c)
  const safe = (X, Y) => [Math.abs(X).toString().split(''), Math.abs(Y).toString().split('')].flat().reduce(reducer) <= 23

  const sortNeighboringPoints = (x, y) => {
    const arr = [
      { x: x, y: y + 1, safe: safe(x, y + 1), examined: false }, // NORTH
      { x: x + 1, y: y, safe: safe(x + 1, y), examined: false }, // EAST 
      { x: x, y: y - 1, safe: safe(x, y - 1), examined: false }, // SOUTH
      { x: x - 1, y: y, safe: safe(x - 1, y), examined: false }, // WEST 
    ]

    for (let a of arr) {
      let exists = false 

      let okayX = Math.sign(a.x) === 1 || Math.sign(a.x) === 0
      let okayY = Math.sign(a.y) === 1 || Math.sign(a.y) === 0 
      let staysInQuadrant = okayX && okayY
      

      for (let i = points.length - 1; i >= 0; i -= 1) {
        if (points[i].x === a.x && points[i].y === a.y) {
          exists = true
          break
        }
      }
      if (!exists && a.safe && staysInQuadrant) points.push(a)  
    }

  }

  while (iterate) {
    currentPoint = points[index]
    console.log(currentPoint) // REMOVE
    if (currentPoint.safe && !currentPoint.examined) sortNeighboringPoints(currentPoint.x, currentPoint.y)
    z += 1 // REMOVE
    points[index].examined = true 
    index += 1
    iterate = points[index] !== undefined // KEEP 
    // iterate = z < 222
  }
  
  console.log('points', points.reverse())
  const end = new Date().toLocaleTimeString()
  console.log(`start: ${start} end ${end}`)
  return points.length * 4
}



console.log("final answer", calculateRobotSafeArea()) // 154260

// let x = 0
// let y = 0
// let doit = true
// let points = []
// const reducer = (a, c) => parseInt(a) + parseInt(c)
// const sum = (X, Y) => [Math.abs(X).toString().split(''), Math.abs(Y).toString().split('')].flat().reduce(reducer)

// while(doit) {
//   const SUM = sum(x, y)
//   console.log(`SUM of X ${x} Y ${y} is ${SUM}`)
//   points.push([x,y])
//   doit = y !== 698
//   y += 1
// }

// console.log('points', points)
// console.log('points length', points.length)

// 698 valid points along  X line
// 698 valid points along -X line
// 698 valid points along  Y line
// 698 valid points along -Y line
// 1   valid point  for    0, 0
// everything else needs to be calculated 


