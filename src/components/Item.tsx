import React from 'react'
import classnames from 'classnames'
import classes from './Item.module.sass'

const Item: React.FC<{
  index: number
  style: React.CSSProperties
  [key: string]: any
}> = ({ index, style, ...props }) => {
  return (
    <div
      {...props}
      style={style}
      className={classnames('v-item', classes.container)}
    >
      <span className={classes.text}>index: {index}</span>
    </div>
  )
}

export default Item
