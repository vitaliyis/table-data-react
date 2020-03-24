import React from 'react'
import ListItem from "./ListItem";

const UserInfo = props => {
  const {id, firstName, lastName, email, phone, address, description} = props.userData
  return (
    <ul className="list-group text-left">
      <ListItem title="ID:" content={id}/>
      <ListItem title="Выбран пользователь:" content={`${firstName} ${lastName}`}/>
      <ListItem title="Описание:" content={description}/>
      <ListItem title="Адрес проживания:" content={address.streetAddress}/>
      <ListItem title="Город:" content={address.city}/>
      <ListItem title="Провинция/штат:" content={address.state}/>
      <ListItem title="Индекс:" content={address.zip}/>
      <ListItem title="Email:" content={email}/>
      <ListItem title="Телефон:" content={phone}/>
    </ul>
  )
}

export default UserInfo