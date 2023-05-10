export const getSum = (values: number[]) =>
  values.reduce((sum, value) => sum + value, 0)

export const sumColumns = (matrix: number[][]) =>
  matrix.reduce((acc, row) => {
    return row.map((num, index) => num + (acc[index] || 0))
  }, [])
