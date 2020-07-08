import React from 'react';
import { Unwell } from 'types/safety';
import { Card } from '@material-ui/core';
import Record from '../../../Record';

type Props = {
  values: Unwell[];
};

export const ListItems: React.FC<Props> = ({ values }) => {
  return (
    <>
      {values.map((value, index) => {
        return (
          <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
            <Card style={{ margin: '10px 0', width: '100%' }}>
              <Record value={value} key={index} />
            </Card>
          </div>
        );
      })}
    </>
  );
};

export default ListItems;
