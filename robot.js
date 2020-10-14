const calculateRobotSafeArea = () => {
  const start = new Date().toLocaleTimeString() 
  let area = 0, index = 0, iterate = true  
  let points = [{ x: 0, y: 0, safe: true, examined: false }]

  const reducer = (a, c) => parseInt(a) + parseInt(c)
  const safe = (X, Y) => [Math.abs(X).toString().split(''), Math.abs(Y).toString().split('')].flat().reduce(reducer) <= 23

  const sortNeighboringPoints = (x, y) => {
    const arr = [ 
      { x: x, y: y + 1, safe: safe(x, y + 1), examined: false }, 
      { x: x + 1, y: y, safe: safe(x + 1, y), examined: false },  
      { x: x, y: y - 1, safe: safe(x, y - 1), examined: false }, 
      { x: x - 1, y: y, safe: safe(x - 1, y), examined: false }  
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

  const incrementArea = (x, y) => safe(x, y + 1) && safe(x + 1, y + 1) && safe(x + 1, y)

  while (iterate) {
    currentPoint = points[index]
    console.log(`x ${currentPoint.x} y ${currentPoint.y}`)
    if (currentPoint.safe && !currentPoint.examined) sortNeighboringPoints(currentPoint.x, currentPoint.y)
    if (incrementArea(currentPoint.x, currentPoint.y)) area += 1
    points[index].examined = true 
    index += 1
    iterate = points[index] !== undefined 
  }
  
  const end = new Date().toLocaleTimeString()
  const safePoints = points.filter( e => e.x !== 0 && e.y !== 0 ).length * 4 + 2793 
  console.log(`start time ${start}`)
  console.log(`end time ${end}`)
  console.log('safe points', safePoints)
  console.log('safe area', area * 4)
}

calculateRobotSafeArea() 
