import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/styles';
import { Grid, Theme, Divider } from '@material-ui/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

import { Filter, Note, Preview, Operations } from './components';
import { Button, Loader } from 'common/components';
import { ExportFilterType } from 'types/export';
import { downloadGenerateData } from 'slices/export/action';
import { RootState } from 'reducer';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    height: '100%',
    padding: '20px 0',
    [theme.breakpoints.up('sm')]: {
      padding: '40px'
    }
  },
  title: {
    fontFamily: 'Tajawal',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '48px',
    lineHeight: '58px',
    color: '#37474F'
  },
  selectText: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '18px',
    lineHeight: '22px',
    color: '#73BA9B'
  },
  divider: {
    border: '1px solid #73BA9B',
    marginTop: '5px'
  },
  operationsItem: {
    position: 'fixed',
    right: '40px'
  },
  filterItem: {
    marginLeft: '20px'
  },
  previewItem: {
    marginLeft: '300px'
  }
}));

export type Export = {
  goal: boolean;
  journey: boolean;
  story: boolean;
  safety: boolean;
  network: boolean;
};

export type ExportKeys = keyof Export;

const ExportMyPlan: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const printDivRef = useRef<HTMLDivElement>(null);
  const [preview, setPreview] = useState(false);
  const [buttonDisable, setButtonDisable] = useState(0);

  const loading: boolean = useSelector(
    (state: RootState) => state.export.loading
  );

  const [checks, setChecks] = useState<Export>({
    goal: false,
    journey: false,
    story: false,
    safety: false,
    network: false
  });

  const [filters, setFilters] = useState<ExportFilterType>({
    goal: '',
    story: false,
    journey: false,
    safety: false,
    network: ''
  });

  const handleSwitchChange = (name: ExportKeys, value: boolean) => {
    setChecks(values => ({
      ...values,
      [name]: value
    }));

    if (value) {
      setButtonDisable(value => value + 1);
    } else {
      setButtonDisable(value => value - 1);
    }
  };

  const saveDocEvent = () => {
    const printDivDomNode = printDivRef.current;
    if (printDivDomNode) {
      html2canvas(printDivDomNode).then((canvas: HTMLCanvasElement) => {
        var imgData = canvas.toDataURL('image/png');
        var imgWidth = 210;
        var pageHeight = 295;
        var imgHeight = (canvas.height * imgWidth) / canvas.width;
        var heightLeft = imgHeight;
        var doc = new jsPDF('p', 'mm');
        var position = 10; // give some top padding to first page

        doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
          position += heightLeft - imgHeight; // top padding for other pages
          doc.addPage();
          doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }
        doc.save('myplan.pdf');
      });
    }
  };

  const emailDocEvent = () => {
    window.location.href = `mailto:${sessionStorage.getItem(
      'UserEmail'
    )}?subject=Jiemba Report`;
  };

  const handleGenerateButtonClick = () => {
    setPreview(true);
    dispatch(downloadGenerateData(filters));
  };

  return (
    <>
      {loading && <Loader />}
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12} container spacing={3} alignItems="flex-start">
            <Grid
              item
              xs={11}
              sm={10}
              md={3}
              container
              spacing={3}
              className={classes.filterItem}>
              <Grid item>
                <Note />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="primary"
                  click={handleGenerateButtonClick}
                  disabled={buttonDisable === 0}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                    <img
                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAXCAYAAADpwXTaAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAEaSURBVHgBnZSBDYIwEEUP4wB1AzbQDcQNdALjBLqBOoE6gW6gG4ATyAiwgRvUf+YMNTngyk9+qvR4/JYr5L0/+Ti9YEeKxvBMflfUrVRGrs8BXCRJ8v6rwMVcnpi2UXhOau6STE04ojhxkgVcBgndUBjJ0lRgNKwLOKY4OdyUBf+P8FWAy1jYUqzKBMOyKiTaUNMeoeZwZoYJ8KZdx0MOP1jvC0Dxlk8JGWRJxnvkDHWm1qhJ36tBsK/aDrcZJoApfIav3GPiVKvv27O1jBNqeoy7vial30YdqfYYDnLzQ4B8hJ7wnazJpBV2cIH+2gRThVhVWzJexgVeUYTUZEhzpgGKPei8BYkFxt8kGiAXwvjtZNTf5b5nrvwA3cm5N2hPiWQAAAAASUVORK5CYII="
                      alt=""
                      style={{ marginRight: '10px' }}
                    />
                    <span>Generate PDF</span>
                  </div>
                </Button>
              </Grid>
              <Grid item xs={12}>
                <span className={classes.selectText}>
                  Select what to export
                </span>
                <Divider className={classes.divider} />
              </Grid>
              <Grid item xs={12}>
                <Filter
                  checks={checks}
                  setChecks={handleSwitchChange}
                  setFilters={setFilters}
                />
              </Grid>
            </Grid>
            <Grid item xs={1} />
            <Grid item xs={10} md={7}>
              <Preview preview={preview} ref={printDivRef} filters={filters} />
            </Grid>
            <Grid
              item
              xs={1}
              container
              justify="center"
              className={classes.operationsItem}>
              <Operations save={saveDocEvent} email={emailDocEvent} />
            </Grid>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default ExportMyPlan;
