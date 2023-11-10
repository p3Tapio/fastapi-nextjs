import React from 'react'
import './button.scss'

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
  onClick = () => {},
  disabled = false,
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

export default Button
