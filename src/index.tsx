// import {DevSupport} from "@react-buddy/ide-toolbox";
// import {ComponentPreviews, useInitial} from "./dev";

import App from './components/app';
import {createRoot} from 'react-dom/client';
import React from 'react';

import store from 'store/store.ts';
import {Provider} from 'react-redux'

const domNode = document.getElementById('root');
const root = createRoot(domNode);
root.render(
    // <DevSupport ComponentPreviews={ComponentPreviews}
    //                     useInitialHook={useInitial}>
    <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </React.StrictMode>
// </DevSupport>
);
