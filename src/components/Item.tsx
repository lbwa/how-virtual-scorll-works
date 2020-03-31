import React from 'react'

const Item: React.FC<{
  index: number
  style: React.CSSProperties
  [key: string]: any
}> = ({ index, style, ...props }) => {
  return (
    <div {...props} style={style} className="v-item">
      index: {index}
    </div>
  )
}

export default Item
