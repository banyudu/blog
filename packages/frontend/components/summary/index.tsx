import React, { FC } from 'react'
import dayjs from 'dayjs'

interface SummaryProps {
  category: string
  tags: string[]
  createdAt: Date
  updatedAt: Date
}

const Summary: FC<SummaryProps> = (props) => {
  const { createdAt, updatedAt } = props
  return (
    <div className='summary'>
      <div className='info'>
        <span>发布于: {dayjs(createdAt).format('YYYY-MM-DD')}</span>
        <span>最后更新: {dayjs(updatedAt).format('YYYY-MM-DD')}</span>
      </div>

    </div>
  )
}

export default Summary
