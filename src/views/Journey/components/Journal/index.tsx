import React from 'react';
import useRouter from 'common/utils/useRouter';
import { Journal as JournalType } from 'types/journey';

import { makeStyles } from '@material-ui/styles';
import { Divider, Paper } from '@material-ui/core';

import moment from 'moment';

const useStyles = makeStyles(() => ({
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    margin: '20px 0',
    cursor: 'pointer'
  },
  divider: {
    border: '1px solid #B3B3B3'
  },
  dayText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '16px',
    color: '#B3B3B3',
    marginBottom: '8px'
  },
  title: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '18px',
    lineHeight: '22px',
    color: '#003E1F',
    marginBottom: '10px'
  },
  text: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '18px',
    lineHeight: '154.5%',
    color: '#37474F'
  },
  stepsContainer: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: '15px 10px 20px'
  },
  stepContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '30px'
  },
  stepText: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '12px',
    lineHeight: '14px',
    color: '#003E1F',
    marginLeft: '10px'
  },
  content: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    padding: '10px'
  },
  footerContent: {
    display: 'flex',
    alignItems: 'flex-start',
    padding: '0 10px'
  },
  feelingImage: {
    width: '25px',
    height: '25px'
  }
}));

type Props = {
  journal: JournalType;
};

const Journal: React.FC<Props> = ({ journal }) => {
  const classes = useStyles();
  const { history, location } = useRouter();

  const handleClickJournal = () => {
    history.push(`${location.pathname}/${journal.Id}`);
  };

  return (
    <div className={classes.container} onClick={handleClickJournal}>
      <span className={classes.dayText}>
        {moment(journal.CreatedOnDate).format('LLLL')}
      </span>
      <Divider className={classes.divider} />
      <div className={classes.stepsContainer}>
        {/* <div className={classes.stepContainer}>
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAeCAMAAACVFoclAAABdFBMVEUAAAD//wD//wD/qgD/zAD/1QD/tgD/vwD/xgD/zAD/vwD/xAD/yAD/vwD/xgD/vwD/wgD/yAD/ygD/yAD/xAD/xQD/xwD/wwD/xgD5xQD5xgD6xgD6xwD6xQD7xQD7xgD7xwD7xAD7xgD7xAD7xwD7xgD7xgD8xAD8xgD8xQD8xgD8xgD8xgD8xQD8xgD8xgD8xAD9xgD9xgD9xQD9xgD9xQD9xgD9xgD9xQD9xAD9xgD7xgL7xQL7xQL7xgL7xAL7xQL8xQL8xQL8xQL8xQL8xQL8xAL8xQL8xQL8xQH8xQH8xgH8xQH8xQH8xQH8xQH8xQH8xQH8xQH9xgH9xQH7xQH7xQH7xQH8xgH8xQH8xQH8xQH8xQH8xQH8xAH8xQH8xQH8xQH8xQH8xQH8xQH8xQH8xQH8xQH8xQH8xQH8xQH8xQH8xQH8xQH8xQH8xQH8yxv8zST9zy790Tf90z391EH91EX+55b/99r/+OD/+uj////Dpl50AAAAb3RSTlMAAQIDBQYHCAkKDA0OEBIUFRcYHB4fICIoLC0xMjU5Ojs8P0FER0hKTE9QVVpcXmJkZmdqa25vcHJ6fYGEiI6PkJWWmZ2foaSqsLGys7S6vMLFxszO19ja3t/g4+Xm5+nr7O3u7/Dx8vX2+fv8/f4eaQ1tAAAAAWJLR0R7T9K1/AAAAVBJREFUGBl1wQlDElEYBdBLZJFKCFamJaVSU1GmYdkCEqRmlLaYVphaiVpsV2mbxj/vzHzM8B7QObjHpvdBtMTrFAUABTZNwRd4S/ElBmBgi2I7DM8dNiXhuFanyKIpVKR4DpGnqIxAPKb4fBbizBrFa7ii+xQGPJfLFLfgWKB4hpZHdG2kYet99YOOj31oCb4huTJxAghGeoD+mS2yNg7Vhb2vBhDPfaqRm4tGoHeeWehuDOH8S3reXcLdENpd3WbL9yQ6XNylqmqgzakP1O3EoHtI15/f9OShCWzQZZn0lMNQjVJYJn23oUpRWCZ9T6FKU1gmfUtQZSgsk74XUD2gsEz6clAlKKx/jUbjgK4UVCdLdFlHtr901AehmaPr5y/bIR3L0EVK1FWG0eZ6lZr76DBdoSKDLhJFer5NoqvTs6t12tafhPFf0Ss3x85BcwyoANBAmxAb5gAAAABJRU5ErkJggg=="
            alt=""
          />
          <span className={classes.stepText}></span>
        </div>
        <div className={classes.stepContainer}>
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAeCAMAAACVFoclAAABsFBMVEUAAAD//wD/gAD/qgD/mTP/gCv/kiT/nyD/jhz/mRr/ixf/lSv/iSf/kiT/mSLvjyDxjhzylBvyjCb1jx/2kiT3lCH3kx/4kSL4lCL4kCH5kyD5kh75lCT1kSP2kCD2lB/2kyP3kiH3kiD3kR/3kSL4kiL4kiL4kiH5kSD1kyD2kR/2kiH2kSH2kyD3kyL3kiL3kiH3kSD3kiD4kyD4kiH2kiH3kyL3kSL3kiH3kiH4kSL4kyH4kiL2kiH2kSH3kiD3kiL3kiH3kiD3kiL3kSD3kiD4kSH2kiH2kiH3kiH3kiL3kiH3kiD3kiH3kSH3kiH3kiH3kiH3kiH3kiH4kiH4kiL4kiH3kiH3kiH3kiH3kiH3kyH3kiH3kiH3kiH3kiH3kiH3kiH3kiH3kiH4kiH2kiH3kiH3kiH3kiH3kiH3kiH3kiH3kiH3kiH3kiH3kyT3lSf3mCz3mC34mjH4nDX4nTf4oT/4oUD4okL5qlP5rlr5r1z5tGb6tmv6vXj7w4X7yZD7ypL80J/827X948b95sz96tX+7t3+8uT+9er+9+7++PH/+vX//Pr///7///8er9IIAAAAbnRSTlMAAQIDBQYHCAkKCwwNDg8QEhMUGRwfISUmJygqKzM3OTs9P0FDREtNT1BRVFZXWlteX2BobHV4gIOFiYuPkZWWmJudn6WmrLCxtLa7vcDBxMfJysvMzc7S09fZ3d7f4OLm5+jt7u/y9vn6+/z9/prZ+IsAAAABYktHRI/1AoP5AAABe0lEQVQYGXXBCUNMURgG4HcmSZYptMgSZrKUVGSrJELZaSGFitJU07yWlJwrRrK0cP6ye79zG+fM8DyI3mHoLCyXGKoHysZoTOxG1t4pGtfhO8HQVWTdojFaisA1GulqhGoYOgoRG6bRH4UoGKBxBaHDKRqnIZppPNuBDa00XsTg2/6cYiaBrMJHDKR7j8BX85CiHZZ9STLZVgFgyy4AVZenyaFi2M7wXhkKT914SU4+bqnE/sHUQTgizZtw/AlDUx3bShqR53yafw2UI885OoZKkCM+Q1cXXJEHDMx6nvfhDUUCjjiF0r61jwx0w3GRQumlebW2wkByK2z3KZTOkMu/XzNQDdtTCqW/Ln7+9Y2iDrYRCqV93+co6mHroVB66f3P1bcUh2DrpFA6w0/6CwOpnbDVUiid4asf6+/ouwvH5mEGZr15csGbo68Bribm6I8iRycd45XIVXSTlvE48hVcmOSGvj34p4qOUfqmb5+M4H+iVYljB2Kw/QH4rtKNqrlgQAAAAABJRU5ErkJggg=="
            alt=""
          />
          <span className={classes.stepText}></span>
        </div> */}
      </div>
      <Paper style={{ borderRadius: '14px', padding: '10px' }} elevation={2}>
        <div className={classes.content}>
          <span className={classes.title}>{journal.Title}</span>
          <span className={classes.text}>
            {`${journal.Message.substring(0, 160)}...`}
          </span>
        </div>
        <div className={classes.footerContent}>
          <div style={{ flexGrow: 1 }}>
            {journal.HowAreYouFeeling === 'VeryHappy' && (
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAAB9VBMVEUAAAAA/wCAgIBVqlVgv0BVxjlms01isU5btklgv0BptEtjuEdouUZkvENiukVktkljuEdgukVlvENhvENjuUZkvENivENjuUZku0RiuEdivERiukViu0RkuUZjukVjuUZju0RiukViu0RkuUZiukVku0RkukViu0RjukVkukVju0RjukVku0RjuUZku0RkuUZjukVjukViuUZjukVjukVjukVjukVkukVjukVjukVjukVjukVjukVjuUZiukVjukVku0RjukVjuUZjukVjuUZjukVjukVjukVjuUZjukViukVjukVjukVjukVjukVju0RjukVkukVjukVjukVjukVjukVjukVjukVku0Zlu0dnvElovEtqvU5svk9svlBtvlFtv1Fuv1JxwFZzwVh1wlt2wlx7xWF/xmeBx2mDyGuDyGyEyGyKy3OLzHSNzHeNzXeQznqSz32Uz3+W0IKX0YOY0oSd1Iqf1Yyg1Y6p2Zis2p2t252z3aW03qa236i84a++4rHB47XF5brG5rvH5rzL6MHO6cXR68jS68rV7c3Z7tLa7tLe8Njg8dvi8tzl9ODn9OLn9ePq9uXs9+nu+Ovv+Ozx+e7y+e/y+fDz+fDz+vH0+vL1+vL1+vP2+/X3+/X4/Pf5/Pf5/Pj8/vv8/vz9/vz///8pcA2kAAAAV3RSTlMAAQIDCAkKDQ4QERIWFxocJCUmKiwuOT5AQURGU1RVWFpgZWZoaWttb3N0d3h5e4CBhoeIm6Kjqa2xtLW2t8rLzc7R1Nzd3ubn6Onr7u/w8vT29/v8/f4HFO6BAAAAAWJLR0Smt7AblQAAAcpJREFUGBmNwQdDEmEABuC3wKJhSakNS22JZRmWGhYVtCgxKox7L1oW7WHLaJktsb0lbdnQ7nem3HcndxwHzwODkqom/+4O6VB4W8tKN/KqaI4wS6BuGqyUtUk0afc4YDalIUoLwfkwcm2ltYM1yDY7yHykekxyBWjDA81UP+0cXgyhgfb2lSKjLMoCWpHRxkKkSoyrkFjQZoxrZmGSGyiJUHW790qcBonkk+NUeYEqCucevhl5ce88VcduPHr/LXX3CFUBYAMndfWO/rvAjGfKh6sydbFZ8FNztOflYN9ZquTu1Eiqm7oF2EUh+X3guswsp+9/enuCwnJEKJxJ0Ey+JFNYh04WpQlRFmU92lmU1djOoixBC4Wbr3I9lymUYxWFW3+VHB8p7HfATeHUkGL2+w4FH4AAhf4xxeRznEI1gDoKXWnF6Mc1CmEnAOdeCpeHlGy/+qhpxAQPNRcHxxTdz8fUhFyY4AhSc/Lp8KiS8SfdQ10tVPMOUJd48O7L1+H062Scuk3Q1MRoY8d06OqZ3545yLKsk3nsnAuDRSFa8s2ASWmrxByhWlio3CLRINzogjW3Nxij0OGrdsLGzIUr1m70rlla7oDRfzWs0WhdilB2AAAAAElFTkSuQmCC"
                alt=""
                className={classes.feelingImage}
              />
            )}
            {journal.HowAreYouFeeling === 'Happy' && (
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAAB+FBMVEUAAAD//wCA/4Cq/1W/v0CZzGaq1VWf32Cq1VWx2GKk21uq3Wam2Vmq22Gu3F2m3lmq1WCt1lyn2GKt21ut2mKo116q2Fys21+q12Cq2mCs2F2q2V6r11yq212r12Cq2F2s112s212s2Vys2l+q2F6q2V6s2l+s2F6s2V6s2F6r2V6r2V6q2V6s2l+q2F6r2F2r2l+q2l6r2F2r2F6q2V6r2F6r2V6s2V+r2V6s2V6r2l6r2V2r2F2r2V6r2V6s2l6r2V6r2l6s2V6r2V6r2V+q2V+q2F+q2V6r2V6r2F6q2V6r2V6q2V6r2l2q2V6r2F6r2V6r2l6r2V6r2V6r2V+s2V6r2V6r2V6r2V2s2V6r2V6r2V+r2V6r2V6r2V6r2V6r2V6r2V6r2V6r2V6r2V6r2V6r2V6r2V6r2V6r2V6r2V6s2WCs2mGt2mGt2mKu2mOu2mSx3Gmy3Gyz3W213XG13nK23nO33nW433e64Hq74H684X+94YG+4YK/4oTB44jB44nE5I7G5ZLI5pbL55vM6J3M6J7N6J/O6aHP6aPS66nT66rV7K/c77zd773f8MHf8cLg8cTh8cbj8snk88vk88zn9NDn9NLp9dXr9tnu997w+OH0+ur0+uv5/PP5/PT7/ff8/vn8/vr9/vv+/vz+//3///7///8mnSc9AAAAanRSTlMAAQIDBAUGCAwNDg8UFRYXGBkaHCImJystMDQ2Oj9AQkdNUFNUV1lcX2Jkamxub3B0dXZ3eH2AgYWHiI6RkpWWmp2io6evsrW2ubu9vr/BxsjMz9TV1tjb3d/l6Onq6+zv8PLz9/j5+vv8qg8MxgAAAAFiS0dEp8C3KwMAAAGoSURBVBgZjcGJQ0txAAfw70S0nA3NlZIMIUeGkJXkPsq1zLFa174Jo6JQzpBrjhy5Rvj9myrv93vvtff23ucDE0/+utCxU+Fw3b6KolzYyguGqWurXTEFVmZWtnCS08VIF7hECwfyYJZdRWvnl8NoxiHaaS2BLvsg7cVXQtnLTJoXQ7OWmYW9mDC3kQ52Y0I1ncT9GDO/nY5qMGYXncV9wNQIXSgHCqjrG+qldPnR02tUjgNBKl2/ROo6NS+ESFJpz0EtlQEhxB1q3gsxQt1SnKHS+VEMd1DT/z31gLo1iNLgCnUdnTQoRxtd2Y4WurINF+nKJtTTlRLU0JVFKKOUePeQRreSTyjFpsFP6a4Qb7so9bz+LT5T2g/gJKXBn+LPh2e3uxM37z0f+StGX96gtBrAZirdb0aFlEr2UGnKAeCNUpd4nPzy7cfXT6/uX6XBDozbSifRWRg3/SwdlOK/Ja3M6HAWNOuZScNsKBW0d2EhDLbQzjk/TAIxWjo6D5MsOMJ0sY1ZSFdcT7PmSh8seZZVRSjFT5TNgT1P/qrgnurQzg2FuTD7BwaYCi+Z6DXzAAAAAElFTkSuQmCC"
                alt=""
                className={classes.feelingImage}
              />
            )}
            {journal.HowAreYouFeeling === 'Neutral' && (
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAApCAMAAABwfJv6AAAB5lBMVEUAAAD//wD//wD//wD/2wD/3yDj4xzo6Bfq6hXr6xTt7RLu7hHx4w7z5wz06Rb06hXs4xPw6A/x6hXx6hXy5RTt5xLv6RDv5BDx6BPy6RLy5RHv5xDv5xTw6RLx5hLx5xHv5hPv5hPw5hLw5xLw5xLw6BLx6BHx6BHv5xPv5xPw5hLw5hHx5xHx5xPx6BPv6BLv5hLv5xLw5xHw6BHw6BPw6BPx5xLv5xLv5xLw5hHw5hPw5xPw5hLw5xLx5xHv5xHv6BPw5hPw5xLw5xLw5xLw5xLx5xHx5xPw5xLw5xLw5xLw6BLw5xLw5xLw5xLw5xHw5xPw6BLw5hLw5xLw5xHw5xPw5xLx5xLv5xLw5xLw5xLw5xPw5xLw5xLw6BLw5xLw5xLw5xLw5xLw5xLw5xLw5xPw5xLw5xLw5xLw5xLw5xLw5xXw5xbw5xfw6Bjw6Bnx6Brx6Bvx6B3x6B7x6SLy6izy6i3y6i/y6jPy6jTz7EHz7Eb07U/17lr1717172X172b28Gv28G728XX28Xb28Xf38nr38n/38oD49I759Zn59Zz59Z/59aD696v7+Lj7+Lz7+cb8+s38+tD8+9T9+9z9/N79/OH+/er+/e3+/e7+/e/+/vf//vj//vn///3///7///8S6NdtAAAAanRSTlMAAgMEBwgJCwwNDg8SFRcYGyEkJScrLzA3OTs/QEVHSVBSU1RWV1haXmBlaGprbW9yc3d4eXp/gIKGh4mbnqGio6WoqqutsbK1tri5ysvMzc7P0NPb3N/l5ujp6uvs7/Dx8vX29/j7/P3+Wi9mqAAAAAFiS0dEoSnUjjYAAAGUSURBVBgZncEJW0xRAAbgb9JC04IprZJ9bdKeolJIoTFZSqFCU/ejKLSgyJ6tqJAi5582Y+bc2e7cex7viwj23IOl1RXFhRk2mNhSeWGAAdebdsbDWHazxjBdZZsQLbVOY5SOvYiU30FDp+wIc8DDGC5tRogijTFdToduzyBNuDciwNFHU43wi3PRwj7846SVzmR4JXTSUgW8jtBadwKANirYDTio4jRwmCpuxqGeSjJxntLID+H1iT7jv4QQf99TtwtdlB4sCSH+fKDP2E8hxO+31JXgNpVUwUMlx9BDJeW4QiWH0EIleaih7v5dhhmlbjAFBZQeLn9/PkRpaHp+bZaSC0jsYcDwghDLX14/ezL5dOrd3IoQqzOUqgEcp3Tv5aIIWnzziJLmALBNY9DEq89fF5a+zX188ZghzsLnDK1oOfDZeocWGuBXRnPX0uBna6WZge2Qki/ShBNBae2MRTuKUPZWGru1H+Fs5f000J6JKI5mjRG6izfASNaJXoZwO5MQS+KO2nNX++i54TpZlIH/sw5nZwgL8Cp/7wAAAABJRU5ErkJggg=="
                alt=""
                className={classes.feelingImage}
              />
            )}
            {journal.HowAreYouFeeling === 'Sad' && (
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAApCAMAAABwfJv6AAAB6VBMVEUAAAD//wD/gAD/qgD/vwD/mQD/qhz/qhX/nRT/nxD/oRv/phr/nhj/ohf/oxT/nhL/ohH/nxj/oBb/nxX/pBL/ohf/oRb/oRX/oxT/oBT/nxP/ohf/nxf/oxb/oBb/ohX/oBX/ohT/nxT/oRT/oRf/oBb/nxX/oRX/oBT/oRf/oRX/ohT/oBT/oRb/ohb/oRX/oRT/oBT/oRT/oRX/ohT/oRb/oBb/oRT/ohX/oRX/ohb/oBX/ohT/oBT/oRb/oRX/oBX/oRT/oRb/oRX/oRX/oRX/ohX/oRX/oRT/oBX/oRX/oRX/oRb/oRX/oRX/oRX/ohX/oRX/oRX/oRX/ohX/oRX/oRX/oRX/oRX/ohX/oRX/oRb/oRX/oRX/oRX/oRX/oRX/oRX/oRX/oRb/oRX/oRX/oRX/oRX/oRX/oRb/oRX/oRX/oRX/oRX/oRX/oRb/oxv/pB3/pSD/piL/pyP/qCf/qiv/rDH/rjT/sTz/sj//tET/tkj/tkn/uE7/uE//uVH/ulP/vVv/wGL/wmj/w2n/xnH/ynv/y3//zIH/0Ir/05L/05P/1ZX/1Zb/1pn/26b/3q3/4rb/5Lz/683/687/79j/8Nj/9OT/9uj/9un/9+z/+e//+fD/+vP//vv//vz///7////EJucUAAAAbnRSTlMAAQIDBAUJDA0QExQVFhkdHiAjJSosLjEyMzU3ODo7PD4/QEFERkhJS09XWFlcXV9kZmdtcHV2fYaHjpSWl5qen6OlqKmrrK2wsrW2vcDBx8rMzs/S09bY293e4eLj5Obn6uzt7/Hz9fb5+vv8/kGJguoAAAABYktHRKKw3d+MAAABkElEQVQYGY3Bh0NMcQAH8O+7Dg0a0qKtSCV0yChtXKGFdil1nPJNyGqLcAqlpZL6/aXlxnvvrnvj80Ega+yJrMyEcOiynLzW6KRbz21bJDSEXmqn2qA9FUFI53u5T81RBIq8w2CeFsJf4iNqKLVCJa2fmuwHIIvvo44KC7zC2qjrMrwqqW/gONyyaaQhBHukBzRUgD1naOyhBKCWJqQDRwZowg0gn4rZ1V8v6OVa/U5FO1BM2et/QnymxwchxDgVMbhH2fCWEB/p8W5b7Lyn4jS6qJhc+EKfmYVPVLHBQVOKMEhTrsJBU4rQSVNsuEtTTuE6/Yz+XN7c3liaGxuin2jkUuXtb+GzPE2VViDiGWWv1sXf+YmRoTdTP/4I4aKiBICdspcriyP0GP629pWKVAA5NHZfAiA10VAe/st4TgP1FriVU58zAR6HmqnrInyOPaaOMgmy5D5qumWFSnwnNZSEwM/hWgbjOIdA0tlu7nMzGkEctLVQzVmdBC0pV+qe0K2j6kI4dElRSZnJcaEItAvOxhkdI1bnfQAAAABJRU5ErkJggg=="
                alt=""
                className={classes.feelingImage}
              />
            )}
            {journal.HowAreYouFeeling === 'VerySad' && (
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAApCAMAAABwfJv6AAACN1BMVEUAAAD/gID/VVX/gED/VVX/bUn/Zk3/XUb/bUn/ZlX/aUv/Y1X/Zk3/YVX/aFH/Yk7/ZFL/ZE3/aVP/Y07/ZVH/ZlP/Z0//aFH/Z1H/ZVD/aFP/Z1P/aFD/ZFL/Z1L/aFD/Z1H/ZVD/ZlL/Z1H/ZlD/ZVL/Z1H/ZVD/ZlL/ZVH/ZVH/ZVH/Z1D/ZlL/ZVD/ZlL/Z1H/ZlL/ZlH/ZlD/Z1H/ZlH/ZVD/ZlL/ZlD/ZlL/ZlD/ZlH/ZlH/ZlL/ZVD/ZlH/ZlH/Z1L/ZlH/ZVH/ZlD/ZVH/Z1H/ZlH/ZlH/ZlH/Z1D/ZlH/ZlD/ZlH/ZlH/ZlH/ZlL/ZVH/ZlD/ZlH/ZlH/ZlH/ZlH/ZlH/ZlH/ZlL/ZlH/ZlH/ZlH/ZlH/ZlH/ZlH/ZlH/ZlH/ZlH/ZlH/ZlH/ZlH/ZlL/ZlH/ZlH/ZlH/ZlH/ZlH/ZlH/ZlH/ZlH/Z1L/aFT/aVT/alX/a1b/a1f/bVn/blv/cFz/cF3/cV3/cl//c1//c2D/dGH/dWL/dmP/d2X/eGX/emj/fWz/gG//gXD/g3L/hHP/hXT/hnb/iHf/iHj/iXn/inr/kYL/mYv/m43/m47/npD/pJj/qp//rKH/r6T/sqf/sqj/tKr/tar/tqz/vLP/vbT/v7f/wrn/xb3/x8D/ycL/ysP/y8T/zcb/zsj/1M7/1tH/2dP/3dj/4d3/5eL/6OT/6+j/7On/7ev/8e//8/H/9PP/9fT/9vX/9/b/+Pf/+vr//fz//f3//v7///+/0JJEAAAAbnRSTlMAAgMEBgcKCw4PERIUFRYaHCEiJCYoKiwvMDE0Njg+QEhJS09QUVJTWltiZWZnb3Byc3V2d3h5en+AgoWHiZKYnp+goaKmqaqttri5u77Aw8jJy9DV1tfY3d7g4uTl5ujr7O/w8fL09vj6+/z9/iWMjzYAAAABYktHRLxK0uLvAAAB3klEQVQYGY3Bh0OMcRwG8Ke4LjObbJF5EWXvmRkNm7LrdPfoFM5IyMqe2dkyI1Hyfv84N973vd973rvr84ENBxJKzVyUX1JBHipePT0dMY1YWUbFlpxU2Bm8ntH2zeyKaMnz3LSxeSiseuTTXvlkqNKKGYt3FiK6FTGObBiSNzAeTwZ0cxjfnjSEDChnAqsQsoYJjURAupcJrUPAUiqq39xn0IkPd6kaCKQcpOKJNDHokrSdpWI+MIaKG3+0awx5L00+RhQBC6mrr+PNVnnOsHMt8vaY75afYd6eWMuw4x3aD5F3R6i7/FvafkojdaOwjbpn7dL62EfTxU+afKmnLgv7aag6X0mLU2domo3D7JQFKGOnzEUpLa68/toc8PnRaVpko4Cqhr+i+3WHqvFYRkWDRGj3qBgEFyOua6Jor6FpbxL6MeKjWDygKQ9AAQ3Vmoh8v13j9199qYnIK5oyAbhoqOoQaa5lyEMRaaSh1AHAsZuGF/LtAnVPtZY6GmYgKIum2kqaTh6lYacTQUmbmMAEhPU/wLiWwDCugnEUpsA0xcuYtvaCYpKbMRT2hsXw7bS1woko3Rd7+J8dY2FjSJ6HFrumpcBen5yNbupKlmd0QRzOYROn5ua6RvdFlH8HFjSXrxxsuAAAAABJRU5ErkJggg=="
                alt=""
                className={classes.feelingImage}
              />
            )}
          </div>
          {/* <IconButton style={{ padding: '0', marginRight: '25px' }}>
            <Comment />
          </IconButton> */}
        </div>
      </Paper>
    </div>
  );
};

export default Journal;
