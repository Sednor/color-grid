import React, { useEffect, useState } from 'react';
import { gridConfig } from './gridConfig';
import './Grid.scss';

const getRandomColor = () => {
  return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0').toUpperCase();
};

export const Grid = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [backgroundColors, setBackgroundColors] = useState({});

  const handleWindowResize = () => setScreenWidth(window.innerWidth);

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  const onChangeColor = () => {
    const newColors = {};
    for (let key in backgroundColors) {
      newColors[key] = getRandomColor();
    }
    return setBackgroundColors(newColors);
  };

  const gridMapper = (rows) => {
    const isMobile = screenWidth <= 600;

    return rows.map((row) => {
      const renderRow = row.columns.map((column) => {
        const { rows, value, containerHeight, className, mobileOrder } = column;
        if (!backgroundColors[value]) backgroundColors[value] = getRandomColor();
        const renderColumn = rows ? gridMapper(rows) :
          <div key={value} className={`box__container ${containerHeight ? containerHeight : ''}`}
               onClick={() => onChangeColor()}>
            <div className="box" style={{ backgroundColor: backgroundColors[value] }}>{value}</div>
          </div>;

        return className ? <div className={className}
                                style={{ order: isMobile ? mobileOrder : null }}>{renderColumn}</div> : renderColumn;
      });

      return row.className ?
        <div className={row.className}
             style={{ order: isMobile ? row.mobileOrder : null }}>{renderRow}</div> : renderRow;
    });
  };

  return (
    <div className="grid">
      {gridMapper(gridConfig.rows)}
    </div>);
};

