const calculateRobotSafeArea = () => {
  const start = new Date().toLocaleTimeString() // not necessary 
  let z = 0 // remove 
  let area = 0
  let index = 0 
  let iterate = true
  let points = [{ x: 0, y: 0, safe: true, examined: false }] // change to coordinates? 


  const reducer = (a, c) => parseInt(a) + parseInt(c)
  const safe = (X, Y) => [Math.abs(X).toString().split(''), Math.abs(Y).toString().split('')].flat().reduce(reducer) <= 23

  // assign each coordinate a uniqueId - if stored in an object - or a uniqueIndex



  const sortNeighboringPoints = (x, y) => {
    
    // change arr to neighboringCoordinates
    const arr = [ 
      { x: x, y: y + 1, safe: safe(x, y + 1), examined: false }, 
      { x: x + 1, y: y, safe: safe(x + 1, y), examined: false },  
      { x: x, y: y - 1, safe: safe(x, y - 1), examined: false }, 
      { x: x - 1, y: y, safe: safe(x - 1, y), examined: false }  
    ]

    for (let a of arr) {
      let exists = false // change variable to alreadyExists in points or coordinates

      let okayX = Math.sign(a.x) === 1 || Math.sign(a.x) === 0 // X is positive number or X is 0 
      let okayY = Math.sign(a.y) === 1 || Math.sign(a.y) === 0 // Y is positive number or Y is 0 
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

  const incrementArea = (x, y) => safe(x, y + 1) && safe(x + 1, y + 1) && safe(x + 1, y)

  while (iterate) {
    currentPoint = points[index]
    // console.log(currentPoint) // REMOVE
    if (currentPoint.safe && !currentPoint.examined) sortNeighboringPoints(currentPoint.x, currentPoint.y)
    const areaShouldIncrement = incrementArea(currentPoint.x, currentPoint.y)
    // console.log('area should increment', areaShouldIncrement)
    if (incrementArea(currentPoint.x, currentPoint.y)) area += 1
    z += 1 // REMOVE
    points[index].examined = true 
    index += 1
    iterate = points[index] !== undefined // KEEP 
    // iterate = z < 222 // REMOVE 
  }
  
  console.log('points', points.reverse())
  const end = new Date().toLocaleTimeString()
  console.log(`start: ${start} end ${end}`)
  console.log('area', area * 4)
  return points.length
}



console.log("final answer", calculateRobotSafeArea()) // area 498848

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


