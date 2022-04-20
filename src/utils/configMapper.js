import { getRandomColor } from './getRandomColor';

export const configMapper = (config) => ({
  rows: config.rows.map((row) => ({
    ...row,
    columns: row.columns.map((column) => {
      const newRows = column.rows ? configMapper(column) : {};

      return { ...column, ...newRows, color: getRandomColor() };
    })
  }))
});