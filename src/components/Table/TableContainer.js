import React, {useState, useEffect} from 'react'
import Spinner from "../Loader/Spinner";
import UserInfo from "./UserInfo/UserInfo";
import {connect} from "react-redux";
import {setCurrentPage, updateData, updateSortData} from "../../redux/reducers/table/table.actions";
import PaginationContainer from "../Pagination/PaginationContainer";
import FormAdd from "../Form/FormAdd";
import Table from "./Table";

const TableContainer = props => {
  const {data, isLoading, updateData, updateSortData, setCurrentPage} = props
  const {quantityPage, currentPage} = props.pagination

  // hooks
  const [userData, setUserData] = useState(null)
  const [showForm, setShowForm] = useState(false)
  useEffect(() => {
    setUserData(null)
    setShowForm(false)
  }, [isLoading])

  if (isLoading) {
    return <Spinner/>
  }

  if (!data.length) {
    return <div>Data not downloaded.</div>
  }

  return(

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

        {userData ? <UserInfo userData={userData}/> : null}

      </div>
  )
}

const mapStateToProps = (state) => {
  return {
    data: state.tableDataReducer.data,
    isLoading: state.tableDataReducer.isLoading,
    pagination: state.tableDataReducer.pagination
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateData: data => dispatch(updateData(data)),
    updateSortData: data => dispatch(updateSortData(data)),
    setCurrentPage: currentPage => dispatch(setCurrentPage(currentPage))

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TableContainer)