import React from 'react';
import { Switch, BrowserRouter } from 'react-router-dom';

import Landing from '../pages/Landing';
import OrphanagesRegistered from '../pages/OrphanagesRegistered';
import OrphanagesPending from '../pages/OrphanagesPending';
import OrphanagesMap from '../pages/OrphanagesMap';
import Orphanage from '../pages/Orphanage';
import CreateOrphanage from '../pages/CreateOrphanage';
import Login from '../pages/Login';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';

import Route from './Route';

const Routes: React.FC = () => (
  <BrowserRouter>
    <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/dashboard" exact isPrivate component={OrphanagesRegistered} />
        <Route path="/dashboard/pending" exact isPrivate component={OrphanagesPending} />
        <Route path="/app" component={OrphanagesMap} />

        <Route path="/orphanages/create" component={CreateOrphanage} />
        <Route path="/orphanages/:id" component={Orphanage} />
        <Route path="/login" component={Login} />
        <Route path="/forgot-password" component={ForgotPassword} />
        <Route path="/reset-password" component={ResetPassword} />
    </Switch>
  </BrowserRouter>
)

export default Routes;