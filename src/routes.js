import React from 'react';
import { IndexRoute, Route } from 'react-router';

import {
  App,
  RequireLogin,
  NotRequireLogin,
  Salon,
  NotFound,
} from 'containers';

export default (store) => {
  /**
   * Please keep routes in alphabetical order
   */
  return (
    <Route path="/" component={App}>
      {/* Routes */}
      <Route component={NotRequireLogin}>
        {/* Home (main) route */}
        <IndexRoute component={Salon} />
      </Route>

      <Route component={RequireLogin}>
        {/*<Route path="messages" component={Messages} />*/}
      </Route>

      {/* Catch all other routes */}
      <Route path="*" component={NotFound} status={404} />

    </Route>
  );
};