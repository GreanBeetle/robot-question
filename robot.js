// const calculateRobotSafeArea = () => {
//   let iterate = true
//   let x = 0, y = 0, area = 0, totalSafePoints = 0 // added total safe points
//   const reducer = (a, c) => parseInt(a) + parseInt(c)
//   const safePoint = (X, Y) => [X.toString().split(''), Y.toString().split('')].flat().reduce(reducer) <= 23

  

//   /**
//       | (x, y + 1)  | (x + 1, y +1)
//       |             |
//       |             |
//       | (x, y)      | (x + 1, y)
//       |             |
//       |             |
//   ____|_____________|_________
//   */

//   while (iterate) {
//     const allPointsSafe = safePoint(x, y) && safePoint(x, y + 1) && safePoint(x + 1, y + 1) && safePoint(x + 1, y)
//     if (!safePoint(x, y)) {
//       x += 1
//       y = 0 
//     } else if (safePoint(x, y)) {
//       y += 1
//       area = allPointsSafe ? area + 1 : area 
//       totalSafePoints += 1 
//     } 
//     // else if (safePoint(x, y) && allPointsSafe) {
//     //   y += 1
//     //   area += 1
//     // }
//     iterate = x !== 599 
//   }
//   return ` area: ${area * 4} total number of safe points ${totalSafePoints * 4}`
// }

class Point {
  constructor(x, y, safe, examined) {
    this.x = x
    this.y = y
    this.safe = safe 
    this.examined = examined
  }
}

const calculateRobotSafeArea = () => {



  let point = new Point(0, 0, true, false)
  let iterate = true 
  let area = 0 
  let totalSafePoints = 0 
  let points = []
  let queue = [point] 
  let z = 0

  const reducer = (a, c) => parseInt(a) + parseInt(c)
  const safe = (X, Y) => {

    return [Math.abs(X).toString().split(''), Math.abs(Y).toString().split('')].flat().reduce(reducer) <= 23
  } 


   
  
  while (iterate) {
    const examineNeighboringPoints = (x, y) => {
      let arr = [
        new Point(x, y + 1, safe(x, y + 1), false), // north: x, y + 1
        new Point(x + 1, y, safe(x + 1, y), false), // east: x + 1, y
        new Point(x, y - 1, safe(x, y - 1), false), // south: x, y - 1
        // new Point(x - 1, y, false, safe(x - 1, y)) // west: x - 1, y KEEP 
        new Point(x + 599, y + 599, safe(x + 599, y + 599), false) // west: REMOVE 
      ]
      arr.forEach(e => {
        const queued = queue.some( p => p.x === e.x && p.y === e.y)
        const inPoints = points.some(p => p.x === e.x && p.y === e.y)
        const { safe } = e
        console.log(e.x, e.y, `already queued? ${queued}. in points? ${inPoints}, safe? ${safe}`)
        if (queued || inPoints) console.log('point already accounted for')
        else if (safe && !queued && !inPoints) queue.push(e)
        else if (!safe && !queued && !inPoints) {
          e.examined = true
          points.push(e) // point not safe, therefor we say it has been examined and push it into the points array, which contains only examined points
        }
      })
    }
    console.log('queue', queue)
    queue.shift()
    console.log('queue after shifting current point', queue)
    point.examined = true
    points.push(point)
    
    const { x, y } = point
    console.log(`points includes latest x ${x} and y ${y}?`, points.includes(point))
    console.log('CURRENT POINT', x, y)
    

    examineNeighboringPoints(x, y)
        
    
    point = queue[0]
    console.log('NEW', point)

    
    z += 1 // remove 
    iterate = z < 3 // fix 
    
  }
  return points 
}



console.log("final answer", calculateRobotSafeArea()) // 154260