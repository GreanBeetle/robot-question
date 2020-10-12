/* 
  The following are possible values for quadrant
    'delta'
    'beta'
    'alpha'
    'gamma'
    'axes'
*/

class Point {
  constructor(x, y, safe, quadrant) {
    this.x = x, 
    this.y = y, 
    this.safe = safe, 
    this.quadrant = quadrant 
  }
}

module.exports = Point