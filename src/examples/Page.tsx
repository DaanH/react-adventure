import { useAdventureContext } from '../AdventureContext';
import { useAdventureOnClick } from '../triggers/useAdventureOnClick';

const Page = () => {
	const { player } = useAdventureContext();
	const adventureButtonProps = useAdventureOnClick({
		type: 'score',
		points: 10,
	});

	console.log('Page', player);

	return (
		<div>
			<button {...adventureButtonProps}>Score {player.score}</button>
		</div>
	);
};

export default Page;
