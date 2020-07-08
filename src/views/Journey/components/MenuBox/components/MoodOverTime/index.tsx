import React from 'react';
import { Line } from 'react-chartjs-2';

import { Theme } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';

const useStyles = makeStyles(() => ({
  root: {
    position: 'relative'
  }
}));

type Props = {
  data: number[];
  labels: string[];
};

type DataSetType = {
  datasets: [
    {
      data: number[];
      backgroundColor: CanvasGradient;
      borderColor: string;
      pointBorderColor: string;
      pointBorderWidth: number;
      pointRadius: number;
      pointBackgroundColor: string;
    }
  ];
  labels: string[];
};

const converter = (feelingNum: 1 | 2 | 3 | 4 | 5) => {
  switch (feelingNum) {
    case 1: {
      return 'Very Sad';
    }
    case 2: {
      return 'Sad';
    }
    case 3: {
      return 'Neutral';
    }
    case 4: {
      return 'Happy';
    }
    case 5: {
      return 'Very Happy';
    }
    default:
      return 1;
  }
};

const MoodOverTime: React.FC<Props> = ({ data: dataProp, labels }: Props) => {
  const classes = useStyles();
  const theme: Theme = useTheme();

  const data = (canvas: HTMLCanvasElement): DataSetType | null => {
    const ctx = canvas.getContext('2d');
    if (ctx === null) {
      return null;
    } else {
      const gradient = ctx.createLinearGradient(0, 0, 0, 400);

      gradient.addColorStop(0, fade(theme.palette.secondary.main, 0.2));
      gradient.addColorStop(0.9, 'rgba(255,255,255,0)');
      gradient.addColorStop(1, 'rgba(255,255,255,0)');

      return {
        datasets: [
          {
            data: dataProp,
            backgroundColor: gradient,
            borderColor: theme.palette.secondary.main,
            pointBorderColor: '#FFFFFF',
            pointBorderWidth: 3,
            pointRadius: 6,
            pointBackgroundColor: theme.palette.secondary.main
          }
        ],
        labels
      };
    }
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    legend: {
      display: false
    },
    layout: {
      padding: 0
    },
    scales: {
      xAxes: [
        {
          gridLines: {
            display: false,
            drawBorder: false
          },
          ticks: {
            padding: 20,
            fontColor: theme.palette.text.secondary
          }
        }
      ],
      yAxes: [
        {
          gridLines: {
            borderDash: [2],
            borderDashOffset: [2],
            color: theme.palette.divider,
            drawBorder: false,
            zeroLineBorderDash: [2],
            zeroLineBorderDashOffset: [2],
            zeroLineColor: theme.palette.divider
          },
          ticks: {
            padding: 20,
            fontColor: theme.palette.text.secondary,
            beginAtZero: false,
            min: 1,
            maxTicksLimit: 5,
            callback: (value: number) => (value > 0 ? value : 0)
          }
        }
      ]
    },
    tooltips: {
      enabled: true,
      mode: 'index',
      intersect: false,
      caretSize: 10,
      yPadding: 20,
      xPadding: 20,
      borderWidth: 1,
      borderColor: theme.palette.divider,
      backgroundColor: theme.palette.common.white,
      titleFontColor: theme.palette.text.primary,
      bodyFontColor: theme.palette.text.secondary,
      footerFontColor: theme.palette.text.secondary,
      callbacks: {
        label: (tooltipItem: any) => {
          const feeling = converter(tooltipItem.yLabel);
          return feeling;
        }
      }
    }
  };

  return (
    <div className={classes.root}>
      <Line data={data} options={options} />
    </div>
  );
};

export default MoodOverTime;
