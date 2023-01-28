import { useLayoutEffect, useRef } from "react"

export function UseLatest(value) {
  const valueRef = useRef(value)

  useLayoutEffect(() => {
    valueRef.current = value
  }, [value])

  return valueRef
}
