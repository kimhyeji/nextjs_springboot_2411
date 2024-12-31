'use client'

import api from '@/app/utils/api'
import { useParams, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function ArticleEdit() {
  const params = useParams()
  const router = useRouter()
  const [article, setArticle] = useState({ subject: '', content: '' })
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    fetchArticle()
  }, [])

  const fetchArticle = async () => {
    await api
      .get('/members/me')
      .then((response) => console.log(response))
      .catch((err) => {
        console.log(err)
        alert('로그인 후 이용해주세요')
        router.push('/member/login')
      })

    await api
      .get(`/articles/${params.id}`)
      .then((response) => {
        setArticle(response.data.data.article)
        setIsLoading(true)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await api
      .patch(`/articles/${params.id}`, article)
      .then(function (response) {
        console.log(response)
        router.push('/article')
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  const handleChange = (e) => {
    const { name, value } = e.target

    setArticle({ ...article, [name]: value })
  }

  return (
    <>
      {isLoading ? (
        <>
          <h4>게시물 수정</h4>
          <form onSubmit={handleSubmit}>
            <label>
              제목 :
              <input
                type="text"
                name="subject"
                value={article.subject}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              내용 :
              <input
                type="text"
                name="content"
                value={article.content}
                onChange={handleChange}
              />
            </label>
            <input type="submit" value="수정" />
          </form>
        </>
      ) : (
        <></>
      )}
    </>
  )
}
