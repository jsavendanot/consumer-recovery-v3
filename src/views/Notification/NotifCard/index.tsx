import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { IconButton, Theme } from '@material-ui/core';
import { DeleteOutline, KeyboardArrowRight } from '@material-ui/icons';
import { NotificationItem } from 'types/notification';
import useRouter from 'common/utils/useRouter';
import { useDispatch } from 'react-redux';
import {
  deleteNotification,
  markAsReadNotification,
  PinNotification
} from 'slices/notifications/action';

const useStyles = makeStyles((theme: Theme) => ({
  notifBox: {
    padding: '20px 20px 5px',
    background: '#FFFFFF',
    borderRadius: '14px',
    boxShadow: '0px 1px 6px rgba(0, 0, 0, 0.25)',
    display: 'flex',
    width: '430px',
    [theme.breakpoints.up('sm')]: {
      width: '730px'
    }
  },
  title: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '18px',
    lineHeight: '154.5%',
    color: '#37474F'
  }
}));

type Props = {
  notification: NotificationItem;
};
export const NotifCard: React.FC<Props> = ({ notification }) => {
  const classes = useStyles();
  const { history } = useRouter();
  const dipatch = useDispatch();

  const goToDetail = async (
    notificationType: string,
    referenceId: string,
    referenceName: string
  ) => {
    await dipatch(markAsReadNotification(notification.Id));

    if (notificationType === 'Comment' && referenceName === 'Goal') {
      history.push(`/goals/current/${referenceId}`);
    } else if (notificationType === 'Comment' && referenceName === 'Journal') {
      history.push(`/journeys/all/${referenceId}`);
    }
  };

  const deletehandler = () => {
    dipatch(deleteNotification(notification.Id));
  };

  const pinhandler = () => {
    dipatch(PinNotification(notification.Id, !notification.IsPinned));
  };

  return (
    <div className={classes.notifBox}>
      <div style={{ flexGrow: 1 }}>
        <span className={classes.title}>
          <div dangerouslySetInnerHTML={{ __html: notification.Message }} />
        </span>
        <div style={{ marginTop: '15px' }}>
          {notification.IsPinned ? (
            <IconButton
              style={{ padding: '16px 20px', marginRight: '20px' }}
              onClick={pinhandler}>
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAASCAYAAACNdSR1AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAADKSURBVHgBvZFBDsFQFEXv++yDVQhGltAFNNKO1IwViBUwksakohizAsPWjB2wAjVF+vxWKmnzS016Jj//5r77kncJEn/VmwA0QA4hsGvrtiaiDzPd8AVBxNFLieAtLYMEHEXusKnPp/FQIrW69kKVyg+x/WzAH5Rg9teWozJQFaOUOb4zw1DGEQzffQdR/snSMGMs5GQdBZCF1IRcfy5ilhVeKCt6rtUhwp5DmNmiSiyl8hRB9FKFrz/NDXN2ZOaA73RCEQ6bvqbSX+9ZPSvZwGtZAAAAAElFTkSuQmCC"
                alt=""
              />
            </IconButton>
          ) : (
            <IconButton
              style={{ padding: '16px 20px', marginRight: '20px' }}
              onClick={pinhandler}>
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAASCAYAAABit09LAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAADLSURBVHgBvZK9DcIwEIXPP/SMEEbICCkpGSElHVIKZqBLh4SQYAQ6pDSBCRATxCO4SYXt4+wGKXESCsQrrNP589P56dimPs2FMQ0gzCEqpmwrUu5LhGEhYDDgZZZrZ0xK9S2CXVwrF+Uq18GxXK6VQ3fvYg7x6aHgCF/q9yDzx/a6T4yUj0hEWlqT7ugPLEBC1PQmGfBS0r4yPg55IRnNaj4OfWCOiGoSQ2h6zaI6NEV17F38IXBGcdBUutuX3QbSctDw06B17gwRvQFHRFPkzobpsAAAAABJRU5ErkJggg=="
                alt=""
              />
            </IconButton>
          )}
          <IconButton onClick={deletehandler}>
            <DeleteOutline style={{ fill: '#73BA9B' }} />
          </IconButton>
        </div>
      </div>
      <div>
        <IconButton
          onClick={() =>
            goToDetail(
              notification.NotificationType,
              notification.ReferenceId,
              notification.ReferenceName
            )
          }>
          <KeyboardArrowRight style={{ fill: '#F79221' }} />
        </IconButton>
      </div>
    </div>
  );
};

export default NotifCard;
