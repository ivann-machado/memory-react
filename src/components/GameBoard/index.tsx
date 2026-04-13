import Card from '../Card'
import Button from '../Button'
import Modal from '../Modal'
import './gameboard.css'

interface CardData {
	id: number
	image: string
	isFlipped: boolean
	isMatched: boolean
}

interface GameBoardProps {
	deck: CardData[]
	moves: number
	matches: number
	totalPairs: number
	onCardClick: (card: CardData) => void
	onReset: () => void
}

function idealCols(total: number): number {
	const root = Math.sqrt(total)
	for (let n = Math.floor(root); n >= 1; n--) {
		if (total % n === 0) return total / n
	}
	return total
}

function GameBoard({ deck, moves, matches, totalPairs, onCardClick, onReset }: GameBoardProps) {
	const isWon = matches === totalPairs
	const cols = idealCols(deck.length)
	const rows = Math.ceil(deck.length / cols)

	return (
		<div className="gameboard">
			<header className="gameboard__header">
				<div className="gameboard__stats">
					<div className="stat">
						<span className="stat__value">{moves}</span>
						<span className="stat__label">Moves</span>
					</div>
					<div className="stat stat--accent">
						<span className="stat__value">{matches}<span className="stat__total">/{totalPairs}</span></span>
						<span className="stat__label">Pairs</span>
					</div>
				</div>

				<div className="gameboard__actions">
					<Button label="New Game" onClick={onReset} variant="primary" />
				</div>
			</header>

			<div className="gameboard__grid" style={{
				gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
				gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`
			}}>
				{deck.map(card => (
					<Card
						key={card.id}
						card={card}
						handler={onCardClick}
					/>
				))}
			</div>

			{isWon && <Modal moves={moves} onClose={onReset} />}
		</div>
	)
}

export default GameBoard