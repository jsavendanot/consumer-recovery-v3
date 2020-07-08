import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import moment from 'moment';

const useStyles = makeStyles(() => ({
  recoveryText: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '11px',
    lineHeight: '14px',
    color: '#73BA9B'
  },
  jiemba: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  nameAndDateText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '12px',
    lineHeight: '14px',
    color: '#000000',
    marginTop: '10px'
  }
}));

type Props = {};
export const Header: React.FC<Props> = () => {
  const classes = useStyles();
  return (
    <Grid container>
      <Grid item xs>
        <img src="/images/export/header.svg" alt="header" />
      </Grid>
      <Grid item xs>
        <div style={{ border: '3px solid #73BA9B', margin: '5px 0 7px' }} />
        <div className={classes.jiemba}>
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEEAAAAQCAYAAABJJRIXAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAASXSURBVHgBzVddThtJEK7uHiQkXrwn2OEEwAnWPACJ9iFwAoyEE+3TjjGrPMY8rgLYPK1iI+GcAPKwIphIOCcwe4L4BjuRFimSZ7q2qqfbHk8Gs7DOT0nYprq6pn6/qhGQQ8HpSQFmPxXGmJ9mw8bGVjiUOf/DH54pZWQbq0+v4QtTcHVSUINBDzUeHT561oApkOCP3YtWHQWuW5Y/QToExPA2GdS6Mi3DbqPqeasICq7Ihv7B6vY8TIE8jqyOopJAUbhTGoFk8uUQIEQh79bxHZLXWN4KqbSXlFCB4Uj4QA59FLHofyatcIGCYDONZ4DyNWgMY4j6jce/9OErECr0RVLAUyOPP6wDwX+Q71Y7LRMECtSbw7XtM3cQdJqLXwMT7kvPCbsiNfNCCAz3V8qVPBkJDyRE9N3v3/5sLioQvcrFqxr8DxoDW8e7bBWf5/DJggKfVTvN091Oq7dz2XqRlUgCoAg/sIQIQbVz/CFPlwf3JuxngfHlz0+v6QFHUqgf826wc3ntstNploSUyAEVXImEOaSnH9+oJT5Xc9Ep8YqR8kIyful30mFkhWmHgkIDkKAJjwRCjYKxvr9aXnL6Y+Wd0JeftC6w6DpVBd2BMUAdVgJFss4RhQcSIXVAf1tpXvXd8Wb1svW3VF6P2uhq5+2rsZaj3j4hTGmzA5Qprq4+ffpqLq6ruQHbUrSihchhVooQRT+Oo/nD1fIPpO2IVCymn4H2fgywpwE/Wq5PNhUhG4TqxfE6GRLQJd/sCBNJ+HncXSpHDqK7b8qOHOTsihg2NOr3lPV61oChVpIBiUfW0BI/R2iokPEJT8on2TtaD5aHFYbQTeTUAn9xi1qxkLFKCbkwvBi7dQBGQTgggKMCYyUFykIvvwftjLakpByrGspiiTMh5wbmAZH0ata9tkfTQwqxmZZP9z87e/C43AUU4UhCtPcflRtklwVbzCbnOt1iQoqfEl3aZFx70uoXYUBJZttGXovNtI/DdohmvA0wD0RG06vcQEgoDeWj6C/IIe5Zc1dCkjlawiLP63FmuXwPVsjZDEUYnWV5cTzYy7D64/+O9pXqu+aviNq0QYxxMsI12oBSe0k8Mb8EVJAXPm6vBC+sW5Z4X4hnvOWkIjgQXi/dX4wZ1MQ2m6J9214g3dJlFiv7nfzucvnCBCKAu7ZGdp1+gTJMfII3Rr+WXeecmwygk92FZPbcPa6sBGMSG/jscKXcIIBwwS261hwbkRwIQtdlusSCBdPDNFYY3BgzjD4DRp9laeQIzWNGccKA10MmitIB66X3D85a9W2zAbOzYfYu967+x5uPb0xVGuJWpfsb9bVyzTln7eMQuTLvknPLTmZoi44p6Bikzw6TFutau0w13Lp6BQQs0oNTGkf+iCvaNL4q6RcpRztJoCjieq++9qzGPS+pDYSriLHRKto8SSjADZoKT2jpuvc7gAHguYEPNzP9PHsm3k3ZxvbeuX8mLyy4QCXz/uWEjdAFwWR9bdtUAW+RErOBxLP4ZmbrvoZPm3bOmyXqA9okc14PHko8ZqsXrVreGQeDgxncMnW+Fblx/i+snVn8/9R99QAAAABJRU5ErkJggg=="
            alt="Jiemba"
            style={{ marginBottom: '2px' }}
          />
          <span className={classes.recoveryText}>Recovery Plan</span>
        </div>
        <div style={{ border: '3px solid #73BA9B', marginTop: '7px' }} />
      </Grid>
      <Grid item xs={12} container justify="space-between">
        <span className={classes.nameAndDateText}>
          Name: {sessionStorage.getItem('FirstName')}
        </span>
        <span className={classes.nameAndDateText}>
          Date: {moment().format('L')}
        </span>
      </Grid>
    </Grid>
  );
};

export default Header;
