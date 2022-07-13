import React, { createContext, ReactNode, useCallback, useMemo, useState } from 'react';

type AdventureContextType = {
	score: number;
	addScore: (score: number) => void;
};
const adventureContext = createContext<AdventureContextType | null>(null);

const AdventureContextProvider = ({
	defaultValue,
	children,
}: {
	defaultValue: Partial<AdventureContextType>;
	children: ReactNode;
}) => {
	const [score, setScore] = useState(defaultValue.score || 0);
	const addScore = useCallback((delta: number) => {
		setScore((score: number) => score + delta);
	}, []);
	const value = useMemo(() => ({ score, addScore }), [score, addScore]);
	return <adventureContext.Provider value={value}>{children}</adventureContext.Provider>;
};

export { AdventureContextProvider as PacaContextProvider, adventureContext as pacaContext };
