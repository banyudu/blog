import React, { FC } from 'react'

const Footer: FC<any> = (props) => {
  return (
    <footer className='mt-8 flex flex-row justify-start'>
      <div>
        <a href='https://mobile.twitter.com/yuduban' target='_blank noopener noreferrer'>twitter</a>
        <span className='mx-2'>•</span>
        <a href='http://github.com/banyudu' target='_blank noopener noreferrer'>github</a>
        <span className='mx-2'>•</span>
        <a href='https://stackoverflow.com/users/2380603/yudu-ban' target='_blank noopener noreferrer'>stack overflow</a>
      </div>
    </footer>
  )
}

export default Footer
