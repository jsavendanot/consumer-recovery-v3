import React, { useState } from 'react';
import clsx from 'clsx';
import useRouter from 'common/utils/useRouter';

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
    backgroundColor: '#73BA9B'
  },
  textColor: {
    color: '#FFFFFF'
  },
  icon: {
    color: '#FFFFFF',
    fontSize: '30px'
  },
  iconButtonContainer: {
    display: 'flex',
    alignItems: 'center'
  }
}));

type Props = {
  className: string;
  onOpenNavBarMobile: () => void;
};

const TopBar: React.FC<Props> = (props: Props) => {
  const { onOpenNavBarMobile, className, ...rest } = props;
  const { history } = useRouter();

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
          <Typography variant="h1" style={{ color: '#FFFFFF' }}>
            Profile
          </Typography>
        </div>
        <div className={classes.iconButtonContainer}>
          <IconButton
            style={{ marginTop: '6px' }}
            onClick={() =>
              history.push(
                `/profile/${sessionStorage.getItem('FirstName')}/edit`
              )
            }>
            <img
              src="data:image/png;base64,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"
              alt=""
            />
          </IconButton>
          <Hidden lgUp>
            <IconButton onClick={handleClickOpen}>
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAABZVBMVEUAAAD/gAD/qgD/gED/mTP/gCv/mRrxjhzylBvyjCbzkiT2jhz2kiT2lSP3kSL1kCL2kiH2kiD2lB/2kyH2kyD2kSD3kyL3kiL2kiD3kyL3kiH3kyD3kSD4kiL2kiH2kiH2kSH3kSL3kiL3kyH3kiH4kiH4kiD4kyL4kiL2kSH3kiH3kyD3kiL3kiH2kiH3kiH3kiD3kiL3kiH3kiH3kiH3kyL3kiH3kiH3kiH3kiH4kiH3kiH3kiH3kiH3kiH3kyP3kyT3lCT3lSb3lSf3lSj3lin3lir3lyv4nDX4njn4pEb4pUf5qE35qlH5qlL5q1P5rFb5rFf5tGb6tGf6tWj6tWn6t2z6u3X6wH76wYH7yJD7yZD80J/80aH80aL82bL82rT83Lj93br93rv93rz937395839587958/96ND+69b+7Nn+7dr+7t3+79/+8OD+8OH+8+f/+/b/+/f//Pn//Pr///8uxljWAAAAPnRSTlMAAgMEBQYKEhMUFRscHR41Njg5VVdYWlt3eHqGh4iTlJWXmJmbq62ur7O0tba70dLU1eHi4+Tq6+zt7vj5+kGlJc4AAAABYktHRHYxY8lBAAABsElEQVQYGYXBiUPSYBwG4HdIKEF5lyIeqGilBYWGc/O1w4vuw6LLyEqziyHV7++PjTEHfIPnQZPQUGLh5vrGxnp2ITGoIciFyVX6rCTjUDk/Z7KFmYqizSWdCmujaBaeZ4DZMHwiywy0FIEnvMwOrp9Dwzw7SsF1mV2MwNGXp+P170ql8vMp2+lR2OZY90VsH6kwg5q4ybqS2D5RwbwIYJKuA7EdUyUJaCt0vRXbvx0qrIYwxIbn4nhMlQEk2HD/j9RYu1QZxyI9hyJiFaiURpaefRGrQLUMdHruVuSIAfIweaYo8pJqBkye2TyR0z0qGdDp87AqJ9tUySNLv6LI123adh9t0SeDRTZ5L/J9j2TBkr/HpYMndKWRYLN3Iqf7LFji+EHXGAbZolgVObKkrkxXP7QcWzz4Jp4y625pQJKtNouWuMqsmwAQN9nmzovDqth+0WHEUJOiyr1nbz6UPr+iYwq23jy7WIvCMcouhuGaZUfTaAhdYQfXeuCJLDHQ1Qh8wikGmO5Bs5E8FW4Po03fjMEWxlQvVGLJHH1yEzEE0QbG0xndNPUb6bF+DX7/AXdlTG8YbnDpAAAAAElFTkSuQmCC"
                alt=""
              />
            </IconButton>
          </Hidden>
        </div>
      </Toolbar>
      {open && <Emergency open={open} close={handleClose} />}
    </AppBar>
  );
};

export default TopBar;
