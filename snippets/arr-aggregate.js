const arr = [
  3, 4, 9, 12, 13, 22, 23, 32, 33, 40, 40, 42, 45, 50,
  51, 55, 60, 64, 73, 73, 78, 81, 88, 89, 89, 92, 94, 94, 94, 95
]

function getTop (arr, n) {
  const sorted = arr.map(a => a).sort((a, b) => b - a)
  return sorted[n - 1]
}

function aggregate (arr, groups, limit) {
  const distance = []
  for (let i = 0; i < arr.length - 1; i++) {
    distance.push(arr[i + 1] - arr[i])
  }

  const key = getTop(distance, groups - 1)
  const indices = [0]
  for (let i = 0; i < distance.length; i++) {
    if (distance[i] >= key && indices.length < groups) {
      indices.push(i + 1)
    }
  }
  // console.log(indices)
  const results = []
  for (let j = 0; j < indices.length; j++) {
    results.push(arr.slice(indices[j], indices[j + 1]))
  }
  return results
}

const results = aggregate(arr, 10, 6)
console.log(results)
