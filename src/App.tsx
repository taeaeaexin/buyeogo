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
    era: '사비 · 538',
    title: '강 위에 세운\n마지막 수도',
    titleEn: '강가에 세운 백제의 마지막 수도.',
    description: '백마강의 물길을 따라 백제는 가장 우아한 마지막 장을 열었습니다.',
    image: '/buyeo-assets/slide-busosanseong.jpg',
    alt: '낙화암에서 내려다본 백마강과 부여의 산세',
    position: 'center 48%',
    credit: 'travel oriented · CC BY-SA 2.0',
  },
  {
    index: 'II',
    era: '궁남지 · 634',
    title: '물 위에 머문\n백제의 정원',
    titleEn: '백제의 시간이 머무는 물 위의 정원.',
    description: '버드나무와 연꽃, 포룡정 사이를 걸으며 오래된 왕도의 숨을 만납니다.',
    image: '/buyeo-assets/slide-gungnamji.jpg',
    alt: '버드나무와 포룡정이 어우러진 궁남지 풍경',
    position: 'center 53%',
    credit: 'Frankhöffner · CC BY-SA 3.0',
  },
  {
    index: 'III',
    era: '정림사지 · 7세기',
    title: '돌에 남은\n고요한 질서',
    titleEn: '다섯 층의 돌에 고요를 쌓아 올리다.',
    description: '천오백 년의 바람을 견딘 오층석탑 앞에서 사비의 시간을 읽습니다.',
    image: '/buyeo-assets/slide-jeongnimsa.jpg',
    alt: '정림사지 오층석탑',
    position: 'center 41%',
    credit: 'Bernard Gagnon · CC0 1.0',
  },
  {
    index: 'IV',
    era: '백제 · 오늘',
    title: '사라진 왕국은\n풍경이 되었다',
    titleEn: '사라진 왕국은 오늘의 풍경이 되었다.',
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
    time: '오전 9시 — 오후 6시 30분',
    title: '사비의 정수',
    subtitle: '처음 만나는 부여',
    stops: ['궁남지', '정림사지', '국립부여박물관', '부소산성'],
    image: '/buyeo-assets/gwanbukri.jpg',
    credit: 'Korearoadtour · CC BY-SA 4.0',
    tags: ['역사', '하루 여행'],
    distance: '약 7.2km',
    pace: '천천히 걷는 하루',
    highlight: '석탑에 오후의 빛이 가장 낮게 걸리는 순간',
    description: '왕궁의 정원에서 시작해 사비의 중심을 지나 백마강을 내려다보는, 부여의 공간과 시간을 가장 온전히 이해하는 흐름입니다.',
  },
  {
    no: '02',
    time: '오후 2시 — 해질녘',
    title: '빛을 따라',
    subtitle: '산책과 사진의 오후',
    stops: ['궁남지', '로컬 카페', '백마강', '성흥산'],
    image: '/buyeo-assets/goransa.jpg',
    credit: 'Touam · CC0 1.0',
    tags: ['산책', '둘만의 여행'],
    distance: '약 5.8km',
    pace: '오후부터 노을까지',
    highlight: '연못의 수면과 백마강의 노을이 이어지는 시간',
    description: '빨리 많이 보는 대신 빛이 머무는 곳을 오래 걷습니다. 사진과 대화, 느린 저녁을 좋아하는 여행자를 위한 코스입니다.',
  },
  {
    no: '03',
    time: '오전 10시 — 오후 5시',
    title: '살아있는 백제',
    subtitle: '아이와 함께하는 하루',
    stops: ['백제문화단지', '어린이박물관', '궁남지', '로컬 식당'],
    image: '/buyeo-assets/neungsanri-tombs.jpg',
    credit: 'Ryuch · CC BY-SA 3.0',
    tags: ['가족', '체험'],
    distance: '약 4.6km',
    pace: '쉬어가며 반나절',
    highlight: '책에서 본 백제를 눈앞에서 만나는 첫 순간',
    description: '어린이가 지치지 않도록 관람과 체험, 산책과 식사를 번갈아 배치했습니다. 이야기로 기억되는 가족의 하루를 제안합니다.',
  },
]

function BrandSymbol({ className = '' }: { className?: string }) {
  return (
    <svg className={`brand-symbol ${className}`} viewBox="0 0 48 48" aria-hidden="true">
      <circle className="symbol-frame" cx="24" cy="24" r="21.5" />
      <path className="symbol-route" d="M10.5 29.5c5.4-4.1 10.4-4.1 15 0s9.7 4.1 14.2 0" />
      <circle className="symbol-point" cx="24" cy="17" r="2.4" />
    </svg>
  )
}

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg className="arrow-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d={diagonal ? 'M7 17 17 7M8 7h9v9' : 'M4 12h16M14 6l6 6-6 6'} />
    </svg>
  )
}

type PageId = 'walk' | 'tales' | 'maker'

const pageLinks = [
  { id: 'walk' as PageId, no: '01', label: '부여를 걷다', description: '장소와 시간으로 읽는 부여', href: '/' },
  { id: 'tales' as PageId, no: '02', label: '사비의 옛이야기', description: '기록과 전설 사이의 이야기 서재', href: '/tales' },
  { id: 'maker' as PageId, no: '03', label: '만든 이의 기록', description: '이 도시를 화면에 옮긴 과정', href: '/maker' },
]

function GlobalHeader({ current, fixed = false, trail, tone = 'on-dark' }: { current: PageId, fixed?: boolean, trail?: string, tone?: 'on-light' | 'on-dark' }) {
  const currentPage = pageLinks.find((item) => item.id === current) ?? pageLinks[0]

  return (
    <header className={`site-header ${fixed ? 'is-fixed' : ''} ${tone}`}>
      <a className="brand" href="/" aria-label="부여로 처음으로">
        <BrandSymbol />
        <span className="brand-word">
          <strong>부여로</strong>
          <small>부여 여행 큐레이션</small>
        </span>
      </a>
      {trail && <div className="header-location" aria-label={`현재 위치: ${trail}`}>
        <span>{currentPage.no}</span>
        <p><small>{currentPage.label}</small><strong>{trail}</strong></p>
      </div>}
      <details className="page-switcher">
        <summary><span>{trail ? '전체 목차' : currentPage.label}</span><i aria-hidden="true"><b /><b /></i></summary>
        <div className="page-menu-panel">
          <div className="page-menu-heading"><p>부여로의 세 장</p><h2>한 도시를 읽는<br /><em>세 가지 시선.</em></h2></div>
          <nav aria-label="페이지 전체 목차">
            {pageLinks.map((item) => (
              <a href={item.href} className={item.id === current ? 'is-current' : ''} aria-current={item.id === current ? 'page' : undefined} key={item.id}>
                <small>{item.no}</small><span><strong>{item.label}</strong><i>{item.description}</i></span><b aria-hidden="true">↗</b>
              </a>
            ))}
          </nav>
          <p className="page-menu-foot">BUYEORO · SABI 538—660 · 2026</p>
        </div>
      </details>
    </header>
  )
}

function Hero({ onOpenService }: { onOpenService: () => void }) {
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
      className="hero snap-page"
      id="top"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="부여의 네 장면"
    >
      <GlobalHeader current="walk" />
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
        <span>사비</span><span>백제</span><span>538—660</span>
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
        <p className="hero-credit">사진 · {scene.credit}</p>
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
        <button className="hero-service-button" type="button" onClick={onOpenService}>
          <i className="service-orbit"><Arrow diagonal /></i>
          <span><small>별도의 여행 설계 도구</small><strong>나만의 부여 여정</strong></span>
          <em>준비 중</em>
        </button>
      </div>
    </section>
  )
}

function Story() {
  return (
    <section className="story section-shell snap-page" id="story">
      <div className="section-number">01</div>
      <div className="story-heading">
        <p className="eyebrow">백제의 마지막 수도</p>
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
    <section className="chapters snap-page" id="scenes" aria-label="부여의 대표 장소">
      {scenes.slice(1).map((scene, index) => (
        <article className="chapter" key={scene.era}>
          <img src={scene.image} alt={scene.alt} style={{ objectPosition: scene.position }} loading="lazy" />
          <div className="chapter-wash" />
          <p className="chapter-no">장면 0{index + 1}</p>
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
  const [expandedRoute, setExpandedRoute] = useState<number | null>(0)

  return (
    <section className="journeys section-shell snap-page snap-page-long" id="journeys">
      <div className="section-number">02</div>
      <div className="journey-intro">
        <p className="eyebrow">세심하게 고른 여행</p>
        <h2>당신의 속도로<br />읽는 부여.</h2>
        <p>정답 대신 잘 짜인 흐름을 제안합니다.<br />시간과 마음에 맞는 하루를 고르세요.</p>
        <div className="journey-index" aria-hidden="true">
          <span>세 가지 여행</span>
          <strong>03</strong>
        </div>
      </div>
      <div className="route-list">
        {routes.map((route, index) => (
          <article className={`route-card ${expandedRoute === index ? 'is-expanded' : ''}`} key={route.no}>
            <div className="route-image">
              <img src={route.image} alt="" loading="lazy" />
              <span>사진 · {route.credit}</span>
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
            <div className="route-detail" aria-hidden={expandedRoute !== index}>
              <p>{route.description}</p>
              <dl>
                <div><dt>걷는 거리</dt><dd>{route.distance}</dd></div>
                <div><dt>여행 속도</dt><dd>{route.pace}</dd></div>
                <div><dt>기억할 순간</dt><dd>{route.highlight}</dd></div>
              </dl>
            </div>
            <button
              type="button"
              className="route-button"
              onClick={() => setExpandedRoute(expandedRoute === index ? null : index)}
              aria-expanded={expandedRoute === index}
            >
              <span>{expandedRoute === index ? '코스 접기' : '코스 펼쳐보기'}</span><Arrow diagonal />
            </button>
          </article>
        ))}
      </div>
    </section>
  )
}

function LocalSection() {
  return (
    <section className="local snap-page" id="local">
      <div className="local-image" role="img" aria-label="백제문화단지의 전경" />
      <div className="local-panel">
        <p className="eyebrow">부여로 · 다음 이야기</p>
        <h2>여행의 다음 장면까지<br />부여로가 준비합니다.</h2>
        <div className="local-grid">
          <article><span>01</span><h3>지역 혜택</h3><p>굿뜨래페이 사용 가능 매장과 지역 혜택 정보를 준비하고 있습니다.</p></article>
          <article><span>02</span><h3>예약 문의</h3><p>숙소와 체험, 로컬 투어를 간단히 문의할 수 있도록 확장합니다.</p></article>
          <article><span>03</span><h3>로컬 파트너</h3><p>부여의 좋은 가게와 사람을 여행자에게 제대로 소개합니다.</p></article>
        </div>
        <div className="notice">
          <strong>아직 공식 협의 전 단계입니다.</strong>
          <p>현재 결제·예약 확정·공식 지역화폐 연동 기능은 제공하지 않습니다.</p>
        </div>
        <a className="gold-button" href="/features.html">준비 중인 기능 보기 <Arrow /></a>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer snap-page" id="information">
      <div className="footer-top">
        <p className="footer-kicker">백제의 마지막 빛을 따라가는 여행</p>
        <h2>오래된 도시를<br /><em>새롭게 여행하는 법.</em></h2>
        <a href="#top" className="back-top">처음으로 <span>↑</span></a>
      </div>
      <div className="footer-information">
        <article>
          <span>01 · 소개</span>
          <h3>부여로 소개</h3>
          <p>부여로는 백제의 마지막 수도 부여를 오늘의 감각으로 다시 읽는 독립 여행 큐레이션 프로젝트입니다. 검증된 역사·장소 정보와 직접 설계한 여행 흐름을 차근히 축적합니다.</p>
          <a href="/about.html">사이트 운영 원칙 자세히 보기 <Arrow /></a>
        </article>
        <article>
          <span>02 · 기능</span>
          <h3>제공·준비 기능</h3>
          <p>현재 여행 코스와 대표 장소를 소개하며, 향후 장소 탐색·예약 문의·지역 혜택 안내를 준비합니다. 아직 결제, 예약 확정, 공식 지역화폐 연동은 제공하지 않습니다.</p>
          <a href="/features.html">기능과 책임 범위 확인하기 <Arrow /></a>
        </article>
        <article>
          <span>03 · 개인정보</span>
          <h3>개인정보와 광고</h3>
          <p>현재 회원가입이나 문의 정보를 수집하지 않습니다. 향후 광고 도입 시 Google 등 제3자 사업자가 쿠키를 사용할 수 있으며, 관련 내용과 선택권을 개인정보처리방침에 투명하게 고지합니다.</p>
          <a href="/privacy.html">개인정보처리방침 읽기 <Arrow /></a>
        </article>
      </div>
      <div className="footer-bottom">
        <a className="footer-brand" href="#top"><BrandSymbol /><span><strong>부여로</strong><small>부여 여행 큐레이션</small></span></a>
        <p>부여 여행을 더 깊고 쉽게 만들기 위한 개인 프로젝트 MVP입니다.<br />공식 관광·결제 서비스가 아니며 정보는 검증 후 순차적으로 업데이트됩니다.</p>
        <p className="credits">사진 출처 · 위키미디어 공용<br />각 이미지의 저작자와 이용 조건은 슬라이드에 표기했습니다.</p>
        <p className="copyright">© 2026 부여로<br />최종 수정 · 2026.06.20</p>
      </div>
    </footer>
  )
}

function MobileNav() {
  return (
    <nav className="mobile-nav" aria-label="모바일 메뉴">
      <a href="#top"><span>○</span>홈</a>
      <a href="#journeys"><span>⌁</span>코스</a>
      <a href="/about.html#contact"><span>◇</span>문의</a>
      <a href="#local"><span>＋</span>혜택</a>
    </nav>
  )
}

function ServiceGate({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    document.body.classList.add('dialog-open')
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.classList.remove('dialog-open')
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [onClose])

  return (
    <div className="service-gate" role="dialog" aria-modal="true" aria-labelledby="service-gate-title">
      <button className="service-gate-backdrop" type="button" onClick={onClose} aria-label="준비중 안내 닫기" />
      <div className="service-gate-panel">
        <button className="service-gate-close" type="button" onClick={onClose} aria-label="닫기">×</button>
        <p className="eyebrow">부여 여행 서비스</p>
        <h2 id="service-gate-title">진짜 여행은<br />여기서 시작됩니다.</h2>
        <p>취향과 일정에 맞는 코스, 장소 정보와 지역 경험을 하나로 잇는 별도 서비스를 준비하고 있습니다.</p>
        <div className="service-gate-status"><span />현재 정식 공개를 준비하고 있습니다.</div>
        <button type="button" onClick={onClose}>조금만 기다려주세요</button>
      </div>
    </div>
  )
}

const taleChapters = [
  {
    slug: 'nakhwaam',
    number: '첫 번째 이야기',
    title: '꽃처럼 떨어진\n사람들의 이름',
    subtitle: '낙화암과 삼천궁녀',
    body: '백제가 무너지던 날의 슬픔은 오랜 세월을 지나 ‘삼천궁녀’라는 이야기로 전해졌습니다. 그러나 삼천이라는 숫자와 궁녀의 이야기는 후대에 덧입혀진 상징으로 보는 시선도 있습니다.',
    note: '기록과 전설 사이에서, 우리는 이름 없이 사라진 사람들을 먼저 기억합니다.',
    image: '/buyeo-assets/baekhwajeong.jpg',
    credit: 'travel oriented · CC BY-SA 2.0',
  },
  {
    slug: 'seodong',
    number: '두 번째 이야기',
    title: '노래가 데려온\n두 사람의 인연',
    subtitle: '서동과 선화공주',
    body: '마를 캐던 서동은 아이들에게 노래를 퍼뜨려 신라의 선화공주와 인연을 맺었다고 전해집니다. 사랑과 야심, 왕이 되는 이야기가 짧은 노래 한 수에 담겼습니다.',
    note: '서동요는 역사와 설화가 맞닿는 자리에서 지금도 새롭게 읽힙니다.',
    image: '/buyeo-assets/neungsanri-tombs.jpg',
    credit: 'Ryuch · CC BY-SA 3.0',
  },
  {
    slug: null,
    number: '다음 이야기',
    title: '부여의 밤에는\n아직 이야기가 많습니다.',
    subtitle: '이야기 서재 준비중',
    body: '백제금동대향로, 의자왕, 백마강과 용의 전설까지. 자료를 확인하고 한 장씩 천천히 펼쳐 보이겠습니다.',
    note: '이 페이지는 동화책처럼 넘기는 설화 콘텐츠의 초기 목업입니다.',
    image: '/buyeo-assets/incense-burner.jpg',
    credit: 'Good friend100 · Public domain',
  },
]

function TalesPage() {
  return (
    <main className="tales-page">
      <GlobalHeader current="tales" fixed />
      <section className="tale-cover snap-page">
        <p>부여로 이야기 서재</p><h1>사비의<br />옛이야기</h1><span>기록과 전설 사이, 오래된 목소리를 따라갑니다.</span>
      </section>
      {taleChapters.map((chapter) => (
        <section className="tale-chapter snap-page" key={chapter.number}>
          <img src={chapter.image} alt="" />
          <div className="tale-shade" />
          <div className="tale-copy"><p>{chapter.number} · {chapter.subtitle}</p><h2>{chapter.title.split('\n').map((line) => <span key={line}>{line}</span>)}</h2><div><p>{chapter.body}</p><small>{chapter.note}</small>{chapter.slug ? <a className="tale-read-link" href={`/tales/${chapter.slug}`}>이야기 한 편 모두 읽기 <Arrow diagonal /></a> : <span className="tale-coming">다음 장을 준비하고 있습니다.</span>}</div></div>
          <p className="tale-credit">사진 · {chapter.credit}</p>
        </section>
      ))}
    </main>
  )
}

const taleDetails = {
  nakhwaam: {
    label: '첫 번째 이야기 · 낙화암',
    title: '꽃처럼 떨어진\n사람들의 이름',
    intro: '660년, 사비성이 무너지던 날. 백마강 절벽에 남은 이야기는 오랜 세월 동안 사실과 전설, 애도와 상징 사이를 흘러왔습니다.',
    cover: '/buyeo-assets/nakhwaam.jpg',
    coverCredit: 'Frankhöffner · CC BY-SA 3.0',
    chapters: [
      { no: '一', kicker: '사비의 마지막 여름', title: '강 건너에서\n먼지가 일었다.', body: '나당연합군이 백제의 도성으로 향하던 660년 여름, 사비는 왕국의 마지막 시간을 맞았습니다. 부소산성은 도성을 감싸는 마지막 방어선이었고, 그 아래로 백마강이 흘렀습니다.', image: '/buyeo-assets/gwanbukri.jpg', credit: 'Korearoadtour · CC BY-SA 4.0' },
      { no: '二', kicker: '기록과 전설', title: '삼천이라는 수는\n슬픔의 크기였다.', body: '당대 기록에는 ‘삼천궁녀’가 등장하지 않습니다. 후대의 시와 이야기 속에서 숫자는 나라와 함께 사라진 수많은 사람을 상징하게 되었습니다. 이 이야기는 사실을 단정하는 대신, 누가 기억에서 지워졌는지 묻습니다.', image: '/buyeo-assets/baekhwajeong.jpg', credit: 'travel oriented · CC BY-SA 2.0' },
      { no: '三', kicker: '절벽 아래의 고요', title: '이름 대신\n꽃을 놓다.', body: '오늘의 낙화암에는 백화정이 서 있고, 절벽 아래 고란사까지 숲길이 이어집니다. 전설을 그대로 믿거나 밀어내기보다, 이름 없이 사라진 이들의 삶을 생각하며 천천히 걷는 길입니다.', image: '/buyeo-assets/goransa.jpg', credit: 'Touam · CC0 1.0' },
    ],
    route: { title: '멸망의 날을 따라 걷는 길', duration: '약 3시간 30분', distance: '약 4.8km', stops: ['관북리 유적', '부소산성', '백화정·낙화암', '고란사', '백마강 나루'] },
  },
  seodong: {
    label: '두 번째 이야기 · 서동요',
    title: '노래가 데려온\n두 사람의 인연',
    intro: '마를 캐던 소년과 신라의 공주. 네 줄짜리 노래는 사랑 이야기이면서 왕이 되고자 했던 한 사람의 대담한 서사입니다.',
    cover: '/buyeo-assets/slide-gungnamji.jpg',
    coverCredit: 'Frankhöffner · CC BY-SA 3.0',
    chapters: [
      { no: '一', kicker: '마를 캐는 아이', title: '이름보다 먼저\n노래가 태어났다.', body: '서동은 마를 캐어 팔던 인물로 전해집니다. 그는 아이들에게 노래를 부르게 했고, 짧고 강한 이야기는 사람들의 입을 타고 신라의 궁궐까지 번졌습니다.', image: '/buyeo-assets/neungsanri-tombs.jpg', credit: 'Ryuch · CC BY-SA 3.0' },
      { no: '二', kicker: '서동과 선화', title: '소문은 두 사람을\n길 위에 세웠다.', body: '『삼국유사』가 전하는 서동요에는 사랑과 계략이 함께 있습니다. 선화공주는 궁을 떠나 서동과 길을 나서고, 서동은 훗날 왕이 됩니다. 아름다운 설화 안에는 시대의 욕망도 겹쳐 있습니다.', image: '/buyeo-assets/gwanbukri.jpg', credit: 'Korearoadtour · CC BY-SA 4.0' },
      { no: '三', kicker: '왕의 정원', title: '연못 위에\n남은 상상.', body: '궁남지는 백제 무왕과 연결해 읽히는 왕궁 남쪽의 정원입니다. 버드나무와 물길 사이를 걸으면, 역사로 모두 증명할 수 없어도 오래 살아남은 이야기의 힘을 만날 수 있습니다.', image: '/buyeo-assets/slide-gungnamji.jpg', credit: 'Frankhöffner · CC BY-SA 3.0' },
    ],
    route: { title: '서동의 노래에서 왕의 정원까지', duration: '약 4시간', distance: '약 6.2km', stops: ['국립부여박물관', '능산리 고분군', '관북리 유적', '궁남지', '서동공원'] },
  },
}

function TaleDetailPage({ slug }: { slug: keyof typeof taleDetails }) {
  const tale = taleDetails[slug]
  const taleNumber = slug === 'nakhwaam' ? '01' : '02'
  return (
    <main className="tale-detail-page">
      <GlobalHeader current="tales" fixed trail={`설화 ${taleNumber} · ${tale.label.split('·')[1].trim()}`} />
      <section className="tale-detail-cover snap-page">
        <img src={tale.cover} alt="" />
        <div className="tale-detail-shade" />
        <div><p className="tale-breadcrumb"><a href="/tales">이야기 서재</a><span>／</span><b>설화 {taleNumber}</b><span>／</span>{tale.label.split('·')[1]}</p><h1>{tale.title.split('\n').map((line) => <span key={line}>{line}</span>)}</h1><blockquote>{tale.intro}</blockquote></div>
        <aside className="tale-position"><span>STORY POSITION</span><strong>{taleNumber}<i>／02</i></strong><a href="/tales">모든 이야기 보기 ↗</a></aside>
        <small>사진 · {tale.coverCredit}</small>
      </section>
      {tale.chapters.map((chapter) => (
        <section className="storybook-page snap-page" key={chapter.no}>
          <figure><img src={chapter.image} alt="" /><figcaption>사진 · {chapter.credit}</figcaption></figure>
          <article><p>{chapter.no} · {chapter.kicker}</p><h2>{chapter.title.split('\n').map((line) => <span key={line}>{line}</span>)}</h2><div>{chapter.body}</div></article>
        </section>
      ))}
      <section className="tale-route snap-page">
        <div className="tale-route-intro"><p>이야기 다음의 실제 여행</p><h2>{tale.route.title}</h2><span>{tale.route.duration} · {tale.route.distance}</span></div>
        <ol>{tale.route.stops.map((stop, index) => <li key={stop}><small>0{index + 1}</small><strong>{stop}</strong>{index < tale.route.stops.length - 1 && <span aria-hidden="true">→</span>}</li>)}</ol>
        <a href="/">부여의 다른 여행 코스 보기 <Arrow /></a>
      </section>
    </main>
  )
}

function MakerPage() {
  const [headerTone, setHeaderTone] = useState<'on-light' | 'on-dark'>('on-light')

  useEffect(() => {
    const cover = document.querySelector<HTMLElement>('.maker-cover')
    if (!cover) return

    const updateTone = () => setHeaderTone(window.scrollY < cover.offsetHeight - 88 ? 'on-light' : 'on-dark')
    updateTone()
    window.addEventListener('scroll', updateTone, { passive: true })
    window.addEventListener('resize', updateTone)
    return () => {
      window.removeEventListener('scroll', updateTone)
      window.removeEventListener('resize', updateTone)
    }
  }, [])

  return (
    <main className="maker-page">
      <GlobalHeader current="maker" fixed tone={headerTone} />
      <section className="maker-cover snap-page"><p>만든 이의 기록</p><h1>도시를 좋아하는 마음이<br />하나의 화면이 되기까지.</h1><span>이곳에는 부여로를 만든 개발자의 이야기가 채워질 예정입니다.</span></section>
      <section className="maker-notes snap-page">
        <div className="maker-sticky"><p>개발 기록 · 목업</p><h2>무엇을,<br />왜 만들었나.</h2></div>
        <div className="maker-list">
          <article><span>01</span><h3>부여를 다시 보게 된 순간</h3><p>프로젝트를 시작하게 된 개인적인 계기와 부여에서 발견한 첫 장면을 기록할 자리입니다.</p></article>
          <article><span>02</span><h3>관광 정보보다 여행의 흐름</h3><p>정보를 나열하지 않고 하나의 감정과 동선으로 설계한 이유를 풀어낼 자리입니다.</p></article>
          <article><span>03</span><h3>만들면서 배운 것들</h3><p>디자인과 개발의 시행착오, 앞으로 만들 서비스에 대한 생각을 이어갈 자리입니다.</p></article>
        </div>
      </section>
    </main>
  )
}

function usePageMetadata(title: string, description: string, path: string) {
  useEffect(() => {
    document.title = title
    const descriptionTag = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    const canonicalTag = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (descriptionTag) descriptionTag.content = description
    if (canonicalTag) canonicalTag.href = `https://buyeogo.pages.dev${path}`
  }, [description, path, title])
}

function useGuidedScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (window.matchMedia('(max-width: 760px)').matches) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    let locked = false
    let unlockTimer = 0

    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey || locked || Math.abs(event.deltaY) < 4) return

      const pages = Array.from(document.querySelectorAll<HTMLElement>('.snap-page'))
      const viewportAnchor = window.scrollY + window.innerHeight * 0.35
      let currentIndex = pages.findIndex((page) => {
        const top = page.offsetTop
        return viewportAnchor >= top && viewportAnchor < top + page.offsetHeight
      })

      if (currentIndex < 0) {
        currentIndex = pages.reduce((closest, page, index) => (
          Math.abs(page.offsetTop - window.scrollY) < Math.abs(pages[closest].offsetTop - window.scrollY)
            ? index
            : closest
        ), 0)
      }

      const currentPage = pages[currentIndex]
      const isLongPage = currentPage.classList.contains('snap-page-long')

      if (isLongPage) {
        const pageTop = currentPage.offsetTop
        const pageBottom = pageTop + currentPage.offsetHeight - window.innerHeight
        const canMoveInside = event.deltaY > 0
          ? window.scrollY < pageBottom - 6
          : window.scrollY > pageTop + 6

        if (canMoveInside) return
      }

      const targetIndex = currentIndex + (event.deltaY > 0 ? 1 : -1)
      const target = pages[targetIndex]
      if (!target) return

      event.preventDefault()
      locked = true
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      window.clearTimeout(unlockTimer)
      unlockTimer = window.setTimeout(() => { locked = false }, 900)
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    return () => {
      window.removeEventListener('wheel', onWheel)
      window.clearTimeout(unlockTimer)
    }
  }, [])
}

export default function App() {
  useGuidedScroll()
  const [serviceOpen, setServiceOpen] = useState(false)
  const path = window.location.pathname.replace(/\/$/, '') || '/'

  const taleSlug = path.startsWith('/tales/') ? path.split('/')[2] as keyof typeof taleDetails : null
  const detailTale = taleSlug && taleDetails[taleSlug]

  const metadata = detailTale
    ? [`${detailTale.label} | 부여로`, detailTale.intro, path]
    : path === '/tales'
    ? ['사비의 옛이야기 | 부여로', '부여에 전해지는 설화를 기록과 전설 사이에서 읽는 이야기 서재입니다.', '/tales']
    : path === '/maker'
      ? ['만든 이의 기록 | 부여로', '부여로를 만든 개발자의 생각과 제작 과정을 기록할 개인 페이지입니다.', '/maker']
      : ['부여로 | 백제의 마지막 수도, 부여를 걷는 여행', '부여로는 백제의 마지막 수도 부여를 깊게 여행하는 독립 큐레이션입니다.', '/']

  usePageMetadata(metadata[0], metadata[1], metadata[2])

  if (detailTale && taleSlug) return <TaleDetailPage slug={taleSlug} />
  if (path === '/tales') return <TalesPage />
  if (path === '/maker') return <MakerPage />

  return (
    <main>
      <Hero onOpenService={() => setServiceOpen(true)} />
      <Story />
      <Chapters />
      <Journeys />
      <LocalSection />
      <Footer />
      <MobileNav />
      {serviceOpen && <ServiceGate onClose={() => setServiceOpen(false)} />}
    </main>
  )
}
