import React, { useState, MouseEvent } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { ArrowDropDown } from '@material-ui/icons';
import { Menu, MenuItem, IconButton } from '@material-ui/core';
import { RouteComponentProps } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  root: {
    height: '100vh',
    backgroundColor: '#D5F2E3'
  },
  menuBox: {
    display: 'flex',
    alignItems: 'center'
  },
  headerMenuText: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontStyle: 'normal',
    fontSize: '18px',
    lineHeight: '127.69%',
    color: '#73BA9B'
  },
  headerMenuItemText: {
    fontFamily: 'Scada',
    fontWeight: 'bold',
    fontStyle: 'normal',
    fontSize: '18px',
    lineHeight: '127.69%',
    color: '#B7C38C'
  },
  notice: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column'
  },
  noticeText: {
    width: '540px',
    fontFamily: 'Scada',
    fontWeight: 700,
    fontStyle: 'normal',
    fontSize: '48px',
    lineHeight: '60px',
    color: '#37474F',
    marginBottom: '50px'
  },
  goBackText: {
    fontFamily: 'Roboto',
    fontWeight: 700,
    fontStyle: 'normal',
    fontSize: '24px',
    lineHeight: '28px',
    color: '#73BA9B',
    textDecoration: 'underline',
    cursor: 'pointer'
  }
}));

interface MatchParams {
  tab: string;
}
type Props = RouteComponentProps<MatchParams>;

const Error404: React.FC<Props> = ({ history }) => {
  const classes = useStyles();

  /** Header menus */
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);

  const handleClick = (event: MouseEvent) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (id: string) => {
    if (id === 'carer') {
      history.push('/home/carer');
    }
    setAnchorEl(null);
  };

  const [anchorEl2, setAnchorEl2] = useState<Element | null>(null);

  const handleClick2 = (event: MouseEvent) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleMenuClose2 = () => {
    setAnchorEl2(null);
  };

  return (
    <div className={classes.root}>
      <Grid container style={{ height: '100%' }}>
        <Grid
          item
          container
          alignItems="center"
          xs={12}
          style={{ height: '100px', marginLeft: '30px' }}>
          <Grid item xs={6}>
            <img
              src={
                'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAAAYCAMAAAAyNwimAAACeVBMVEUAAAAA//+AgIBVqqqAv4BmzJmAqqpttpKAv59xxo6As5l0uaJqv5V2sZ1ttqR3u5lwv594tJZxuJx5vKFzv5l0uZd1v59wuJl2up1xvZd2tptyuZ5zvZxwt5d0uZtxvJ51vZlxuJx1uphyvJp2t51zuZlwu5tzvJ50uZxxu5l0vJtyuJ1yu5x1uJlzuZtxup1zvJp0uZlyu5t0vJ11upxzuZxxupp0u5tyupx0vJpzuZt1up1zu5pzuZpyupt0u5x0uZxyupp0u5t0uppyu5pzuZtyupx0u5pzupt0u5xzuZpyuptzupxyu5tzuZxyupp0u5tyuZx0uZtzupx0u5pzuZtyupxyu5tzuZpyupt0u5xzu5p0uZtzuppzuZxyuppzuptyu5x0uZt0uppzuptzuZpyuptzupxyu5tzupp0uptzu5x0uZtzuZtzupp0uZpzuptzu5pyuZtzupxyuptyuppzuptzu5x0uZtzupt0uppzu5tyuZxzuptyuptzu5pzuptzupt0uZtzupp0uptzu5tyuZtzuptzupxzupt0uptzuptzuptyuptzu5pyuZtzupxzuptzu5tzupp0uptzupx0uZtzuptyuppzuZtzuptzupt0uptzuptzupxzuptzuptzupxzuptzupt0uptzuptyu5tzuptzuppzuZtzuptzuptzupp0uptzu5tzuptzupxzuZtzuptzuptzupxzuptyuptzuptzuptzuptzuptzuZtzuptzupt0uptzuptzuptzuptzuptzuptzuppzu5tzuptyuptzuptzuptzuptzuptzuptzuptzuptzuptzuptzupv///+ya+quAAAA0XRSTlMAAQIDBAUGBwgJCgsMDQ4PEBESExQWGBkaGxwdHyAhIiMkJSYnKCkqLC0uLzEyMzQ1Nzg5Oz4/QENERUZHSUpLTU5PUVNUVVZZWltcXV5fYGFiY2RlZmdpamtsbW5vcXJzdHV3enx9fn+BgoOEh4mLjI6PkJGTlJWWl5iZmpucnZ6goaKjpKWmp6mqq62ur7CxsrO0tba3uLm7vL/AwcPFx8jJysvMzc7Q0dLT1dbY2drc3d7f4OHj5OXm5+jp6uvs7u/w8fL09fb3+Pn6+/z9/uQsDjEAAAABYktHRNLg2K6wAAADZUlEQVQYGaXBi1tTBQDG4e8AAxwXJ5BSZhahXQkwIq24TC3DKJCLeCkyNS+lJWoUJpGJVohhZoUVhpKhYaEgFoUSlcyEufP7jzpnG1LmeMbj++rWNfS7NZHU3EVla9+ob7Lt3/lqZfG62t1NTUePdhx8RmEZpk8TWENoWQpDMpgxCu0CIQ3fpTBkAPEK7YmL2EYvnDzX88vQkInt6s+dXzRunK1w5AOJmkBiYYU7a0aEgiqAHREK32LApfDlAKWahCJgmv4j5635CikHKJUlt3OVwlECpCguY4aConaZmO/EKIQcoEyWrZCtm4qPl81Z9nSkpErA3XgV35E0+X2A7ftU3VwaUCHL7H6W6AYpTyY4yk6ZvgOJ0uO98Kak1Yz5I1OWp4Da03AiUkExubEadxuwXDbng4ZsCav27S2bItt7DPVj+0ilo1jmSa9g+7TkYzgfK+lD6IhoAYoUkNZNrcbNBKr0L7POwg+DvQ/IcgyL9xDwpQnXoFlaD5jVkvZBsaR+WKZ24DMFfAJfaVwGUCXbshMrJBnH4VRcHX1RkjqwVESOYOl7tBkuSZuBjbLkw9tStA/mxHiAkWT5vQy+53XdcmCJLIYH33QpDzx3Gt9BuqSfgNekXwFvlqqBRG2Fy05ZFkKdlAm4irBVy8/YC761GnMEyJIlFlggtcIex3YYjpV0CfYbUjewRaoCUlUDA7IdhAqpEEacZ7ENuuQX1QQ0RMsvG/A4ZEkAVivDhOE/ge2SIq7BC5L6wOOSysEbrZ3glRRVD8MuaR7QBV27gW0KcDQD3yTLkvQj0CBbElCnGgI6XZKcQLmk0/C+pBJok14EpsfktQNrJDkGsXRPd56D0fsVELkD6HEbSj8DXEmXzQUckBubr36qLA6gUtJirzdTUraJW0q9DCMmlhpDlpVA7x3SAhPaDAVV/Q30tXgAs1x+ScAmqQtonSvp3hX3aQCqZLn7HtkKnpVl4V/Y2h5TwKLGLSmy7AGWaszcdgKuFCtgDrBJWgoMrSt46ZjJ6zoMxfqf2zd//nVtpm6UdBF+m6oxkZU9WFrTFTQfWC8Zhwg6H6dZx7sSFLZCE7ZpXNRzh2se0XX5QIGkKS34DTwkKcLQJGyA3xVS7BlOOmTL29XV8+2GaZq8vHcfVmhJK2fq1v0DdzcosBIVfhkAAAAASUVORK5CYII='
              }
              alt=""
            />
          </Grid>
          <Grid item xs>
            <div className={classes.menuBox}>
              <span className={classes.headerMenuText}>How It Works</span>
              <IconButton onClick={handleClick}>
                <ArrowDropDown style={{ fill: '#73BA9B' }} />
              </IconButton>
            </div>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={() => handleMenuClose('')}>
              <MenuItem onClick={() => handleMenuClose('')}>
                <span className={classes.headerMenuItemText}>
                  Create A Recovery Plan
                </span>
              </MenuItem>
              <MenuItem onClick={() => handleMenuClose('carer')}>
                <span className={classes.headerMenuItemText}>
                  Access Other's Recovery Plan
                </span>
              </MenuItem>
            </Menu>
          </Grid>
          <Grid item xs>
            <div className={classes.menuBox}>
              <span className={classes.headerMenuText}>Information</span>
              <IconButton onClick={handleClick2}>
                <ArrowDropDown style={{ fill: '#73BA9B' }} />
              </IconButton>
            </div>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl2}
              keepMounted
              open={Boolean(anchorEl2)}
              onClose={handleMenuClose2}>
              <MenuItem onClick={handleMenuClose2}>
                <span className={classes.headerMenuItemText}>About Us</span>
              </MenuItem>
              <MenuItem onClick={handleMenuClose2}>
                <span className={classes.headerMenuItemText}>Privacy</span>
              </MenuItem>
              <MenuItem onClick={() => handleMenuClose('')}>
                <span className={classes.headerMenuItemText}>FAQ</span>
              </MenuItem>
            </Menu>
          </Grid>
          <Grid item xs>
            <span
              className={classes.headerMenuText}
              style={{ marginLeft: '30px', cursor: 'pointer' }}
              onClick={() => history.push('/auth')}>
              Sign In
            </span>
          </Grid>
          <Grid item xs>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                width: '96px',
                backgroundColor: '#FFFFFF',
                borderRadius: '18px',
                marginRight: '20px',
                padding: '5px',
                cursor: 'pointer'
              }}>
              <span
                className={classes.headerMenuText}
                onClick={() => history.push('/auth')}>
                Sign Up
              </span>
            </div>
          </Grid>
        </Grid>
        <Grid item xs={12} container>
          <Grid item xs={6}>
            <div className={classes.notice}>
              <div className={classes.noticeText}>
                The page you were looking for doesn’t exist.
              </div>
              <div
                className={classes.goBackText}
                onClick={() => history.goBack()}>
                Go back
              </div>
            </div>
          </Grid>
          <Grid item xs={6}>
            <img src="/images/error/404.svg" alt="" />
          </Grid>
        </Grid>
        <Grid item xs={12} />
      </Grid>
    </div>
  );
};

export default Error404;
