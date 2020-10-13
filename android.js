/***********************************************************************************************
REVISED SOLUTION 
BUNDLE ALL OF THIS CODE INTO A SINGLE METHOD 
ADD ORIGINAL NOTES TO THIS, I.E. "There is a robot on a grid ... "
FOR FASTER ITERATION, UPDATE THE DATA STRUCTURE LIKE SO 
     let coordinates = {
         axes: only coordinates along the axes, meaning either x or y is 0
               0, 0 is the first axis point, total number of axes points should be ODD number  
         deltaQuadrant: new Map() or array, x is positive, y is positive 
         betaQuadrant: new Map() or array, x is positive, y is negative 
         alphaQuadrant: new Map() or array, x is negative, is negative 
         gammaQuadrant: new Map() or array, x is negative, y is positve
         unsafePoints: new Map() or array, sum of total > 23 
         analysisPoints: new Map() or array, contain only positive or zero X and pos or zero Y  
     }

NEXT STEPS 
  (0) add class Point and, to the UI, add components Point and Quadrant (750height 750width with .5pixel units of measurement) and Axes (1500 length)
  (1) calculate area of only delta quadrant
  (2) use this comment section to show an example grid with the four different quadrants labeled 
  (3) push coordinates to appropriate sub-category, i.e. axes, delta, beta, etc ... 
  (4) refactor so that ONLY delta coordinates are analyzed, x is 0 or positive, y is 0 or positive,
      this means that index will refer to coordinates.delta[index]
      or better yet, index will refer to a variable - perhaps an array - of IDs 
      let analysisPoints = ["0, 0"]
      push to analysisPoints ONLY IF deltaQuadrant && both points are either positive numbers or zero 
  (5) IF a point is SAFE, add all mirror points to the coordinates object. for example
        (1, 1) is SAFE, meaning
        (1, -1) is also SAFE, update betaQuadrant accordingly 
        (-1, -1) is also SAFE, update alphaQuadrant accordingly 
        (-1, 1) is also SAFE, update gammaQuadrant accordingly 
      IF point is on an AXES and SAFE, update the opposite point on the AXES  
        if X axis for example (698, 0), add (-698, 0) to the axes list 
        if Y axis for example (0, 27), add (0, -27) to the axes list
        obviously (0, 0) is a special case and will already be included. do nothing for (0,0)
   (6) If a point has SAFEAREA! increment area by 4
         I'm already doing this but I need a way to verify that I'm doing it correctly 
         Write some node tests for this part .... 
   (7) Add UNSAFE POINTS as well! 
   (8) Write some tests that randomly select values from a Quadrant and 
            (a) test whether they are safe as expected
            (b) test whether the appropriate area is calculated 
            (c) etc ... 
***********************************************************************************************/

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



