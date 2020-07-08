import React, { Dispatch, SetStateAction } from 'react';
import { makeStyles } from '@material-ui/styles';
import { IconButton, Grid } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { Network } from 'types/network';

const useStyles = makeStyles(() => ({
  title: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '30px',
    lineHeight: '35px',
    color: '#73BA9B'
  },
  nameText: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '18px',
    lineHeight: '22px',
    color: '#003E1F'
  },
  number: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '30px',
    lineHeight: '35px',
    color: '#F79221'
  },
  closeIconButton: {
    position: 'absolute',
    top: '7px',
    right: '7px',
    padding: '0'
  },
  editDiv: {
    position: 'absolute',
    bottom: '10px',
    right: '10px',
    padding: '0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '41px',
    height: '41px',
    backgroundColor: '#D5F2E3',
    borderRadius: '25px',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    cursor: 'pointer'
  }
}));

type Props = {
  close: () => void;
  setEdit: Dispatch<SetStateAction<boolean>>;
};

const ShowEmergency: React.FC<Props> = ({ close, setEdit }) => {
  const classes = useStyles();

  const emergencyNetworks: Network[] = JSON.parse(
    sessionStorage.getItem('emergency')!
  );

  return (
    <div style={{ padding: '20px' }}>
      <Grid container spacing={3} justify="center">
        <Grid item xs={9} container>
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAABZVBMVEUAAAD/gAD/qgD/gED/mTP/gCv/mRrxjhzylBvyjCbzkiT2jhz2kiT2lSP3kSL1kCL2kiH2kiD2lB/2kyH2kyD2kSD3kyL3kiL2kiD3kyL3kiH3kyD3kSD4kiL2kiH2kiH2kSH3kSL3kiL3kyH3kiH4kiH4kiD4kyL4kiL2kSH3kiH3kyD3kiL3kiH2kiH3kiH3kiD3kiL3kiH3kiH3kiH3kyL3kiH3kiH3kiH3kiH4kiH3kiH3kiH3kiH3kiH3kyP3kyT3lCT3lSb3lSf3lSj3lin3lir3lyv4nDX4njn4pEb4pUf5qE35qlH5qlL5q1P5rFb5rFf5tGb6tGf6tWj6tWn6t2z6u3X6wH76wYH7yJD7yZD80J/80aH80aL82bL82rT83Lj93br93rv93rz937395839587958/96ND+69b+7Nn+7dr+7t3+79/+8OD+8OH+8+f/+/b/+/f//Pn//Pr///8uxljWAAAAPnRSTlMAAgMEBQYKEhMUFRscHR41Njg5VVdYWlt3eHqGh4iTlJWXmJmbq62ur7O0tba70dLU1eHi4+Tq6+zt7vj5+kGlJc4AAAABYktHRHYxY8lBAAABsElEQVQYGYXBiUPSYBwG4HdIKEF5lyIeqGilBYWGc/O1w4vuw6LLyEqziyHV7++PjTEHfIPnQZPQUGLh5vrGxnp2ITGoIciFyVX6rCTjUDk/Z7KFmYqizSWdCmujaBaeZ4DZMHwiywy0FIEnvMwOrp9Dwzw7SsF1mV2MwNGXp+P170ql8vMp2+lR2OZY90VsH6kwg5q4ybqS2D5RwbwIYJKuA7EdUyUJaCt0vRXbvx0qrIYwxIbn4nhMlQEk2HD/j9RYu1QZxyI9hyJiFaiURpaefRGrQLUMdHruVuSIAfIweaYo8pJqBkye2TyR0z0qGdDp87AqJ9tUySNLv6LI123adh9t0SeDRTZ5L/J9j2TBkr/HpYMndKWRYLN3Iqf7LFji+EHXGAbZolgVObKkrkxXP7QcWzz4Jp4y625pQJKtNouWuMqsmwAQN9nmzovDqth+0WHEUJOiyr1nbz6UPr+iYwq23jy7WIvCMcouhuGaZUfTaAhdYQfXeuCJLDHQ1Qh8wikGmO5Bs5E8FW4Po03fjMEWxlQvVGLJHH1yEzEE0QbG0xndNPUb6bF+DX7/AXdlTG8YbnDpAAAAAElFTkSuQmCC"
            alt=""
            style={{ marginRight: '12px', cursor: 'pointer' }}
          />
          <span className={classes.title}>Click to Call</span>
          <IconButton className={classes.closeIconButton} onClick={close}>
            <Close fontSize="large" style={{ fill: '#73BA9B' }} />
          </IconButton>
        </Grid>
        {emergencyNetworks.map((network, index) => {
          return (
            <Grid item xs={9} container direction="column" key={index}>
              <span className={classes.nameText}>{network.Name}</span>
              <span>
                <a className={classes.number} href={`tel:61${network.Phone}`}>
                  {network.Phone}
                </a>
              </span>
            </Grid>
          );
        })}
        <Grid item xs={9} container direction="column">
          <span className={classes.nameText}>Emergency services</span>
          <span>
            <a className={classes.number} href="tel:61000">
              000
            </a>
          </span>
        </Grid>
        <Grid item xs={9} container direction="column">
          <span className={classes.nameText}>AccessLine</span>
          <span>
            <a className={classes.number} href="tel:611800800944">
              1800 800 944
            </a>
          </span>
        </Grid>
        <Grid item xs={9} container direction="column">
          <span className={classes.nameText}>LifeLine</span>
          <span>
            <a className={classes.number} href="tel:61131114">
              13 11 14
            </a>
          </span>
        </Grid>
        <Grid item xs={9} container direction="column">
          <span className={classes.nameText}>Suicide Call Back Service</span>
          <span>
            <a className={classes.number} href="tel:61130659467">
              1300 659 467
            </a>
          </span>
        </Grid>
        <Grid item xs={9}>
          <div className={classes.editDiv} onClick={() => setEdit(true)}>
            <img
              src="data:image/png;base64,iVBORw0KGg oAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAGtSURBVHgBtdW9SwJhHAfw7+MFGppv+QamPuEfkNDSEKJjm01RIOog0SYt/g0OgVvREg7tbUHLNbpVhJAVdGKDW7cElXnX80h3qN3gnfZd7vj94MP3XrgTMGsy1Iu4ex9R3ye6ck8b2zBDNqpFCkW9AUgdC+yYpgVtJ8BiqpfHdCWZED0eH31+bGvjHBI+CR35zhLM0W9BEFlTGoqE4fF4MYmbhvnl86Yc1WYGeMocnKH0tfsiEobGEomx1Riu4np6mKHsQbGmoN1OB4SdGOE+v196um/vTgePoNrICFdVIvkD/myzdj7FPTZAjXCOKko/W986kPhOsIqO4uyeStFYVEd5yCzobyR8kSyakjQ6JP+BGsNzQP/Cc0J5xj5Ce4WSaLfbKWZEefS34vDqtLjkdhdXk0k8tFoYDAaW0bHGNpDhJy8YiWAnnwdrbhnVG1fEMy9RlBNt6HS5MNHcFKo3tvX7ucmF1tyxuGga1Ru/LwuVQDCUcjgc+kIFZKfTVVtfS5eaR40eTIYM/1mK+hYMh5Evl2WiqA2o5GLwsXBb3y7JsBwOp+N1bNIM5pgfEFTIit8n4/QAAAAASUVORK5CYII="
              alt=""
            />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default ShowEmergency;
