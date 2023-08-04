import React from 'react'

interface ITextInputProps {
  id: string
  type: 'email' | 'text' | 'password'
  label: string
  value: string
  setValue:
    | React.Dispatch<React.SetStateAction<string>>
    | ((value: string) => void)
}

const TextInput: React.FC<ITextInputProps> = ({
  id,
  type,
  label,
  value,
  setValue,
}) => {
  return (
    <div className="textinput">
      <label htmlFor={id}>
        {label}
        <br />
        <input
          type={type}
          id={id}
          value={value || ''}
          onChange={(e) => setValue(e.target.value)}
        />
      </label>
    </div>
  )
}

export default TextInput
