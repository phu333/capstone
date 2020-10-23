import React from 'react';
import { Line } from '@ant-design/charts';

const Chart = () =>  {
    const data = [
      { Date: '1/01/2020', value: 3 },
      { Date: '2/02/2020', value: 4 },
      { Date: '3/032020', value: 3.5 },
      { Date: '4/04/2020', value: 5 },
      { Date: '12/05/2020', value: 4.9 },
      { Date: '6/06/2020', value: 6 },
      { Date: '8/08/2020', value: 7 },
      { Date: '9/09/2020', value: 9 },
      { Date: '10/10/2020', value: 13 },
    ];
  
    const config = {
      data,
      height: 400,
      xField: 'Date',
      yField: 'value',
      point: {
        size: 5,
        shape: 'diamond',
      },
      label: {
        style: {
          fill: '#aaa',
        },
      },
    };
    return <Line {...config} />;
  };
  export default Chart;