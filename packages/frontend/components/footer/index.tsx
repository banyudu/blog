import React, { FC } from 'react'

const Footer: FC<any> = (props) => {
  return <footer>
    {props.children ? props.children : ''}
  </footer>
}

export default Footer
