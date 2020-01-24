import React from 'react';
import {Provider} from 'react-redux'
import Routes from './routes'
import './config/ReactotronConfig';
import {PersistGate} from 'redux-persist/integration/react';
import {Router} from 'react-router-dom';
import {store, persistor} from './store/index'
import GlobalStyle from './styles/globa'
import history from './services/history';
import {ToastContainer} from 'react-toastify'

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router history={history}>
          <GlobalStyle/>
          <ToastContainer autoClose={3000}/>
          <Routes/>

         </Router>

      </PersistGate>

    </Provider>
  );
}

export default App;
