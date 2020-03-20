import React from 'react'

const Pagination4 = (props) => {
  const {currentPage, numberPages, sizeChangePagination, setCurrentPage} = props

  return (
    <nav aria-label="...">
      <ul className="pagination">
        <li className="page-item" key={1}>
          <a className="page-link"
             href="#"
             onClick={() => setCurrentPage(1)}
          >{1}</a>
        </li>
        <li className="page-item" key={2}><span className="page-link">...</span></li>
        {numberPages.map(item => {
          return currentPage === item
            ? <li className="page-item active" key={item}><span className="page-link">{item}</span></li>
            : item >= numberPages.length - sizeChangePagination
              ? <li className="page-item" key={item}>
                  <a className="page-link"
                     href="#"
                     onClick={() => setCurrentPage(item)}
                  >{item}</a>
                </li>
              : null
        })}
      </ul>
    </nav>
  )
}

export default Pagination4