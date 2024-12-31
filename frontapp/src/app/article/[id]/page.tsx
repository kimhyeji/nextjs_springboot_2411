'use client'

import api from '@/src/utils/api'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'

export default function ArticleDetail() {
  const params = useParams()

  const getArticle = async () => {
    return await api
      .get(`/articles/${params.id}`)
      .then((response) => response.data.data.article)
  }

  const { isLoading, error, data } = useQuery({
    queryKey: ['article'],
    queryFn: getArticle,
  })

  if (error) {
    console.log(error)
  }

  if (isLoading) <>Loading...</>

  if (data) {
    return (
      <>
        <h4>게시판 상세 {params.id}번</h4>
        <div>{data.createdDate}</div>
        <div>{data.modifiedDate}</div>
        <div>{data.subject}</div>
        <div>{data.content}</div>
        <Link href={`/article/${params.id}/edit`}>수정</Link>
      </>
    )
  }
}
