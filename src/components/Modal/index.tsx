import { useEffect } from 'react'
import Button from '../Button'
import './modal.css'

interface ModalProps {
	moves: number
	onClose: () => void
}

function Modal({ moves, onClose }: ModalProps) {
	useEffect(() => {
		function handleKey(e: KeyboardEvent) {
			if (e.key === 'Escape') onClose()
		}
		window.addEventListener('keydown', handleKey)
		return () => window.removeEventListener('keydown', handleKey)
	}, [onClose])

	return (
		<div className="modal-backdrop" onClick={onClose}>
			<div
				className="modal"
				role="dialog"
				aria-modal="true"
				aria-labelledby="modal-title"
				onClick={e => e.stopPropagation()}
			>
				<h2 id="modal-title" className="modal__title">GG</h2>

				<p className="modal__body">
					You matched all pairs in{' '}
					<span className="modal__highlight">{moves}</span>{' '}
					{moves === 1 ? 'move' : 'moves'}.
				</p>

				<div className="modal__actions">
					<Button label="Play Again" onClick={onClose} variant="primary" />
				</div>
			</div>
		</div>
	)
}

export default Modal