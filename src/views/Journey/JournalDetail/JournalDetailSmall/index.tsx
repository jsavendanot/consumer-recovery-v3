import React, { useState, MouseEvent } from 'react';
import useRouter from 'common/utils/useRouter';
import moment from 'moment';
import { Journal, JournalComment, JournalShareNetwork } from 'types/journey';

import { Grid, Hidden, Theme, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { ArrowBackIos, AccessTime, MoreVert } from '@material-ui/icons';

import { Moods, Comments, ActionMenu } from '../components';
import { useSelector } from 'react-redux';
import { RootState } from 'reducer';
import { Loader } from 'common/components';

const useStyles = makeStyles((theme: Theme) => ({
  dateText: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '22px',
    lineHeight: '27px',
    color: '#003E1F'
  },
  headerIcon: {
    fontSize: '40px',
    [theme.breakpoints.up('sm')]: {
      fontSize: '50px'
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '50px'
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: '50px'
    },
    fill: '#003E1F'
  },
  timeText: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '18px',
    lineHeight: '23px',
    color: '#323F45'
  },
  journalText: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '18px',
    lineHeight: '23px',
    color: '#323F45',
    textAlign: 'left'
  },
  subTitle: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '20px',
    lineHeight: '23px',
    color: '#73BA9B'
  },
  item: {
    padding: '10px 15px'
  },
  network: {
    padding: '10px',
    margin: '10px 0',
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '18px',
    lineHeight: '127.69%',
    color: '#323F45'
  },
  imageContainer: {
    width: '100%'
  },
  image: {
    objectFit: 'cover',
    width: '100%',
    height: '196px',
    [theme.breakpoints.up('sm')]: {
      height: '235'
    },
    [theme.breakpoints.up('lg')]: {
      height: '280px'
    }
  },
  imageEmpty: {
    backgroundColor: '#E5E5E5',
    width: '100%',
    height: '196px',
    [theme.breakpoints.up('sm')]: {
      height: '235'
    }
  }
}));

type Props = {
  journal: Journal;
};

const JournalDetailSmall: React.FC<Props> = ({ journal }) => {
  const classes = useStyles();
  const { history } = useRouter();

  const loading: boolean = useSelector(
    (state: RootState) => state.journeyRoot.journey.loading
  );

  const journalsShare: JournalShareNetwork[] = useSelector(
    (state: RootState) => state.journeyRoot.journeyShare.share
  );

  const comments: JournalComment[] = useSelector((state: RootState) =>
    state.journeyRoot.journeyComment.comments.filter(
      item => item.JournalId === journal.Id
    )
  );

  /** Navigation */
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);

  const handleMenuClick = (event: MouseEvent) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      {loading && <Loader />}
      <Grid container justify="center">
        <Grid item xs={12} sm={8} className={classes.item}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '15px 0 5px',
              cursor: 'pointer'
            }}>
            <div style={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
              <ArrowBackIos
                className={classes.headerIcon}
                onClick={() => history.goBack()}
              />
              <span className={classes.dateText}>
                {journal && journal.Message}
              </span>
            </div>
            <Hidden smDown>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  paddingRight: '30px'
                }}>
                <AccessTime style={{ fill: '#003E1F', marginRight: '8px' }} />
                {journal && (
                  <span className={classes.timeText}>
                    {moment(journal.CreatedOnDate).format('LLLL')}e
                  </span>
                )}
              </div>
            </Hidden>
            <IconButton
              aria-label="more"
              aria-controls="long-menu"
              aria-haspopup="true"
              onClick={handleMenuClick}>
              <MoreVert fontSize="large" style={{ fill: '#003E1F' }} />
            </IconButton>
            <ActionMenu
              journalId={journal.Id}
              anchorEl={anchorEl}
              setAnchorEl={setAnchorEl}
            />
          </div>
        </Grid>
        <Hidden mdUp>
          <Grid item xs={12} sm={8}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                paddingLeft: '60px',
                paddingBottom: '10px'
              }}>
              <AccessTime style={{ fill: '#003E1F', marginRight: '8px' }} />
              {journal && (
                <span className={classes.timeText}>
                  {moment(journal.CreatedOnDate).format('LLLL')}
                </span>
              )}
            </div>
          </Grid>
        </Hidden>
        <Grid item xs={12} sm={8}>
          <div className={classes.imageContainer}>
            {journal.Image != null && (
              <img
                src={'data:image/png;base64,' + journal.Image}
                alt=""
                className={classes.image}
              />
            )}
          </div>
        </Grid>
        <Grid item xs={12} sm={8} className={classes.item}>
          <div className={classes.journalText}>
            {journal && journal.Message}
          </div>
        </Grid>
        <Grid item xs={12} sm={8} className={classes.item}>
          <Moods feeling={journal.HowAreYouFeeling} />
        </Grid>
        <Grid item xs={12} sm={8} className={classes.item}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span className={classes.subTitle}>Journal Shared with</span>
            <div className={classes.network}>
              {journalsShare
                .filter(item => item.JournalId === journal.Id)
                .map(network => {
                  return `${network.SharedWithNetworkName}, `;
                })}
            </div>
          </div>
        </Grid>
        <Grid item xs={12} sm={8} className={classes.item}>
          <Comments journalId={journal.Id} comments={comments} />
        </Grid>
      </Grid>
    </>
  );
};

export default JournalDetailSmall;
