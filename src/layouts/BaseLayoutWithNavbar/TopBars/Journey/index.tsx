import React, { useState } from 'react';
import clsx from 'clsx';

import { makeStyles } from '@material-ui/styles';
import {
  AppBar,
  IconButton,
  Toolbar,
  Hidden,
  Typography
} from '@material-ui/core';
import { Menu } from '@material-ui/icons';

import { Emergency } from 'common/components';

const useStyles = makeStyles(() => ({
  root: {
    boxShadow: 'none',
    backgroundColor: '#FFFFFF'
  },
  textColor: {
    color: '#FFFFFF'
  },
  icon: {
    marginLeft: '6px',
    color: '#37474F',
    fontSize: '30px'
  }
}));

type Props = {
  className: string;
  onOpenNavBarMobile: () => void;
};

const TopBar: React.FC<Props> = ({
  onOpenNavBarMobile,
  className,
  ...rest
}) => {
  const classes = useStyles();

  /** Dialog */
  const [open, setOpen] = useState(false);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <AppBar {...rest} className={clsx(classes.root, className)}>
      <Toolbar>
        <div style={{ flexGrow: 1 }}>
          <Hidden lgUp>
            <IconButton color="inherit" onClick={onOpenNavBarMobile}>
              <Menu className={classes.icon} />
            </IconButton>
          </Hidden>
        </div>
        <div style={{ flexGrow: 2 }}>
          <Typography variant="h1">Journey</Typography>
        </div>
        <div onClick={handleClickOpen}>
          <IconButton style={{ marginRight: '20px' }}>
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAABZVBMVEUAAAD/gAD/qgD/gED/mTP/gCv/mRrxjhzylBvyjCbzkiT2jhz2kiT2lSP3kSL1kCL2kiH2kiD2lB/2kyH2kyD2kSD3kyL3kiL2kiD3kyL3kiH3kyD3kSD4kiL2kiH2kiH2kSH3kSL3kiL3kyH3kiH4kiH4kiD4kyL4kiL2kSH3kiH3kyD3kiL3kiH2kiH3kiH3kiD3kiL3kiH3kiH3kiH3kyL3kiH3kiH3kiH3kiH4kiH3kiH3kiH3kiH3kiH3kyP3kyT3lCT3lSb3lSf3lSj3lin3lir3lyv4nDX4njn4pEb4pUf5qE35qlH5qlL5q1P5rFb5rFf5tGb6tGf6tWj6tWn6t2z6u3X6wH76wYH7yJD7yZD80J/80aH80aL82bL82rT83Lj93br93rv93rz937395839587958/96ND+69b+7Nn+7dr+7t3+79/+8OD+8OH+8+f/+/b/+/f//Pn//Pr///8uxljWAAAAPnRSTlMAAgMEBQYKEhMUFRscHR41Njg5VVdYWlt3eHqGh4iTlJWXmJmbq62ur7O0tba70dLU1eHi4+Tq6+zt7vj5+kGlJc4AAAABYktHRHYxY8lBAAABsElEQVQYGYXBiUPSYBwG4HdIKEF5lyIeqGilBYWGc/O1w4vuw6LLyEqziyHV7++PjTEHfIPnQZPQUGLh5vrGxnp2ITGoIciFyVX6rCTjUDk/Z7KFmYqizSWdCmujaBaeZ4DZMHwiywy0FIEnvMwOrp9Dwzw7SsF1mV2MwNGXp+P170ql8vMp2+lR2OZY90VsH6kwg5q4ybqS2D5RwbwIYJKuA7EdUyUJaCt0vRXbvx0qrIYwxIbn4nhMlQEk2HD/j9RYu1QZxyI9hyJiFaiURpaefRGrQLUMdHruVuSIAfIweaYo8pJqBkye2TyR0z0qGdDp87AqJ9tUySNLv6LI123adh9t0SeDRTZ5L/J9j2TBkr/HpYMndKWRYLN3Iqf7LFji+EHXGAbZolgVObKkrkxXP7QcWzz4Jp4y625pQJKtNouWuMqsmwAQN9nmzovDqth+0WHEUJOiyr1nbz6UPr+iYwq23jy7WIvCMcouhuGaZUfTaAhdYQfXeuCJLDHQ1Qh8wikGmO5Bs5E8FW4Po03fjMEWxlQvVGLJHH1yEzEE0QbG0xndNPUb6bF+DX7/AXdlTG8YbnDpAAAAAElFTkSuQmCC"
              alt=""
            />
          </IconButton>
        </div>
      </Toolbar>
      {open && <Emergency open={open} close={handleClose} />}
    </AppBar>
  );
};

export default TopBar;
