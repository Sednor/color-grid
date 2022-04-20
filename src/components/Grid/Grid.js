import React, { useEffect, useMemo, useState } from 'react';
import { gridConfig } from './gridConfig';
import { configMapper } from '../../utils/configMapper';
import { getRandomColor } from '../../utils/getRandomColor';
import './Grid.scss';

export const Grid = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [config, setConfig] = useState(configMapper(gridConfig));
  const handleWindowResize = () => setScreenWidth(window.innerWidth);
  const isMobile = screenWidth <= 600;

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);


  const handleClick = () => {
    const newConfig = configMapper(config);
    setConfig(newConfig);
  };

  const gridMapper = (rows) => {
    return rows.map((row) => {
      const renderRow = row.columns.map((column) => {
        const { rows, value, containerHeight, className, mobileOrder, color } = column;
        const renderColumn = rows ? gridMapper(rows) :
          <div key={value} className={`box__container ${containerHeight ? containerHeight : ''}`}
               onClick={handleClick}>
            <div className="box" key={value + Math.random()}
                 style={{ backgroundColor: color || getRandomColor() }}>{value}</div>
          </div>;

        return className ? <div className={className}
                                key={Math.random() * 1000}
                                style={{ order: isMobile ? mobileOrder : null }}>{renderColumn}</div> : renderColumn;
      });

      return row.className ?
        <div className={row.className}
             key={Math.random() * 1000}
             style={{ order: isMobile ? row.mobileOrder : null }}>{renderRow}</div> : renderRow;
    });
  };
  const gridComponent = useMemo(() => gridMapper(config.rows),
    [isMobile, config]
  );

  return (
    <div className="grid">
      {gridComponent}
    </div>);
};

