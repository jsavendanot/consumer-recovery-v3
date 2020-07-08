import React from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Dialog,
  DialogContent,
  Grid,
  IconButton,
  Theme
} from '@material-ui/core';
import { Close } from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    margin: '30px 8px',
    width: '265px',
    [theme.breakpoints.up('sm')]: {
      width: '285px'
    }
  },
  title: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '20px',
    lineHeight: '25px',
    color: '#73BA9B'
  },
  image: {
    width: '46px',
    height: '44px'
  },
  iconButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    padding: '0'
  },
  listText: {
    marginLeft: '10px',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '127.69%',
    color: '#37474F',
    textAlign: 'justify'
  },
  closeText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '18px',
    lineHeight: '21px',
    color: '#003E1F',
    cursor: 'pointer'
  }
}));

type Props = {
  open: boolean;
  close: () => void;
};

const Tips: React.FC<Props> = ({ open, close }) => {
  const classes = useStyles();

  return (
    <Dialog open={open} onClose={close}>
      <DialogContent>
        <div className={classes.root}>
          <IconButton className={classes.iconButton} onClick={close}>
            <Close style={{ fill: '#73BA9B' }} />
          </IconButton>
          <Grid container justify="center">
            <Grid item xs={3}>
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAVCAMAAAB1/u6nAAABOFBMVEUAAAAA//+AgIBmzJmAqqpttpKAv5+As5l0uaJqv5VttqR3u5lwv594tJZzv5lttp5wuJlxvZd2tptzvZxwt5d0uZtxvJ5xuJx1uphyvJp2t51zuZlzvJ50vJtyuJ1zuZtxup10uZl0u5t0uZt0vJpzuZpyuZp0uZx0uppzuZtyupxzuptzuZpyuppzuZtyupxzuppyu5x0uZt0uppzu5tyu5tzuppzuZtyupx0upxyuptzuZtyuppzuptzu5p0uZtzu5tzupt0uZxyuptyuZtzupx0uZtzuptzuptzu5pzuptzupxzuZtzuptzupp0uptzuptzuptzuptzuptyuptzuZtzuptzuptzuptzuptzuptzuppzuptzuptyuptzuptzuptzuptzuptzuptzuptzuptzupv////sdaubAAAAZnRSTlMAAQIFBgcICgsMDg8QERQVGRscHyAhIiQlJicoKi4vMzQ3QEJESUxNUVRVWVtgZmdodHV3eHuBh4iNkZKTm52hqKusrrCxt7y9vr/Dxs7V1tfd3uDh5+jr7e7w8fP09fb4+fr7/P730DuKAAAAAWJLR0RnW9PpswAAAP5JREFUGBlVwYlCAQEUQNFrS4qQMC0SERWjQmkTbUqb0h5K5f3/J2QmM+UcwF5NAWPpwsaKG0hV7Wi8jW5kZKstfR/bzki34UXnK45fynl6ajJ51LuaKPownPTWLWhWv2oWDEnZY6AgyxiOX5wM2B9OMTxVMB200ahqmM8dTFsyGlZVRDJ0ypjKHUtGhFDIxdmdlQHr/QWuUAjNmmQZyIqKwXbTiqGbfbu2YVIen2fo89y+zvHPwnuNvt3vRUzxuptNCYKjVcZdj6Pzt5sB5uWwVNqXJQLNth9dLgiK6GIQzPFHkbzHk5dphilSUdWKKAxTRKcwzBFNNBqJqINfP/b7LF0PQyAgAAAAAElFTkSuQmCC"
                alt=""
                className={classes.image}
              />
            </Grid>
            <Grid item xs={9}>
              <span className={classes.title}>
                When defining your
                <br />
                goals be sure to:
              </span>
            </Grid>
            <Grid item xs={12}>
              <div style={{ margin: '20px 10px' }}>
                {[
                  'Make your goals personal and describe them in present tense.',
                  'Phrase your goals positively. State what you want, not what you don’t want.',
                  'Make sure your goals are yours, and yours alone.',
                  'Commit yourself to the pursuit of your goals.',
                  'Review and visualize daily; see it, hear it, feel it.'
                ].map((item, index) => {
                  return (
                    <div
                      key={index}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        margin: '10px 0'
                      }}>
                      &#8226;
                      <div className={classes.listText}>{item}</div>
                    </div>
                  );
                })}
              </div>
            </Grid>
            <Grid item xs={3}>
              <span className={classes.closeText} onClick={close}>
                Close
              </span>
            </Grid>
          </Grid>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Tips;
