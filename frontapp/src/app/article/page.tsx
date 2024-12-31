'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import api from '../../utils/api'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export default function ArticleDetail() {
  const getArticles = async () => {
    return await api
      .get('/articles')
      .then((response) => response.data.data.articles)
  }

  const { isLoading, error, data } = useQuery({
    queryKey: ['articles'],
    queryFn: getArticles,
  })

  const deleteArticle = async (id) => {
    await api.delete(`/articles/${id}`)
  }

  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: deleteArticle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] })
    },
  })

  if (error) console.log(error)

  if (isLoading) <>Loading...</>

  if (data) {
    return (
      <>
        <ArticleForm />
        <h4>번호 / 제목 / 작성자 / 생성일 / 삭제여부</h4>
        {data.length == 0 ? (
          <p>현재 게시물이 없습니다.</p>
        ) : (
          <ul>
            {data.map((row) => (
              <li key={row.id}>
                {row.id} /{' '}
                <Link href={`/article/${row.id}`}>{row.subject}</Link> /{' '}
                {row.author} / {row.createdDate}
                <button onClick={() => mutation.mutate(row.id)}>삭제</button>
              </li>
            ))}
          </ul>
        )}
      </>
    )
  }
}

function ArticleForm() {
  const [article, setArticle] = useState({ subject: '', content: '' })

  const handleSubmit = async (e) => {
    e.preventDefault()

    await api
      .post('/articles', article)
      .then(function (response) {
        console.log(response)
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  const handleChange = (e) => {
    const { name, value } = e.target

    setArticle({ ...article, [name]: value })
    // console.log({...article, [name]: value})
  }

  return (
    <>
      <h4>게시물 작성</h4>
      <form onSubmit={handleSubmit}>
        <label>
          제목 :
          <input type="text" name="subject" onChange={handleChange} />
        </label>
        <br />
        <label>
          내용 :
          <input type="text" name="content" onChange={handleChange} />
        </label>
        <input type="submit" value="등록" />
      </form>
    </>
  )
}
