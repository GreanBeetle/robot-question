/**
 There is a robot on a grid. The robot starts at 0, 0. From (x, y) the robot can move to either
 (x+1, y) or (x-1, y) or (x, y+1) or (x, y-1). Some grid points have EMP mines and are dangerous. 
 To determine whether an (x, y) coordinate is safe, add the digits of the abs(x) coordinate with
 the digits of the abs(y) coordinate. If the sum is less than or equal to 23, the coordinate is safe. 
 If it's greater than 23, the coordinate is unsafe and the robot will explode.  
 For example, the coordinate (51, 17) is safe, because 5+1+1+7 is 14, which is less than 23. 
 The coordinate (-99, -99) is not safe, because 9+9+9+9 = 36, which is more than 23.   
 @returns {number} area - total area the robot can safely access 
*/
const calculateRobotSafeArea = () => {
  let x = 0, y = 0
  let x1y1, x2y2
  let area = 0

  /**
   This approach holds x constant while letting y iterate until a coordinate equals 23
   For example, with x at 69, y iterates up to 8, which yields 
   the maximum safe coordinate (69, 8), i.e. 6+9+8 i = 23, for this particular y axis.   
   
   At this point we do a couple of things. 
   
   First, we tally update the total area. See function updateArea() for an explanation. 

   Second, we increment x by 1, reset y to 0, and once more loop until 
   a safe coordinate is reached. Notice how incrementing x from 69 to 70 changes the calculus here. 
   With a 0 in the mix, y must now iterate all the way up to 79, because 7+0+7+9 is 23.
   This leads to spikes in our "safe area".   
   */

   while (x <= 599) {
    const reducer = (a, c) => parseInt(a) + parseInt(c)
    const sum = [x.toString().split(''), y.toString().split('')].flat().reduce(reducer)
    if (sum < 23) {
      y = y + 1
    } else if (sum === 23) {
      x1y1 = x2y2
      x2y2 = [x, y]
      area = x1y1 ? area + updateArea(x1y1[0], x1y1[1], x2y2[0], x2y2[1]) : area
      y = 0
      x = x + 1
    }
  }

  return area * 4
}

/**  
      | (Ax, Ay)    
      |     
      |     
      | (Cx, Cy)  | (Bx, By)
      |           |
      |           |    
  ____|___________|_________

  Calulate area of a bar on a bar graph given the following assumptions: 
  * The bar is topped with differently-shaped triangles
  * The width of the bar is always 1  
  @returns {number} area of triangle tip + area of remaining rectangle  
*/

const updateArea = (Ax, Ay, Bx, By) => {
  const Cx = Ax // the coordinate (Cx, Cy) is (Ax, By)
  const Cy = By
  const triangleArea = Math.abs(((Ax * (By - Cy)) + (Bx * (Cy - Ay)) + (Cx * (Ay - By))) / 2)
  return triangleArea + By
}

console.log('answer', calculateRobotSafeArea()) 