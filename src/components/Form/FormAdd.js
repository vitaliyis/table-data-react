import React, {useState} from 'react'
import FormField from "./FormField";

const FormAdd = props => {

  const [buttonDisabled, setButtonDisabled] = useState(true)

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: ""
  })

  const [userErrors, setUserErrors] = useState({
    firstName: false,
    lastName: false,
    email: false,
    phone: false
  })

  const onChange = (event) => {
    setUserData({...userData, [event.target.name]: event.target.value})
    setUserErrors({...userErrors, [event.target.name]: false})
  }

  const getErrors = () => {
    const errors = {}

    // if (!userData.firstName.length) {errors.firstName= 'required'}
    // if (!userData.lastName.length) {errors.lastName= 'required'}
    if (!userData.lastName.length) {
      errors.lastName= 'required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(userData.email)) {
      errors.email='Invalid email address'
    }
    // if (!userData.phone.length) {errors.phone= 'required'}

    if (Object.keys(errors).length > 0) {
      // setUserErrors({...userErrors, ...errors})
      setUserErrors(errors)
      return true
    } else {
      setUserErrors({})
      return false
    }
  }

  // Получение самого большого ID
  const getLastId = data => {
    const sortData = [...data]
    sortData.sort((prev, next) => next.id - prev.id)

    return sortData[0].id
  }

  const onSubmit = (event) => {
    event.preventDefault()
    // вставить данные в data
    if (!getErrors()) {

      let id = getLastId(props.data)
      const newUserData = {id: id + 1, ...userData}
      const data = [newUserData, ...props.data]

      props.updateData(data)
      // обнуление сортировки
      props.updateSortData({
        id: null,
        firstName: null,
        lastName: null,
        email: null,
        phone: null
      })
      props.setCurrentPage(1)

      // Очистка формы
      setUserData({
        firstName: "",
        lastName: "",
        email: "",
        phone: ""
      })
    }
      else {}

  }

  const getLength = () => {
    let error = false

    for (let key in userData){
      if (userData[key].length === 0) { error = true}
    }

    error ? setButtonDisabled(true) : setButtonDisabled(false)

  }

  return (
    <form className="mb-3 mt-3">
      <div className="form-row">

        <FormField
          userPlaceholder="First Name"
          inputName="firstName"
          userValue={userData.firstName}
          onChange={onChange}
          error={userErrors.firstName}
          getLength={getLength}
        />

        <FormField
          userPlaceholder="Last Name"
          inputName="lastName"
          userValue={userData.lastName}
          onChange={onChange}
          error={userErrors.lastName}
          getLength={getLength}
        />

        <FormField
          userPlaceholder="Email"
          inputName="email"
          userValue={userData.email}
          onChange={onChange}
          error={userErrors.email}
          getLength={getLength}
        />

        <FormField
          userPlaceholder="Phone"
          inputName="phone"
          userValue={userData.phone}
          onChange={onChange}
          error={userErrors.phone}
          getLength={getLength}
        />

        <div className="col-lg-auto col-md-12 text-left">
          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={buttonDisabled}
            onClick={onSubmit}
          >Add</button>
        </div>

      </div>
    </form>
  )
}

export  default FormAdd