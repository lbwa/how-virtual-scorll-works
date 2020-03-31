import React, { useMemo } from 'react'
import {
  createItemLayout,
  Direction,
  createViewportLayout,
  createScrollLayout,
  useHorizontalScroll
} from '../plugins/scroll'

const direction = Direction.horizon

const MultipleElements: React.FC<{
  width: number
  height: number
  size: number
  count: number
  render: React.ComponentType<any>
}> = ({ width, height, size, count, render }) => {
  const { ref, onscroll, scrollLeft } = useHorizontalScroll<HTMLDivElement>()

  // Which element is the first visible element in the whole content list
  const firstVisibleNodeIndex = Math.floor(scrollLeft / size)

  // How far away is between the start edge of scrolling container and the
  // first visible element
  const visibleOffset = firstVisibleNodeIndex * size

  // How many items
  const numbersOfVisibleNodes = useMemo(() => {
    const numbers = Math.ceil(width / size)
    return numbers + (firstVisibleNodeIndex + numbers <= size ? 1 : 0)
  }, [firstVisibleNodeIndex, size, width])

  // all visible child items
  const childrenQueue: React.ComponentType<any>[] = useMemo(
    () => new Array(numbersOfVisibleNodes).fill(render),
    [numbersOfVisibleNodes, render]
  )
  return (
    <div
      style={createViewportLayout(width, height)}
      onScroll={onscroll}
      ref={ref}
      className="v-mul-element__viewport"
    >
      {/* scroll area: render original scroll area size for correct scrollbar size */}
      <div
        style={createScrollLayout(size, count, direction)}
        className="v-mul-element__scroll"
      >
        {childrenQueue.map((Children, index) => (
          <Children
            key={index}
            index={firstVisibleNodeIndex + index}
            style={createItemLayout(visibleOffset, size, direction)}
          />
        ))}
      </div>
    </div>
  )
}

export default MultipleElements
