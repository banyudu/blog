import React, { FC, useState } from 'react'
import { Profile, Comment } from '../../types'
import { Menu, Dropdown, Input, Button } from 'antd'
import { DownOutlined, QuestionCircleFilled, UpOutlined } from '@ant-design/icons'
import Markdown from '../markdown'
import CommentItem from '../comment-item'
import './index.less'

const { TextArea } = Input

interface CommentsProps {
  profile?: Profile
  profileLoading: boolean
  comments: Comment[]
  commentsLoading: boolean
  style?: React.CSSProperties
  logout?: () => void
  login?: () => void
  onAddComment?: (x: string) => void
}

const Comments: FC<CommentsProps> = (props) => {
  const [draft, setDraft] = useState<string>('')
  const [showPreview, setShowPreview] = useState<boolean>(true)
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

  const disabledProps = {
    disabled: !profile,
    title: profile ? '' : '请先登录后再发表评论!'
  }
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
        <div className='comments-editbox-main'>
          <div className='comments-avatar'>{avatar}</div>
          <TextArea
            {...disabledProps}
            rows={2}
            autoSize={{ minRows: 2, maxRows: 6 }}
            placeholder='留下您的宝贵意见吧!'
            value={draft}
            onChange={e => setDraft(e.target.value)}
          />
        </div>
        <div className='comments-editbox-toolbar'>
          <Button
            {...disabledProps}
            style={{ display: draft ? 'block' : 'none' }}
            onClick={() => setShowPreview(!showPreview)}
          >
            <span>
              预览:
              {showPreview ? <UpOutlined /> : <DownOutlined />}
            </span>
          </Button>
          <Button {...disabledProps}>评论</Button>
        </div>
        <div className='comments-editbox-preview' style={{ display: draft && showPreview ? 'block' : 'none' }}>
          <span>预览: </span>
          <Markdown source={draft} className='comment-item-content comments-preview' />
        </div>
      </div>
      <div className='comments-list'>
        {comments.map(item => <CommentItem key={item.id} {...item} />)}
      </div>
    </div>
  )
}

export default Comments
