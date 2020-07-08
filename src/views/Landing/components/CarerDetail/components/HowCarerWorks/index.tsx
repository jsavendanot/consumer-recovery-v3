import React from 'react';
import useRouter from 'common/utils/useRouter';

import { IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Close } from '@material-ui/icons';

import { Button } from 'common/components';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%',
    backgroundColor: '#85BFFF'
  },
  body: {
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column',
    padding: '15px'
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '15px'
  },
  content: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    padding: '15px 0'
  },
  text: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '24px',
    lineHeight: '30px',
    color: '#FFFFFF',
    margin: '8px 10px'
  },
  contentTitle: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '18px',
    lineHeight: '22px',
    color: '#FFFFFF',
    margin: '8px 10px'
  },
  footer: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: '20px'
  }
}));

type Props = {
  close: () => void;
};

const HowCarerWorks: React.FC<Props> = ({ close }) => {
  const classes = useStyles();
  const { history } = useRouter();

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAAAYCAYAAAAF6fiUAAAABmJLR0QA/wD/AP+gvaeTAAAFlklEQVRoge2ZfWiXVRTHz7PNt/k2p4iuRKmWGr3QUjSECpLCxEkYUdqLqVO0aZhFIFRUQn8Us8DSMsNsJSUry4ykokSishJNkqymCyqnCyvZtLm2T3/c+9DxPPf5bdPtQaEvjP2e8z1v9zz3nnvv7yfyP0REBFgH/AqUZxk38sFLRKRURIrV3xD/f2DArkVEfheRBhE5IiInRKREREaISE8RKfJ6g/z/gSLyi4hsjKJoU3cM5EwBNIpIXxH5OYqiUVkGXka2GJ/Z4DoIYLDKrw3olVXsPBFZklUwEWkSt3LONoxUnyMR6ZFV4AIRmSci1SIyNMC3iMghca2myCfXS0QKPR/LLJq9TYOIHBZX9B9FpDqKooNdmH9XYZh5zss0OjAAmAZUAOXAeGA40G4i3kbjmY7YnU0AZpgxFLVv1TUoEBGJouiYiGw5TR/7zPOeKIraziir7GF7fmhVdwjAJBG5TUQ2R1H0cXv6mcxU4FpgF1CZRbzTQE/znC8iAvQFyoDh7TkACoA1IrJDRCpF5EPg+W7f0IFJZvnODeg8qfgJ3ZhLP6BfClcIzAVuAfINN9+MoRx4FfjbP7cCW4HSHLFfSZz3HL7BHfO7B0CpCVgR0LkAd8kBuLULYg4BbgD6Az18YXfjjpCtwCZggNK/DjigcnzK+FucUjyLP4BxgXxuNHqrgD3q+UvMSw8NqheuVfTuZDGGmuALUvQKgcuBYH/1xawEqoENvqh9UnRf8rGOqhdrsdHr3gOcDPATlb8HUny8C8wG3lCyg7ZGwOuK3wnkAZuNr5m5ilgK7PeKqzpQd207wgRa2Bl772MU8IPy8S3QgJu1lwX0dwSK1QK8Y2Qf4FZFjH/U5xrlb7mxawOWmpjVir/TcHoSzPGyz43P93IV4G2l+FEni1dmAgVfADAHtxQXGXkEfKHsd+M2v9X+uQ4oMDY7SaICyAeaA1wdcDVQo2RHlL/HjP4jgfxvUvxzSt4T1/ZijMF1kybjsxkYnFbE+5ViK3BXJ17AAhMo0eNxRW5S/ocpboqybQJGev2vlHy08fe9ifm44n4zXAv+6w9gqeEGeLk+JBwDCsUAmK50Viv5OOOzCJhJGEutX12gDUqxFXiwgy9gqwmS+K4H6G10Jitum5Kvx22qK5WskWTPPaL411D7Cv+10hgrFLfQcCVeXqVk9SnjfEvpVCj5NCVvxu11up1qNJB2ycOdY980BusAe0bWNhOMfhOQ+B4Ft8FqLPbyMk7t0Y3An0Z3pfGVx6m9/G7D15l8ihQ3T3Et8diAZ7U8UJe1Jkftc6LJd6/5/KLhn06rp+BmX40x+JRA7wKKgX1Gd12K32Kjt9rLq8iNXZgZg5thGvMMr49/LxtutuK2K/kS43MYro9PIbmZLgvUrCGQ+37vpxD4SclPApfmegn5uO9zNGpxl5P494PRwHdG5zimVyufRUZ3k5eXBxIH1wLXAonfIvyANeYbfgZudrdgzuy4FRuvuHIlL8H1/hjNnLoyY1QROEYD9xq9A8D5ip9s/G0P+bFOFwInjOM63PnW7vBtmJlofNkV8Kji9hpuGzDW2F8MLAIu8c/1Sj9x6gIuBC5KyWUqcHtAPh34K1D0uGDXtFOvm3G35xXAkAC/3viclctfbDSW5BK0OI45Fwf8jMnxAmYZ7ijwkC/Ufbgzfzx7nvA2W5R+ztidAXAe7kj6PvAJ7kabuPmepu9i4LDK+xCBFR4yzMd9V1IbKP42UtqO8XG9sVuuuIjkBSqEg0BfbzMKd3fYC/Q/o8pkCNyJSbei9A05YFwA3OFnXxVwVSds9SUGYKrh+5C8umvUA1cYmzza66NnIYCH1biy+XUQdw+IN+2vCRxVvd4UYI2f2bXAZz7hQSH9cxV+nC8AV2YZtBh3WhiRWdBzAP8C4sT0GLCebT4AAAAASUVORK5CYII="
          alt=""
        />
        <IconButton onClick={close}>
          <Close fontSize="large" style={{ fill: '#FFFFFF' }} />
        </IconButton>
      </div>
      <div className={classes.body}>
        <div className={classes.content}>
          <span className={classes.contentTitle}>How it works</span>
          <span
            className={classes.text}
            onClick={() => history.push('/home/consumer')}>
            Create A Recovery Plan
          </span>
          <span
            className={classes.text}
            onClick={() => history.push('/home/consumer')}>
            Access Other's Recovery Plan
          </span>
        </div>
        <div className={classes.content}>
          <span className={classes.contentTitle}>Information</span>
          <span className={classes.text}>About Us</span>
          <span className={classes.text}>Privacy</span>
          <span className={classes.text}>FAQ</span>
        </div>
      </div>
      <div className={classes.footer}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            width: '133px'
          }}>
          <Button type="carer" click={close}>
            Sign Up
          </Button>
          <span
            className={classes.text}
            style={{ marginTop: '15px' }}
            onClick={close}>
            Sign In
          </span>
        </div>
      </div>
    </div>
  );
};

export default HowCarerWorks;
