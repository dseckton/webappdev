import { makeRequest } from 'authHelpers.js';
import * as Auth from 'auth.js';

makeRequest('login', 'POST', {
    password: 'user1',
    email: 'user1@email.com'
});

const auth = new Auth();