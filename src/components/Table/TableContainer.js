import React, { Fragment, useState, useEffect } from "react";
import Spinner from "../Loader/Spinner";
import UserInfo from "./UserInfo";
import { connect } from "react-redux";
import {
  setCurrentPage,
  updateData,
  updateSortData
} from "../../redux/actions/actions";
import PaginationContainer from "../Pagination/PaginationContainer";
import FormAdd from "../Form/FormAdd";
import Table from "./Table";

const TableContainer = props => {
  const { data, isLoading, updateData, updateSortData, setCurrentPage } = props;
  const { id, firstName, lastName, email, phone } = props.sortFields;
  const { quantityPage, currentPage } = props.pagination;

  // hooks
  const [userData, setUserData] = useState(null);
  const [showForm, setShowForm] = useState(false);
  useEffect(() => {
    setUserData(null);
    setShowForm(false);
  }, [isLoading]);

  const sortByUpNumber = (prev, next) => {
    return (
      Number(prev.phone.replace(/\D/g, "")) -
      Number(next.phone.replace(/\D/g, ""))
    );
  };

  const sortByDownNumber = (prev, next) => {
    return (
      Number(next.phone.replace(/\D/g, "")) -
      Number(prev.phone.replace(/\D/g, ""))
    );
  };

  const sortByPhone = () => {
    const dataUpdate = [...data];
    !phone
      ? dataUpdate.sort(sortByUpNumber)
      : dataUpdate.sort(sortByDownNumber);

    updateData(dataUpdate);
    updateSortData({ phone: !phone });
  };

  const sortByUp = key => (prev, next) => {
    if (prev[key] < next[key]) return -1;
    if (prev[key] > next[key]) return 1;
  };

  const sortByDown = key => (prev, next) => {
    if (prev[key] > next[key]) return -1;
    if (prev[key] < next[key]) return 1;
  };

  const sortByString = (conditionField, sortField) => {
    const dataUpdate = [...data];
    !conditionField
      ? dataUpdate.sort(sortByUp(sortField))
      : dataUpdate.sort(sortByDown(sortField));
    updateData(dataUpdate);
    updateSortData({ [sortField]: !conditionField });
  };

  const sortByFirstName = () => {
    sortByString(firstName, "firstName");
  };

  const sortByLastName = () => {
    sortByString(lastName, "lastName");
  };

  const sortByEmail = () => {
    sortByString(email, "email");
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (!data.length) {
    return <div>Data not downloaded.</div>;
  }
  return (
    <div>
      <div className="text-left mb-3">
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          Add user
        </button>
      </div>

      {showForm ? (
        <FormAdd
          updateData={updateData}
          data={data}
          updateSortData={updateSortData}
          setCurrentPage={setCurrentPage}
        />
      ) : null}

      {quantityPage > 1 ? (
        <PaginationContainer
          currentPage={currentPage}
          quantityPage={quantityPage}
          setCurrentPage={setCurrentPage}
        />
      ) : null}

      <Table
        sortById={sortById}
        sortByFirstName={sortByFirstName}
        sortByLastName={sortByLastName}
        sortByEmail={sortByEmail}
        sortByPhone={sortByPhone}
        userData={userData}
        setUserData={setUserData}
      />

      {quantityPage > 1 ? (
        <PaginationContainer
          currentPage={currentPage}
          quantityPage={quantityPage}
          setCurrentPage={setCurrentPage}
        />
      ) : null}
      {userData ? <UserInfo userData={userData} /> : null}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    data: state.getDataReducer.data,
    isLoading: state.getDataReducer.isLoading,
    sortFields: state.getDataReducer.sortFields,
    pagination: state.getDataReducer.pagination
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateData: data => dispatch(updateData(data)),
    updateSortData: data => dispatch(updateSortData(data)),
    setCurrentPage: currentPage => dispatch(setCurrentPage(currentPage))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableContainer);
