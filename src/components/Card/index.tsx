import './cards.css'

interface CardProps {
	card: {
		id: number
		image: string
		isFlipped: boolean
		isMatched: boolean
	}
	handler: (card: { id: number; image: string; isFlipped: boolean; isMatched: boolean }) => void
}

function Card({ card, handler }: CardProps) {
	return (
		<>
			<div
				className={`card ${card.isFlipped || card.isMatched ? 'flipped' : ''}`}
				onClick={() => !card.isMatched && handler(card)}
			// onClick={() => !card.isFlipped && !card.isMatched && handler(card)}
			>
				<div className="card__inner">
					<div className="card__front">
						<img src={"/public/" + card.image} alt="card front" draggable="false" />
					</div>
					<div className="card__back">
						<img src="/public/back.jpg" alt="card back" draggable="false" />
					</div>
				</div>
			</div>
		</>
	)
}

export default Card