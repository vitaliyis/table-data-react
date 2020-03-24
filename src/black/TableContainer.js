import React, {Fragment, useState, useEffect} from 'react'
import Spinner from "../Loader/Spinner";
import UserInfo from "./UserInfo";
import {connect} from "react-redux";
import {setCurrentPage, updateData, updateSortData} from "../../redux/reducers/table/table.actions";
import PaginationContainer from "../Pagination/PaginationContainer";
import FormAdd from "../Form/FormAdd";
import Table from "./Table";

const TableContainer = props => {
  const {data, isLoading, updateData, updateSortData, setCurrentPage} = props
  const {id, firstName, lastName, email, phone} = props.sortFields
  const {quantityPage, currentPage, sizePage} = props.pagination

  // hooks
  const [userData, setUserData] = useState(null)
  const [showForm, setShowForm] = useState(false)
  useEffect(() => {
    setUserData(null)
    setShowForm(false)
  }, [isLoading])

  const sortById = () => {
    const dataUpdate = [...data]
    if (!id) {
      dataUpdate.sort((prev, next) => (prev.id - next.id))
    } else {
      dataUpdate.sort((prev, next) => (next.id - prev.id))
    }
    updateData(dataUpdate)
    updateSortData({id: !id})
  }

  const sortByUpNumber = (prev, next) => {
    return (Number(prev.phone.replace(/\D/g, '')) - Number(next.phone.replace(/\D/g, '')))
  }

  const sortByDownNumber = (prev, next) => {
    return (Number(next.phone.replace(/\D/g, '')) - Number(prev.phone.replace(/\D/g, '')))
  }

  const sortByPhone = () => {
    const dataUpdate = [...data]
    !phone ? dataUpdate.sort(sortByUpNumber) : dataUpdate.sort(sortByDownNumber)

    updateData(dataUpdate)
    updateSortData({phone: !phone})
  }

  const sortByUp = key => (prev, next) => {
    if (prev[key] < next[key]) return -1
    if (prev[key] > next[key]) return 1
  }

  const sortByDown = key => (prev, next) => {
    if (prev[key] > next[key]) return -1
    if (prev[key] < next[key]) return 1
  }

  const sortByString = (conditionField, sortField) => {
    const dataUpdate = [...data]
    !conditionField ? dataUpdate.sort(sortByUp(sortField)) : dataUpdate.sort(sortByDown(sortField))
    updateData(dataUpdate)
    updateSortData({[sortField]: !conditionField})
  }

  const sortByFirstName = () => {
    sortByString(firstName, 'firstName')
  }

  const sortByLastName = () => {
    sortByString(lastName, 'lastName')
  }

  const sortByEmail = () => {
    sortByString(email, 'email')
  }

  const getDataByCurrentPage = data => {
    const beginPage = sizePage * currentPage - sizePage
    const endPage = sizePage * currentPage
    return data.slice(beginPage, endPage - 1)
  }

  const dataCurrentPage = data ? getDataByCurrentPage(data) : null

  return(
    <Fragment>
      {isLoading ? <Spinner/> :
        data ?
          <div>
            <div className="text-left mb-3">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setShowForm(!showForm)}
              >Add user</button>
            </div>

            {showForm ? <FormAdd
                          updateData={updateData}
                          data={data}
                          updateSortData={updateSortData}
                          setCurrentPage={setCurrentPage}
                        /> : null}

            { quantityPage > 1
                ? <PaginationContainer
                    currentPage={currentPage}
                    quantityPage={quantityPage}
                    setCurrentPage={setCurrentPage}
                  />
                : null
            }

            <Table
              sortById={sortById}
              sortByFirstName={sortByFirstName}
              sortByLastName={sortByLastName}
              sortByEmail={sortByEmail}
              sortByPhone={sortByPhone}
              sortFields={props.sortFields}
              dataCurrentPage={dataCurrentPage}
              userData={userData}
              setUserData={setUserData}
            />

            { quantityPage > 1
              ? <PaginationContainer
                currentPage={currentPage}
                quantityPage={quantityPage}
                setCurrentPage={setCurrentPage}
              />
              : null
            }
          </div>

        : <div>Data not downloaded.</div>}

      {userData ? <UserInfo userData={userData}/> : null}

    </Fragment>


  )
}

const mapStateToProps = (state) => {
  return {
    data: state.tableDataReducer.data,
    isLoading: state.tableDataReducer.isLoading,
    sortFields: state.tableDataReducer.sortFields,
    pagination: state.tableDataReducer.pagination
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateData: (data) => dispatch(updateData(data)),
    updateSortData: data => dispatch(updateSortData(data)),
    setCurrentPage: currentPage => dispatch(setCurrentPage(currentPage))

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TableContainer)