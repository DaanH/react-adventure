import React from 'react';
import ReactDOM from 'react-dom/client';
import { AdventureContextProvider } from '../AdventureContext';
import Page from './Page';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<h1>test</h1>

		<AdventureContextProvider>
			<Page />
		</AdventureContextProvider>
	</React.StrictMode>
);
