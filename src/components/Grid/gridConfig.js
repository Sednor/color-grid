export const gridConfig = {
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
              mobileOrder: -1,
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
          className: 'box__vertical-group mobile-small',
          mobileOrder: 1,
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
          mobileOrder: 0,
          rows: [
            {
              columns: [{
                value: 7
              }]
            }
          ]
        },
        {
          mobileOrder: 1,
          className: 'box__vertical-group mobile-small',
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
};