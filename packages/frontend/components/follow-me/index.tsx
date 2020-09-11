import React from 'react'
import GitHubButton from 'react-github-btn'
import './index.less'

export default () => (
  <div className='follow-me'>
    <GitHubButton
      href='https://github.com/banyudu'
      data-show-count
      aria-label='Follow @banyudu on GitHub'
    >
      Follow
    </GitHubButton>
    <a
      href='https://twitter.com/yuduban?ref_src=twsrc%5Etfw'
      className='twitter-follow-button'
      data-show-screen-name='false'
      data-show-count='false'
    >
      Follow
    </a>
  </div>
)
