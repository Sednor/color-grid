import React, { useEffect } from 'react'
import { gridConfig } from './gridConfig'
import './Grid.scss'

const getRandomColor = () => {
  return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0').toUpperCase()
}

export const Grid = () => {
  const [screenWidth, setScreenWidth] = React.useState(window.innerWidth)

  const handleWindowResize = () => {
    setScreenWidth(window.innerWidth)
  }

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize)
    return () => window.removeEventListener('resize', handleWindowResize)

  }, [])


  const onChangeColor = () => {
    const elements = [...document.getElementsByClassName('box')]
    elements.map(box => box.setAttribute('style', `background-color: ${getRandomColor()}`))
  }

  const gridMapper = (rows) => {
    const isMobile = screenWidth <= 600

    return rows.map((row) => {
      const renderRow = row.columns.map((column) => {
        const { rows, value, containerHeight, className, mobileOrder } = column
        const renderColumn = rows ? gridMapper(rows) :
          <div key={value} className={`box__container ${containerHeight ? containerHeight : ''}`}
               onClick={() => onChangeColor()}>
            <div className="box" style={{ backgroundColor: getRandomColor() }}>{value}</div>
          </div>
        return className ? <div key={value} className={className}
                                style={{ order: isMobile ? mobileOrder : null }}>{renderColumn}</div> : renderColumn
      })

      return row.className ?
        <div className={row.className}
             style={{ order: isMobile ? row.mobileOrder : null }}>{renderRow}</div> : renderRow
    })
  }

  return (
    <div className="grid">
      {gridMapper(gridConfig.rows)}
    </div>)
}

