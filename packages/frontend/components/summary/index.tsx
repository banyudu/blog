import React, { FC } from 'react'
import dayjs from 'dayjs'
import { Tag } from 'antd'
import './index.less'
import Link from 'next/link'

interface SummaryProps {
  category: string
  tags: string[]
  createdAt: Date
  updatedAt: Date
}

const Summary: FC<SummaryProps> = (props) => {
  const { category, tags, createdAt, updatedAt } = props
  return (
    <div className='summary'>
      <div className='links'>
        <div className='tags'>
          {tags.map(tag => (
            <Link href={`/tag/${tag}`} key={tag}>
              <Tag color='green'>{tag}</Tag>
            </Link>
          ))}
        </div>
        <div className='category'>
          <Link href={`/category/${category}`}>
            <Tag color='gold'>{category}</Tag>
          </Link>
        </div>
      </div>
      <div className='info'>
        <span>发布于: {dayjs(createdAt).format('YYYY-MM-DD')}</span>
        <span>作者: 鱼肚</span>
        <span>最后更新: {dayjs(updatedAt).format('YYYY-MM-DD')}</span>
      </div>

    </div>
  )
}

export default Summary
