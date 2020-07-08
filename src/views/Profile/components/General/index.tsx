import React from 'react';
import { Profile } from 'types/profile';

import { makeStyles } from '@material-ui/styles';
import { Grid, Divider } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  container2: {
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
    color: 'rgba(115, 186, 155, 0.7)'
  },
  value: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '14px',
    lineHeight: '127.69%',
    color: '#323F45'
  },
  tabTitleContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '10px 0'
  },
  tabTitleContainer2: {
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
  image: {
    marginRight: '10px'
  },
  value2: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '16px',
    lineHeight: '127.69%',
    color: '#37474F'
  }
}));

type Props = {
  profile: Profile;
};
export const General: React.FC<Props> = ({ profile }) => {
  const classes = useStyles();

  return (
    <Grid container className={classes.container2}>
      <Grid item xs={12}>
        <div className={classes.tabTitleContainer2}>
          <div className={classes.subContainer2}>
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAATCAMAAACqTK3AAAABC1BMVEUAAAAA//9VqqpmzJmAqqpqv5VttqR3u5lxuJx5vKFzv5lttp52up10uZtxvJ5xuJx2t51zuZlwu5tzvJ5xuJp0uZxxu5lyuJ11uppyuZp1upxzuZxxuppyuJ11up1yuppyuZt0uZpzupx0u5pyupxzu5pyuppzupt0uZtzuptzuZpzuppyuppzuZtyupxzu5tzupt0upxzupt0uppyuptzuptzupxzupt0uptzupt0uptzuptzu5pzuppzupxzuptzuptyu5tzupxyuptzuptzuppzuptzupxzuptzuptzuZtzuptzuptzuptzu5tzuptzuptzuptzuptzuptzuptzuptzuptzupv////TtCITAAAAV3RSTlMAAQMFBgwODxITFBUaISIkJygpKissLS8wOjs+P0FGTldYXWVnbXJzdXp8gYaHiIqMjZeYnJ6foKOmqq2vtLa9wcLDxMnQ2d/k5ufs7fDy8/T3+fr8/f62N+qbAAAAAWJLR0RY7bXEjgAAALZJREFUGBkFwQVCQgEABbDZ3Y3d3YHdHYgK/93/Jm4AsF0keesCgKMkSQkAGnuuk5RA38rhwWov+/n7SAltJ/UkqR9vpTb/kBLtTynu93Zvi6RYdJVhLvM+CROveaR7mulUh4H+SqbAaXYANlMGLxkHGMoz+EkLQFNRBV/pAmjNJ3jMLMBM7sBGbhoA11kDnZWsAyv56AAWkrMRBssp5gCWa8l3JfldAmDs4iepno8CgOaBvmYA/2o5JPDCwmBDAAAAAElFTkSuQmCC"
              alt=""
              className={classes.image}
            />
            <span className={classes.value2}>
              {profile.Gender === 'Male' && 'Male'}
              {profile.Gender === 'Female' && 'Female'}
              {profile.Gender === 'Other' && 'Non-binary'}
              {profile.Gender === 'Unknown' && 'Prefer not to say'}
            </span>
          </div>
          <div className={classes.subContainer2}>
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAATCAYAAACdkl3yAAAABmJLR0QA/wD/AP+gvaeTAAAB50lEQVQ4jc2SP0iVYRTGf8/57pVIqqUigoSsTVyiRaihJCEoaAgCHYoKJaXhqmUK0pBQBIIuQd5siP5sNdQN75WWImoKqaGhJTJoqEVsket3Touf3uJuNvhMh9/Lec5zXg7UqL987/xguXi0lg3MFq8VZqZa/mG3r1amd9cyy4rLL+/vkGLYFUMZu/Lq7j6CgiX0Z6xQmT4YQZ+Hd9ca5bIin097CfYLi4ylqQ0LdgJ71yb7GLA5FM11EyVh74Aq8hcZU+gNELg9r+l5DXiESnUTpZZ+xXUqSbWYMbf0g8JOKPGfa6NjNlxzYT5fN5G59QhKbjyuSTkqKJFqcrUj1aSglISN1jVarzaekQbLDxpdS+cQZxQcBhZE3AQI1AW0Bnwz4g6Ao15BE/AJYpp8PBo/0vMrF1p6IjjJ6vWwLdCtv6ZBU8a0hltBE1R1FjiggUpxCWhYz1rLxi5bMXnqpuOSugSfV96rghsK2oFB4PcK/x6hCwQdESoCJGnSYFJ0jx+7eNpSNoX8SyJvA12X6Ejk44H2LBsPw+0Q0liyTFvO9RaxfX5h6yWg0xu0qMLMVIukEYlOoEpoKPXqs5zlmkNMZJ9NRF/e4mOKtQdMEmwByuY+0vj+x5wGKsVgnYpImjbeQf43oz8qIb03VH/5hgAAAABJRU5ErkJggg=="
              alt=""
              className={classes.image}
            />
            {profile.DateOfBirth && (
              <span className={classes.value2}>
                {new Date().getFullYear() -
                  new Date(profile.DateOfBirth).getFullYear()}
              </span>
            )}
          </div>
        </div>
        <div className={classes.tabTitleContainer2}>
          <div className={classes.subContainer2} style={{ width: '100%' }}>
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAAz1BMVEUAAAAA//+AgIBVqqpmzJmAqqqAs5l0uaJxvZd2tptyuZ53u5lzvZxyvJp2t51zuZlxuJpzuZtyu5t0u5xyuZp0uZxyupp0u5tzupt0u5x0uZtzupp0u5xzu5pyuppzuptzu5tyuppzuZtyupxzuptzuptzuptzupxzuptzupp0uptzupx0uZtzuptyuppzu5pzupt0uptzuZtzuptzupxzupt0uptyu5tzuptzupxzuptzuptzuptzuptzuptzuptzuptzuptzuptzupv////GMGV7AAAAQ3RSTlMAAQIDBQYKCxscHR4fJicoKzM4S0xNTk9ZWmNobG1yc3iGh4iMlJ6foKKqtre4ub6/wMbHyMrLzdna2+Pl5vP29/3+QwZc2gAAAAFiS0dERPm0mMEAAADqSURBVBjTZctrQ8EAGIbhu81MhFY2lKbIoVGOTTTq7fn//6kP6SD3x+t9XtjnFYseB/ntpUm2iPO/Fm2l9Wi0lrLat92Y9csAlYFZa7+z3c892lkI4G+tBm692627EFnmA231obCSpLQAQ8XAUmXclSaNxlSpS1Vz8OwF6po44EwVwsZylDSGrhoATXXgUaV/2INE53i2hujrfaYHeNIZLFTBTTVtNmfS+3XbXk8g1gAKqSQ9339Ib5eAn1kETtjphA4Xd7dlAGq2iziqZTasHmmYSZtxkiTJ1R/Nx3OTJPUO17nTIAiCEgCf2pcj4ev1bgcAAAAASUVORK5CYII="
              alt=""
              className={classes.image}
            />
            <span className={classes.value2}>{profile?.UserEmail}</span>
          </div>
        </div>
        <div className={classes.tabTitleContainer2}>
          <div className={classes.subContainer2} style={{ width: '100%' }}>
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAATCAMAAACnUt2HAAAAWlBMVEUAAACAqqpttpKAv59xxo6As5l0uaJqv5Vyuptyu5t0uZtzupt0uZtzu5tzuptzu5tzuppyuppzuptzuZtzuptzuptzuptyu5tyuptzuptzuptzuppzupv///+rBYmhAAAAHHRSTlMABgcICQoLDFx7lqChqKmztLm6u7y9wcLE7PDxrVYWdAAAAAFiS0dEHesDcZEAAABfSURBVBjTrcjLEkAgAAXQS6K8Ka/c//9OmxjVjJWzPIAnjZGIyIXcqugsGW9hSZLcytcZeuuz+cjHXKR3bzYwMIn0yEmgZ6LDmaaD2o+wjl0BaMJsge+sAfdf6jA1cAGS/RmSTrPQrgAAAABJRU5ErkJggg=="
              alt=""
              className={classes.image}
            />
            <span className={classes.value2}>{profile?.PostalAddress}</span>
          </div>
        </div>
        <div className={classes.tabTitleContainer2}>
          <div className={classes.subContainer2} style={{ width: '100%' }}>
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAMAAABhEH5lAAAAeFBMVEUAAAAA//+Av59xuJx1uphzuZtxup10vJ11up10u5pyu5tzuZp0u5tzuZxyu5xzuptyu5t0uptzuptzu5p0uppzu5tzupxzuptzu5t0upt0uZtzuZtzu5pzuptzuppzuZtzuptyuptzuptzuptzuptzuptzupv///+LWVo3AAAAJnRSTlMAAQgkJTM0OUZlaWpwcXR6e4KFjpiZp7Kztbe7vr/Q0eDh4uP8/jqcbsUAAAABYktHRCctD6gjAAAAaUlEQVQYGY3BVxKCQBRFwTNjAAwoIBgAMeDd/xKlrFJ580U3UyV1fZ5jnCStMUpJOcZeUoOxlJRhuKcKAukrIuDvV08g7itHYKvKQ9bkqxlfm76LCg0u/MQ3fbT8+fShQcuYW+wOx4SJ3twpB9q3yAdrAAAAAElFTkSuQmCC"
              alt=""
              className={classes.image}
            />
            <span className={classes.value2}>{profile?.MobilePhone}</span>
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
            <span className={classes.value}>{profile?.ContactName}</span>
          </div>
        </div>
        <div className={classes.tabTitleContainer}>
          <div className={classes.subContainer}>
            <span className={classes.title2}>Relationship</span>
          </div>
          <div className={classes.subContainer}>
            <span className={classes.value}>
              {profile?.RelationshipToConsumer}
            </span>
          </div>
        </div>
        <div className={classes.tabTitleContainer}>
          <div className={classes.subContainer}>
            <span className={classes.title2}>Phone</span>
          </div>
          <div className={classes.subContainer}>
            <span className={classes.value}>
              {profile?.EmergencyContactPhone}
            </span>
          </div>
        </div>
        <div className={classes.tabTitleContainer}>
          <div className={classes.subContainer}>
            <span className={classes.title2}>Address</span>
          </div>
          <div className={classes.subContainer}>
            <span className={classes.value}>{profile?.EmergencyAddress}</span>
          </div>
        </div>
        <div className={classes.tabTitleContainer}>
          <div className={classes.subContainer}>
            <span className={classes.title2}>When to contact</span>
          </div>
          <div className={classes.subContainer}>
            <span className={classes.value}>
              {profile?.EmergencyWhenToContact}
            </span>
          </div>
        </div>
      </Grid>
      {/* <Grid item xs={12} style={{ margin: '20px 0' }}>
        <div className={classes.tabTitleContainer}>
          <span className={classes.title}>Cultural background</span>
        </div>
        <Divider className={classes.divider} />
        <div className={classes.tabTitleContainer}>
          <div className={classes.subContainer}>
            <span className={classes.title2}>Country of birth</span>
          </div>
          <div className={classes.subContainer}>
            <span className={classes.value}>{profile?.CountryOfBirth}</span>
          </div>
        </div>
        <div className={classes.tabTitleContainer}>
          <div className={classes.subContainer}>
            <span className={classes.title2}>Preferred language</span>
          </div>
          <div className={classes.subContainer}>
            <span className={classes.value}>{profile?.PreferredLanguage}</span>
          </div>
        </div>
      </Grid> */}
    </Grid>
  );
};

export default General;
