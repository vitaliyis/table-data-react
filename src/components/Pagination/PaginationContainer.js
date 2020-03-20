import React, {Fragment} from 'react'
import Pagination1 from "./Pagination1";
import Pagination2 from "./Pagination2";
import Pagination3 from "./Pagination3";
import Pagination4 from "./Pagination4";

const PaginationContainer = (props) => {
  const {quantityPage, currentPage, setCurrentPage} = props

  const lengthPagination = 7
  const sizeChangePagination = 4    // если currentPage выходит за его предел то пагинация меняется

  const numberPages = []
  for (let i = 1; i <= quantityPage; i++) { numberPages.push(i) }

  return (
    <Fragment>

      {quantityPage <= lengthPagination ?
        <Pagination1
          currentPage={currentPage}
          numberPages={numberPages}
          setCurrentPage={setCurrentPage}
        /> : null}

      {quantityPage > lengthPagination && currentPage <= sizeChangePagination ?
        <Pagination2
          currentPage={currentPage}
          numberPages={numberPages}
          sizeChangePagination={sizeChangePagination}
          setCurrentPage={setCurrentPage}
        /> : null}

      {quantityPage > lengthPagination && currentPage > sizeChangePagination &&
        (numberPages.length - sizeChangePagination) >= currentPage?
        <Pagination3
          currentPage={currentPage}
          numberPages={numberPages}
          setCurrentPage={setCurrentPage}
        /> : null}

      {quantityPage > lengthPagination && currentPage > sizeChangePagination &&
        (numberPages.length - sizeChangePagination) < currentPage ?
        <Pagination4
          currentPage={currentPage}
          numberPages={numberPages}
          sizeChangePagination={sizeChangePagination}
          setCurrentPage={setCurrentPage}
        /> : null}

    </Fragment>

  )
}

export default PaginationContainer