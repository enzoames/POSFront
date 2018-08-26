import React from 'react';
import { IndexRoute, Route } from 'react-router';

import {
  App,
  RequireLogin,
  NotRequireLogin,
  Salon,
  NotFound,
  Service,
} from 'containers';

export default (store) => {
  /**
   * Please keep routes in alphabetical order
   */
  return (
    <Route path="/" component={App}>
      {/* Routes */}

      <IndexRoute component={Salon} />
      <Route path="service" component={Service} />
      
      {/*<Route component={NotRequireLogin}>
        {/* Home (main) route 
      </Route>
       */}
      {/*  
      <Route component={RequireLogin}>
        {/*<Route path="messages" component={Messages} />
      </Route>
      */}

      {/* Catch all other routes */}
      <Route path="*" component={NotFound} status={404} />

    </Route>
  );
};