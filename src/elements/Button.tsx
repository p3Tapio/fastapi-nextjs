import React from 'react'
import './elements.scss'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
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
}) => {
  return (
    <button
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
