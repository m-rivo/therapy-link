type Props = {
  label: string
  name: string
  type: 'text' | 'password' | 'email'
  placeholder?: string
  required?: boolean
  defaultValue?: string
}

const Input = (props: Props) => {
  return (
    <div className={`flex flex-col gap-2`}>
      <label htmlFor={props.name}>{props.label}</label>
      <input
        required={props.required}
        className={`w-full textInput`}
        id={props.name}
        name={props.name}
        type={props.type}
        placeholder={
          props.placeholder ? props.placeholder : `Enter your ${props.label.toLowerCase()}`
        }
        defaultValue={props.defaultValue || ''}
      />
    </div>
  )
}

export default Input
