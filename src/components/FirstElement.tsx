import React from 'react'
import Item from './Item'
import {
  Direction,
  createViewportLayout,
  createScrollLayout,
  createItemLayout,
  useHorizontalScroll
} from '../plugins/scroll'

const direction = Direction.horizon

const SingleElement: React.FC<{
  width: number // viewport width
  height: number // viewport height
  size: number // single element size
  count: number // numbers of all items
}> = ({ width, height, size, count }) => {
  const { ref, onscroll, scrollLeft } = useHorizontalScroll<HTMLDivElement>()

  // which element is the first visible element in the whole content list
  const startNodeIndex = Math.floor(scrollLeft / size)

  // How far away is between the start edge of scrolling container and the
  // first visible element
  const offset = startNodeIndex * size

  return (
    // viewport
    <div
      style={createViewportLayout(width, height)}
      onScroll={onscroll}
      ref={ref}
      className="v-first-element__viewport"
    >
      {/* scroll area: render original scroll area size for correct scrollbar size */}
      <div
        style={createScrollLayout(size, count, direction)}
        className="v-first-element__scroll"
      >
        {/* single child element */}
        <Item index={-1} style={createItemLayout(offset, size, direction)}>
          items
        </Item>
      </div>
    </div>
  )
}

export default SingleElement
