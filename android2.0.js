const Point = require('./Point')
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





const android = () => {
  const start = new Date().toLocaleTimeString()
  let x, y, index = 0, iterate = true, totalSafeArea = 0

  let grid = {
    axes: new Map(),
    delta: new Map(),
    beta: new Map(),
    alpha: new Map(),
    gamma: new Map(),
    analysisPoints: new Map(),
    unsafePonts: new Map()
  }

  grid.axes.set('00', new Point(0, 0, true, 'axes'))
  grid.analysisPoints.set('00', new Point(0, 0, true, 'axes'))

  const reducer = (a, c) => parseInt(a) + parseInt(c)
  const safe = (x, y) => [Math.abs(x).toString().split(''), Math.abs(y).toString().split('')].flat().reduce(reducer) <= 23
  const sign = num => Math.sign(num) 

  // the only values here should be 
  // x = 0
  // y = 0
  // Math.sign(x) = 1, that is, x is positive
  // Math.sign(y) = 1, that is, y is positive
  // this method should never receive a negative x or negative y
  // add safeguard for this
  const updateTotalSafeArea = (x, y) => {
    const validArea = safe(x, y + 1) && safe(x + 1, y + 1) && safe(x + 1, y)
    if (validArea) totalSafeArea += 4 // explain why multiplying by 4?
  }

  quadrant = (x, y) => {
    if (sign(x) === 0 || sign(y) === 0) return 'asign(x)es'
    if (sign(x) === 1 && sign(y) === 1) return 'delta'
    if (sign(x) === 1 && sign(y) === -1) return 'beta'
    if (sign(x) === -1 && sign(y) === -1) return 'alpha'
    if (sign(x) === -1 && sign(y) === 1) return 'gamma'
  }
  
  const analyzeNeighboringCoordinates = (x, y) => {  
    const neighbors = [
      new Point(x, y + 1, safe(x, y + 1), quadrant(x, y + 1)), // northern neighbor
      new Point(x + 1, y, safe(x + 1, y), quadrant(x + 1, y)), // eastern neighbor
      new Point(x, y - 1, safe(x, y - 1), quadrant(x, y - 1)), // southern neighbor
      new Point(x - 1, y, safe(x - 1, y), quadrant(x - 1, y)), // western neighbor
    ]

    const okayNeighbor = (x, y) => console.log('bum')
  
    // here we analyze each neighboring point
    // if the neighboring point is safe (which it should be, only safe points should be added to the analysisPoints map)
    // if safe and in delta quadrant, or on a positive x or positive y axis, we add
    // it to the analysisPoints map 
    for (let neighbor of neighbors) {
      const okay = 
        neighbor.quadrant === 'delta' || 
        sign(neighbor.x) === 1 && neighbor.y === 0 || // x is positive, y is 0, for example (433, 0)
        x === 0 && sign(neighbor.y) === 1 // x is 0, y is positive, for example (0, 399)
      if (okay) {
        console.log(`X ${neighbor.x} Y ${neighbor.y}. NEIGHBOR`, neighbor)
        const ID = neighbor.x.toString().concat(neighbor.y.toString())
        const missing = grid.analysisPoints[ID] === undefined
        if (missing && neighbor.safe) grid.analysisPoints.set(ID, neighbor)
      }
    }
  }
  
  while (iterate) {
    let key = Array.from(grid.analysisPoints.keys())[index]
    x = key ? grid.analysisPoints.get(key).x : undefined
    y = key ? grid.analysisPoints.get(key).y : undefined
    // console.log(`X: ${x}, Y: ${y}`)
    
    iterate = x !== undefined || y !== undefined // KEEP 
    // iterate = index < 100 // REMOVE
    if (!iterate) break
    
    analyzeNeighboringCoordinates(x, y)
    updateTotalSafeArea(x, y)
    
    index += 1
  }

  
  console.log('total points', Array.from(grid.analysisPoints.keys()).length)
  const end = new Date().toLocaleTimeString()
  console.log('total safe area', totalSafeArea)
  console.log(`start ${start} start ${end}`)
}

android()


