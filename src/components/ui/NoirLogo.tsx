interface Props {
  size?: number
  color?: string
  className?: string
}

// Logo oficial Noir Store — 'N' estilizada con doble diagonal y serifas de alta costura
const NoirLogo = ({ size = 40, color = 'currentColor', className = '' }: Props) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label="Noir Store Logo"
  >
    {/* Tallo vertical izquierdo con serifa */}
    <path
      d="M 18 20 H 32 V 23 H 27 V 97 H 32 V 100 H 18 V 97 H 23 V 23 H 18 Z"
      fill={color}
    />

    {/* Primera diagonal */}
    <polygon
      points="23,20 34,20 82,100 71,100"
      fill={color}
    />

    {/* Segunda diagonal paralela */}
    <polygon
      points="41,20 52,20 100,100 89,100"
      fill={color}
    />

    {/* Tallo vertical derecho con serifa */}
    <path
      d="M 89 20 H 103 V 23 H 95 V 97 H 100 V 100 H 89 V 97 Z"
      fill={color}
    />
  </svg>
)

export default NoirLogo

