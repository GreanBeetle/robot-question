document.addEventListener('DOMContentLoaded', function (event) {
  const button = document.getElementById('start')
  button.addEventListener('click', () => {
    console.log('button clicked')
  })
});


const x = 1
const y = 0
const ceiling = 23

const calculateRobotArea = (x, y, ceiling) => {
  // console.log(`incoming x ${x} incoming y ${y}`)
  const reducer = (a, c) => parseInt(a) + parseInt(c)
  const sum = [x.toString().split(''), y.toString().split('')].flat().reduce(reducer)
  // console.log('sum', sum, 'ceiling', ceiling)
  if (sum < ceiling) calculateRobotArea(x + 1, y + 1, ceiling)
  else if (sum === ceiling ) console.log(`max area ${3.14 * (Math.pow(x,2) + Math.pow(y,2))}`)
  else if (sum > ceiling) {
    const newSum = [(x - 1).toString().split(''), y.toString().split('')].flat().reduce(reducer)
    console.log('new sum', newSum)
    if (newSum === ceiling) console.log(`max area ${3.14 * (Math.pow(x - 1, 2) + Math.pow(y, 2))}`)
  }
  else console.log('something went wrong')
  
  
  
  // {
  //   console.log('x', x, 'y', y)
  //   const newX = x - 5
  //   console.log(`sum with new x ${newX}`, [newX.toString().split(''), y.toString().split('')].flat().reduce(reducer))
  //   const radius = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))
  //   console.log('radius', radius)
  //   const area = 3.14 * Math.pow(radius,2)
  //   console.log('area', area)
  // } 
  
}

calculateRobotArea(x,y,ceiling)
calculateRobotArea(51,7,ceiling)
const calculateVersionTwo = (x, ceiling) => {
  const sumOfRadius = x.toString().split('').reduce((a,c) => parseInt(a) + parseInt(c))
  console.log('sum of radius', sumOfRadius)
  if (sumOfRadius === ceiling) console.log(`sumOfRadius is ${sumOfRadius}, x is ${x}`)
  else calculateVersionTwo(x + 1, ceiling)
}

// calculateVersionTwo(1, ceiling)



