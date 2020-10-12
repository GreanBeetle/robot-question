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

// ***********************************************************************************************
// REVISED SOLUTION 
// BUNDLE ALL OF THIS CODE INTO A SINGLE METHOD 
// ADD ORIGINAL NOTES TO THIS, I.E. "There is a robot on a grid ... "
// FOR FASTER ITERATION, UPDATE THE DATA STRUCTURE LIKE SO 
//      let coordinates = {
//          axes: only coordinates along the axes, meaning either x or y is 0
//                0, 0 is the first axis point, total number of axes points should be ODD number  
//          deltaQuadrant: new Map() or array, x is positive, y is positive 
//          betaQuadrant: new Map() or array, x is positive, y is negative 
//          alphaQuadrant: new Map() or array, x is negative, is negative 
//          gammaQuadrant: new Map() or array, x is negative, y is positve 
//      }
// NEXT STEPS 
//   (1) calculate area of only delta quadrant
//   (2) use this comment section to show an example grid with the four different quadrants labeled 
//   (3) push coordinates to appropriate sub-category, i.e. axes, delta, beta, etc ... 
//   (4) refactor so that ONLY delta coordinates are analyzed, x is 0 or positive, y is 0 or positive,
//       this means that index will refer to coordinates.delta[index]
//       or better yet, index will refer to a variable - perhaps an array - of IDs 
//       let analysisPoints = ["0, 0"]
//       push to analysisPoints ONLY IF deltaQuadrant && both points are either positive numbers or zero 
//   (5) IF a point is SAFE, add all mirror points to the coordinates object. for example
//         (1, 1) is SAFE, meaning
//         (1, -1) is also SAFE, update betaQuadrant accordingly 
//         (-1, -1) is also SAFE, update alphaQuadrant accordingly 
//         (-1, 1) is also SAFE, update gammaQuadrant accordingly 
//       IF point is on an AXES and SAFE, update the opposite point on the AXES  
//         if X axis for example (698, 0), add (-698, 0) to the axes list 
//         if Y axis for example (0, 27), add (0, -27) to the axes list
//         obviously (0, 0) is a special case and will already be included. do nothing for (0,0)
//    (6) If a point has SAFEAREA! increment area by 4
//          I'm already doing this but I need a way to verify that I'm doing it correctly 
//          Write some node tests for this part .... 
// ***********************************************************************************************
const start = new Date().toLocaleTimeString()  
let index = 0, shouldContinue = true, x = 0, y = 0, totalSafeArea = 0 
// need (a) total safe points and (b) total safe area! 
// examined could perhaps mean "area examined"
const coordinates = new Map()
coordinates.set('00', { x: 0, y: 0, safe: true, examined: false })
const reducer = (a, c) => parseInt(a) + parseInt(c)
const safe = (x, y) => [Math.abs(x).toString().split(''), Math.abs(y).toString().split('')].flat().reduce(reducer) <= 23


const updateTotalSafeArea = (x, y) => {
  const valueIsOkay = value => value === 1 || value === 0 // value is either a positive number or 0, JS DOCS 
  // const xIsOkay = x => x === 1 || x === 0 // X is positive number or X is 0 
  // const yIsOkay = y => y === 1 || Math.sign(a.y) === 0 // Y is positive number or Y is 0
  const staysInQuadrant = valueIsOkay(Math.sign(x)) && valueIsOkay(Math.sign(y))
  const incrementArea = staysInQuadrant ? (safe(x, y + 1) && safe(x + 1, y + 1) && safe(x + 1, y)) : false 
  // console.log(`x is okay ${valueIsOkay(Math.sign(x))}. y is okay ${valueIsOkay(Math.sign(y))}. stays in quadrant ${staysInQuadrant}. increment area ${incrementArea}`) // REMOVE 
  if (staysInQuadrant && incrementArea) totalSafeArea += 4 // explain why multiplying by 4?
  // console.log(`new area total ${totalSafeArea}`) // REMOVE 

}

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
      const ID = createID(neighbor.x, neighbor.y)
      const doesNotExistInMap = coordinates[ID] === undefined      
      // console.log(`neighbor ${ID} does not exist in map: ${doesNotExistInMap}. safe ${neighbor.safe}`) // REMOVE
      if (doesNotExistInMap && neighbor.safe) coordinates.set(ID, neighbor)
    }
  }

  analyzeNeighbors(X, Y)
}




// this while loop exists on it's own, outside the scope of any function 
while (shouldContinue) {

  // after examining 0, 0, this kicks in and bumps up the values of x and y
  // based on the index current Map[index]
  if (index > 0) {
    let key = Array.from(coordinates.keys())[index]
    x = key ? coordinates.get(key).x : undefined
    y = key ? coordinates.get(key).y : undefined
  }
  
  shouldContinue = x !== undefined || y !== undefined // KEEP 
  // shouldContinue = index < 100 // REMOVE

  // console.log('should continue?', shouldContinue)

  if (shouldContinue) {
    if ((x + y % 4) === 0) console.log(`X: ${x}, Y: ${y}. AREA: ${totalSafeArea}. LENGTH: ${Array.from(coordinates.keys()).length}`)
    // console.log(`X: ${x}, Y: ${y}`)
    analyzeNeighboringCoordinates(x, y)
    updateTotalSafeArea(x, y) 
    index += 1
  }
}

const end = new Date().toLocaleTimeString() 
console.log('final coordinates', coordinates)
console.log('points', Array.from(coordinates.keys()).length )
console.log('total safe area', totalSafeArea)
console.log(`START ${start} END ${end}`)



