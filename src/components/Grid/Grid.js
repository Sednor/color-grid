import React from 'react'
import './Grid.scss'

const colors = ['pink', 'darkblue', 'green', 'red', 'cadetblue', 'rebeccapurple', 'purple', 'peru', 'brown']

export const Grid = () => {

  const setRandomColor = () => {

    const colorIdx = Math.floor(Math.random() * colors.length)
    return colors[colorIdx]
  }

  const grid = {
    rows: [
      {
        className: 'row',
        columns: [
          {
            value: 1
          },
          {
            className: 'box__vertical-group',
            rows: [
              {
                columns: [
                  {
                    value: 2
                  }
                ]
              },
              {
                className: 'box__horizontal-group',
                columns: [
                  {
                    value: 3
                  },
                  {
                    value: 4
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        className: 'row',
        columns: [
          {
            className: 'box__vertical-group',
            rows: [
              {
                columns: [{
                  value: 5,
                  containerHeight: 'small'
                }]
              },
              {
                columns: [{
                  value: 6
                }]
              }
            ]
          },
          {
            rows: [
              {
                columns: [{
                  value: 7
                }]
              }
            ]
          },
          {
            className: 'box__vertical-group',
            rows: [
              {
                columns: [{
                  value: 8
                }]
              },
              {
                columns: [{
                  value: 9,
                  containerHeight: 'small'
                }]
              }
            ]
          }
        ]
      }
    ]
  }

  const gridMapper = (rows) => {
    return rows.map((row, index) => {
      const renderRow = row.columns.map((column) => {
        const { rows, value, containerHeight, className } = column
        const renderColumn = rows ? gridMapper(rows) :
          <div key={value} className={`box__container ${containerHeight ? containerHeight : ''}`}>
            <div className="box" style={{ backgroundColor: setRandomColor() }}>{value}</div>
          </div>

        return className ? <div key={value} className={className}>{renderColumn}</div> : renderColumn
      })

      return row.className ?
        <div key={index + Math.random() * 100} className={row.className}>{renderRow}</div> : renderRow
    })
  }
  

  return (
    <div className="grid">

      <div className="row">
        <div className="box__container">
          <div className="box" style={{ backgroundColor: setRandomColor() }}>1</div>
        </div>

        <div className="box__vertical-group">
          <div className="box__container">
            <div className="box" style={{ backgroundColor: setRandomColor() }}>2</div>
          </div>
          <div className="box__horizontal-group">
            <div className="box__container">
              <div className="box" style={{ backgroundColor: setRandomColor() }}>3</div>
            </div>
            <div className="box__container">
              <div className="box" style={{ backgroundColor: setRandomColor() }}>4</div>
            </div>
          </div>
        </div>

      </div>

      <div className="row">
        <div className="box__vertical-group">
          <div className="box__container small">
            <div className="box " style={{ backgroundColor: setRandomColor() }}>5</div>
          </div>

          <div className="box__container">
            <div className="box" style={{ backgroundColor: setRandomColor() }}>6</div>
          </div>
        </div>

        <div className="box__container">
          <div className="box" style={{ backgroundColor: setRandomColor() }}>7</div>
        </div>

        <div className="box__vertical-group">
          <div className="box__container">
            <div className="box" style={{ backgroundColor: setRandomColor() }}>8</div>
          </div>
          <div className="box__container small">
            <div className="box" style={{ backgroundColor: setRandomColor() }}>9</div>
          </div>
        </div>
      </div>

      {gridMapper(grid.rows)}

    </div>)
}

