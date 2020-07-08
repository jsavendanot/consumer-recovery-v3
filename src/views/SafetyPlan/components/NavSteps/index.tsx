import React from 'react';
import useRouter from 'common/utils/useRouter';
import clsx from 'clsx';

import { IconButton, Divider, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    position: 'relative'
  },
  item: {
    flex: '1',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    [theme.breakpoints.up('xs')]: {
      margin: '20px 0'
    },
    [theme.breakpoints.up('sm')]: {
      margin: '30px 0'
    },
    [theme.breakpoints.up('md')]: {
      margin: '30px 0'
    },
    [theme.breakpoints.up('lg')]: {
      margin: '30px 0'
    },
    cursor: 'pointer'
  },
  text: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '20px',
    lineHeight: '25px',
    color: '#FFFFFF'
  },
  textActive: {
    color: '#FFB90B'
  },
  closeIcon: {
    position: 'absolute',
    bottom: '-30px',
    right: '-20px'
  },
  divider: {
    backgroundColor: '#FFFFFF'
  }
}));

type Props = {
  close: () => void;
  step: number;
};

const NavSteps: React.FC<Props> = ({ close, step }) => {
  const classes = useStyles();
  const { history } = useRouter();

  return (
    <>
      <div className={classes.container}>
        <div
          className={classes.item}
          onClick={() => history.push('/safety/staywell/create')}>
          {step === 1 ? (
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAABmJLR0QA/wD/AP+gvaeTAAACzklEQVRIia2WTWxUZRSGn/NNcdr7zZQaWNjCwpD0J+lOTDQuDIm1hKYtRgkxLJSExBgXkhjCAkwgLIxs3Iob3FXjpj9Ae7+hoZEFwcSdhBBMAGNB2qCGv7aQ3vu6mJYW7dyZ1p7luee8z3sW3znXyAiVohZS+nHWi9gGbAVyiEmM3zBiXDJkXXM3snRsRfFz/iU22DFS7cEYJbVhnF1lLn8bdy8h37gF5luR6we9g7hAXfJ5NdgSIES7FPyUYn9SZze+WLX+DJFCdFTBTyv2H1QHxNHHCn5SoeG1mhw9Z67YoeCvKy6cqFxUinoU/KTG6l9eLeCZxnhxk4K/phAd+O/HOGpW8FM63/D6WgHLQG0K/q7iQudizgFg7hjGt/b27OVMgVB4UyH6aLnAv8O6Hl4H+wLTl88gKkUtSO/xtO5kJqDkD4IugH2DY0fmOPcfnQI6FaLt5UnkdmOcs977f1cGRK8ivgLuZIovTrOXp2ADyL1bhqAeUhvJbOqe+RnLdQDf1wIpO0tGMPUuQGhlg12p6q77wa81AwAaZ38BWhchLTzO/7EqgRrC3mAWeKKJpiYHOOrvpesNWYiEJMk54A5qbF5vdY2SBzxvPfzLAbdgvn29IZhvB26ZIQeMYa6vqrPgfwTKC1A6rOC/y2xw6keMAtSRS4ZJcpd0hs+sj5nKFAaB/LLMdMXS4ziw9zH7ZCkZ+wGF6Gi1aWoNlfx+BX/x+eR4/TYFP61Q7PjfgPKy/X35uXAA1jV3A3EI0hGNFzetGXCJBswGMX1tO2d/quCicELBX9N4sW2NE1xWyZ+WVj7rS8UhOqDg7yoUPtUPvFBV/DhOwX+o4CdVio6sBFj5RyIudC7cg06wAdJ0mI0zVxZWRfmhmW/HqQ+zfYg/cenhSvcocyzF0SuY7QF6gDbgCWIeowjcBMbAhmzno4tZOqsKTTQ1aaK4ebV9/wAayiVx+WI+AwAAAABJRU5ErkJggg=="
              alt=""
              style={{ marginRight: '20px' }}
            />
          ) : (
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAGfSURBVHgBvVaLUQIxFHyhAugg14FUAFYgHQANqB1wFagViFqBFOAhDSgWIFKBUIHnPtho5oRcuBvZmZ1wyb5sXr6IBJDneRO8AKfgR/6LFetS0EoVaCB4x85uwJ7fGc271Kj5+CAziPsM1FE2I/TKS8aMJCJgRPGJHAAaJaVGaBxQZKUCaNQCXzWzXQLL+bdSA15Gn39mgwuYRnTSZca2xEjXKPMrbcw0cb0cBiVaAy50UPrdAHvgszFmGQjS1FNwKXHIwQfwzJnoj8dQBAYwR9EG7yUeE9/Egm9lETSKArRazNn31iQ0VTWx1LVuyBHQcG7yP9jM0sZEOHch6LYMfRfatNAduVlHNZmBPTaEsADPZbs9r8CnEv2PieEZmIIJUlvL/tENClUr6Cd7tJrlOziEZuYqM17tUhe8VoZ64osN7mpJ6hh5F6ReKZ1dAvfwtKoY0cDwWQ6+KWmVjLy3RA3GMQEp0+1zZLLL0NVTc8qYa4kF1yhjoP5babMznwnbMrIjVcBHagy+gF80XfDl0/I2pnMjB8C7ftahM1XEN3h4DSrHHW3HAAAAAElFTkSuQmCC"
              alt=""
              style={{ marginRight: '20px' }}
            />
          )}
          <span
            className={clsx(classes.text, step === 1 && classes.textActive)}>
            Things I do to stay well
          </span>
        </div>
        <Divider className={classes.divider} />
        <div
          className={classes.item}
          onClick={() => history.push('/safety/stress/create')}>
          {step === 2 ? (
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAMAAADzN3VRAAABX1BMVEUAAAD//wD/gAD/qgD/tgD/vwD/xgD/swD/uQD/vxX/sRT/uxH/vxD/tA//uA7/vA3/vw3/tQv/uAr/ugr/tgn/twj/vAj/uA7/ug7/vA3/uQ3/uAz/uQz/twv/uAr/uQr/twr/uAn/uQn/uwn/ug3/uQz/ugz/uQv/uQr/ugr/uAr/uQr/twz/uAz/uAv/uQv/ugv/uQr/uQr/uAr/uQz/uQz/uQz/ugv/uQv/ugv/uAv/ugr/uQr/uQr/uAz/uQz/uAz/uQv/ugv/uAv/uAv/uQv/uQv/ugz/uQz/ugv/uQv/uQv/uAv/uQv/ugv/uQv/uQv/uQr/uQv/ugv/uQv/uAv/uQv/uQv/uQv/ugv/uQv/uQv/uQv/uAv/uQv/uQv/uQv/uQv/uQv/uQv/uQv/uQv/uAv/uQv/uQv/uQv/uQv/uQr/uQv/uQv/uQv/uQv/uQv/uQv/uQv/uQv///96fXChAAAAc3RSTlMAAQIGBwgJCgsMDQ8QERITFBgZGhwgIiQlJigrLC4yMzU2Nzg7Pj9FSUpLTFJWXl9gYmNoaW1ub3Fyd3p7fIKEhYaIiY2OkZeYnqChprO0usLFyMrMztDR1NXW19jZ2t7j5Ofo6err7O/x8vP09fb3+Pn9cxHFFwAAAAFiS0dEdN9tqG0AAAEpSURBVBgZbcEHWwFxAMDhnxFtoU40rab2jrRLRUk7Ip20Ne77P0/874jqfdHYZw6vn99ujpYkalh38wcBV6O5czgiRyV+DOU2W9CYQ/fjlM1kPVRxpcOohrMd1LCkpimx5bz84pS7KIpsIDSNBefcqOZjgD3fgnDylLhTdhAMmT6Y3UfVXU9dWpEQVtcgFuDHsTKA4L6AlJOK0a98A4KpAM+NlE19fg6ieWzmtR6VbkORfZQ9WEg7UC0oZ+2UGd91HI0g1L18WKnoScJiBMGhFE6LfAgrWyDJZkpalwWJEv2lH4iG+GMyTpF07+IX262HkvG0hRqmRBBVOOWkii2xp0MzLc8b0OgnskEdFV2xzGq/CYw9oau4lxq96+eFx/xHctvPP5rbqPINh8gv4gjsaRkAAAAASUVORK5CYII="
              alt=""
              style={{ marginRight: '20px' }}
            />
          ) : (
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAABmJLR0QA/wD/AP+gvaeTAAACP0lEQVRIia3VwYuVVRjH8d+ZQGdshtRp4cgs4jLJgNKiKIWgVhLpOAv/AJNEqBa6DWcnFrYJWjUrsc1s2gRFRcuBIiWigpihxYAopBlYGVMt7ONizsVL3PvOeycPvHDPc37P8z33Oec8T0nDwN4k80nmknSSTCd5JMmNJNeSfJ7ko1LKWlOcQcH34H3cxgc4jllMYAeexBEs4iaW0BkG8DJu4R3saqHfgQX8ghNtAK/hBg623tUD31n8hPNNoiMV8MSwgJ4Yk1jFqX6LUzVFh7YK6Im1r57T/q6t1IXFJL+VUt4c4PhYkpeSzCS5m+RKKeVqA+hMksOllGNdw956iwYeMq7id3yNn22M9xr027CGZ7qG13F54P/f0BzAo/X3aD1gTdcWF/BWd/IxjjdB+gT4skJebNA8h++7k1XsGwIwh3s1xeMNujGsdyd/YKIl4FX8U7/DLfR3sDP4s5vvBnHBxZqim3i+5aZ+xWTqIc5sIj5bAd9iuiVgO/5CCb7A0QbxKO7ib+xpA6h+T2ElSUaSfJbkWIN+Osl4kn+TfIJver6mtM0n+TRJSr3rXyXplFLW++xod5LTAwJ92K+XYCTJD0neKKUsd41LWGjY1VADJ7H8X2On9oPZhwCYwvW+7QIn6k2b/B+AsVrfzjWJzg9bAXp8pyrgEspm4lP1wZ3BthbBR/CKjYZ3blNAj+P+WjjXajV9FmM969vrO1jAj1i21YaHp/E2vsN6rUW368Ncwbt4YUvBG6A78fiwfvcB1Vp8EjP9Zz4AAAAASUVORK5CYII="
              alt=""
              style={{ marginRight: '20px' }}
            />
          )}
          <span
            className={clsx(classes.text, step === 2 && classes.textActive)}>
            Things that stress me
          </span>
        </div>
        <Divider className={classes.divider} />
        <div
          className={classes.item}
          onClick={() => history.push('/safety/warningsign/create')}>
          {step === 3 ? (
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAMAAADzN3VRAAABXFBMVEUAAAD//wD/gAD/qgD/tgD/vwD/xgD/swD/uQD/sRT/vxD/tA//vA3/vw3/tQv/uAr/ugr/twj/vAj/tg//uA7/ug7/vA3/tw3/uQ3/uAz/uwv/twv/uwr/uAr/uQr/twr/uAn/uQn/uwn/uQz/uQr/ugr/uAr/uQr/ugn/twz/uAv/uQv/ugv/uQr/uQr/uAr/uQz/uQz/uQv/ugv/uQv/ugv/ugr/uQr/uQr/ugr/uAz/uQz/uAz/uQv/ugv/uAv/uQv/uAv/uQv/uQr/ugz/uQz/ugv/uQv/uQv/uQv/uAv/uQv/ugv/uQv/uQv/uQv/uQv/uQv/uAv/uQv/uQv/uQv/ugv/uQv/uQv/uQv/uAv/uQv/uQz/uQv/uQv/uQv/uQv/uQv/uQv/uQv/uQv/uAv/uQv/uQv/uQv/uQv/uQr/uQv/uQv/uQv/uQv/uQv/uQv/uQv/uQv///+KAscJAAAAcnRSTlMAAQIGBwgJCgsNEBETFBgZGiAiIyQlJicoKy0uMTIzNTY3OD5JSktMUVJeX2BjZmhpbnFydHZ6e3x9goSFhoiJi42OlZeYnqChpaaztLe6wsjMztDR1NXW19jZ2t3e4+Tl5+jp6uvs7e/y8/T19vf4/P0HFDPaAAAAAWJLR0RzQQk9zgAAASxJREFUGBltwecjAmEAwOFfRpEoh5Ssyl6ZRdlkZe9TKg2ydf//B929LwrPg+QI7F89vtwczihUaNrM7wy76i1t/dHMnsKPvuxKA5IllBvhSyDlpYwrHkboTzVTwaaOo7NnffzizLgpiS6js07oxjBMxQBHvgGdkkgkstoDhurbbpjc5kuz+jSIEFmE2DCSO5nuQuo9B9WJ0FIoLrQgmV/hsR6h8+Ti/WMOqWDluY5vjnRRQbi3EW/lx642hKHmzcThAIITaq+0Dgyea5iOYmgvnh7caRsI82ugZCwYvMHVWR9C1YUf2Avxx9gRJUrOxS/2pBfdSNxGBfNxECGsOiljP94yIY1npqqRqkZTQRPf3LHbSI8ZajyhyyMfFbqWzl4L+ffrdT//sDZS5hNjbS6Oo+q9rAAAAABJRU5ErkJggg=="
              alt=""
              style={{ marginRight: '20px' }}
            />
          ) : (
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAABmJLR0QA/wD/AP+gvaeTAAACRklEQVRIia2VP0hWYRSHn/MFlYqg2JDSIJ+khlBolE0t0ZCoQ0OjBS3V0BihtEQFLY3lFLU4B0E2hkQ4RPQXJcqK/pBZGRUSkTwNvR991Of9rtYLF+457/md59z33ntOkLHUFmAQ6AeKwAZgFfAKeAFcB65ExExWnqWSr1cvqHPqZXWv2qnWq7XqRrVPHVXfqmNqcTmAPeqselZtzBFfq46o79ShPIBD6iu1N3dVv7Wd6mP1ZFZQXwK0LhdQlqNJnVYPVtpsTke0Y6WAslzt6T11lXyRNkaBTxFxvIKoAdhXId/3iLi0BOgosDsiBkqOlvQVVXzJalF9WnbN+mt9yHia1eqMurXkOKxWrKiCuDWd+Re1v0rsKfV0ybiq7s0B6FJfqq/Vnhzx29V7JWNaba8iaFPn1UX1hNqWA1KjLpSMz2p9FUG3elt9qH5Tf6jHcoDm1QbUr2pdNUGZsCUd2WK1VqK+V5sKwBugOS8kIt4AN4ACsCUDsAaoAz4WgOdAR5WK2svu1wLdyXySIesAnkeEBWAcGMgAdABT6h11HHgGbALOR8SDDMggcA0g0rneAooRsbAEqBfYBTQCs8DNiJjMKKwA3AeORMREyTmmjmRUtaylHlAn/nQW0zzo/A+A5vTT/j0u1KE0D5r+AVCjTqrDWUEn83SAJbTNCXBRjWrBB9M8OKquzpG8oO5PA2+4KqBM2JUa50zqptvUmrL9Nepmf832R+rEigee2qOeUe+qC6kXzaX+NaWeU3euKHkGtEFdt1zdTzzuV6xMsiuqAAAAAElFTkSuQmCC"
              alt=""
              style={{ marginRight: '20px' }}
            />
          )}
          <span
            className={clsx(classes.text, step === 3 && classes.textActive)}>
            Warning signs I may be having difficulty
          </span>
        </div>
        <Divider className={classes.divider} />
        <div
          className={classes.item}
          onClick={() => history.push('/safety/unwell/create')}>
          {step === 4 ? (
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAMAAADzN3VRAAABTVBMVEUAAAD//wD/gAD/qgD/qgD/tgD/xgD/swD/uQD/sRT/uxH/vxD/tA//uA7/vA3/vw3/tQv/uAr/ugr/tgn/twj/uQj/vAj/uA7/ug7/vA3/tw3/uQ3/uAz/twv/uAr/uQr/ugr/twr/uAn/uQn/uwn/uQz/uQr/ugr/uAr/ugn/twz/uAv/uQv/ugv/uAv/uQr/uQr/uAr/uQz/uQz/uQv/ugv/uQv/uAv/ugr/uQr/uQr/uAz/uQz/uAz/uQv/ugv/uAv/uAv/uQv/ugz/uQz/ugv/uQv/uQv/uAv/uQv/ugv/uAv/uQv/uQv/uQv/uQv/uQv/uQv/uQv/uQv/ugv/uQv/uQv/uQv/uAv/uQv/uQv/uQv/uQv/uQv/uQv/uQv/uQv/uAv/uQv/uQv/uQv/uQv/uQv/uQv/uQv/uQv/uQv/uQv/uQv/uQv////xUyGmAAAAbXRSTlMAAQIDBgcJCgsNDxAREhMUGBkaHCAhIiQlJicoKy4yMzQ1Njc4PklKS1FSXl9gYWNmaGlucXJ1d3p7fIKEhYaIiY2Ol5ieoKGms7S4usLIz9DR0tTV1tfY2dre3+Pk6Onq6+zv8vT19vf4+fz+3HTghgAAAAFiS0dEbiIPURcAAAEpSURBVBgZbcFnI0JhAIDRpzSURCFe2aQI2SRbRkhmi1LJ9v7/r7qjdHEOOu/C6V31JXu+4sOg86B8PO132PuC8eKJjx+Tj7sudPZoKUzdQmGcJv5cDE2w0I2BOxNB4Xmc4BdRHKAmvkPD1LwTxVIC8JZd1IW+pEBhyQ/D4hF1XRUpBarNLUhMo2tJftxLgWrsCjICXUyupqRAZXuFqgNN4PPMnJICzVMbz62oOgqVfte1HDGjqrjJ9aIKSU0PCuubifMQKudwTVZOWVEMpmE5zo+UFKg29sBXtNMwt9aOwnwTAE6i/DGbpMZX8vOL52EcRTjnxsB2sY4mlhE08VwcmtBFiksWdOaZwrqJhoFEfnPUBtbB6G1yAoOh7cvXp/J7ej/AP9o6aPINcxYvq5FpwCcAAAAASUVORK5CYII="
              alt=""
              style={{ marginRight: '20px' }}
            />
          ) : (
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAABmJLR0QA/wD/AP+gvaeTAAACO0lEQVRIia3Vv4sWVxTG8ee+K8ou+NsiKxZxMeuCYGHMj8o+Gg3ZP8AYhJBKKxG0W0KITVqtAjZbC2JiLSnShERQIhI2BkU0FiYpNjGoH4u5i6/rzuys8VQz9zznfO/ce+ackg7D1iSHknyYZCLJtiQjSe4k+T3J5SQXSilzXXnakr+Bs3iA85jGFNZiDG9hP87hHmYxsRLAB7iPM9jYQz+G0/gDh/sAPscdvNd7V89jp3ATM12i/RXw5koBQzk24waOLuUcr0f0/qsChnJN1nvatdhxDl+tINHH+AzrW/zHcHF4YWutomUvueoP4KnGJls0qzGHt5NkkOSjJJdKKQ97ALYlOZ+kdOlKKf8lmU0yvRB4EdM9ACO4gkf4retLqv5dXF14udElHgqaqYlP4KcekFHML7z8jbXLAPbhMS5j0AdS4x5iwyDNvTztEG5Jc75/JjmeZH2a/pUk6zDo4DxJMpL6l+7ogBzQbdtb4tbgH5RVSW4l2Znk1xbO90n2LlqbTTKZpnrutsTtTHKrlGJVku+SHExyaSllKeWvJD8u2uV8fbxeSnnUAjmU5NuFgInaBsZaxC8ZPsVJbGrxD3AN+4YXZ3G6L6THJo7gyuLFCc08mHoNgHHcttS4wOFaaZv/B2AUP+BUl2imbwdYIna8Ar5BZ28LjtZCOIbVPZIP8Ilm4J1aFjAUuKs2zjl8gXcwOuRfg92a2X5d0zhfbeBhD77Ez5ivvegB/sUv+PqFMn0dhg21l63IngEyfW7yaSrU1AAAAABJRU5ErkJggg=="
              alt=""
              style={{ marginRight: '20px' }}
            />
          )}
          <span
            className={clsx(classes.text, step === 4 && classes.textActive)}>
            If I become unwell, I would like others to...
          </span>
        </div>
        <Divider className={classes.divider} />
        <div
          className={classes.item}
          onClick={() => history.push('/safety/service/create')}>
          {step === 5 ? (
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAMAAADzN3VRAAABXFBMVEUAAAD//wD/gAD/qgD/qgD/tgD/vwD/xgD/swD/uQD/sRT/thL/vxD/tA//vA3/vw3/tgz/vAv/tQv/uAr/ugr/uwn/tQj/twj/vAj/uA7/ug7/vA3/uQ3/uAz/twv/uAr/uQr/twr/uAn/uQn/uwn/uQz/uQr/ugr/uAr/twz/uAz/uAv/uAv/uQv/ugv/uQr/ugr/uQr/uAr/uQz/uQz/uQz/uAv/uQv/ugv/uQv/ugr/uQr/uQr/uQr/uAz/uQz/uAz/uQv/ugv/uAv/uQv/uAv/uQv/ugz/uQz/ugv/uQv/uQv/uAv/ugv/uQr/uQv/ugv/uQv/uQv/uQv/uQv/uQv/uQv/uQv/uQv/uQv/uQv/uQv/ugv/uQv/uQv/uQv/uAv/uQv/uQv/uQv/uQv/uQv/uQv/uQv/uAv/uQv/uQv/uQv/uQv/uQv/uQv/uQv/uQv/uQv/uQv///9mgDttAAAAcnRSTlMAAQIDBgcICQoLDQ4QERMUFRcYGRoeHyAiJCUmKCsuMjM1Njc4PklKS1JTXV5fYGNkZmhpbW5wcXJ5ent8f4KEhYaIiYqNjpeYnqChpqmrs7S3ubq7wsjM0NHT1NXW19jZ2t7j5Ojp6uvs7/L09fb3+PyWDaMwAAAAAWJLR0RzQQk9zgAAASxJREFUGBltwfcjAmEAgOG3SFkZhaisMiIyMxInKzM0bA2dEsL9/z9w96XF81BiXTh/eH1PRVdt1Og+yB97HC2mgYmwfGKjYvx5p50SUyDn5ddC1kUVR3oTYSLbRw1z0ofK8uymjl128iMcQjMyr2pFtRwBrPl2NJKSisViFlSNmWFYPEKQFD9lWxJEPAiS4qds9AaSdgRJSZ0GOxGMRXhtQegNhc6+5C6EQhtvzVTsKmsIL2bS/VRMKwdoDB86opMIPU1wpCyhGXyElTDCZe7iVrkyotnYA5tsQtM5txucakCjvxsDTgL8MRvnhy3noI7lyYXKmzZTw5hYR9hM2qliSRzqKPHJy42U6Gey6zrKnJHM1ogRDIOB+7ibGkPb18VC/vNxf4x/tHVQ5RsDkTCYDeaUTwAAAABJRU5ErkJggg=="
              alt=""
              style={{ marginRight: '20px' }}
            />
          ) : (
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAABmJLR0QA/wD/AP+gvaeTAAACTklEQVRIia2Vy0tVURTGf+smlkpQWJAWVjdSISgqpJo0iQZJD+oPsKBJNQia9RpJBQVFo3QUNJGGYkRFMwfRoCCy7DEQI4nMyOghEcSvwd3SJe49915rwWFz1v6+9Z2999rnCzJCbQX2AruBPLACmAdMAG+Au8BgRIxl1SlXfJnap06pN9QDaqe6UG1U16rdar/6Xh1Q87UI7FIn1Yvq4irwjeoZ9YPaU43AEXVC3VL1V/3hdqqv1d4sUHcSWFWrQFGNZvWlerjUZEvaoq1zFSiq1Z7Oad1sLtJEP/A5Ik6WIXYBG0tM3YyILyXwx4GdEbFnNtGauqjsIavnLcQr9X7R01IGX6+OqZsB6oB9wO2ImC4nUhR9EXG1EigifqoDwAHgcQ7oBoaqEKg1hihcYuqAtcCzKolH1W3AKHAtIqYysCOpNqF+AZZHxNdyaHUlcDS9rgH2Ax+BDRExmcGbBlajflObqlzJLPlSaoRTFXAf1eYc8A4o2SUZMZLGtgyB+UAT8CkHjAMdFb6oTV1QlNqRxtEMWgcwHhGinkiXMUvkXvoB3lFH0lY9UhsyOGfVy1A4+DzwAMhHxEwZwlIK96kd+E6hGwcj4lcZfA54ChyLiOHZ5IB6Jms1tYR6SB3+O5lP29H5HwRa1Lcl7ULtSX7Q/A8CDepD9XQWqDf5QfscBFqSwHU1KoEPJz84rtZXUTynHkyGd7qiQBFxnXor/a7PqV3F7arOV9cnb3+uDs/Z8NRN6gX1iTqjTifv+aG+UK+o2+dUPEN0kbqkVt5vO1cRpirMhV8AAAAASUVORK5CYII="
              alt=""
              style={{ marginRight: '20px' }}
            />
          )}
          <span
            className={clsx(classes.text, step === 5 && classes.textActive)}>
            People or services who I can contact for support
          </span>
        </div>
        <IconButton className={classes.closeIcon} onClick={close}>
          <CloseIcon fontSize="large" style={{ fill: '#FFFFFF' }} />
        </IconButton>
      </div>
    </>
  );
};

export default NavSteps;
