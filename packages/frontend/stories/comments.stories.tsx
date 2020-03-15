import * as React from 'react'
import { storiesOf } from '@storybook/react'
import Comments from '../components/comments'
import { Comment, Profile } from '../types'

const avatarDog = 'https://img03.sogoucdn.com/app/a/100520093/e18d20c94006dfe0-0381536966d1161a-5ebe0a1e99566949d067d3b5e539d703.jpg'
const avatarCat = 'https://i03piccdn.sogoucdn.com/a2c7ce00a0d27854'
const avatarMouse = 'https://i02piccdn.sogoucdn.com/6ca4aa8ea1a02ade'

const profile: Profile = {
  name: '哈巴狗',
  avatar: avatarDog,
  email: 'habagou@earth'
}

const comment1: Comment = {
  id: '1',
  content: 'hello',
  createdAt: new Date('2020/01/01'),
  updatedAt: new Date('2020/01/02'),
  author: { id: 'mouse', name: 'mouse', avatar: avatarMouse },
  entity: 'blog:1'
}

const comment2: Comment = {
  id: '2',
  content: 'world',
  createdAt: new Date('2020/02/03'),
  updatedAt: new Date('2020/02/12'),
  author: { id: 'cat', name: '小猫咪', avatar: avatarCat },
  entity: 'blog:1'
}

const comment3: Comment = {
  id: '3',
  content: `
# 问题
这篇文章里面有些问题

\`\`\`javascript
var a = 1
b = a
\`\`\`

# 解决方案
这是我的解决方案
  `,
  createdAt: new Date('2020/02/03'),
  updatedAt: new Date('2020/02/12'),
  author: { id: 'dog', name: 'dog', avatar: avatarDog },
  entity: 'blog:1'
}

storiesOf('Comments', module).add('unAuthorized + empty', () => {
  return <Comments
    profileLoading={false}
    commentsLoading={false}
    comments={[]}
  />
})

storiesOf('Comments', module).add('unAuthorized + comments', () => {
  return <Comments
    profileLoading={false}
    commentsLoading={false}
    comments={[comment1, comment2, comment3]}
  />
})

storiesOf('Comments', module).add('authorized + empty', () => {
  return <Comments
    profile={profile}
    profileLoading={false}
    commentsLoading={false}
    comments={[]}
  />
})

storiesOf('Comments', module).add('authorized + comments', () => {
  return <Comments
    profile={profile}
    profileLoading={false}
    commentsLoading={false}
    comments={[comment1, comment2, comment3]}
  />
})
