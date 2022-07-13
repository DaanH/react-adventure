import React, { createContext, ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AdventureAction, ScoreAction } from './actions/types';

export type AdventurePlayer = {
	score: number;
};

export type AdventureContextType = {
	player: AdventurePlayer;
	execute: (action: AdventureAction) => void;
};

const isScoreAction = (action: AdventureAction): action is ScoreAction => action.type === 'score';

export type ActionExecutor = {
	name: string;
	run: (action: AdventureAction, player: AdventurePlayer) => AdventurePlayer;
};
const scoreActionExecutor: ActionExecutor = {
	name: 'score',
	run: (action: AdventureAction, player: AdventurePlayer) => {
		return isScoreAction(action) ? { ...player, score: player.score + action.points } : player;
	},
};

const adventureContext = createContext<AdventureContextType>(null as unknown as AdventureContextType);
export const AdventureContextProvider = ({
	defaultValue,
	children,
}: {
	defaultValue: Partial<AdventureContextType>;
	children: ReactNode;
}) => {
	const [player, setPlayer] = useState({
		score: 0,
	});
	const executors = useRef(
		[scoreActionExecutor].reduce((acc, executor) => {
			acc[executor.name] = executor;
			return acc;
		}, {} as Record<string, ActionExecutor>)
	);
	const playerRef = useRef<AdventurePlayer>(player);
	useEffect(() => {
		playerRef.current = player;
	}, [player]);

	const execute = useCallback((action: AdventureAction) => {
		// pick correct registered ActionExecutor
		const result = executors.current[action.type]?.run(action, playerRef.current);
		setPlayer(result);
	}, []);
	const value = useMemo(() => ({ player, execute }), [player, execute]);
	return <adventureContext.Provider value={value}>{children}</adventureContext.Provider>;
};

export const useAdventureContext = () => {
	const context = React.useContext(adventureContext);
	if (context === undefined) {
		throw new Error('useAdventureContext must be used within an AdventureContextProvider');
	}
	return context;
};
