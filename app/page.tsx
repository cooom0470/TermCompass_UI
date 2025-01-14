import Layout from './components/Layout'
import Hero from './components/Hero'
import TopWebsites from './components/TopWebsites'
import BoardSlider from './components/BoardSlider'
import NoticeBoard from './components/NoticeBoard'
import PhotoNews from './components/PhotoNews'

export default function Home() {
  return (
    <Layout>
      <Hero />
      <TopWebsites />
      <BoardSlider />
      <NoticeBoard />
      <PhotoNews />
    </Layout>
  )
}

