import { useCallback } from 'react';
import { AdventureAction } from '../actions/types';
import { useAdventureContext } from '../AdventureContext';

export const useAdventureOnClick = <T extends AdventureAction>(action: T) => {
	const { execute } = useAdventureContext();
	const onClick = useCallback(() => execute(action), [execute]);
	return { onClick };
};
