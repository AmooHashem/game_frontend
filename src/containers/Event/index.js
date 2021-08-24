import {
  Button,
  ButtonGroup,
  Container,
  Grid,
  Hidden,
  makeStyles,
  Paper,
} from '@material-ui/core';
import ClassIcon from '@material-ui/icons/Class';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import GroupIcon from '@material-ui/icons/Group';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useTranslate } from 'react-redux-multilingual/lib/context';
import { useHistory } from 'react-router';
import { Link, useParams } from 'react-router-dom';

import ResponsiveAppBar from '../../components/Appbar/ResponsiveAppBar';
import {
  getOneEventInfoAction,
} from '../../redux/slices/events';
import CreateRegistrationForm from './CreateRegistrationForm';
import DiscountCode from './DiscountCode';
import Info from './Info';
import RegistrationReceipts from './RegistrationReceipts';
import Teams from './Teams';
import Workshops from './Workshops';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: 80,
    height: `calc(100vh - ${80}px)`,
    display: 'flex',
    justifyContent: 'center',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  rightBox: {
    padding: theme.spacing(2),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const tabs = [
  {
    label: 'اطلاعات کلی',
    icon: '',
    component: Info,
  },
  {
    label: 'ایجاد فرم ثبت‌نام',
    icon: '',
    component: CreateRegistrationForm,
  },
  {
    label: 'رسیدهای ثبت‌نام',
    icon: '',
    component: RegistrationReceipts,
  },
  {
    label: 'کد تخفیف',
    icon: '',
    component: DiscountCode,
  },
  {
    label: 'کارگاه‌ها',
    icon: ClassIcon,
    component: Workshops,
  },
  {
    label: 'تیم‌ها',
    icon: GroupIcon,
    component: Teams,
  },
  {
    label: 'درخواست‌ها',
    component: Teams,
    props: {
      mode: 'notifications',
    },
  },
];

const Event = ({
  getOneEventInfo,
}) => {
  const t = useTranslate();
  const history = useHistory();
  const { tabNumber, eventId } = useParams();
  if (!tabNumber) {
    history.push(`/event/${eventId}/0/`)
  }
  const [tabIndex, setTabIndex] = useState(tabNumber || 0);
  const classes = useStyles();

  useEffect(() => {
    getOneEventInfo({ eventId });
  }, [getOneEventInfo]);

  const TabComponent = tabs[tabIndex].component;

  const handleTabChange = (index) => {
    history.push(`/event/${eventId}/${index}/`)
    setTabIndex(index);
  }

  return (
    <>
      <ResponsiveAppBar mode="FORMULA0" />
      <Container className={classes.container}>
        <Grid container spacing={2} direction="row" justify="center">
          <Grid
            container
            item
            sm={3}
            xs={12}
            direction="column"
            justify="space-between">
            <Grid item>
              <ButtonGroup orientation="vertical" color="primary" fullWidth>
                {tabs.map((tab, index) => (
                  <Button
                    key={index}
                    onClick={() => handleTabChange(index)}
                    variant={tabIndex == index && 'contained'}
                    startIcon={tab.icon && <tab.icon />}>
                    {tab.label}
                  </Button>
                ))}
              </ButtonGroup>
            </Grid>
            <Hidden xsDown>
              <Grid item>
                <Button
                  fullWidth
                  color="primary"
                  component={Link}
                  to="/"
                  startIcon={<ExitToAppIcon />}>
                  {t('back')}
                </Button>
              </Grid>
            </Hidden>
          </Grid>
          <Grid item sm={9} xs={12}>
            <Paper elevation={3} className={classes.rightBox}>
              <TabComponent {...tabs[tabIndex].props} />
            </Paper>
          </Grid>
          <Hidden smUp>
            <Grid item>
              <Button fullWidth color="primary" startIcon={<ExitToAppIcon />}>
                {t('back')}
              </Button>
            </Grid>
          </Hidden>
        </Grid>
      </Container>
    </>
  );
};

const mapStateToProps = (state) => ({
});

export default connect(mapStateToProps, {
  getOneEventInfo: getOneEventInfoAction,
})(Event);
