export const isFalsy = (value) => (value === 0 ? false : !value)

// 清楚对象空值
export const clearnObject = (object) => {
  const result = { ...object }
  Object.keys(result).forEach((key) => {
    //0的时候
    const value = result[key]
    if (isFalsy(value)) {
      delete result[key]
    }
  })
  return result
}
