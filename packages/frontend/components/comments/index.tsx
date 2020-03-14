import React, { FC } from 'react'
import { Profile, Comment } from '../../types'
import { Menu, Dropdown } from 'antd'
import './index.less'

interface CommentsProfile {
  profile?: Profile
  profileLoading: boolean
  comments: Comment[]
  commentsLoading: boolean
  style?: React.CSSProperties
  logout?: () => void
}

const Comments: FC<CommentsProfile> = (props) => {
  const { style, profile, comments, logout } = props
  console.log('profile is: ', profile)
  let username = '未登录'
  let avatar = (
    <svg className='icon' aria-hidden='true'>
      <use xlinkHref='#icon-question' />
    </svg>
  )
  if (profile) {
    username = profile.name
    if (profile.avatar) {
      avatar = <img src={profile.avatar} alt='avatar' />
    }
  }

  const menu = (
    <Menu>
      <Menu.Item>
        <a onClick={logout}>
          {username}
        </a>
      </Menu.Item>
    </Menu>
  )
  return (
    <div className='comments' style={style}>
      <div className='comments-toolbar'>
        <span><span className='comments-count'>{comments.length}</span>条评论</span>
        <Dropdown overlay={menu}>
          <div>
            {username}
          </div>
        </Dropdown>
      </div>
      <div className='comments-editbox'>
        {avatar}
      </div>
      <hr />
    </div>
  )
}

export default Comments
