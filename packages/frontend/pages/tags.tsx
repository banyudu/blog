import React from 'react'
// import Head from 'next/head'
import { NextPage } from 'next'
import { getTags } from '../services/post'
// import Link from 'next/link'
import { Tag } from '../types'
import './index.less'
import ButtonBox from '../components/button-box'
import Header from '../components/header'

interface TagsInterface {
  Tags: Tag[]
}

const Tags: NextPage<TagsInterface> = (props) => {
  const { Tags = [] } = props
  console.log('Tags are: ', Tags)
  return (
    <>
      <Header
        title='鱼肚的博客'
        gitUrl='https://github.com/banyudu'
      />
      <div className='Tags article'>
        <ButtonBox
          buttons={Tags.map(item => ({
            name: item.name,
            badge: String(item.postCount)
          }))}
        />
      </div>
    </>
  )
}

Tags.getInitialProps = async ({ res }) => {
  // set cachec-control
  if (res) {
    res.setHeader('Cache-Control', 'max-age=1800, public') // 5 minutes
  }
  const Tags: Tag[] = await getTags()
  return {
    Tags
  }
}

export default Tags
