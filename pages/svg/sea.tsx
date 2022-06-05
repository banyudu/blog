const Sea = () => {
  const size = 100
  const height = size
  const width = size * 3
  return (
    <svg
      width={width}
      height={height}
      xmlns='http://www.w3.org/2000/svg'
      style={{ backgroundColor: '#7dd3fc' }}
    >
      <path
        d='M 0 70 Q 75 39, 50 70 T 200 70 T 350 70 T 500 70 T 650 70 V 100 H 0 V 0'
        fill='#1d4ed8'
      ></path>
    </svg>
  )
}

export default Sea
