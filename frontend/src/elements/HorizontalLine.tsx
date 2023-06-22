import React from 'react'
import variables from '../style/variables.module.scss'

interface IHorizontalLineProps {
  width: string
  lineheight?: number
  animated?: boolean
}

const HorizontalLine: React.FC<IHorizontalLineProps> = ({
  width,
  lineheight,
  animated,
}) => {
  const styles = {
    borderTop: `${lineheight}px solid ${variables.font_color}`,
    width,
  }

  return (
    <div
      className={animated ? 'horizontalline-animated-left' : ''}
      style={styles}
    />
  )
}

HorizontalLine.defaultProps = {
  lineheight: 2,
  animated: false,
}

export default HorizontalLine
