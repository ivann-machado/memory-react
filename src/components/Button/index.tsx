import './button.css'

interface ButtonProps {
	label: string
	onClick: () => void
	variant?: 'primary' | 'secondary' | 'danger'
	disabled?: boolean
	icon?: string
}

function Button({ label, onClick, variant = 'primary', disabled = false, icon }: ButtonProps) {
	return (
		<button
			className={`btn btn--${variant}`}
			onClick={onClick}
			disabled={disabled}
		>
			{icon && <span className="btn__icon">{icon}</span>}
			<span className="btn__label">{label}</span>
		</button>
	)
}

export default Button