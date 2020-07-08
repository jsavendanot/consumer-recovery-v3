import React, { useState } from 'react';
import useRouter from 'common/utils/useRouter';
import { useDispatch, useSelector } from 'react-redux';
import {
  createWarningSignDiff,
  createWarningSignStr
} from 'slices/safety/warning/action';
import { RootState } from 'reducer';
import { Item, Suggestion } from 'types/safety';

import { makeStyles, useTheme } from '@material-ui/styles';
import {
  Grid,
  Dialog,
  DialogContent,
  Slide,
  useMediaQuery,
  Theme
} from '@material-ui/core';

import {
  CreateWarningSignForm1,
  CreateWarningSignForm2,
  Suggestions,
  CopingStrategies
} from './components';
import { NavSteps } from '../../components';
import { TransitionProps } from '@material-ui/core/transitions/transition';
import { YesNoConfirmation } from 'common/components';
import uuid from 'uuid';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center'
  },
  footerContainer: {
    display: 'flex',
    alignItems: 'flex-end',
    background: '#FFFFFF'
  },
  footer: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#D5F2E3',
    position: 'relative',
    bottom: 0
  },
  footerContent: {
    width: '100px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: '10px',
    '&:hover': {
      backgroundColor: '#73BA9B'
    }
  },
  footerImage: {
    margin: '5px'
  },
  footerText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '12px',
    lineHeight: '14px',
    color: '#003E1F',
    margin: '5px'
  },
  navSteps: {
    zIndex: 3,
    top: '0',
    left: '0',
    position: 'fixed',
    background: '#37474F',
    width: '268px',
    height: '100%',
    boxShadow: '8px 0px 16px rgba(0, 0, 0, 0.1)'
  },
  confirmTitle: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '18px',
    lineHeight: '21px',
    color: '#73BA9B'
  }
}));

const Transition = React.forwardRef(
  (
    props: TransitionProps & { children?: React.ReactElement<any, any> },
    ref: React.Ref<unknown>
  ) => <Slide direction="right" ref={ref} {...props} />
);

const CreateWarningSign: React.FC = () => {
  const classes = useStyles();
  const { history } = useRouter();
  const dispatch = useDispatch();

  const difficultiesState: Item[] = useSelector(
    (state: RootState) => state.safetyRoot.warning.difficulties
  );
  const [newInputValue1, setNewInputValue1] = useState('');

  const strategiesState: Item[] = useSelector(
    (state: RootState) => state.safetyRoot.warning.strategies
  );
  const [newInputValue2, setNewInputValue2] = useState('');

  /** Theme */
  const theme: Theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  /** Dialog */
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  /** Dialog Nav Steps */
  const [open2, setOpen2] = useState(false);
  const handleClose2 = () => {
    setOpen2(false);
  };
  const handleClickOpen2 = () => {
    setOpen2(true);
  };

  /** Difficulties */
  const [difficulties, setDifficulties] = useState<Item[]>([
    ...difficultiesState
  ]);

  const addDifficultySuggestions = (suggestions: Suggestion[]) => {
    suggestions.forEach(suggestion => {
      const s = difficulties.find(value => value.id === suggestion.id);
      if (s === undefined) {
        setDifficulties(values => [...values, suggestion]);
      }
    });
  };

  const handleDeleteDifficulty = (value: string) => {
    setDifficulties(values => values.filter(s => value !== s.id));
  };

  /** Coping Strategies */
  const [strategies, setStrategies] = useState<Item[]>([...strategiesState]);

  const addStrategiesSuggestions = (suggestions: Suggestion[]) => {
    suggestions.forEach(suggestion => {
      const s = strategies.find(value => value.id === suggestion.id);
      if (s === undefined) {
        setStrategies(values => [...values, suggestion]);
      }
    });
  };

  const handleDeleteStrategies = (value: string) => {
    setStrategies(values => values.filter(s => value !== s.id));
  };

  /** Footer operations */
  const save = () => {
    let updatedValues1 = difficulties;
    if (newInputValue1.length > 1) {
      updatedValues1 = updatedValues1.concat([
        { id: uuid(), name: newInputValue1! }
      ]);
    }
    dispatch(createWarningSignDiff(updatedValues1));

    let updatedValues2 = strategies;
    if (newInputValue2.length > 1) {
      updatedValues2 = updatedValues2.concat([
        { id: uuid(), name: newInputValue2! }
      ]);
    }
    dispatch(createWarningSignStr(updatedValues2));
    history.push('/safety/warningsign');
  };

  /** Navigation */
  const [index, setIndex] = useState(0);
  const next = () => {
    setIndex(index < 2 ? index + 1 : index);

    let updatedValues1 = difficulties;
    if (newInputValue1.length > 1) {
      updatedValues1 = updatedValues1.concat([
        { id: uuid(), name: newInputValue1! }
      ]);
    }

    (difficulties.length > 0 || newInputValue1.length > 1) &&
      dispatch(createWarningSignDiff(updatedValues1));
  };

  const back = () => {
    setIndex(index > 0 ? index - 1 : index);
  };

  const next2 = () => {
    let updatedValues2 = strategies;
    if (newInputValue2.length > 1) {
      updatedValues2 = updatedValues2.concat([
        { id: uuid(), name: newInputValue2! }
      ]);
    }

    (strategies.length > 0 || newInputValue2.length > 1) &&
      dispatch(createWarningSignStr(updatedValues2));
    history.push('/safety/unwell/create');
  };

  const suggestionsDialog = (
    <Dialog
      open={open}
      keepMounted
      fullScreen={fullScreen}
      onClose={handleClose}>
      <DialogContent>
        {index === 0 && (
          <Suggestions
            close={handleClose}
            add={values => addDifficultySuggestions(values)}
          />
        )}
        {index === 1 && (
          <CopingStrategies
            close={handleClose}
            add={values => addStrategiesSuggestions(values)}
          />
        )}
      </DialogContent>
    </Dialog>
  );

  const navStepsDialog = (
    <Dialog
      open={open2}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose2}>
      <DialogContent className={classes.navSteps}>
        <NavSteps step={3} close={handleClose2} />
      </DialogContent>
    </Dialog>
  );

  /** Confirm Dialog */
  const [openCancelConfirm, setOpenCancelConfirm] = useState(false);

  function openCancelConfirmHandler() {
    difficulties.length !== difficultiesState.length ||
    strategies.length !== strategiesState.length
      ? setOpenCancelConfirm(true)
      : history.goBack();
  }

  function closeCancelConfirmHandler() {
    setOpenCancelConfirm(false);
  }

  const confirmCancelDialog = (
    <YesNoConfirmation
      open={openCancelConfirm}
      close={closeCancelConfirmHandler}
      action={save}
      redirect>
      <span className={classes.confirmTitle}>
        Would you like to save
        <br />
        changes before exiting?
      </span>
    </YesNoConfirmation>
  );

  /** Confirm Dialog */
  const [openSaveConfirm, setOpenSaveConfirm] = useState(false);

  function openSaveConfirmHandler() {
    difficulties.length !== difficultiesState.length ||
    strategies.length !== strategiesState.length
      ? setOpenSaveConfirm(true)
      : save();
  }

  function closeSaveConfirmHandler() {
    setOpenSaveConfirm(false);
  }

  const confirmSaveDialog = (
    <YesNoConfirmation
      open={openSaveConfirm}
      close={closeSaveConfirmHandler}
      action={save}>
      <span className={classes.confirmTitle}>
        Would you like to
        <br />
        save and exit?
      </span>
    </YesNoConfirmation>
  );

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={12} style={{ background: '#FFFFFF' }}>
          {index === 0 && (
            <CreateWarningSignForm1
              newInputValue={newInputValue1}
              setNewInputValue={setNewInputValue1}
              index={index}
              values={difficulties}
              setValues={setDifficulties}
              remove={handleDeleteDifficulty}
              next={next}
              back={openCancelConfirmHandler}
            />
          )}
          {index === 1 && (
            <CreateWarningSignForm2
              newInputValue={newInputValue2}
              setNewInputValue={setNewInputValue2}
              index={index}
              values={strategies}
              setValues={setStrategies}
              remove={handleDeleteStrategies}
              next={next2}
              back={back}
            />
          )}
        </Grid>
        <Grid item xs={12} style={{ background: '#FFFFFF' }} />
        <Grid item xs={12} className={classes.footerContainer}>
          <div className={classes.footer}>
            <div className={classes.footerContent} onClick={handleClickOpen2}>
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAVCAYAAABc6S4mAAAABmJLR0QA/wD/AP+gvaeTAAABfUlEQVQ4jb2NP0iUcRyHn+/v9x4t2h8zpKX3JZqawjHh7nUQTkGaoikaC7eEhpZyiUu4KScHR3EMcnQw9cBFEBwaGqTejjgskNNE6O6+37ajF8Xl9+Jn/DzwPJ7HeIaTGvG1NeLrTb63dylwEa14AbEn59I0STG9FRYwqwPLiDTO0J69RSQNCTga2T4iP0MkFy26kJp/jnUHwwOdXptSNI/09nK0sf81RH4pEybvXeG0O46ao9NbZ7t5WmQg4uTvJ5AyEFHya8BUsQHjJb5zgJbeA9UcLSdzwP2wwFb2hcqdCeApYq9y1KyCkIYF0iRF7SPYGzayDznq+INxGBIQynELGOk/akM0siDp/4twUqWrvv/czo6Kkl/KhDSpovoIkQjRRT7/2Cky4DAbxcSjjKNuqUg5QMTvgTo3j18DCm4lRyvxKsZYWOBq2yP+AcYgZndzVBlAuBEWKLlp1NVA3yE8A14ACoDIBvArLIDMIPoQOABm+3KAzW9zIXKAf+ibdwR60odKAAAAAElFTkSuQmCC"
                alt=""
                className={classes.footerImage}
              />
              <span className={classes.footerText}>Steps</span>
            </div>
            <div className={classes.footerContent} onClick={handleClickOpen}>
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAABR1BMVEUAAAAAAAAAAAAAVQAAQAAAMzMAKysASSQAQCAAORwAMxoAQBUAOycARCIAPB4AORwAQBoAPSQAQyEAQCAAPR8AQhwAQiEAQCAAQCAAQB0AQCAAPh8APB4AQCAAPh8AQB4APx4APiEAPSAAPx8APh0APSAAPx4APh4APyAAPh8APh8APR4APh8APh8APR8APx4APx4APh8APR8APR4APx4APSAAPh4APSAAPx4APSAAPx8APh8APx4APh4APSAAPx8APh4APiAAPiAAPR8APh8APR8APiAAPx8APh8APh8APR8APx4APh4APx8APx8APh4APiAAPh4APR8APh8APR8APh8APh4APh8APh8APiAAPh8APh8APx8APR8APh8APh8APh8APh8APh8APh8APh8APh8APh8APh8APh8APh8APh8APh////8v2ArdAAAAa3RSTlMAAQIDBAUGBwgJCgwNDxESFBUXGBkbHyAoLDAxM0BCREVGR0lOT1VWWVpbXGJjZGVma2xtbnF3eX6BgoSGh4mKj5CRkpOWmZucnZ6foKOvsLG4u7y/xsnLztLV19jc5uvt7u/x8vX3+Pn9/qWsrqkAAAABYktHRGzMATA7AAABJElEQVQYGQXB60NLAQAH0LNNLVOJPFcKcZFXcV2PENOYkBayjOQdv///u3NgsVvDwTNL186OodZdBOrbeWzs/rck+flo3Gq268DUzuXpQb6/WF5e282nE1d2pgBGW4O8noDWkwzHRwF4mC7AStYAmPj1pQlQ39k/BuBqbgNwPUsAnuYUACfzHBRFWy+HAWhmQ7soJB0vcxSA6bzSSVTVvDu5CMCF3DVfVaCdDQDe5jQA7/6dBziX9wCY+f1jBjj+9c8MABR/d4/AgY+5CQDcSwdu5BkAWv05teFeAx/2Dpnrt4B6Pz0e5FZRXNp/Qy/9OlBtjlAmSbLCyGYF0ECZ9apaT4UGACizwEJKAABlBltbg5QAAMokSUoAAM3J2c/D2ckmwH/upzqW0XoXIgAAAABJRU5ErkJggg=="
                alt=""
                className={classes.footerImage}
              />
              <span className={classes.footerText}>Suggestions</span>
            </div>
            <div
              className={classes.footerContent}
              onClick={openSaveConfirmHandler}>
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAMAAACeyVWkAAAAsVBMVEUAAAAAAAAAAAAAORwAPB4AORwAQhwAPiMAPB4AQBwAPSEAPB4APx8APh8APx4AQCAAPx4APh0APx8APx4APR8APx4APR8APx8APh8APx8APh8APSAAPSAAPiAAPiAAPh8APR8APR8APx8APiAAPx8APh8APh8APx8APh8APh8APh8APh8APiAAPh8APh8APh8APh4APh8APh8APh8APh8APh8APh8APh8APh8APh////8vC1q9AAAAOXRSTlMAAQIJERIbHSIkLjNBQkVITU5RVWRmbHJzenyBiZCRlZamp6qrra6vvb7ExcrL293i4+fv9/n7/P7exaXKAAAAAWJLR0Q6TgnE+gAAAK9JREFUGNNt0dkOgjAQBdBqQQUVRUUFcV9wLyhC7///mKUkxBbvwyQ9aWY6KXlAycshRZAxxt6IWZEYSAdSE1FCWPKKhSeXrGno8c+w0sArEiAkU546pfrVNJ8Ijkul7riMS8UpQalqftUe2TU1I9H0ZGh6wHayw15VC0dRI3QU7WMm6hw9Rdv83CDNC2+pfTe4Lm5Ya9PoKke+pLX3ml3jzxb/d1M1Y3oyEO3fZO5f+E4qayO/fP4AAAAASUVORK5CYII="
                alt=""
                className={classes.footerImage}
              />
              <span className={classes.footerText}>Save</span>
            </div>
          </div>
        </Grid>
      </Grid>
      {open && suggestionsDialog}
      {open2 && navStepsDialog}
      {openCancelConfirm && confirmCancelDialog}
      {openSaveConfirm && confirmSaveDialog}
    </div>
  );
};

export default CreateWarningSign;
