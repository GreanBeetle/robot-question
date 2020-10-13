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
  let x, y, index = 0, iterate = true, safeArea = 0

  let grid = {
    axes: new Map(),
    delta: new Map(),
    beta: new Map(),
    alpha: new Map(),
    gamma: new Map(),
    analysisPoints: new Map()
  }

  grid.axes.set('00', new Point(0, 0, true, 'axes'))
  grid.analysisPoints.set('00', new Point(0, 0, true, 'axes'))

  const reducer = (a, c) => parseInt(a) + parseInt(c)
  const safe = (x, y) => [Math.abs(x).toString().split(''), Math.abs(y).toString().split('')].flat().reduce(reducer) <= 23
  
  const sign = num => Math.sign(num)
  const ID = (x, y) => x.toString().concat(y.toString()) 

  const quadrant = (x, y) => {
    if (sign(x) === 0 || sign(y) === 0) return 'axes'
    if (sign(x) === 1 && sign(y) === 1) return 'delta'
    if (sign(x) === 1 && sign(y) === -1) return 'beta'
    if (sign(x) === -1 && sign(y) === -1) return 'alpha'
    if (sign(x) === -1 && sign(y) === 1) return 'gamma'
  }
  
  const okay = neighbor => {
    const { x, y } = neighbor
    const delta = neighbor.quadrant === 'delta'
    const xAxis = sign(x) === 1 && y === 0
    const yAxis = sign(y) === 1 && x === 0
    return delta || xAxis || yAxis
  }

  const analyzeNeighboringCoordinates = (x, y) => {  
    const neighbors = [
      new Point(x, y + 1, safe(x, y + 1), quadrant(x, y + 1)), // north
      new Point(x + 1, y, safe(x + 1, y), quadrant(x + 1, y)), // east
      new Point(x, y - 1, safe(x, y - 1), quadrant(x, y - 1)), // south
      new Point(x - 1, y, safe(x - 1, y), quadrant(x - 1, y)), // west
    ]
    for (let neighbor of neighbors) {
      if (okay(neighbor)) {
        const id = ID(neighbor.x, neighbor.y)
        const missing = grid.analysisPoints[id] === undefined
        if (missing && neighbor.safe) grid.analysisPoints.set(id, neighbor)
      }
    }
  }

  const addArea = (x, y) => {
    const areaSafe = safe(x, y + 1) && safe(x + 1, y + 1) && safe(x + 1, y)
    if (areaSafe) safeArea += 1
  }

  const updateQuadrants = coordinate => {
      const { x, y } = coordinate
      if (x === 0 && y === 0) return
      switch(coordinate.quadrant) {
        case 'axes': 
          if (x === 0) grid.axes.set(ID(x, -y), new Point(x, -y, safe(x, -y), quadrant(x, -y)))  
          if (y === 0) grid.axes.set(ID(-x, y), new Point(-x, y, safe(-x, y), quadrant(-x, y)))
          break;                    
        case 'delta': 
          grid.delta.set(ID(x, y), new Point(x, y, safe(x, y), quadrant(x, y)))
          grid.beta.set(ID(x, -y), new Point(x, -y, safe(x, -y), quadrant(x, -y)))
          grid.alpha.set(ID(-x, -y), new Point(-x, -y, safe(-x, -y), quadrant(-x, -y)))
          grid.gamma.set(ID(-x, y), new Point(-x, y, safe(-x, y), quadrant(-x, y)))
          break; 
        default: 
          console.log('something went wrong in updateQuadrants')
          break; 
          // x, -y is BETA and X-AXIS (y === 0)
          // -x, y is GAMMA and Y-AXIS (x === 0)
        } 
     
  }
  
  while (iterate) {
    let key = Array.from(grid.analysisPoints.keys())[index]
    let coordinate = key ? grid.analysisPoints.get(key) : undefined
    x = key ? grid.analysisPoints.get(key).x : undefined
    y = key ? grid.analysisPoints.get(key).y : undefined
    if (x >= 599 || y >= 599) console.log(`INDEX ${index} X: ${x}, Y: ${y}`)
    
    iterate = x !== undefined || y !== undefined // KEEP 
    // iterate = index < 100 // REMOVE
    if (!iterate) break
    
    analyzeNeighboringCoordinates(x, y)
    addArea(x, y)
    updateQuadrants(coordinate)
    
    index += 1
  }

  const axeslength = Array.from(grid.axes.keys()).length
  const deltalength = Array.from(grid.delta.keys()).length
  const betalength = Array.from(grid.beta.keys()).length
  const alphalength = Array.from(grid.alpha.keys()).length
  const gammalength = Array.from(grid.gamma.keys()).length

  console.log('ANALYSIS POINTS', Array.from(grid.analysisPoints).reverse())

  console.log(`axes length ${axeslength}`)
  console.log(`delta length ${deltalength}`)
  console.log(`beta length ${betalength}`)
  console.log(`alpha length ${alphalength}`)
  console.log(`gamma length ${gammalength}`)
  console.log(`TOTAL VALID POINTS ${axeslength + deltalength + betalength + alphalength + gammalength}`)
  const end = new Date().toLocaleTimeString()
  console.log('safe area in delta quadrant', safeArea)
  console.log(`start ${start} start ${end}`)
}

android()


