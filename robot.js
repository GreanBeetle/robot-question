

class Point {
  constructor(x, y, safe, examined) {
    this.x = x
    this.y = y
    this.safe = safe 
    this.examined = examined
  }
}

// const calculateRobotSafeArea = () => {

//   const ID = (x, y) => x.toString() + y.toString()

   


//   let point = new Point(0, 0, true, false)
//   let iterate = true 
//   let points = []
//   let queue = [point] 
//   let z = 0

//   const reducer = (a, c) => parseInt(a) + parseInt(c)
//   const safe = (X, Y) => {

//     return [Math.abs(X).toString().split(''), Math.abs(Y).toString().split('')].flat().reduce(reducer) <= 23
//   } 


//   const sortNeighboringPoints = (x, y) => {
//     const arr = [
//       new Point(x, y + 1, safe(x, y + 1), false), // x, y + 1 NORTH
//       new Point(x + 1, y, safe(x + 1, y), false), // x + 1, y EAST
//       new Point(x, y - 1, safe(x, y - 1), false), // x, y - 1 SOUTH
//       new Point(x - 1, y, safe(x - 1, y), false), // x - 1, y  WEST
//     ]

//     arr.forEach(e => {
//       const queued = queue.some(p => p.x === e.x && p.y === e.y)
//       const inPoints = points.some(p => p.x === e.x && p.y === e.y)
//       const { safe } = e
//       // console.log(e.x, e.y, `already queued? ${queued}. in points? ${inPoints}, safe? ${safe}`)
//       if (!safe) {
//         console.log('********************************************')
//         console.log(e.x, e.y, 'IS NOT SAFE')
//         console.log('********************************************')
//       }
      
//       if (safe && !queued && !inPoints) 
//         queue.push(e)
//       if (!safe && !queued && !inPoints) 
//         e.examined = true
//         points.push(e) // point not safe, therefor we say it has been examined and push it into the points array, which contains only examined points
//     })
//   }
   
  
//   while (iterate) {
  
//     queue.shift()
//     point.examined = true
//     points.push(point)
    
//     const { x, y } = point
//     // console.log('CURRENT POINT', x, y)
    
//     sortNeighboringPoints(x, y)
        
    
//     point = queue[0]


    
//     // console.log('queue length?', queue.length)
//     iterate = queue.length > 0
//     // iterate = point.x !== 30 
    
//   }
//   console.log('FINAL QUEUE', queue)
//   return points 
// }

const calculateRobotSafeArea = () => {

  // let point = { id: 0, x: 0, y: 0, safe: true, examined: false }
  let index = 0 
  let iterate = true
  let points = [{ x: 0, y: 0, safe: true, examined: false }]
  // let queue = []

  // let masterArray = []

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

      // const exists = points.some(e => e.x === a.x && e.y === a.y)
      
      for (let i = points.length - 1; i >= 0; i -= 1) {
        if (!points[i]) break 
        if (points[i].x === a.x && points[i].y === a.y) {
          exists = true
          break
        }
      }
       
      console.log('exists', exists)

      if (!exists) points.push(a)
      
    }
    
  }

  let z = 0
  while (iterate) {
    // console.log('index', index)
    currentPoint = points[index]
    // console.log('currentPoint', currentPoint)
    
    
    if (currentPoint.safe && !currentPoint.examined) sortNeighboringPoints(currentPoint.x, currentPoint.y)
    else console.log(`point is either unsafe ${currentPoint.safe} or examined ${currentPoint.examined}`)
        
    z += 1
    points[index].examined = true 
    index += 1
    iterate = z < 49
    
  }
  console.log('points', points)
  return points.length
}



console.log("final answer", calculateRobotSafeArea()) // 154260