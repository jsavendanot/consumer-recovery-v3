import React, { ChangeEvent } from 'react';

import { makeStyles } from '@material-ui/styles';
import { Grid, Divider, TextField } from '@material-ui/core';
import { Profile } from 'types/profile';

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px'
  },
  divider: {
    border: '1px solid #73BA9B',
    margin: '10px 0 20px'
  },
  title: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '18px',
    lineHeight: '21px',
    color: '#73BA9B'
  },
  title2: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '18px',
    lineHeight: '21px',
    color: '#73BA9B'
  },
  value: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '14px',
    lineHeight: '127.69%',
    color: '#323F45'
  },
  value2: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '16px',
    lineHeight: '127.69%',
    color: '#37474F'
  },
  tabTitleContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '10px 0'
  },
  tabTitleContainer2: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    margin: '10px 0'
  },
  subContainer: {
    width: '50%',
    textAlign: 'left'
  },
  subContainer2: {
    width: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  textField: {
    background: '#FFFFFF',
    borderRadius: '5px',
    borderStyle: 'none',
    width: '100%'
  },
  labelContainer: {
    width: 90,
    textAlign: 'right',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '18px',
    lineHeight: '21px',
    color: '#73BA9B',
    marginRight: 20
  }
}));

export const schema = {
  FirstName: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 80
    }
  },
  Surname: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 80
    }
  },
  PostalAddress: {
    presence: false,
    length: {
      maximum: 364
    }
  },
  Gender: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 32
    }
  },
  MobilePhone: {
    presence: false,
    numericality: {
      onlyInteger: true
    },
    length: {
      minimum: 10,
      maximum: 15
    }
  },
  ContactName: {
    length: {
      maximum: 64
    }
  },
  RelationshipToConsumer: {
    length: {
      maximum: 164
    }
  },
  EmergencyContactPhone: {
    numericality: {
      onlyInteger: true
    },
    length: {
      maximum: 15
    }
  },
  EmergencyAddress: {
    length: {
      maximum: 364
    }
  },
  EmergencyWhenToContact: {
    length: {
      maximum: 264
    }
  },
  DateOfBirth: {
    format: {
      pattern: `^([0-2]?[1-9]|[1-3][01])/(0?[1-9]|1[0-2])/((19|20)[0-9][0-9]$)`
    }
  },
  PreferredLanguage: {
    length: {
      maximum: 64
    }
  }
};

export type FormStateType = {
  isValid: boolean;
  values: {
    FirstName?: string;
    Surname?: string;
    PostalAddress?: string;
    Gender?: string;
    DateOfBirth?: string;
    MobilePhone?: string;
    ContactName?: string;
    RelationshipToConsumer?: string;
    EmergencyContactPhone?: string;
    EmergencyAddress?: string;
    EmergencyWhenToContact?: string;
    CountryOfBirth?: string;
    PreferredLanguage?: string;
  };
  touched: {
    FirstName?: boolean;
    Surname?: boolean;
    PostalAddress?: boolean;
    Gender?: boolean;
    DateOfBirth?: boolean;
    MobilePhone?: boolean;
    ContactName?: boolean;
    RelationshipToConsumer?: boolean;
    EmergencyContactPhone?: boolean;
    EmergencyAddress?: boolean;
    EmergencyWhenToContact?: boolean;
    CountryOfBirth?: boolean;
    PreferredLanguage?: boolean;
  };
  errors: {
    FirstName?: string[];
    Surname?: string[];
    PostalAddress?: string[];
    Gender?: string[];
    DateOfBirth?: string[];
    MobilePhone?: string[];
    ContactName?: string[];
    RelationshipToConsumer?: string[];
    EmergencyContactPhone?: string[];
    EmergencyAddress?: string[];
    EmergencyWhenToContact?: string[];
    CountryOfBirth?: string[];
    PreferredLanguage?: string[];
  };
};

type Props = {
  profile: Profile;
  hasError: (field: string) => boolean;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

const General: React.FC<Props> = ({ profile, hasError, handleChange }) => {
  const classes = useStyles();

  const genders = [
    { name: '', value: '' },
    { name: 'Male', value: 'Male' },
    { name: 'Female', value: 'Female' },
    { name: 'Non-binary', value: 'Other' },
    { name: 'Prefer not to say', value: 'Unknown' }
  ];

  return (
    <Grid container className={classes.container}>
      <Grid item xs={12}>
        <div className={classes.tabTitleContainer2}>
          <div className={classes.labelContainer}>First Name</div>
          <div className={classes.subContainer2}>
            <TextField
              error={hasError('FirstName')}
              label=""
              name="FirstName"
              type="text"
              autoComplete="off"
              value={profile.FirstName ? profile.FirstName : ''}
              placeholder="type here"
              className={classes.textField}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className={classes.tabTitleContainer2}>
          <div className={classes.labelContainer}>Last Name</div>
          <div className={classes.subContainer2}>
            <TextField
              error={hasError('Surname')}
              label=""
              name="Surname"
              type="text"
              autoComplete="off"
              value={profile.Surname ? profile.Surname : ''}
              placeholder="type here"
              className={classes.textField}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className={classes.tabTitleContainer2}>
          <div className={classes.labelContainer}>
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAATCAMAAACqTK3AAAABC1BMVEUAAAAA//9VqqpmzJmAqqpqv5VttqR3u5lxuJx5vKFzv5lttp52up10uZtxvJ5xuJx2t51zuZlwu5tzvJ5xuJp0uZxxu5lyuJ11uppyuZp1upxzuZxxuppyuJ11up1yuppyuZt0uZpzupx0u5pyupxzu5pyuppzupt0uZtzuptzuZpzuppyuppzuZtyupxzu5tzupt0upxzupt0uppyuptzuptzupxzupt0uptzupt0uptzuptzu5pzuppzupxzuptzuptyu5tzupxyuptzuptzuppzuptzupxzuptzuptzuZtzuptzuptzuptzu5tzuptzuptzuptzuptzuptzuptzuptzuptzupv////TtCITAAAAV3RSTlMAAQMFBgwODxITFBUaISIkJygpKissLS8wOjs+P0FGTldYXWVnbXJzdXp8gYaHiIqMjZeYnJ6foKOmqq2vtLa9wcLDxMnQ2d/k5ufs7fDy8/T3+fr8/f62N+qbAAAAAWJLR0RY7bXEjgAAALZJREFUGBkFwQVCQgEABbDZ3Y3d3YHdHYgK/93/Jm4AsF0keesCgKMkSQkAGnuuk5RA38rhwWov+/n7SAltJ/UkqR9vpTb/kBLtTynu93Zvi6RYdJVhLvM+CROveaR7mulUh4H+SqbAaXYANlMGLxkHGMoz+EkLQFNRBV/pAmjNJ3jMLMBM7sBGbhoA11kDnZWsAyv56AAWkrMRBssp5gCWa8l3JfldAmDs4iepno8CgOaBvmYA/2o5JPDCwmBDAAAAAElFTkSuQmCC"
              alt=""
            />
          </div>
          <div className={classes.subContainer2}>
            <div className={classes.value2}>
              <TextField
                error={hasError('Gender')}
                fullWidth
                label="Please select"
                name="Gender"
                select
                autoComplete="off"
                SelectProps={{ native: true }}
                value={profile.Gender}
                className={classes.textField}
                onChange={handleChange}>
                {genders.map(gender => (
                  <option key={gender.value} value={gender.value}>
                    {gender.name}
                  </option>
                ))}
              </TextField>
            </div>
          </div>
        </div>
        <div className={classes.tabTitleContainer2}>
          <div className={classes.labelContainer}>
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAATCAYAAACdkl3yAAAABmJLR0QA/wD/AP+gvaeTAAAB50lEQVQ4jc2SP0iVYRTGf8/57pVIqqUigoSsTVyiRaihJCEoaAgCHYoKJaXhqmUK0pBQBIIuQd5siP5sNdQN75WWImoKqaGhJTJoqEVsket3Touf3uJuNvhMh9/Lec5zXg7UqL987/xguXi0lg3MFq8VZqZa/mG3r1amd9cyy4rLL+/vkGLYFUMZu/Lq7j6CgiX0Z6xQmT4YQZ+Hd9ca5bIin097CfYLi4ylqQ0LdgJ71yb7GLA5FM11EyVh74Aq8hcZU+gNELg9r+l5DXiESnUTpZZ+xXUqSbWYMbf0g8JOKPGfa6NjNlxzYT5fN5G59QhKbjyuSTkqKJFqcrUj1aSglISN1jVarzaekQbLDxpdS+cQZxQcBhZE3AQI1AW0Bnwz4g6Ao15BE/AJYpp8PBo/0vMrF1p6IjjJ6vWwLdCtv6ZBU8a0hltBE1R1FjiggUpxCWhYz1rLxi5bMXnqpuOSugSfV96rghsK2oFB4PcK/x6hCwQdESoCJGnSYFJ0jx+7eNpSNoX8SyJvA12X6Ejk44H2LBsPw+0Q0liyTFvO9RaxfX5h6yWg0xu0qMLMVIukEYlOoEpoKPXqs5zlmkNMZJ9NRF/e4mOKtQdMEmwByuY+0vj+x5wGKsVgnYpImjbeQf43oz8qIb03VH/5hgAAAABJRU5ErkJggg=="
              alt=""
            />
          </div>
          <div className={classes.subContainer2}>
            {profile && (
              <TextField
                error={hasError('DateOfBirth')}
                fullWidth
                placeholder="DD/MM/YYYY"
                name="DateOfBirth"
                autoComplete="off"
                className={classes.textField}
                value={profile.DateOfBirth}
                onChange={handleChange}
              />
            )}
          </div>
        </div>
        <div className={classes.tabTitleContainer2}>
          <div className={classes.labelContainer}>
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAAz1BMVEUAAAAA//+AgIBVqqpmzJmAqqqAs5l0uaJxvZd2tptyuZ53u5lzvZxyvJp2t51zuZlxuJpzuZtyu5t0u5xyuZp0uZxyupp0u5tzupt0u5x0uZtzupp0u5xzu5pyuppzuptzu5tyuppzuZtyupxzuptzuptzuptzupxzuptzupp0uptzupx0uZtzuptyuppzu5pzupt0uptzuZtzuptzupxzupt0uptyu5tzuptzupxzuptzuptzuptzuptzuptzuptzuptzuptzuptzupv////GMGV7AAAAQ3RSTlMAAQIDBQYKCxscHR4fJicoKzM4S0xNTk9ZWmNobG1yc3iGh4iMlJ6foKKqtre4ub6/wMbHyMrLzdna2+Pl5vP29/3+QwZc2gAAAAFiS0dERPm0mMEAAADqSURBVBjTZctrQ8EAGIbhu81MhFY2lKbIoVGOTTTq7fn//6kP6SD3x+t9XtjnFYseB/ntpUm2iPO/Fm2l9Wi0lrLat92Y9csAlYFZa7+z3c892lkI4G+tBm692627EFnmA231obCSpLQAQ8XAUmXclSaNxlSpS1Vz8OwF6po44EwVwsZylDSGrhoATXXgUaV/2INE53i2hujrfaYHeNIZLFTBTTVtNmfS+3XbXk8g1gAKqSQ9339Ib5eAn1kETtjphA4Xd7dlAGq2iziqZTasHmmYSZtxkiTJ1R/Nx3OTJPUO17nTIAiCEgCf2pcj4ev1bgcAAAAASUVORK5CYII="
              alt=""
            />
          </div>
          <div className={classes.subContainer2}>
            <span className={classes.value2}>
              {profile && profile.UserEmail}
            </span>
          </div>
        </div>
        <div className={classes.tabTitleContainer2}>
          <div className={classes.labelContainer}>
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAATCAMAAACnUt2HAAAAWlBMVEUAAACAqqpttpKAv59xxo6As5l0uaJqv5Vyuptyu5t0uZtzupt0uZtzu5tzuptzu5tzuppyuppzuptzuZtzuptzuptzuptyu5tyuptzuptzuptzuppzupv///+rBYmhAAAAHHRSTlMABgcICQoLDFx7lqChqKmztLm6u7y9wcLE7PDxrVYWdAAAAAFiS0dEHesDcZEAAABfSURBVBjTrcjLEkAgAAXQS6K8Ka/c//9OmxjVjJWzPIAnjZGIyIXcqugsGW9hSZLcytcZeuuz+cjHXKR3bzYwMIn0yEmgZ6LDmaaD2o+wjl0BaMJsge+sAfdf6jA1cAGS/RmSTrPQrgAAAABJRU5ErkJggg=="
              alt=""
            />
          </div>
          <div className={classes.subContainer2}>
            <TextField
              error={hasError('PostalAddress')}
              label=""
              name="PostalAddress"
              type="text"
              autoComplete="off"
              value={profile.PostalAddress ? profile.PostalAddress : ''}
              placeholder="type here"
              className={classes.textField}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className={classes.tabTitleContainer2}>
          <div className={classes.labelContainer}>
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAMAAABhEH5lAAAAeFBMVEUAAAAA//+Av59xuJx1uphzuZtxup10vJ11up10u5pyu5tzuZp0u5tzuZxyu5xzuptyu5t0uptzuptzu5p0uppzu5tzupxzuptzu5t0upt0uZtzuZtzu5pzuptzuppzuZtzuptyuptzuptzuptzuptzuptzupv///+LWVo3AAAAJnRSTlMAAQgkJTM0OUZlaWpwcXR6e4KFjpiZp7Kztbe7vr/Q0eDh4uP8/jqcbsUAAAABYktHRCctD6gjAAAAaUlEQVQYGY3BVxKCQBRFwTNjAAwoIBgAMeDd/xKlrFJ580U3UyV1fZ5jnCStMUpJOcZeUoOxlJRhuKcKAukrIuDvV08g7itHYKvKQ9bkqxlfm76LCg0u/MQ3fbT8+fShQcuYW+wOx4SJ3twpB9q3yAdrAAAAAElFTkSuQmCC"
              alt=""
            />
          </div>
          <div className={classes.subContainer2}>
            <TextField
              error={hasError('MobilePhone')}
              label=""
              name="MobilePhone"
              type="text"
              autoComplete="off"
              value={profile.MobilePhone ? profile.MobilePhone : ''}
              placeholder="type here"
              className={classes.textField}
              onChange={handleChange}
              inputProps={{ maxLength: 20 }}
            />
          </div>
        </div>
      </Grid>
      <Grid item xs={12} style={{ marginTop: '20px' }}>
        <div className={classes.tabTitleContainer}>
          <span className={classes.title}>Emergency contact</span>
        </div>
        <Divider className={classes.divider} />
        <div className={classes.tabTitleContainer}>
          <div className={classes.subContainer}>
            <span className={classes.title2}>Name</span>
          </div>
          <div className={classes.subContainer}>
            <TextField
              error={hasError('ContactName')}
              label=""
              name="ContactName"
              type="text"
              autoComplete="off"
              value={profile.ContactName ? profile.ContactName : ''}
              placeholder="type here"
              className={classes.textField}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className={classes.tabTitleContainer}>
          <div className={classes.subContainer}>
            <span className={classes.title2}>Relationship</span>
          </div>
          <div className={classes.subContainer}>
            <TextField
              error={hasError('RelationshipToConsumer')}
              fullWidth
              label="Please select"
              name="RelationshipToConsumer"
              select
              autoComplete="off"
              SelectProps={{ native: true }}
              value={
                profile.RelationshipToConsumer
                  ? profile.RelationshipToConsumer
                  : ''
              }
              className={classes.textField}
              onChange={handleChange}>
              {[
                '',
                'Parent',
                'Spouse',
                'Child',
                'Partner',
                'Grandparent',
                'Sibling',
                'Friend',
                'other'
              ].map(relation => (
                <option key={relation} value={relation}>
                  {relation}
                </option>
              ))}
            </TextField>
          </div>
        </div>
        <div className={classes.tabTitleContainer}>
          <div className={classes.subContainer}>
            <span className={classes.title2}>Phone</span>
          </div>
          <div className={classes.subContainer}>
            <TextField
              error={hasError('EmergencyContactPhone')}
              label=""
              name="EmergencyContactPhone"
              type="number"
              autoComplete="off"
              value={
                profile.EmergencyContactPhone
                  ? profile.EmergencyContactPhone
                  : ''
              }
              placeholder="type here"
              className={classes.textField}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className={classes.tabTitleContainer}>
          <div className={classes.subContainer}>
            <span className={classes.title2}>Address</span>
          </div>
          <div className={classes.subContainer}>
            <TextField
              error={hasError('EmergencyAddress')}
              label=""
              name="EmergencyAddress"
              type="text"
              autoComplete="off"
              value={profile.EmergencyAddress ? profile.EmergencyAddress : ''}
              placeholder="type here"
              className={classes.textField}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className={classes.tabTitleContainer}>
          <div className={classes.subContainer}>
            <span className={classes.title2}>When to contact</span>
          </div>
          <div className={classes.subContainer}>
            <TextField
              error={hasError('EmergencyWhenToContact')}
              fullWidth
              label="Please select"
              name="EmergencyWhenToContact"
              select
              autoComplete="off"
              SelectProps={{ native: true }}
              value={
                profile.EmergencyWhenToContact
                  ? profile.EmergencyWhenToContact
                  : ''
              }
              className={classes.textField}
              onChange={handleChange}>
              {['', 'Anytime', 'Morning', 'Afternoon', 'Night'].map(
                relation => (
                  <option key={relation} value={relation}>
                    {relation}
                  </option>
                )
              )}
            </TextField>
          </div>
        </div>
      </Grid>
      {/* <Grid item xs={12} style={{ marginTop: '20px' }}>
        <div className={classes.tabTitleContainer}>
          <span className={classes.title}>Cultural background</span>
        </div>
        <Divider className={classes.divider} />
        <div className={classes.tabTitleContainer}>
          <div className={classes.subContainer}>
            <span className={classes.title2}>Country of birth</span>
          </div>
          <div className={classes.subContainer}>
            <TextField
              error={hasError('CountryOfBirth')}
              helperText={
                hasError('CountryOfBirth')
                  ? formState.errors.CountryOfBirth &&
                    formState.errors.CountryOfBirth[0]
                  : null
              }
              label=""
              name="CountryOfBirth"
              type="text"
              autoComplete="off"
              value={profile.CountryOfBirth ? profile.CountryOfBirth : ''}
              placeholder="type here"
              className={classes.textField}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className={classes.tabTitleContainer}>
          <div className={classes.subContainer}>
            <span className={classes.title2}>Preferred language</span>
          </div>
          <div className={classes.subContainer}>
            <TextField
              error={hasError('PreferredLanguage')}
              helperText={
                hasError('PreferredLanguage')
                  ? formState.errors.PreferredLanguage &&
                    formState.errors.PreferredLanguage[0]
                  : null
              }
              label=""
              name="PreferredLanguage"
              type="text"
              autoComplete="off"
              value={profile.PreferredLanguage ? profile.PreferredLanguage : ''}
              placeholder="type here"
              className={classes.textField}
              onChange={handleChange}
            />
          </div>
        </div>
      </Grid> */}
    </Grid>
  );
};

export default General;
