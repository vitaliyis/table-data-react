import React from 'react'

const Table = props => {

  const {sortById, sortByFirstName, sortByLastName, sortByEmail, sortByPhone,
    setUserData, userData, dataCurrentPage} = props
  const {id, firstName, lastName, email, phone} = props.sortFields

  return (
    <div className="table-responsive">
      <table className="table table-bordered">
        <thead>
        <tr>
          <th scope="col" className="text-nowrap" onClick={sortById}>id {(id === null) ? null :  id ? <b>&uarr;</b> : <b>&darr;</b>}</th>
          <th scope="col" className="text-nowrap" onClick={sortByFirstName}>First Name {(firstName === null) ? null :  firstName ? <b>&uarr;</b> : <b>&darr;</b>}</th>
          <th scope="col" className="text-nowrap" onClick={sortByLastName}>Last Name {(lastName === null) ? null :  lastName ? <b>&uarr;</b> : <b>&darr;</b>}</th>
          <th scope="col" className="text-nowrap" onClick={sortByEmail}>Email {(email === null) ? null :  email ? <b>&uarr;</b> : <b>&darr;</b>}</th>
          <th scope="col" className="text-nowrap" onClick={sortByPhone}>Phone {(phone === null) ? null :  phone ? <b>&uarr;</b> : <b>&darr;</b>}</th>
        </tr>
        </thead>
        <tbody>
        {dataCurrentPage.map(item => {
          return (
            <tr key={item.id + item.phone}
                onClick={() => setUserData(item)}
                className={userData ? userData.id === item.id && userData.lastName === item.lastName ? "table-primary" : null : null}
            >
              <td>{item.id}</td>
              <td>{item.firstName}</td>
              <td>{item.lastName}</td>
              <td>{item.email}</td>
              <td>{item.phone}</td>
            </tr>
          )
        })}

        </tbody>
      </table>
    </div>
  )
}

export default Table