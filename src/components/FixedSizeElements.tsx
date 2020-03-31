import React, { useMemo } from 'react'
import {
  createItemLayout,
  Direction,
  createViewportLayout,
  createScrollLayout,
  useHorizontalScroll
} from '../plugins/scroll'

const direction = Direction.horizon

const FixedSizeElements: React.FC<{
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

  // How many expected visible nodes
  const numbersOfVisibleNodes = useMemo(
    () =>
      Math.ceil(width / size) +
      1 /* 1 extra padding node for scrolling to right */,
    [size, width]
  )

  // How many actual visible nodes
  const actualNumbersOfVisibleNodes = useMemo(
    // avoid visible nodes exceed the entire count
    () => Math.min(numbersOfVisibleNodes, count - firstVisibleNodeIndex),
    [count, firstVisibleNodeIndex, numbersOfVisibleNodes]
  )

  // all visible child nodes
  const childrenQueue: React.ComponentType<any>[] = useMemo(
    () => new Array(actualNumbersOfVisibleNodes).fill(render),
    [actualNumbersOfVisibleNodes, render]
  )
  return (
    <div
      style={createViewportLayout(width, height)}
      onScroll={onscroll}
      ref={ref}
      className="v-mul-fixed-element__viewport"
    >
      {/* scroll area: render original scroll area size for correct scrollbar size */}
      <div
        style={createScrollLayout(size, count, direction)}
        className="v-mul-fixed-element__scroll"
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

export default FixedSizeElements
