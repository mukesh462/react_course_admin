import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { encryptTransform} from 'redux-persist-transform-encrypt';
import loginReducer from './LoginSlice';

// Create an encryptor
const encryptor = encryptTransform({
  secretKey: 'Mukesh462', // Replace with a secure key
  onError: (error) => {
    console.error('Encryption error:', error);
  },
});

const persistConfig = {
  key: 'root',
  storage,
  transforms: [encryptor], // Add the encryptor transform
};

const rootReducer = combineReducers({
  login: loginReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

const persistor = persistStore(store);

export { store, persistor };
