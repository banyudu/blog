import React, { FC } from 'react'
import { Profile, Comment } from '../../types'
import { Menu, Dropdown } from 'antd'
import { DownOutlined, QuestionCircleFilled } from '@ant-design/icons'
import './index.less'

interface CommentsProfile {
  profile?: Profile
  profileLoading: boolean
  comments: Comment[]
  commentsLoading: boolean
  style?: React.CSSProperties
  logout?: () => void
  login?: () => void
}

const Comments: FC<CommentsProfile> = (props) => {
  const { style, profile, comments, logout, login } = props
  console.log('profile is: ', profile)
  let username = '未登录'
  let avatar = <QuestionCircleFilled />
  let userMenu = <Menu.Item> <a onClick={login}>使用Github登录</a> </Menu.Item>
  if (profile) {
    username = profile.name
    userMenu = <Menu.Item> <a onClick={logout}>登出</a> </Menu.Item>
    if (profile.avatar) {
      avatar = <img src={profile.avatar} alt='avatar' />
    }
  }

  const menu = (
    <Menu>
      {userMenu}
    </Menu>
  )
  return (
    <div className='comments' style={style}>
      <div className='comments-toolbar'>
        <span><span className='comments-count'>{comments.length}</span>条评论</span>
        <Dropdown overlay={menu}>
          <div className='ant-dropdown-link'>
            {username}
            <DownOutlined />
          </div>
        </Dropdown>
      </div>
      <div className='comments-editbox'>
        <div className='comments-avatar'>
          {avatar}
        </div>
      </div>
      <hr />
    </div>
  )
}

export default Comments
