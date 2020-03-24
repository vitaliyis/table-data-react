import React from 'react'

const ListItem = props => {
  const {title, content} = props
  return (
    <li className="list-group-item">
      <div className="row">
        <div className="col-5 col-sm-3">{title}</div>
        <div className="col-7 col-sm-9 text-break"><b>{content}</b></div>
      </div>
    </li>
  )
}

export default ListItem