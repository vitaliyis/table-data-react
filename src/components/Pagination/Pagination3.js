import React from 'react'

const Pagination3 = (props) => {
  const {currentPage, numberPages, setCurrentPage} = props

  const leftMark = currentPage - 2
  const rightMark = currentPage + 2

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
            : item >= leftMark && item <= rightMark
              ? <li className="page-item" key={item}>
                  <a className="page-link"
                     href="#"
                     onClick={() => setCurrentPage(item)}
                  >{item}</a>
                </li>
              : null
        })}
        <li className="page-item" key={numberPages.length - 2}><span className="page-link">...</span></li>
        <li className="page-item" key={numberPages.length - 1}>
          <a className="page-link"
             href="#"
             onClick={() => setCurrentPage(numberPages.length)}
          >{numberPages.length}</a>
        </li>
      </ul>
    </nav>
  )
}

export default Pagination3