import React, { FC } from 'react'
import Logo from '../logo'
import GithubSvg from '../github-svg'
import './index.less'
import isMobile from 'is-mobile'

interface HeaderProps {
  gitUrl: string
  title: string
}
const Header: FC<HeaderProps> = (props) => {
  const title = isMobile() ? '鱼肚的博客' : props.title
  return <div className='headerbar'>
    <Logo />
    <h2 className='title' title={props.title}>{title}</h2>
    <a target='_blank' rel='noopener noreferrer' href={props.gitUrl}><GithubSvg /></a>
  </div>
}

export default Header
