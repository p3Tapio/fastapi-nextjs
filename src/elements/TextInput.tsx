import React from 'react'

interface ITextInputProps {
  type: 'email' | 'text' | 'password'
  label: string
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>
}

const TextInput: React.FC<ITextInputProps> = ({
  type,
  label,
  value,
  setValue,
}) => {
  return (
    <div className="textinput">
      <label htmlFor={label}>
        {label}
        <br />
        <input
          type={type}
          id={label}
          value={value || ''}
          onChange={(e) => setValue(e.target.value)}
        />
      </label>
    </div>
  )
}

export default TextInput
