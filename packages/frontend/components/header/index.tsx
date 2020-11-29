import React, { FC } from 'react'
import Logo from '../logo'
import GithubSvg from '../github-svg'
import './index.less'

interface HeaderProps {
  gitUrl: string
  title: string
}
const Header: FC<HeaderProps> = (props) => {
  return <div className='headerbar'>
    <Logo />
    <h2 className='title' title={props.title}>{props.title}</h2>
    <a target='_blank' rel='noopener noreferrer' href={props.gitUrl}><GithubSvg /></a>
  </div>
}

export default Header
