import React, { useRef, useState, useEffect } from 'react'

export enum Direction {
  vertical = 'vertical',
  horizon = 'horizon'
}

export function createViewportLayout(
  viewportWidth: number,
  viewportHeight: number
): React.CSSProperties {
  return {
    width: viewportWidth,
    height: viewportHeight,
    overflow: 'auto',
    willChange: 'transform' // create a new layer for reducing repaint and reflow
  }
}

export function createScrollLayout(
  size: number,
  itemsCount: number,
  layout: Direction
): React.CSSProperties {
  if (layout === Direction.horizon) {
    return {
      width: size * itemsCount + 'px',
      height: '100%'
    }
  }

  if (layout === Direction.vertical) {
    return {
      width: '100%',
      height: size * itemsCount + 'px'
    }
  }

  throw new TypeError(`Unexpected layout, we got ${layout}`)
}

export function createItemLayout(
  offset: number,
  size: number,
  direction: Direction
): React.CSSProperties {
  let translateType: 'X' | 'Y' = 'X'
  let sizeType: 'width' | 'height' = 'width'
  let subSizeType: 'width' | 'height' = 'height'
  if (direction === Direction.vertical) {
    translateType = 'Y'
    sizeType = 'height'
    subSizeType = 'width'
  }
  return {
    [sizeType]: size,
    [subSizeType]: '100%',
    transform: `translate${translateType}(${offset}px)`
  }
}

export function useHorizontalScroll<E extends HTMLElement = HTMLElement>() {
  const ref = useRef<E>(null)
  const [scrollLeft, setScrollLeft] = useState(0)
  const onscroll: (evt: React.UIEvent<E, Event>) => void = evt => {
    // cache result because of React.js event pooling
    // https://reactjs.org/docs/events.html#event-pooling
    const offset = evt.currentTarget.scrollLeft

    // use requestAnimationFrame to throttle calling
    requestAnimationFrame(() => setScrollLeft(offset))
  }

  useEffect(() => {
    const scrollContainer = ref.current
    if (!scrollContainer)
      throw TypeError('Should has a scroll container element.')

    setScrollLeft(scrollContainer.scrollLeft)
    return () => {}
  }, [])

  return {
    ref,
    scrollLeft,
    onscroll
  }
}
