import React from 'react'
// import Head from 'next/head'
import { NextPage } from 'next'
import { getCategories } from '../services/post'
// import Link from 'next/link'
import { Category } from '../types'
import './index.less'
import ButtonBox from '../components/button-box'
import Header from '../components/header'

interface CategoriesInterface {
  categories: Category[]
}

const Categories: NextPage<CategoriesInterface> = (props) => {
  const { categories = [] } = props
  console.log('categories are: ', categories)
  return (
    <>
      <Header
        title='鱼肚的博客'
        gitUrl='https://github.com/banyudu'
      />
      <div className='categories article'>
        <ButtonBox
          buttons={categories.map(item => ({
            name: item.name,
            badge: String(item.postCount),
            link: `/category/${decodeURIComponent(item.name)}`
          }))}
        />
      </div>
    </>
  )
}

Categories.getInitialProps = async ({ res }) => {
  // set cachec-control
  if (res) {
    res.setHeader('Cache-Control', 'max-age=1800, public') // 5 minutes
  }
  const categories: Category[] = await getCategories()
  return {
    categories
  }
}

export default Categories
