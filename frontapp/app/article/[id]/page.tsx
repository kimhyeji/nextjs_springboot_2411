'use client'

import api from '@/app/utils/api'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function ArticleDetail() {
  const params = useParams()
  const [article, setArticle] = useState({})

  useEffect(() => {
    api
      .get(`/articles/${params.id}`)
      .then((response) => setArticle(response.data.data.article))
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <>
      <h4>게시판 상세 {params.id}번</h4>
      <div>{article.createdDate}</div>
      <div>{article.modifiedDate}</div>
      <div>{article.subject}</div>
      <div>{article.content}</div>
      <Link href={`/article/${params.id}/edit`}>수정</Link>
    </>
  )
}
