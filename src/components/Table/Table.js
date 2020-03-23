import React from "react";
import { connect } from "react-redux";

const Table = props => {
  const {
    sortById,
    sortByFirstName,
    sortByLastName,
    sortByEmail,
    sortByPhone,
    setUserData,
    userData,
    dataCurrentPage
  } = props;
  const { id, firstName, lastName, email, phone } = props.sortFields;

  return (
    <div className="table-responsive">
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col" className="text-nowrap" onClick={sortById}>
              id {id === null ? null : id ? <b>&uarr;</b> : <b>&darr;</b>}
            </th>
            <th scope="col" className="text-nowrap" onClick={sortByFirstName}>
              First Name{" "}
              {firstName === null ? null : firstName ? (
                <b>&uarr;</b>
              ) : (
                <b>&darr;</b>
              )}
            </th>
            <th scope="col" className="text-nowrap" onClick={sortByLastName}>
              Last Name{" "}
              {lastName === null ? null : lastName ? (
                <b>&uarr;</b>
              ) : (
                <b>&darr;</b>
              )}
            </th>
            <th scope="col" className="text-nowrap" onClick={sortByEmail}>
              Email{" "}
              {email === null ? null : email ? <b>&uarr;</b> : <b>&darr;</b>}
            </th>
            <th scope="col" className="text-nowrap" onClick={sortByPhone}>
              Phone{" "}
              {phone === null ? null : phone ? <b>&uarr;</b> : <b>&darr;</b>}
            </th>
          </tr>
        </thead>
        <tbody>
          {dataCurrentPage.map(item => {
            return (
              <tr
                key={item.id + item.phone}
                onClick={() => setUserData(item)}
                className={
                  userData
                    ? userData.id === item.id &&
                      userData.lastName === item.lastName
                      ? "table-primary"
                      : null
                    : null
                }
              >
                <td>{item.id}</td>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const normalizePhone = value => value.replace(/\D/g, "");

const sortByUpNumber = (prev, next) => {
  return (
    Number(normalizePhone(prev.phone)) - Number(normalizePhone(next.phone))
  );
};

const sortByDownNumber = (prev, next) => {
  return (
    Number(next.phone.replace(/\D/g, "")) -
    Number(prev.phone.replace(/\D/g, ""))
  );
};

const sortByUp = key => (prev, next) => {
  if (prev[key] < next[key]) return -1;
  if (prev[key] > next[key]) return 1;
};

const sortByDown = key => (prev, next) => {
  if (prev[key] > next[key]) return -1;
  if (prev[key] < next[key]) return 1;
};

const mapStateToProps = state => {
  const {
    sortFields,
    data,
    pagination: { sizePage, currentPage }
  } = state.getDataReducer;

  const sortById = data =>
    [...data].sort((prev, next) =>
      sortFields.id ? next.id - prev.id : prev.id - next.id
    );

  const sortByPhone = data => {
    switch (sortFields.phone) {
      case SORT_ASC:
        return [...data].sort(sortByUpNumber);
      case SORT_DESC:
        return [...data].sort(sortByDownNumber);
      default:
        return data;
    }
  };

  const sortByString = (data, sortCondition, sortByField) =>
    [...data].sort(
      sortCondition ? sortByDown(sortByField) : sortByUp(sortByField)
    );
  const sortByFirstName = data =>
    sortByString(data, sortFields.firstName, "firstName");

  const sortByLastName = data =>
    sortByString(data, sortFields.lastName, "lastName");

  const sortByEmail = data => sortByString(data, sortFields.email, "email");

  const getDataByCurrentPage = data => {
    const beginPage = sizePage * currentPage - sizePage;
    const endPage = sizePage * currentPage;
    return data.slice(beginPage, endPage - 1);
  };

  const dataCurrentPage = getDataByCurrentPage(
    sortByEmail(sortByLastName(sortByFirstName(sortByPhone(sortById(data)))))
  );

  return {
    dataCurrentPage,
    sortFields: state.getDataReducer.sortFields
  };
};

export default connect(mapStateToProps)(Table);
