import React from 'react'

const FormField = props => {

  const {userPlaceholder, inputName, userValue, onChange, error, getLength} = props

  return (
    <div className="col-lg-auto  col-md-6 mb-2 mb-lg-0">
      <input
        type="text"
        className={`form-control ${error ? "is-invalid" : null}`}
        placeholder={userPlaceholder}
        name={inputName}
        value={userValue}
        onChange={onChange}
        onKeyUp={getLength}
      />
      <div className="invalid-feedback mt-0">{error}</div>
    </div>
  )
}

export default FormField