import { useEffect, useState } from 'react'
import './App.css'

type Scene = {
  index: string
  era: string
  title: string
  titleEn: string
  description: string
  image: string
  alt: string
  position: string
  credit: string
}

const scenes: Scene[] = [
  {
    index: 'I',
    era: 'SABI · 538',
    title: '강 위에 세운\n마지막 수도',
    titleEn: 'The last capital, raised beside the river.',
    description: '백마강의 물길을 따라 백제는 가장 우아한 마지막 장을 열었습니다.',
    image: '/buyeo-assets/slide-busosanseong.jpg',
    alt: '낙화암에서 내려다본 백마강과 부여의 산세',
    position: 'center 48%',
    credit: 'travel oriented · CC BY-SA 2.0',
  },
  {
    index: 'II',
    era: 'GUNGNAMJI · 634',
    title: '물 위에 머문\n백제의 정원',
    titleEn: 'A garden where Baekje still lingers.',
    description: '버드나무와 연꽃, 포룡정 사이를 걸으며 오래된 왕도의 숨을 만납니다.',
    image: '/buyeo-assets/slide-gungnamji.jpg',
    alt: '버드나무와 포룡정이 어우러진 궁남지 풍경',
    position: 'center 53%',
    credit: 'Frankhöffner · CC BY-SA 3.0',
  },
  {
    index: 'III',
    era: 'JEONGNIMSA · 7C',
    title: '돌에 남은\n고요한 질서',
    titleEn: 'Silence, held in five stories of stone.',
    description: '천오백 년의 바람을 견딘 오층석탑 앞에서 사비의 시간을 읽습니다.',
    image: '/buyeo-assets/slide-jeongnimsa.jpg',
    alt: '정림사지 오층석탑',
    position: 'center 41%',
    credit: 'Bernard Gagnon · CC0 1.0',
  },
  {
    index: 'IV',
    era: 'BAEKJE · TODAY',
    title: '사라진 왕국은\n풍경이 되었다',
    titleEn: 'The vanished kingdom became a landscape.',
    description: '찬란함과 상실이 겹쳐진 도시, 부여를 오늘의 감각으로 다시 걷습니다.',
    image: '/buyeo-assets/slide-baekje-land.jpg',
    alt: '산 아래 펼쳐진 백제문화단지 전경',
    position: 'center 50%',
    credit: 'travel oriented · CC BY-SA 2.0',
  },
]

const routes = [
  {
    no: '01',
    time: '09:00 — 18:30',
    title: '사비의 정수',
    subtitle: '처음 만나는 부여',
    stops: ['궁남지', '정림사지', '국립부여박물관', '부소산성'],
    image: '/buyeo-assets/slide-jeongnimsa.jpg',
    tags: ['HISTORY', 'ONE DAY'],
  },
  {
    no: '02',
    time: '14:00 — SUNSET',
    title: '빛을 따라',
    subtitle: '산책과 사진의 오후',
    stops: ['궁남지', '로컬 카페', '백마강', '성흥산'],
    image: '/buyeo-assets/slide-gungnamji.jpg',
    tags: ['WALK', 'ROMANCE'],
  },
  {
    no: '03',
    time: '10:00 — 17:00',
    title: '살아있는 백제',
    subtitle: '아이와 함께하는 하루',
    stops: ['백제문화단지', '어린이박물관', '궁남지', '로컬 식당'],
    image: '/buyeo-assets/slide-baekje-land.jpg',
    tags: ['FAMILY', 'EXPERIENCE'],
  },
]

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg className="arrow-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d={diagonal ? 'M7 17 17 7M8 7h9v9' : 'M4 12h16M14 6l6 6-6 6'} />
    </svg>
  )
}

function Header() {
  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="부여GO 처음으로">
        <span className="brand-mark">扶</span>
        <span className="brand-word">
          <strong>부여GO</strong>
          <small>CURATED JOURNEY</small>
        </span>
      </a>
      <nav className="desktop-nav" aria-label="주요 메뉴">
        <a href="#story">사비의 서사</a>
        <a href="#journeys">여행 코스</a>
        <a href="#local">지역 안내</a>
      </nav>
      <a className="header-cta" href="#journeys">
        여행 시작하기 <Arrow diagonal />
      </a>
    </header>
  )
}

function Hero() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const timer = window.setInterval(() => setActive((value) => (value + 1) % scenes.length), 7200)
    return () => window.clearInterval(timer)
  }, [paused])

  const scene = scenes[active]

  return (
    <section
      className="hero"
      id="top"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="부여의 네 장면"
    >
      <Header />
      <div className="hero-images" aria-live="off">
        {scenes.map((item, index) => (
          <figure className={`hero-image ${index === active ? 'is-active' : ''}`} key={item.era}>
            <img
              src={item.image}
              alt={index === active ? item.alt : ''}
              style={{ objectPosition: item.position }}
              loading={index === 0 ? 'eager' : 'lazy'}
            />
          </figure>
        ))}
      </div>
      <div className="hero-grain" />
      <div className="hero-rail" aria-hidden="true">
        <span>SABI</span><span>百濟</span><span>538—660</span>
      </div>

      <div className="hero-content" key={active}>
        <p className="hero-era"><span>{scene.index}</span>{scene.era}</p>
        <h1>{scene.title.split('\n').map((line) => <span key={line}>{line}</span>)}</h1>
        <div className="hero-note">
          <p>{scene.titleEn}</p>
          <p>{scene.description}</p>
        </div>
      </div>

      <div className="hero-bottom">
        <p className="hero-credit">IMAGE {scene.credit}</p>
        <div className="hero-progress" aria-label={`${active + 1} / ${scenes.length}`}>
          {scenes.map((item, index) => (
            <button
              type="button"
              className={index === active ? 'is-active' : ''}
              onClick={() => setActive(index)}
              key={item.index}
              aria-label={`${index + 1}번째 장면: ${item.title.replace('\n', ' ')}`}
            ><span /></button>
          ))}
        </div>
        <a href="#story" className="scroll-cue">SCROLL TO DISCOVER <span>↓</span></a>
      </div>
    </section>
  )
}

function Story() {
  return (
    <section className="story section-shell" id="story">
      <div className="section-number">01</div>
      <div className="story-heading">
        <p className="eyebrow">THE LAST CAPITAL OF BAEKJE</p>
        <h2><span>찬란해서</span><span>더 애틋한 도시.</span></h2>
      </div>
      <div className="story-copy">
        <p className="story-lead">부여는 유적을 보는 곳이 아니라,<br />한 왕국의 마지막 계절을 걷는 곳입니다.</p>
        <p>538년, 백제는 도읍을 사비로 옮겼습니다. 강과 산, 정원과 석탑에 남은 단정한 아름다움은 화려함을 소리 높여 말하지 않습니다. 천천히 걸을수록 깊어지는 도시, 그게 우리가 발견한 부여입니다.</p>
        <a href="#journeys" className="text-link">사비를 걷는 방법 <Arrow /></a>
      </div>
      <div className="story-art" aria-hidden="true">
        <span className="story-ring ring-one" />
        <span className="story-ring ring-two" />
        <span className="story-ring ring-three" />
        <strong>泗<br />沘</strong>
      </div>
    </section>
  )
}

function Chapters() {
  return (
    <section className="chapters" aria-label="부여의 대표 장소">
      {scenes.slice(1).map((scene, index) => (
        <article className="chapter" key={scene.era}>
          <img src={scene.image} alt={scene.alt} style={{ objectPosition: scene.position }} loading="lazy" />
          <div className="chapter-wash" />
          <p className="chapter-no">SCENE 0{index + 1}</p>
          <div className="chapter-copy">
            <p>{scene.era}</p>
            <h3>{scene.title.replace('\n', ' ')}</h3>
            <span>{scene.description}</span>
          </div>
        </article>
      ))}
    </section>
  )
}

function Journeys() {
  return (
    <section className="journeys section-shell" id="journeys">
      <div className="section-number">02</div>
      <div className="journey-intro">
        <p className="eyebrow">CURATED JOURNEYS</p>
        <h2>당신의 속도로<br />읽는 부여.</h2>
        <p>정답 대신 잘 짜인 흐름을 제안합니다.<br />시간과 마음에 맞는 하루를 고르세요.</p>
      </div>
      <div className="route-list">
        {routes.map((route) => (
          <article className="route-card" key={route.no}>
            <div className="route-image">
              <img src={route.image} alt="" loading="lazy" />
              <span>{route.tags.join(' · ')}</span>
            </div>
            <div className="route-main">
              <span className="route-no">{route.no}</span>
              <p className="route-time">{route.time}</p>
              <h3>{route.title}</h3>
              <p className="route-subtitle">{route.subtitle}</p>
            </div>
            <ol className="route-stops">
              {route.stops.map((stop, index) => <li key={stop}><span>0{index + 1}</span>{stop}</li>)}
            </ol>
            <button type="button" className="route-button" onClick={() => window.alert('코스 상세 페이지는 다음 단계에서 추가될 예정입니다.')}>
              <span>코스 펼쳐보기</span><Arrow diagonal />
            </button>
          </article>
        ))}
      </div>
    </section>
  )
}

function LocalSection() {
  return (
    <section className="local" id="local">
      <div className="local-image" role="img" aria-label="백제문화단지의 전경" />
      <div className="local-panel">
        <p className="eyebrow">BUYEOGO · NEXT CHAPTER</p>
        <h2>여행의 다음 장면까지<br />부여GO가 준비합니다.</h2>
        <div className="local-grid">
          <article><span>01</span><h3>지역 혜택</h3><p>굿뜨래페이 사용 가능 매장과 지역 혜택 정보를 준비하고 있습니다.</p></article>
          <article><span>02</span><h3>예약 문의</h3><p>숙소와 체험, 로컬 투어를 간단히 문의할 수 있도록 확장합니다.</p></article>
          <article><span>03</span><h3>로컬 파트너</h3><p>부여의 좋은 가게와 사람을 여행자에게 제대로 소개합니다.</p></article>
        </div>
        <div className="notice">
          <strong>아직 공식 협의 전 단계입니다.</strong>
          <p>현재 결제·예약 확정·공식 지역화폐 연동 기능은 제공하지 않습니다.</p>
        </div>
        <button type="button" className="gold-button" onClick={() => window.alert('제휴 및 예약 문의 기능은 다음 단계에서 추가될 예정입니다.')}>
          파트너 안내 받기 <Arrow />
        </button>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <p className="footer-kicker">A JOURNEY TO THE LAST LIGHT OF BAEKJE</p>
        <h2>오래된 도시를<br /><em>새롭게 여행하는 법.</em></h2>
        <a href="#top" className="back-top">처음으로 <span>↑</span></a>
      </div>
      <div className="footer-bottom">
        <a className="footer-brand" href="#top"><span>扶</span><strong>부여GO</strong></a>
        <p>부여 여행을 더 깊고 쉽게 만들기 위한 개인 프로젝트 MVP입니다.<br />공식 관광·결제 서비스가 아니며 정보는 검증 후 순차적으로 업데이트됩니다.</p>
        <p className="credits">PHOTOGRAPHY · WIKIMEDIA COMMONS<br />각 이미지의 저작자와 라이선스는 슬라이드에 표기했습니다.</p>
        <p className="copyright">© 2026 BUYEOGO<br />ALL RIGHTS RESERVED.</p>
      </div>
    </footer>
  )
}

function MobileNav() {
  return (
    <nav className="mobile-nav" aria-label="모바일 메뉴">
      <a href="#top"><span>○</span>홈</a>
      <a href="#journeys"><span>⌁</span>코스</a>
      <button type="button" onClick={() => window.alert('예약 문의 기능은 곧 추가될 예정입니다.')}><span>◇</span>문의</button>
      <a href="#local"><span>＋</span>혜택</a>
    </nav>
  )
}

export default function App() {
  return (
    <main>
      <Hero />
      <Story />
      <Chapters />
      <Journeys />
      <LocalSection />
      <Footer />
      <MobileNav />
    </main>
  )
}
