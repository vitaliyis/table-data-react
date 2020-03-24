import React from 'react'
import {connect} from "react-redux";
import {SORT_ASC, SORT_DESC} from "../../redux/reducers/table/tableData.reducer";
import {sortByDown, sortByDownNumber, sortByUp, sortByUpNumber} from "../../utils/utils";
import {updateSortData} from "../../redux/reducers/table/table.actions";
import ArrowMark from "./ArrowMark";

const Table = props => {

  const {setUserData, userData, dataCurrentPage, updateSortData} = props
  const {id, firstName, lastName, email, phone} = props.sortFields

  const updateSortField = (sortCondition, sortByField) => {
    return () => {
      switch(sortCondition){
        case SORT_ASC:
          updateSortData({[sortByField]: SORT_DESC})
          break
        case SORT_DESC:
          updateSortData({[sortByField]: SORT_ASC})
          break
        default:
          updateSortData({[sortByField]: SORT_ASC})
          break
      }
    }
  }

  return (
    <div className="table-responsive">
      <table className="table table-bordered">
        <thead>
        <tr>
          <th scope="col" className="text-nowrap" onClick={updateSortField(id, "id")}>id <ArrowMark sortCondition={id}/> </th>
          <th scope="col" className="text-nowrap" onClick={updateSortField(firstName, "firstName")}>First Name <ArrowMark sortCondition={firstName}/></th>
          <th scope="col" className="text-nowrap" onClick={updateSortField(lastName, "lastName")}>Last Name <ArrowMark sortCondition={lastName}/></th>
          <th scope="col" className="text-nowrap" onClick={updateSortField(email, "email")}>Email <ArrowMark sortCondition={email}/></th>
          <th scope="col" className="text-nowrap" onClick={updateSortField(phone, "phone")}>Phone <ArrowMark sortCondition={phone}/></th>
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

const mapStateToProps = state => {
  const {
    sortFields,
    data,
    pagination: {sizePage, currentPage}
  } = state.tableDataReducer

  const sortById = data => {
    switch (sortFields.id){
      case SORT_ASC:
        return [...data].sort((prev, next) => prev.id - next.id)
      case SORT_DESC:
        return [...data].sort((prev, next) => next.id - prev.id)
      default:
        return data
    }
  }

  const sortByPhone = data => {
    switch (sortFields.phone){
      case SORT_ASC:
        return [...data].sort(sortByUpNumber)
      case SORT_DESC:
        return [...data].sort(sortByDownNumber)
      default:
        return data
    }
  }

  const sortByString = (data, sortCondition, sortByField) => {
    switch (sortCondition){
      case SORT_ASC:
        return [...data].sort(sortByUp(sortByField))
      case SORT_DESC:
        return [...data].sort(sortByDown(sortByField))
      default:
        return data
    }
  }

  const sortByFirstName = data => sortByString(data, sortFields.firstName, 'firstName')
  const sortByLastName = data => sortByString(data, sortFields.lastName, 'lastName')
  const sortByEmail = data => sortByString(data, sortFields.email, 'email')

  const getDataByCurrentPage = data => {
    const beginPage = sizePage * currentPage - sizePage
    const endPage = sizePage * currentPage
    return data.slice(beginPage, endPage - 1)
  }

  const dataCurrentPage = getDataByCurrentPage(
    sortByEmail(sortByLastName(sortByFirstName(sortByPhone(sortById(data)))))
  )
  return {
    dataCurrentPage,
    sortFields,
    sortById,
    sortByPhone,
    sortByFirstName,
    sortByLastName,
    sortByEmail
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateSortData: data => dispatch(updateSortData(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Table)