import React from 'react'

const UserInfo = props => {
  const {id, firstName, lastName, email, phone, address, description} = props.userData
  return (
    <ul className="list-group">
      <li className="list-group-item">ID: <b>{id}</b></li>
      <li className="list-group-item">Выбран пользователь: <b>{firstName} {lastName}</b></li>
      <li className="list-group-item">Описание: <b>{description}</b></li>
      <li className="list-group-item">Адрес проживания: <b>{address.streetAddress}</b></li>
      <li className="list-group-item">Город: <b>{address.city}</b></li>
      <li className="list-group-item">Провинция/штат: <b>{address.state}</b></li>
      <li className="list-group-item">Индекс: <b>{address.zip}</b></li>
      <li className="list-group-item">Email: <b>{email}</b></li>
      <li className="list-group-item">Телефон: <b>{phone}</b></li>
    </ul>
  )
}

export default UserInfo