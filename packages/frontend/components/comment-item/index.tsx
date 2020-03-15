import React, { FC } from 'react'
import { Comment } from '../../types'
import { QuestionCircleFilled } from '@ant-design/icons'
import Markdown from '../markdown'
import moment from 'moment'
import './index.less'

const Comments: FC<Comment> = (props) => {
  const { author, content, createdAt } = props
  let username = '未知'
  let avatar = <QuestionCircleFilled />
  if (author) {
    username = author.name
    if (author.avatar) {
      avatar = <img src={author.avatar} alt='avatar' />
    }
  }

  return (
    <div className='comment-item'>
      <div className='comment-item-author'>
        <div className='comment-item-author-avatar'>
          {avatar}
        </div>
        <div className='comment-item-author-info'>
          <span>{username}</span>
          <span>创建于{moment(createdAt).format('YYYY-MM-DD')}</span>
        </div>
      </div>
      <Markdown source={content} className='comment-item-content' />
    </div>
  )
}

export default Comments
