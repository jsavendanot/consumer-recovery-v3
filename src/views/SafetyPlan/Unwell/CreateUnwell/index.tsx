import React, { useState, useEffect } from 'react';
import useRouter from 'common/utils/useRouter';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNetworks } from 'slices/network/action';
import { Suggestion } from 'types/safety';
import { isEqual } from 'lodash';

import { makeStyles, useTheme } from '@material-ui/styles';
import {
  Grid,
  Dialog,
  DialogContent,
  Slide,
  useMediaQuery,
  Theme
} from '@material-ui/core';

import { CreateUnwellForm, Suggestions, Suggestions2 } from './components';
import { NavSteps } from '../../components';
import { TransitionProps } from '@material-ui/core/transitions/transition';
import { Unwell } from 'types/safety';
import { RootState } from 'reducer';
import { createUnwell, createUnwellNot } from 'slices/safety/unwell/action';
import uuid from 'uuid';
import { YesNoConfirmation } from 'common/components';

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

export type FormStateType = {
  isValid: boolean;
  values: {
    inputValue?: string;
  };
  touched: {
    inputValue?: boolean;
  };
  errors: {
    inputValue?: string[];
  };
};

const Transition = React.forwardRef(
  (
    props: TransitionProps & { children?: React.ReactElement<any, any> },
    ref: React.Ref<unknown>
  ) => <Slide direction="right" ref={ref} {...props} />
);

const CreateUnwell: React.FC = () => {
  const classes = useStyles();
  const { history } = useRouter();
  const dispatch = useDispatch();

  const unwellHappens: Unwell[] = useSelector(
    (state: RootState) => state.safetyRoot.unwell.pleaseDo
  );

  const [formStatePleaseDo, setFormStatePleaseDo] = useState<FormStateType>({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });

  const [unwell, setUnwell] = useState<Unwell>({
    UnwellId: uuid(),
    Name: '',
    Description: '',
    SafetyPlanId: sessionStorage.getItem('SafetyPlanId')!,
    NetworkContactIdResponsible: ''
  });

  const [unwellNot, setUnwellNot] = useState<Unwell>({
    UnwellId: uuid(),
    Name: '',
    Description: '',
    SafetyPlanId: sessionStorage.getItem('SafetyPlanId')!,
    NetworkContactIdResponsible: ''
  });

  /** Please do */
  const [pleaseDo, setPleaseDo] = useState<Unwell[]>([...unwellHappens]);

  const addToPleaseDo = (value: Unwell) => {
    if (value.Name !== '') {
      if (pleaseDo.find(item => item.UnwellId === value.UnwellId)) {
        const updatedPleaseDo = pleaseDo.map(item => {
          return item.UnwellId === value.UnwellId ? value : item;
        });
        setPleaseDo(updatedPleaseDo);
      } else {
        setPleaseDo(oldValues => [...oldValues, value]);
      }
    }
  };

  const removeFromPleaseDo = (id: string) => {
    const updatedValues = pleaseDo.filter(item => item.UnwellId !== id);
    setPleaseDo(updatedValues);
  };

  const setThingsFromSuggestions = (suggestions: Suggestion[]) => {
    const suggestedUnwell: Unwell[] = suggestions.map(suggestion => {
      return {
        UnwellId: uuid(),
        Name: suggestion.name,
        Description: '',
        SafetyPlanId: sessionStorage.getItem('SafetyPlanId')!,
        NetworkContactIdResponsible: ''
      };
    });
    setPleaseDo(oldValue => oldValue.concat(suggestedUnwell));
  };

  /** Do not do */

  const unwellNotHappens: Unwell[] = useSelector(
    (state: RootState) => state.safetyRoot.unwell.doNotDo
  );

  const [doNotDo, setDoNotDo] = useState<Unwell[]>([...unwellNotHappens]);

  const [formStateDoNotDo, setFormStateDoNotDo] = useState<FormStateType>({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });

  const addToDoNotDo = (value: Unwell) => {
    if (value.Name !== '') {
      if (doNotDo.find(item => item.UnwellId === value.UnwellId)) {
        const updateddoNotDo = doNotDo.map(item => {
          return item.UnwellId === value.UnwellId ? value : item;
        });
        setDoNotDo(updateddoNotDo);
      } else {
        setDoNotDo(oldValues => [...oldValues, value]);
      }
    }
  };

  const removeFromDoNotDo = (id: string) => {
    const updatedValues = doNotDo.filter(item => item.UnwellId !== id);
    setDoNotDo(updatedValues);
  };

  const setThingsFromSuggestions2 = (suggestions: Suggestion[]) => {
    const suggestedUnwellNot: Unwell[] = suggestions.map(suggestion => {
      return {
        UnwellId: uuid(),
        Name: suggestion.name,
        Description: '',
        SafetyPlanId: sessionStorage.getItem('SafetyPlanId')!,
        NetworkContactIdResponsible: ''
      };
    });
    setDoNotDo(oldValue => oldValue.concat(suggestedUnwellNot));
  };

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

  const [tab, setTab] = useState('pleasedo');

  /** Dialog Nav Steps */
  const [open2, setOpen2] = useState(false);
  const handleClose2 = () => {
    setOpen2(false);
  };
  const handleClickOpen2 = () => {
    setOpen2(true);
  };

  /** Footer operations */
  const saveAction = () => {
    let updatedPleaseDo = pleaseDo;
    if (pleaseDo.find(item => item.UnwellId === unwell.UnwellId)) {
      updatedPleaseDo = pleaseDo.map(item => {
        if (item.UnwellId === unwell.UnwellId) {
          return {
            ...item,
            Name: formStatePleaseDo.values.inputValue
              ? formStatePleaseDo.values.inputValue
              : unwell.Name,
            NetworkContactIdResponsible: unwell.NetworkContactIdResponsible
          };
        } else {
          return item;
        }
      });
    } else {
      if (
        formStatePleaseDo.values.inputValue &&
        formStatePleaseDo.values.inputValue.length > 0 &&
        !pleaseDo.find(
          item => item.Name === formStatePleaseDo.values.inputValue
        )
      ) {
        updatedPleaseDo = pleaseDo.concat([
          {
            UnwellId: uuid(),
            Name: formStatePleaseDo.values.inputValue!,
            Description: '',
            SafetyPlanId: sessionStorage.getItem('SafetyPlanId')!,
            NetworkContactIdResponsible: ''
          }
        ]);
      }
    }

    let updatedDoNotDo = doNotDo;
    if (doNotDo.find(item => item.UnwellId === unwellNot.UnwellId)) {
      updatedDoNotDo = doNotDo.map(item => {
        if (item.UnwellId === unwellNot.UnwellId) {
          return {
            ...item,
            Name: formStateDoNotDo.values.inputValue
              ? formStateDoNotDo.values.inputValue
              : unwellNot.Name,
            NetworkContactIdResponsible: unwellNot.NetworkContactIdResponsible
          };
        } else {
          return item;
        }
      });
    } else {
      if (
        formStateDoNotDo.values.inputValue &&
        formStateDoNotDo.values.inputValue.length > 0 &&
        !doNotDo.find(item => item.Name === formStateDoNotDo.values.inputValue)
      ) {
        updatedDoNotDo = doNotDo.concat([
          {
            UnwellId: uuid(),
            Name: formStateDoNotDo.values.inputValue!,
            Description: '',
            SafetyPlanId: sessionStorage.getItem('SafetyPlanId')!,
            NetworkContactIdResponsible: ''
          }
        ]);
      }
    }

    dispatch(createUnwell(updatedPleaseDo));
    dispatch(createUnwellNot(updatedDoNotDo));
  };

  const save = () => {
    saveAction();
    history.push('/safety/unwell');
  };

  const next = () => {
    saveAction();
  };

  const networksLen: number = useSelector(
    (state: RootState) => state.networkRoot.network.networks.length
  );

  useEffect(() => {
    if (networksLen === 0) {
      dispatch(fetchNetworks());
    }
  }, [dispatch, networksLen]);

  const suggestionsDialog = (
    <Dialog
      open={open}
      keepMounted
      fullScreen={fullScreen}
      onClose={handleClose}>
      <DialogContent>
        {tab === 'pleasedo' && (
          <Suggestions
            close={handleClose}
            add={values => setThingsFromSuggestions(values)}
          />
        )}
        {tab === 'dontdo' && (
          <Suggestions2
            close={handleClose}
            add={values => setThingsFromSuggestions2(values)}
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
        <NavSteps step={4} close={handleClose2} />
      </DialogContent>
    </Dialog>
  );

  /** Confirm Dialog */
  const [openCancelConfirm, setOpenCancelConfirm] = useState(false);

  function openCancelConfirmHandler() {
    !isEqual(pleaseDo, unwellHappens) ||
    !isEqual(doNotDo, unwellNotHappens) ||
    unwell.Name !== '' ||
    unwellNot.Name !== ''
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
    !isEqual(pleaseDo, unwellHappens) ||
    !isEqual(doNotDo, unwellNotHappens) ||
    unwell.Name !== '' ||
    unwellNot.Name !== ''
      ? setOpenSaveConfirm(true)
      : history.push('/safety/unwell');
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
          <CreateUnwellForm
            unwell={unwell}
            setUnwell={setUnwell}
            unwellNot={unwellNot}
            setUnwellNot={setUnwellNot}
            formStatePleaseDo={formStatePleaseDo}
            setFormStatePleaseDo={setFormStatePleaseDo}
            formStateDoNotDo={formStateDoNotDo}
            setFormStateDoNotDo={setFormStateDoNotDo}
            back={openCancelConfirmHandler}
            selectTab={value => setTab(value)}
            pleaseDo={pleaseDo}
            doNotDo={doNotDo}
            addToPleaseDo={addToPleaseDo}
            addToDoNotDo={addToDoNotDo}
            removeFromPleaseDo={removeFromPleaseDo}
            removeFromDoNotDo={removeFromDoNotDo}
            next={next}
          />
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

export default CreateUnwell;
