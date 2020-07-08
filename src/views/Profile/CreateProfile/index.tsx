import React, { useState } from 'react';
import useRouter from 'common/utils/useRouter';
import { Profile } from 'types/profile';
import { useDispatch, useSelector } from 'react-redux';
import { createProfile } from 'slices/profile/action';

import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import {
  PrivacyDisclaimer,
  CreateProfileForm1,
  CreateProfileForm2,
  CreateProfileForm3,
  CreateProfileForm4,
  CreateProfileForm5
} from './components';
import uuid from 'uuid';
import { Loader } from 'common/components';
import { RootState } from 'reducer';
import clsx from 'clsx';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center'
  },
  privacyBackground: {
    background: '#D5F2E3'
  }
}));

const CreateProfile: React.FC = () => {
  const classes = useStyles();
  const { history } = useRouter();
  const dispatch = useDispatch();

  const loading: boolean = useSelector(
    (state: RootState) => state.profile.loading
  );

  const [profile, setProfile] = useState<Profile>({
    ContactId: uuid(),
    UserId: sessionStorage.getItem('UserId')!,
    RecoveryPlanId: sessionStorage.getItem('RecoveryPlanId')!,
    SafetyPlanId: sessionStorage.getItem('SafetyPlanId')!,
    FirstName: sessionStorage.getItem('FirstName')
      ? sessionStorage.getItem('FirstName')!
      : '',
    Surname: sessionStorage.getItem('Surname')
      ? sessionStorage.getItem('Surname')!
      : '',
    PreferredName: '',
    Gender: '',
    DateOfBirth: '',
    UserEmail: sessionStorage.getItem('UserEmail')!,
    ContactType: '935000000',
    HomeAddress: '',
    HomePostCode: '',
    PostalAddress: '',
    PostalPostCode: '',
    HomePhone: '',
    MobilePhone: '',
    BusinessPhone: '',
    PrimaryEmail: '',
    PreferredContactMethod: '',
    ContactName: '',
    RelationshipToConsumer: '',
    EmergencyContactPhone: '',
    EmergencyAddress: '',
    EmergencyWhenToContact: '',
    CountryOfBirth: '',
    PreferredLanguage: '',
    GeneralPractionerId: '',
    MedicalRecordNumber: '',
    AdditionalInformation: '',
    Image: '',
    ImageType: '',
    ImageUrl: '',
    FullName: ''
  });

  const handleProfileField = (name: string, value: string) => {
    setProfile(values => ({
      ...values,
      [name]: value
    }));
  };

  const handleSubmitProfile = () => {
    dispatch(createProfile(profile));
  };

  const [readPrivacy, setReadPrivacy] = useState(false);

  const [index, setIndex] = useState(0);
  const next = () => {
    setIndex(index < 4 ? index + 1 : index);
  };
  const back = () => {
    setIndex(index > 0 ? index - 1 : index);
  };

  return (
    <>
      {loading && <Loader />}
      <div
        className={clsx(
          classes.root,
          !readPrivacy && classes.privacyBackground
        )}>
        <Grid container>
          <Grid item xs={12}>
            {!readPrivacy && (
              <PrivacyDisclaimer setReadPrivacy={setReadPrivacy} />
            )}
            {readPrivacy && index === 0 && (
              <CreateProfileForm1
                index={index}
                next={next}
                back={() =>
                  history.push(
                    `/profile/${sessionStorage.getItem('FirstName')}`
                  )
                }
                profile={profile}
                setProfile={handleProfileField}
              />
            )}
            {readPrivacy && index === 1 && (
              <CreateProfileForm2
                index={index}
                next={next}
                back={back}
                profile={profile}
                setProfile={handleProfileField}
              />
            )}
            {readPrivacy && index === 2 && (
              <CreateProfileForm3
                index={index}
                next={next}
                back={back}
                profile={profile}
                setProfile={handleProfileField}
              />
            )}
            {readPrivacy && index === 3 && (
              <CreateProfileForm4
                index={index}
                next={next}
                back={back}
                profile={profile}
                setProfile={handleProfileField}
                submitProfile={handleSubmitProfile}
              />
            )}
            {readPrivacy && index === 4 && (
              <CreateProfileForm5 index={index} next={next} back={back} />
            )}
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default CreateProfile;
