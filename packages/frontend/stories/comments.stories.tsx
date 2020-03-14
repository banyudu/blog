import * as React from 'react'
import { storiesOf } from '@storybook/react'
import Comments from '../components/comments'
import { Comment } from '../types'

const comment1: Comment = {
  id: '1',
  content: 'hello',
  createdAt: new Date('2020/01/01'),
  updatedAt: new Date('2020/01/02'),
  author: { id: 'foo', name: 'foo', avatar: 'https://example.com' },
  entity: 'blog:1'
}

const comment2: Comment = {
  id: '2',
  content: 'world',
  createdAt: new Date('2020/02/03'),
  updatedAt: new Date('2020/02/12'),
  author: { id: 'bar', name: 'bar', avatar: 'https://example.com' },
  entity: 'blog:1'
}

storiesOf('Comments', module).add('unAuthorized + empty', () => {
  return <Comments
    profileLoading={false}
    commentsLoading={false}
    comments={[]}
  />
})

storiesOf('Comments', module).add('unAuthorized with comments', () => {
  return <Comments
    profileLoading={false}
    commentsLoading={false}
    comments={[comment1, comment2]}
  />
})
