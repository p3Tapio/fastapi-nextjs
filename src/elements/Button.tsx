import React from 'react'
import './elements.scss'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  id: string
  type: 'button' | 'submit'
  theme: 'primary' | 'secondary' | 'warning'
  label: string
  onClick?: () => void
  disabled?: boolean
}

const Button: React.FC<ButtonProps> = ({
  type,
  theme,
  label,
  onClick,
  disabled,
  id,
}) => {
  return (
    <button
      id={id}
      type={type === 'button' ? 'button' : 'submit'}
      className={`button button-${theme}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  )
}

Button.defaultProps = {
  onClick: () => {},
  disabled: false,
}

export default Button
