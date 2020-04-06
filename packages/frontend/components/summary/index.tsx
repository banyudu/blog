import React, { FC } from 'react'
import dayjs from 'dayjs'
import { Tag } from 'antd'
import './index.less'

interface SummaryProps {
  category: string
  tags: string[]
  createdAt: Date
  updatedAt: Date
}

const Summary: FC<SummaryProps> = (props) => {
  const { category, tags, createdAt } = props
  return (
    <div className='summary'>
      <div className='links'>
        <div className='tags'>
          {tags.map(tag => <Tag key={tag} color='green'>{tag}</Tag>)}
        </div>
        <div className='category'>
          <Tag color='gold'>{category}</Tag>
        </div>
      </div>
      <div className='info'>
        <span>发布于: {dayjs(createdAt).format('YYYY-MM-DD')}</span>
        <span>作者: 鱼肚</span>
      </div>
    </div>
  )
}

export default Summary
