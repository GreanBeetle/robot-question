// const calculateRobotSafeArea = () => {
//   const start = new Date().toLocaleTimeString() // not necessary 
//   let z = 0 // remove 
//   let area = 0
//   let index = 0
//   let iterate = true
//   let points = [{ x: 0, y: 0, safe: true, examined: false }] // change to coordinates? 


//   const reducer = (a, c) => parseInt(a) + parseInt(c)
//   const safe = (X, Y) => [Math.abs(X).toString().split(''), Math.abs(Y).toString().split('')].flat().reduce(reducer) <= 23

//   // assign each coordinate a uniqueId - if stored in an object - or a uniqueIndex
//   // create uniqueId function


//   const sortNeighboringPoints = (x, y) => {

//     // change arr to neighboringCoordinates
//     const arr = [
//       { x: x, y: y + 1, safe: safe(x, y + 1), examined: false },
//       { x: x + 1, y: y, safe: safe(x + 1, y), examined: false },
//       { x: x, y: y - 1, safe: safe(x, y - 1), examined: false },
//       { x: x - 1, y: y, safe: safe(x - 1, y), examined: false }
//     ]

//     for (let a of arr) {
//       let exists = false // change variable to alreadyExists in points or coordinates

//       let okayX = Math.sign(a.x) === 1 || Math.sign(a.x) === 0 // X is positive number or X is 0 
//       let okayY = Math.sign(a.y) === 1 || Math.sign(a.y) === 0 // Y is positive number or Y is 0 
//       let staysInQuadrant = okayX && okayY

//       for (let i = points.length - 1; i >= 0; i -= 1) {
//         if (points[i].x === a.x && points[i].y === a.y) {
//           exists = true
//           break
//         }
//       }

//       if (!exists && a.safe && staysInQuadrant) points.push(a)
//     }

//   }

//   const incrementArea = (x, y) => safe(x, y + 1) && safe(x + 1, y + 1) && safe(x + 1, y)

//   while (iterate) {
//     currentPoint = points[index]
//     // console.log(currentPoint) // REMOVE
//     if (currentPoint.safe && !currentPoint.examined) sortNeighboringPoints(currentPoint.x, currentPoint.y)
//     const areaShouldIncrement = incrementArea(currentPoint.x, currentPoint.y)
//     console.log('area should increment', areaShouldIncrement)
//     if (incrementArea(currentPoint.x, currentPoint.y)) area += 1
//     z += 1 // REMOVE
//     points[index].examined = true
//     index += 1
//     iterate = points[index] !== undefined // KEEP 
//     // iterate = z < 222 // REMOVE 
//   }

//   console.log('points', points.reverse())
//   const end = new Date().toLocaleTimeString()
//   console.log(`start: ${start} end ${end}`)
//   console.log('area', area * 4)
//   return ((points.length - 699) * 4) + 1
// }



// console.log("final answer", calculateRobotSafeArea()) // 154260

// **************************************************
// REPL SOLUTION
// ***********************************************************************************************

let index = 0
let shouldContinue = true
const coordinates = new Map()
coordinates.set('00', { x: 0, y: 0, safe: true, examined: false })
const reducer = (a, c) => parseInt(a) + parseInt(c)
const safe = (x, y) => [Math.abs(x).toString().split(''), Math.abs(y).toString().split('')].flat().reduce(reducer) <= 23

const analyzeNeighboringCoordinates = (X, Y) => {
  const createID = (x, y) => x.toString().concat(y.toString())

  // the examined property for this X Y needs to be changed to true 

  analyzeNeighbors = (x, y) => {
    const neighbors = [
      { x: x, y: y + 1, safe: safe(x, y + 1), examined: false },
      { x: x + 1, y: y, safe: safe(x + 1, y), examined: false },
      { x: x, y: y - 1, safe: safe(x, y - 1), examined: false },
      { x: x - 1, y: y, safe: safe(x - 1, y), examined: false },
    ]
  
    for (let neighbor of neighbors) {
      const id = createID(neighbor.x, neighbor.y)
      const doesNotExistInMap = coordinates[id] === undefined      
      console.log(`neighbor ${id} does not exist in map: ${doesNotExistInMap}. safe ${neighbor.safe}`) // REMOVE
      if (doesNotExistInMap && neighbor.safe) coordinates.set(id, neighbor)
    }
  }

  analyzeNeighbors(X, Y)
}

// this while loop exists on it's own, outside the scope of any function 
while (shouldContinue) {
  let x = 0, y = 0 // starting point is 0, 0, which has already been set in the map

  // after examining 0, 0, this kicks in and bumps up the values of x and y
  // based on the index current Map[index]
  if (index > 0) {
    let key = Array.from(coordinates.keys())[index]
    // console.log(`next key ${key}`)
    x = coordinates.get(key).x
    y = coordinates.get(key).y
  }
  
  shouldContinue = x !== undefined && y !== undefined
  // shouldContinue = index <= 100

  if (shouldContinue) {
    console.log(`X: ${x}, Y: ${y}`)
    analyzeNeighboringCoordinates(x, y) // eventually we'll 
    index += 1
  }
  

}



