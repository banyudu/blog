import React, { FC } from 'react'
import './index.less'

interface CommentsProfile {
  profile?: Profile
  profileLoading: boolean
  comments: Comment[]
  commentsLoading: boolean
  style?: React.CSSProperties
}

const Comments: FC<CommentsProfile> = (props) => {
  const { style } = props
  return <div className='comments' style={style} />
}

export default Comments
