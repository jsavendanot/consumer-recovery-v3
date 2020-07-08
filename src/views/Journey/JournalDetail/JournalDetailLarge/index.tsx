import React from 'react';
import useRouter from 'common/utils/useRouter';
import moment from 'moment';
import { Journal, JournalShareNetwork, JournalComment } from 'types/journey';

import { Grid, Divider, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { ArrowBackIos } from '@material-ui/icons';

import { Actions, Moods, Comments } from '../components';
import { useSelector } from 'react-redux';
import { RootState } from 'reducer';
import { Loader } from 'common/components';

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '36px',
    lineHeight: '45px',
    color: '#003E1F',
    marginBottom: '10px'
  },
  dateText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '12px',
    lineHeight: '14px',
    color: '#B3B3B3',
    textAlign: 'right'
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
  journalText: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '18px',
    lineHeight: '23px',
    color: '#323F45',
    textAlign: 'left',
    marginTop: '30px'
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
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '18px',
    lineHeight: '127.69%',
    color: '#323F45'
  },
  backText: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '18px',
    lineHeight: '22px',
    color: '#003E1F'
  },
  divider: {
    border: '1px solid #73BA9B'
  },
  imageContainer: {
    width: '100%'
  },
  image: {
    objectFit: 'cover',
    width: '100%',
    height: '280px'
  }
}));

type Props = {
  journal: Journal;
};

const JournalDetailLarge: React.FC<Props> = ({ journal }) => {
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

  return (
    <>
      {loading && <Loader />}
      <Grid container justify="center">
        <Grid item xs={10} className={classes.item}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '20px 0 5px',
              cursor: 'pointer'
            }}>
            <div style={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
              <ArrowBackIos
                className={classes.headerIcon}
                onClick={() => history.goBack()}
              />
              <span className={classes.backText}>Back</span>
            </div>
          </div>
        </Grid>
        <Grid item xs={10}>
          <Grid container justify="space-around">
            <Grid item xs={5}>
              <div className={classes.imageContainer}>
                {journal.Image != null && (
                  <div>
                    <img
                      src={'data:image/png;base64,' + journal.Image}
                      alt=""
                      className={classes.image}
                    />
                  </div>
                )}
              </div>
            </Grid>
            <Grid item xs={5}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '10px'
                }}>
                {journal && (
                  <span className={classes.title}>{journal.Title}</span>
                )}
                {journal && (
                  <span className={classes.dateText}>
                    {moment(journal.CreatedOnDate).format('LLLL')}
                  </span>
                )}
                <div style={{ paddingTop: '20px' }}>
                  {journal && <Moods feeling={journal.HowAreYouFeeling} />}
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      marginTop: '20px'
                    }}>
                    <span className={classes.subTitle}>
                      Journal Shared with
                    </span>
                    <div className={classes.network}>
                      {journalsShare
                        .filter(item => item.JournalId === journal.Id)
                        .map(network => {
                          return `${network.SharedWithNetworkName}, `;
                        })}
                    </div>
                  </div>
                </div>
              </div>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={10}>
          <Actions journal={journal} />
        </Grid>
        <Grid item xs={10}>
          <Divider className={classes.divider} />
        </Grid>
        <Grid item xs={10}>
          <Grid container justify="space-around">
            <Grid item xs={5}>
              <div className={classes.journalText}>
                {journal && journal.Message}
              </div>
            </Grid>
            <Grid item xs={5}>
              <div style={{ marginTop: '30px' }}>
                <Comments journalId={journal.Id} comments={comments} />
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default JournalDetailLarge;
