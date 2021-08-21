import React, { FC } from 'react'
import dayjs from 'dayjs'

interface SummaryProps {
  category: string
  tags: string[]
  createdAt: Date
  updatedAt: Date
}

const Summary: FC<SummaryProps> = (props) => {
  const { createdAt } = props
  return (
    <div className='summary'>
      <div className='info'>
        <span>{dayjs(createdAt).format('YYYY-MM-DD')}</span>
      </div>

    </div>
  )
}

export default Summary
