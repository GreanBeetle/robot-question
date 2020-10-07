
const calculateRobotSafeArea = () => {

  // let point = { id: 0, x: 0, y: 0, safe: true, examined: false }
  let index = 0 
  let iterate = true
  let points = [{ x: 0, y: 0, safe: true, examined: false }]
  // let queue = []

  // let masterArray = []

  const reducer = (a, c) => parseInt(a) + parseInt(c)
  const safe = (X, Y) => [Math.abs(X).toString().split(''), Math.abs(Y).toString().split('')].flat().reduce(reducer) <= 23
  const sum = (X, Y) => [Math.abs(X).toString().split(''), Math.abs(Y).toString().split('')].flat().reduce(reducer)

  const sortNeighboringPoints = (x, y) => {
 
        
    const arr = [
      { x: x, y: y + 1, safe: safe(x, y + 1), examined: false }, // NORTH
      { x: x + 1, y: y, safe: safe(x + 1, y), examined: false }, // EAST 
      { x: x, y: y - 1, safe: safe(x, y - 1), examined: false }, // SOUTH
      { x: x - 1, y: y, safe: safe(x - 1, y), examined: false }, // WEST 
    ]

  
    for (let a of arr) {
      let exists = false 

      // const exists = points.some(e => e.x === a.x && e.y === a.y) // use this if the reverse for loop is buggy 
      
      for (let i = points.length - 1; i >= 0; i -= 1) {
        if (!points[i]) break 
        if (points[i].x === a.x && points[i].y === a.y) {
          exists = true
          break
        }
      }
       

      if (!exists) points.push(a)
      
    }
    
  }

  let z = 0
  while (iterate) {
    // console.log('index', index)
    currentPoint = points[index]
    
    
    if (currentPoint.safe && !currentPoint.examined) {
      console.log('safe')
      sortNeighboringPoints(currentPoint.x, currentPoint.y)
    } 
    else {
      console.log(`something is wrong. what is current point? ${currentPoint.x}, ${currentPoint.y}: sum: ${sum(currentPoint.x, currentPoint.y)}`)

    } 
    
    z += 1
    points[index].examined = true 
    // console.log('currentPoint', points[index])
    index += 1
    iterate = z < 500000
    
  }
  // console.log('FINAL INDEX', index)
  console.log('points', points.reverse()[0])
  return points.length
}



console.log("final answer", calculateRobotSafeArea()) // 154260