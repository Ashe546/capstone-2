/* eslint-disable */
import './css/style.css';
import userReservationList from './reservationCounter.js'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.js';

import renderFooter from './modules/footer.js';

import component from './modules/Home';

renderFooter();
userReservationList(1);
component();
