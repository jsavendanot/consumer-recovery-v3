/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import React, { lazy } from 'react';
import { Redirect } from 'react-router-dom';
import { RouteConfig } from 'react-router-config';
import authentication from '@kdpw/msal-b2c-react';

import { AuthLayout, BaseLayout, BaseLayoutWithNavbar } from './layouts';

const routes: RouteConfig[] = [
  {
    path: '/home',
    component: BaseLayout,
    routes: [
      {
        path: '/home/consumer',
        exact: true,
        component: lazy(() => import('views/Landing/components/ConsumerDetail'))
      },
      {
        path: '/home/carer',
        exact: true,
        component: lazy(() => import('views/Landing/components/CarerDetail'))
      },
      {
        component: () => <Redirect to="/errors/error-404" />
      }
    ]
  },
  {
    path: '/invitation',
    component: BaseLayout,
    routes: [
      {
        path: '/invitation',
        exact: true,
        component: lazy(() => import('views/Invitation'))
      },
      {
        component: () => <Redirect to="/errors/error-404" />
      }
    ]
  },
  {
    path: '/errors',
    component: BaseLayout,
    routes: [
      {
        path: '/errors/error-404',
        exact: true,
        component: lazy(() => import('views/Errors/Error404'))
      },
      {
        component: () => <Redirect to="/errors/error-404" />
      }
    ]
  },
  {
    path: '/auth',
    component: authentication.required(AuthLayout),
    routes: [
      {
        path: '/auth',
        exact: true,
        component: authentication.required(
          lazy(() => import('views/Auth/Login'))
        )
      },
      {
        component: () => <Redirect to="/errors/error-404" />
      }
    ]
  },
  // Jorge Avendano 
  //in the Sign up authentication page if the user clicks cancel, 
  //it will redirect to https://jiemba.azurewebsites.net/null
  //this route will redirect to the Index instead
  {
    path: '/null',
    component: BaseLayout,
    routes: [
      {
        component: () => <Redirect to="/" />
      }
    ]
  },
  {
    path: '/goals',
    component: authentication.required(BaseLayoutWithNavbar),
    routes: [
      {
        path: '/goals/:tab',
        exact: true,
        component: authentication.required(lazy(() => import('views/Goal')))
      },
      {
        path: '/goals/:tab/:id',
        exact: true,
        component: authentication.required(
          lazy(() => import('views/Goal/GoalDetails'))
        )
      },
      {
        path: '/goals/:tab/:id/edit',
        exact: true,
        component: authentication.required(
          lazy(() => import('views/Goal/EditGoal'))
        )
      },
      {
        path: '/goals/:tab/:id/step/:stepId',
        exact: true,
        component: authentication.required(
          lazy(() => import('views/Goal/EditStep'))
        )
      },
      {
        path: '/goals/:tab/:id/review',
        exact: true,
        component: authentication.required(
          lazy(() => import('views/Goal/ReviewSuggest'))
        )
      },
      {
        path: '/goals/:tab/:id/help',
        exact: true,
        component: authentication.required(
          lazy(() => import('views/Goal/HelpRequest'))
        )
      },
      {
        component: () => <Redirect to="/errors/error-404" />
      }
    ]
  },
  {
    path: '/journeys',
    component: authentication.required(BaseLayoutWithNavbar),
    routes: [
      {
        path: '/journeys/:tab',
        exact: true,
        component: authentication.required(lazy(() => import('views/Journey')))
      },
      {
        path: '/journeys/:tab/:id',
        exact: true,
        component: authentication.required(
          lazy(() => import('views/Journey/JournalDetail'))
        )
      },
      {
        path: '/journeys/:tab/:id/edit',
        exact: true,
        component: authentication.required(
          lazy(() => import('views/Journey/EditJournal'))
        )
      },
      {
        component: () => <Redirect to="/errors/error-404" />
      }
    ]
  },
  {
    path: '/story',
    component: authentication.required(BaseLayoutWithNavbar),
    routes: [
      {
        path: '/story',
        exact: true,
        component: authentication.required(lazy(() => import('views/MyStory')))
      },
      {
        path: '/story/edit',
        exact: true,
        component: authentication.required(
          lazy(() => import('views/MyStory/EditMyStory'))
        )
      },
      {
        path: '/story/write',
        exact: true,
        component: authentication.required(
          lazy(() => import('views/MyStory/CreateMyStory/MyStoryForm1'))
        )
      },
      {
        path: '/story/strengths',
        exact: true,
        component: authentication.required(
          lazy(() => import('views/MyStory/CreateMyStory/MyStoryForm2'))
        )
      },
      {
        path: '/story/focusareas',
        exact: true,
        component: authentication.required(
          lazy(() => import('views/MyStory/CreateMyStory/MyStoryForm3'))
        )
      },
      {
        component: () => <Redirect to="/errors/error-404" />
      }
    ]
  },
  {
    path: '/safety',
    component: authentication.required(BaseLayoutWithNavbar),
    routes: [
      {
        path: '/safety',
        exact: true,
        component: authentication.required(
          lazy(() => import('views/SafetyPlan'))
        )
      },
      {
        path: '/safety/staywell',
        exact: true,
        component: authentication.required(
          lazy(() => import('views/SafetyPlan/StayWell'))
        )
      },
      {
        path: '/safety/stress',
        exact: true,
        component: authentication.required(
          lazy(() => import('views/SafetyPlan/Stress'))
        )
      },
      {
        path: '/safety/service',
        exact: true,
        component: authentication.required(
          lazy(() => import('views/SafetyPlan/Service'))
        )
      },
      {
        path: '/safety/unwell',
        exact: true,
        component: authentication.required(
          lazy(() => import('views/SafetyPlan/Unwell'))
        )
      },
      {
        path: '/safety/warningsign',
        exact: true,
        component: authentication.required(
          authentication.required(
            lazy(() => import('views/SafetyPlan/WarningSign'))
          )
        )
      },
      {
        path: '/safety/staywell/create',
        exact: true,
        component: authentication.required(
          lazy(() => import('views/SafetyPlan/StayWell/CreateStayWell'))
        )
      },
      {
        path: '/safety/stress/create',
        exact: true,
        component: authentication.required(
          lazy(() => import('views/SafetyPlan/Stress/CreateStress'))
        )
      },
      {
        path: '/safety/warningsign/create',
        exact: true,
        component: authentication.required(
          lazy(() => import('views/SafetyPlan/WarningSign/CreateWarningSign'))
        )
      },
      {
        path: '/safety/unwell/create',
        exact: true,
        component: authentication.required(
          lazy(() => import('views/SafetyPlan/Unwell/CreateUnwell'))
        )
      },
      {
        path: '/safety/service/create',
        exact: true,
        component: authentication.required(
          lazy(() => import('views/SafetyPlan/Service/CreateService'))
        )
      },
      {
        component: () => <Redirect to="/errors/error-404" />
      }
    ]
  },
  {
    path: '/networks',
    component: authentication.required(BaseLayoutWithNavbar),
    routes: [
      {
        path: '/networks/:tab',
        exact: true,
        component: authentication.required(lazy(() => import('views/Network')))
      },
      {
        path: '/networks/:tab/:id/edit',
        exact: true,
        component: authentication.required(
          lazy(() => import('views/Network/EditContact'))
        )
      },
      {
        path: '/networks/add/:type',
        exact: true,
        component: authentication.required(
          lazy(() => import('views/Network/AddContact'))
        )
      },
      {
        component: () => <Redirect to="/errors/error-404" />
      }
    ]
  },
  {
    path: '/profile',
    component: authentication.required(BaseLayoutWithNavbar),
    routes: [
      {
        path: '/profile/:name',
        exact: true,
        component: authentication.required(lazy(() => import('views/Profile')))
      },
      {
        path: '/profile/:name/edit',
        exact: true,
        component: authentication.required(
          lazy(() => import('views/Profile/EditProfile'))
        )
      },
      {
        path: '/profile/:name/create',
        exact: true,
        component: authentication.required(
          lazy(() => import('views/Profile/CreateProfile'))
        )
      },
      {
        component: () => <Redirect to="/errors/error-404" />
      }
    ]
  },
  {
    path: '/notification',
    component: authentication.required(BaseLayoutWithNavbar),
    routes: [
      {
        path: '/notification',
        exact: true,
        component: authentication.required(
          lazy(() => import('views/Notification'))
        )
      },
      {
        component: () => <Redirect to="/errors/error-404" />
      }
    ]
  },
  {
    path: '/settings',
    component: authentication.required(BaseLayoutWithNavbar),
    routes: [
      {
        path: '/settings',
        exact: true,
        component: authentication.required(lazy(() => import('views/Settings')))
      },
      {
        component: () => <Redirect to="/errors/error-404" />
      }
    ]
  },
  {
    path: '/export',
    component: authentication.required(BaseLayoutWithNavbar),
    routes: [
      {
        path: '/export',
        exact: true,
        component: authentication.required(
          lazy(() => import('views/ExportMyPlan'))
        )
      },
      {
        component: () => <Redirect to="/errors/error-404" />
      }
    ]
  },
  {
    path: '/gallery',
    component: authentication.required(BaseLayoutWithNavbar),
    routes: [
      {
        path: '/gallery',
        exact: true,
        component: authentication.required(lazy(() => import('views/Gallery')))
      },
      {
        component: () => <Redirect to="/errors/error-404" />
      }
    ]
  },
  {
    path: '/create',
    component: authentication.required(BaseLayoutWithNavbar),
    routes: [
      {
        path: '/create/goal',
        exact: true,
        component: authentication.required(
          lazy(() => import('views/Goal/AddGoal'))
        )
      },
      {
        path: '/create/goal/:areaId',
        exact: true,
        component: authentication.required(
          lazy(() => import('views/Goal/AddGoal/components/AddGoalFocusArea'))
        )
      },
      {
        path: '/create/goal/:areaId/form',
        exact: true,
        component: authentication.required(
          lazy(() => import('views/Goal/AddGoal/components/AddGoalForms'))
        )
      },
      {
        path: '/create/journal',
        exact: true,
        component: authentication.required(
          lazy(() => import('views/Journey/AddJournal'))
        )
      },
      {
        component: () => <Redirect to="/errors/error-404" />
      }
    ]
  },
  {
    path: '/',
    component: BaseLayout,
    routes: [
      {
        path: '/',
        exact: true,
        component: lazy(() => import('views/Landing'))
      },
      {
        component: () => <Redirect to="/errors/error-404" />
      }
    ]
  },
];

export default routes;
