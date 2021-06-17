import { useEffect, useState } from 'react'

export const isFalsy = (value: any) => (value === 0 ? false : !value)

// 清楚对象空值
// 暂时any   object
export const clearnObject = (object: any) => {
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

// 普通debounce
// export const debounce = (fn, delay) => {
//   let timeout
//   return (...param) => {
//     if (timeout) {
//       clearTimeout(timeout)
//     }
//     timeout = setTimeout(() => {
//       fn(...param)
//     }, delay)
//   }
// }

//custom hook debounce
export const useDebounce = <V>(value: V, delay?: number) => {
  const [debounceValue, setDebounceValue] = useState(value)
  useEffect(() => {
    // 每次在value变化之后，设置一个定时器
    const timeout = setTimeout(() => setDebounceValue(value), delay)
    //每次在上一次useEffect处理完后再运行
    return () => clearTimeout(timeout)
  }, [value, delay])
  return debounceValue
}

//custom hook
export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback()
  }, [])
}

// custom useArray
export const useArray = <T>(initArray: T[]) => {
  const [value, setValue] = useState(initArray)

  return {
    value,
    setValue,
    add: (item: T) => {
      setValue([...value, item])
    },
    removeIndex: (index: number) => {
      const copy = [...value]
      copy.splice(index, 1)
      setValue(copy)
    },
    clear: () => {
      setValue([])
    },
  }
}
