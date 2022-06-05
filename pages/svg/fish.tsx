const Fish = () => {
  const formatNum = (num: number) => Math.round(num * 100) / 100

  // 整体位置
  const svgSize = 128
  // const startX = formatNum(svgSize / 12) // 鱼头起点x坐标
  // const endX = formatNum((svgSize * 8) / 9) // 鱼尾x坐标
  const xOffset = formatNum(svgSize / 30)
  const startX = xOffset
  const endX = svgSize - xOffset
  const axisY = formatNum(svgSize / 2) // 中轴线
  const startPoint = `${startX},${axisY}`

  const strokeWidth = svgSize / 20

  // 控制点坐标
  const cx1 = formatNum(svgSize * 0.2)
  const cx2 = formatNum(svgSize * 0.6)
  const yOffset = formatNum(svgSize * 0.1)
  const cy1 = yOffset
  const cy2 = formatNum(svgSize - yOffset)

  // 尾部
  const tailHeight = formatNum(svgSize * 2 / 5)
  const tailStartY = formatNum(axisY - tailHeight / 2)
  const tailEndY = formatNum(axisY + tailHeight / 2)

  // 眼睛
  const eyeRadius = formatNum(svgSize / 20)
  const eyeX = formatNum(svgSize / 3)
  const eyeY = formatNum(svgSize * 3 / 7)

  const paths = [
    // 鱼嘴处两条圆弧，分别往上和往下
    `M${startPoint}`, // 鱼嘴角位置
    `C ${cx1} ${cy1}, ${cx2} ${cy1}, ${endX} ${tailEndY}`, // 鱼头到鱼尾曲线
    `V ${tailStartY}`, // 尾部竖线
    `C ${cx2} ${cy2}, ${cx1} ${cy2}, ${startX} ${axisY}`, // 鱼尾到鱼头曲线
    'Z'
  ]
  return (
    <svg width={svgSize} height={svgSize} xmlns='http://www.w3.org/2000/svg'>
      <g fill='white' stroke='#546E7A' strokeWidth={strokeWidth} fillOpacity='0.7'>
        <path d={paths.join('\n')} />
        <circle cx={eyeX} cy={eyeY} r={eyeRadius} strokeWidth={strokeWidth} />
      </g>
    </svg>
  )
}

export default Fish
