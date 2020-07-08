import React, { useState, useEffect } from 'react';
import clsx from 'clsx';

import { makeStyles } from '@material-ui/styles';
import {
  Drawer,
  Divider,
  Paper,
  Avatar,
  Dialog,
  DialogContent,
  Slide,
  IconButton
} from '@material-ui/core';
import { Hidden, Theme } from '@material-ui/core';

import useRouter from 'common/utils/useRouter';
import { Navigation, Emergency } from 'common/components';
import navigationConfig from '../../navigationConfig';
import NavProfile from '../NavProfile';
import { TransitionProps } from '@material-ui/core/transitions';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: '100%',
    overflowY: 'auto',
    background: '#73BA9B'
  },
  content: {
    padding: theme.spacing(1)
  },
  profile: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 'fit-content',
    margin: '20px 0',
    cursor: 'pointer'
  },
  emergency: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 'fit-content',
    marginBottom: '40px',
    cursor: 'pointer'
  },
  avatar: {
    width: 60,
    height: 60
  },
  name: {
    marginTop: theme.spacing(1),
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '18px',
    lineHeight: '22px',
    color: '#003E1F'
  },
  divider: {
    marginTop: theme.spacing(2)
  },
  navigation: {
    marginTop: theme.spacing(2)
  },
  navProfile: {
    zIndex: 3,
    bottom: '0',
    left: '0',
    position: 'fixed',
    background: '#FFFFFF',
    borderRadius: '6px',
    width: '250px',
    height: '520px'
  }
}));

const Transition = React.forwardRef(
  (
    props: TransitionProps & { children?: React.ReactElement<any, any> },
    ref: React.Ref<unknown>
  ) => <Slide direction="right" ref={ref} {...props} />
);

type Props = {
  className: string;
  onMobileClose: () => void;
  openMobile: boolean;
};

const NavBar: React.FC<Props> = ({
  openMobile,
  onMobileClose,
  className,
  ...rest
}) => {
  const classes = useStyles();
  const router = useRouter();

  useEffect(() => {
    if (openMobile) {
      onMobileClose && onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.location.pathname]);

  /** Dialog */
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpen = () => {
    onMobileClose();
    setOpen(true);
  };

  /** Dialog for emergency numbers */
  const [open2, setOpen2] = useState(false);

  function handleClickOpen2() {
    setOpen2(true);
  }

  function handleClose2() {
    setOpen2(false);
  }
  const navProfileDialog = (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}>
      <DialogContent className={classes.navProfile}>
        <NavProfile close={handleClose} />
      </DialogContent>
    </Dialog>
  );

  const navbarContent = (
    <div className={classes.content}>
      <nav className={classes.navigation}>
        {navigationConfig.map(list => (
          <Navigation key={list.title} pages={list.pages} title={list.title} />
        ))}
      </nav>
      <div style={{ position: 'fixed', bottom: '0', width: 130 }}>
        <Hidden smDown>
          <div className={classes.emergency} onClick={handleClickOpen2}>
            <IconButton>
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAABZVBMVEUAAAD/gAD/qgD/gED/mTP/gCv/mRrxjhzylBvyjCbzkiT2jhz2kiT2lSP3kSL1kCL2kiH2kiD2lB/2kyH2kyD2kSD3kyL3kiL2kiD3kyL3kiH3kyD3kSD4kiL2kiH2kiH2kSH3kSL3kiL3kyH3kiH4kiH4kiD4kyL4kiL2kSH3kiH3kyD3kiL3kiH2kiH3kiH3kiD3kiL3kiH3kiH3kiH3kyL3kiH3kiH3kiH3kiH4kiH3kiH3kiH3kiH3kiH3kyP3kyT3lCT3lSb3lSf3lSj3lin3lir3lyv4nDX4njn4pEb4pUf5qE35qlH5qlL5q1P5rFb5rFf5tGb6tGf6tWj6tWn6t2z6u3X6wH76wYH7yJD7yZD80J/80aH80aL82bL82rT83Lj93br93rv93rz937395839587958/96ND+69b+7Nn+7dr+7t3+79/+8OD+8OH+8+f/+/b/+/f//Pn//Pr///8uxljWAAAAPnRSTlMAAgMEBQYKEhMUFRscHR41Njg5VVdYWlt3eHqGh4iTlJWXmJmbq62ur7O0tba70dLU1eHi4+Tq6+zt7vj5+kGlJc4AAAABYktHRHYxY8lBAAABsElEQVQYGYXBiUPSYBwG4HdIKEF5lyIeqGilBYWGc/O1w4vuw6LLyEqziyHV7++PjTEHfIPnQZPQUGLh5vrGxnp2ITGoIciFyVX6rCTjUDk/Z7KFmYqizSWdCmujaBaeZ4DZMHwiywy0FIEnvMwOrp9Dwzw7SsF1mV2MwNGXp+P170ql8vMp2+lR2OZY90VsH6kwg5q4ybqS2D5RwbwIYJKuA7EdUyUJaCt0vRXbvx0qrIYwxIbn4nhMlQEk2HD/j9RYu1QZxyI9hyJiFaiURpaefRGrQLUMdHruVuSIAfIweaYo8pJqBkye2TyR0z0qGdDp87AqJ9tUySNLv6LI123adh9t0SeDRTZ5L/J9j2TBkr/HpYMndKWRYLN3Iqf7LFji+EHXGAbZolgVObKkrkxXP7QcWzz4Jp4y625pQJKtNouWuMqsmwAQN9nmzovDqth+0WHEUJOiyr1nbz6UPr+iYwq23jy7WIvCMcouhuGaZUfTaAhdYQfXeuCJLDHQ1Qh8wikGmO5Bs5E8FW4Po03fjMEWxlQvVGLJHH1yEzEE0QbG0xndNPUb6bF+DX7/AXdlTG8YbnDpAAAAAElFTkSuQmCC"
                alt=""
              />
            </IconButton>
          </div>
        </Hidden>
        <Divider className={classes.divider} />
        <div className={classes.profile} onClick={handleClickOpen}>
          <Avatar
            alt=""
            className={classes.avatar}
            src={sessionStorage.getItem('Avatar')!}
          />
        </div>
        {open2 && <Emergency open={open2} close={handleClose2} />}
      </div>
    </div>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary">
          <div {...rest} className={clsx(classes.root, className)}>
            {navbarContent}
          </div>
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Paper
          {...rest}
          className={clsx(classes.root, className)}
          elevation={1}
          square>
          {navbarContent}
        </Paper>
      </Hidden>
      {open && navProfileDialog}
    </>
  );
};

export default NavBar;
