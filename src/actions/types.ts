export interface AdventureAction {
	type: string;
	payload?: any;
}

export interface ScoreAction extends AdventureAction {
	type: 'score';
	points: number;
}
