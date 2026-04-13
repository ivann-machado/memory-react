import './title.css'

interface TitleProps {
	text: string
}

function Title({ text }: TitleProps) {
	return (
		<h1 className="game-title">
			{text}
		</h1>
	)
}

export default Title