import { useState, useEffect, useRef } from 'react'
import './App.css'
import Title from './components/Title'
import GameBoard from './components/GameBoard'
import cards from './assets/cards.json'

interface CardData {
	id: number
	image: string
	isFlipped: boolean
	isMatched: boolean
}

function buildDeck(): CardData[] {
	return [...cards, ...cards]
		.map(card => ({ ...card, id: Math.random(), isFlipped: false, isMatched: false }))
		.sort(() => Math.random() - 0.5)
}

function App() {
	const [deck, setDeck] = useState<CardData[]>(buildDeck)
	const [moves, setMoves] = useState(0)
	const [matches, setMatches] = useState(0)

	const firstPick = useRef<CardData | null>(null)
	const locked = useRef(false)

	const totalPairs = cards.length

	function cardHandler(card: CardData) {
		if (locked.current) return
		if (card.isMatched) return
		if (firstPick.current?.id === card.id) return

		setDeck(prev =>
			prev.map(c => c.id === card.id ? { ...c, isFlipped: true } : c)
		)

		if (!firstPick.current) {
			firstPick.current = card
		} else {
			setMoves(m => m + 1)
			const first = firstPick.current
			firstPick.current = null

			if (first.image === card.image) {
				setDeck(prev =>
					prev.map(c =>
						c.image === card.image ? { ...c, isMatched: true, isFlipped: true } : c
					)
				)
				setMatches(m => m + 1)
			} else {
				locked.current = true
				setTimeout(() => {
					setDeck(prev =>
						prev.map(c =>
							c.id === first.id || c.id === card.id
								? { ...c, isFlipped: false }
								: c
						)
					)
					locked.current = false
				}, 1000)
			}
		}
	}

	function resetGame() {
		firstPick.current = null
		locked.current = false
		setMoves(0)
		setMatches(0)
		setDeck(buildDeck())
	}

	useEffect(() => {
		return () => { locked.current = false }
	}, [])

	return (
		<div className="App">
			<div className="app-header">
				<Title text="Memory" />
			</div>
			<GameBoard
				deck={deck}
				moves={moves}
				matches={matches}
				totalPairs={totalPairs}
				onCardClick={cardHandler}
				onReset={resetGame}
			/>
		</div>
	)
}

export default App