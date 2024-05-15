import { Global } from '@emotion/react';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import ExternalScripts from './ExternalScript';
import QueryConfig from './QueryConfig';

import { Toast } from '@/components';
import { ReduxModal } from '@/components';
import CustomRoutes from '@/shared/routes';
import ScrollToTop from '@/shared/routes/ScrollToTop';
import { store } from '@/shared/store';
import globalStyle from '@/styles/global';

const App = () => {
  return (
    <Provider store={store}>
      <QueryConfig>
        <Toast />
        <Global styles={globalStyle} />
        <BrowserRouter>
          <ExternalScripts />
          <ScrollToTop />
          <ReduxModal />
          <CustomRoutes />
        </BrowserRouter>
      </QueryConfig>
    </Provider>
  );
};

export default React.memo(App);
