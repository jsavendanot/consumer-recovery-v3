import React, { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Avatar, Theme } from '@material-ui/core';
import { Network } from 'types/network';
import produce from 'immer';

const useStyles = makeStyles((theme: Theme) => ({
  avatar: {
    width: '100px',
    height: '100px'
  },
  name: {
    marginTop: '10px',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '22px',
    lineHeight: '26px',
    color: '#FFFFFF'
  },
  tabs: {
    '& .MuiTabs-flexContainer': {
      justifyContent: 'space-around'
    },
    '& .MuiTabs-indicator': {
      backgroundColor: '#fa9419'
    },
    marginBottom: '10px'
  },
  divider: {
    border: '1px solid #73BA9B',
    margin: '10px 0 20px'
  },
  content: {
    marginTop: theme.spacing(3)
  },
  label: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '24px',
    lineHeight: '17px',
    color: '#FFFFFF',
    cursor: 'pointer'
  },
  cameraImage: {
    position: 'absolute',
    top: '37%',
    right: '-24px',
    cursor: 'pointer'
  }
}));

type Props = {
  network: Network;
  setNetwork: Dispatch<SetStateAction<Network>>;
};

export const Image: React.FC<Props> = ({ network, setNetwork }) => {
  const classes = useStyles();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      // const imageType = event.target.files[0].type.replace('image/', '');
      fileReader.readAsDataURL(event.target.files[0]);
      fileReader.onload = e => {
        setNetwork(
          produce((draft: Network) => {
            draft.Image =
              'data:image/png;base64,' +
              e.target?.result!.toString().split('base64,')[1];
          })
        );
      };
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      <Avatar alt="" className={classes.avatar} src={network.Image} />
      <div>
        <input
          accept="image/*"
          type="file"
          onChange={handleInputChange}
          id="icon-button-file"
          style={{ display: 'none' }}
        />
        <label htmlFor="icon-button-file">
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAuCAMAAABZAGpeAAAC8VBMVEUAAAAAAAAAAAAAAAAAAAAAAAAkJCQAAABAQEAAAABNZmYAAAAAAAB2iXYAAAAAAABVZlUAAAAAAAAeHh4AAAAAAAAAAAAAAAALCwuFkIUAAAAAAAAAAABkbW0AAAAAAAAAAACElIylva0AAAAAAAAPDw8AAABES0uoxbYAAACuw7wAAAAAAABJT0kAAAC40MQAAAAAAAAAAAAyNzcAAACzyb4AAABldWoAAAAKCgqnu7EAAAAKCgoAAAAAAAAAAAAAAAANERERFRFDS0dYZFwdIR0nKys1PDi/2svF4tNufHVFT0hkcmurw7VQWVZYYltXYFrF4NTK5NVkcmrJ5tfK5tWNn5W71cjK5dhwfXXM6NnN6Nmgt63J5NXO6dp5ioGFmY+Sp57M6NiSpZqXq5+Xq6GrxLilu6/J5tbJ49bF3tGnvbKxybvN6drR7d7Q7d+/2szO6drK5Na2z8K30MO40sS60sa30cPA2sy40MPB28271Me81snF4NO92MrM6NnT7+DH4tPS7+HH4tTT8ODM59nT8OHQ7d3T8OHQ69zL59nU8eLR7t/M6NrT7+HV8OLU8eLS7d/U8eLV8uPP693V8uPR7t/V8uPU8ePV8uPS7+HV8uPT8OHU8eLU8eLV8uLU8eHV8uPV8uPU8ePV8uPV8uPV8uPV8uMAPh8EQiIFQyMGQyQIRSYIRScKRikcVTggWTwiWz4oYEQpYEUrYkYrYkcsY0gtZEguZUkvZUoxaE0zaU40ak41a084blM6b1Q7cFU+clg/c1lDd1xHemFIe2JOf2dWh25XiG9ainJbinNhkHhikXljkXpnlX1rmIFsmYJtmYNum4Vynodyn4hzn4l3o414pI18p5J9qJN+qJOBq5aCrJeDrZiFrpqGsJqKs56Ls6COtqGSuaaTuqeUu6eVvKedwq+ew7Cix7SozLqpzbqqzryu0L+01sW+3s3D49PI59fI6NjJ6NnN69vP7d7Q7d/T8OHU8eLV8uP///+SjbyNAAAAqHRSTlMAAQIFBgcHCAgJCgwNDQ4PDxARERIVFhcXFxgZHBwdHh8fHyAhISIiIyYmJygqKyssLS4uLy8wMDExMTIzNTY3ODw8PT0+QURERkhKSkxQUVJTVldaXGBhYWJkZWZnaGlrbm53fX19gISKjI6WmZqfoKCjpKmpqqurr7Gzs7W2vb7AwsPGyMvS1t3e3+Dh5OTm5+fn6u3u8fLy8/P09PX29/n6+/v8/f67QcahAAAAAWJLR0T61W0GSgAAA+xJREFUSMeNlnlg01Qcx9uk8RkbExMbqlkslcRoTaxbrbFa105R8L5R8b7v+1Y8UFHAE08EL5wD4lR0GnEq4ol4zQNUQPGeF07FY2zvP19e0q6vS6fff9Lm9/u83+/9fu9IJFKrKEXHxhx+znUzZsJZd00594itGZqKRhqLojeYMHkuHNL8KUduSFON3KP0ehNuhvW685j16WgD/60mwzDduG0sLAgV2/MeGK77DwohqNghj8BGmncCU09QzIHtsLHmH11HUMz2M7Hlo2fWhhLtexAExWw0zTe4zs/hMW7ftIagYuA0WAF+apDV2SBWqW40Bjaf5b370HWfdJ52X/5jqYu19K8aYO5OIOhHlAbc6fhdt+PrlzeCHy/+U0OczwE6mEB849vwqz/7+rqcz/t+//WJAHCect3ud//2gQc3Y/E0UELCvtVh0Bw+6H7MIfR2YDuMxyFQQuIZVeAV57eXnDq5ge0CEYdAAeRrqsDaNWs6PafFK75bsTgAng1sUxM4BBMXlVuqwFuvPo5cFvyI//ywgAAe3gSFiEQAn1DuqwLPYZde2L/ynZX98HsCgFtKHECAIKsdJLAIrnsePRaug4sIYAdZ8ABxVOohEvgEfomHXg0/JYBtkiIbibAIuIMEvoI9GHgPfl0LtG+hiHEPSI6+gQSWwW8x8A1cVgtM1xSJ84HzSMAdHHgdPV4bGHRrgauGgKPqqrQaDvZ+3DsIvyCqdEoFGJXa7gES6Fw1gH4PrOqsBTp20/AcvCoZl5GA43T1fNbTRXb62kwaV8nrg75X5fR6wRmuhb7pUCPl9wF1WrOuCICeEOB9bLne8qYA/LWUNsfe6wP9y5e8SWrJ8n7PMGcf08uI8VeramSPnwdH1KlZQ5XxavX2g6KZubNG9L8kb3k18vZDFIfQLfvCEfyv3rEaAO9p1LtMs31mw6wu2rnFTCv+hvNPDQkl1VI47u5Q99knF/N+iejquYRLmyuMv7hj+EF85d7IX1dRD6onGeVNo0mzWuzS/pfOJtznTDq4VMhbRipZSSg4mlgREWazXSzvfuLlNz3qL55bJ500rtxqt1g68o9XEhoiFC1j5exiqa1tl/0mHjvxgF3b2kpFO581NTUpcoC8uBAhJJTRupnN2YVia6lcLpdaiwU7l7WMtCJ740frbxTAS8kmTTet5lze9pTPNVumoamKJLBg+MWIZs6JCUVNa0bG8pUxtLSKhucAE3aRon6wvCgnlVRa03Rd17R0SknKIs+CGNXg3mVAnBclWVGaVFVtUhRZEvl4+PCVLwEGsJwgSglZlhOSKHAscqciI348MADEOV4QBJ6Lg/9y/z/6F7ezF1uP8cJGAAAAAElFTkSuQmCC"
            alt=""
            className={classes.cameraImage}
          />
        </label>
      </div>
    </div>
  );
};

export default Image;
