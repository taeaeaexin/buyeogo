import { useEffect, useRef, useState } from 'react'
import './App.css'

type IconName =
  | 'arrowLeft'
  | 'arrowRight'
  | 'calendar'
  | 'home'
  | 'map'
  | 'message'
  | 'route'
  | 'store'

type Slide = {
  title: string
  subtitle: string
  location: string
  image: string
  imageAlt: string
  objectPosition?: string
  credit: string
}

type PanelKey = 'course' | 'reservation' | 'places' | 'contact' | 'partner'

type PanelAction = {
  label: string
  description: string
  targetId: 'top' | 'courses' | 'benefits' | 'partner'
}

type PanelContent = {
  eyebrow: string
  title: string
  description: string
  actions: PanelAction[]
  upcoming: string
  note?: string
}

const slides: Slide[] = [
  {
    title: '물 위에 머문\n백제의 여름',
    subtitle: '연꽃과 버드나무 사이로 천천히 걷는 궁남지',
    location: '궁남지',
    image: '/buyeo-assets/slide-gungnamji.jpg',
    imageAlt: '버드나무와 포룡정이 어우러진 부여 궁남지 전경',
    objectPosition: 'center 52%',
    credit: 'Frankhöffner · CC BY-SA 3.0',
  },
  {
    title: '백마강이 펼쳐지는\n부여의 가장 높은 시선',
    subtitle: '낙화암에서 강과 산이 이어지는 풍경을 만납니다',
    location: '부소산성 · 낙화암',
    image: '/buyeo-assets/slide-busosanseong.jpg',
    imageAlt: '낙화암에서 내려다본 백마강과 주변 산세',
    objectPosition: 'center 48%',
    credit: 'travel oriented · CC BY-SA 2.0',
  },
  {
    title: '돌에 새겨진\n백제의 고요한 시간',
    subtitle: '한 자리에서 천 년을 견딘 정림사지 오층석탑',
    location: '정림사지',
    image: '/buyeo-assets/slide-jeongnimsa.jpg',
    imageAlt: '정림사지 오층석탑 정면과 뒤편 건물',
    objectPosition: 'center 42%',
    credit: 'Bernard Gagnon · CC0 1.0',
  },
  {
    title: '사비의 하루를\n가까이에서 걷다',
    subtitle: '백제의 생활과 건축을 한눈에 만나는 시간',
    location: '백제문화단지',
    image: '/buyeo-assets/slide-baekje-land.jpg',
    imageAlt: '산을 배경으로 펼쳐진 부여 백제문화단지 전경',
    objectPosition: 'center 50%',
    credit: 'travel oriented · CC BY-SA 2.0',
  },
]

const services = [
  {
    icon: 'route' as const,
    title: '코스 추천',
    description: '시간과 취향에 맞는 부여 여행 흐름',
  },
  {
    icon: 'map' as const,
    title: '로컬 장소',
    description: '명소부터 식당, 카페, 숙소까지',
  },
  {
    icon: 'message' as const,
    title: '예약 문의',
    description: '숙소와 체험 문의를 한곳에서',
  },
]

const courses = [
  {
    title: '백제의 시간을 걷는 하루',
    description: '처음 부여를 찾는 여행자를 위한 가장 정석적인 역사 코스',
    tags: ['첫 방문', '역사', '하루'],
    route: '궁남지 · 정림사지 · 부소산성',
    image: '/buyeo-assets/slide-jeongnimsa.jpg',
    imageAlt: '정림사지 오층석탑',
    position: 'center 40%',
  },
  {
    title: '연꽃과 노을 사이',
    description: '사진과 산책을 좋아하는 사람을 위한 느린 감성 코스',
    tags: ['산책', '사진', '카페'],
    route: '궁남지 · 로컬 카페 · 성흥산',
    image: '/buyeo-assets/slide-gungnamji.jpg',
    imageAlt: '궁남지 포룡정과 연못',
    position: 'center 55%',
  },
  {
    title: '아이와 만나는 백제',
    description: '보고, 듣고, 직접 경험하는 가족 주말 여행 코스',
    tags: ['가족', '주말', '체험'],
    route: '백제문화단지 · 박물관 · 궁남지',
    image: '/buyeo-assets/slide-baekje-land.jpg',
    imageAlt: '백제문화단지 전경',
    position: 'center 48%',
  },
]

const panelContent: Record<PanelKey, PanelContent> = {
  course: {
    eyebrow: 'COURSE PREVIEW',
    title: '코스 상세는 여행 흐름부터 차근히 다듬고 있습니다.',
    description:
      '현재는 핵심 동선과 분위기를 먼저 보여드리고 있습니다. 상세 일정, 소요 시간, 동선 지도는 검증 후 순차적으로 추가할 예정입니다.',
    actions: [
      {
        label: '추천 코스 비교하기',
        description: '세 가지 여행 흐름을 다시 보고 취향에 맞는 방향을 고릅니다.',
        targetId: 'courses',
      },
      {
        label: '지역 혜택 준비 보기',
        description: '매장·혜택 정보가 어떤 방식으로 연결될지 먼저 확인합니다.',
        targetId: 'benefits',
      },
    ],
    upcoming: '코스별 시간표, 걷기 난이도, 우천 대안 안내를 다음 단계에서 보강합니다.',
  },
  reservation: {
    eyebrow: 'RESERVATION',
    title: '예약 문의는 준비 중이지만 다음 탐색은 바로 이어갈 수 있습니다.',
    description:
      '아직 숙소·체험 예약을 직접 연결하지는 않습니다. 대신 현재 둘러볼 수 있는 코스와 제휴 안내를 먼저 정리해 두었습니다.',
    actions: [
      {
        label: '추천 코스 살펴보기',
        description: '여행 성격에 맞는 기본 동선을 먼저 비교합니다.',
        targetId: 'courses',
      },
      {
        label: '제휴 안내 보기',
        description: '숙소·식당·체험 업체와 어떤 방식으로 연결될지 확인합니다.',
        targetId: 'partner',
      },
    ],
    upcoming: '문의 폼과 응답 흐름은 운영 기준이 정리된 뒤 추가할 예정입니다.',
    note: '부여GO는 현재 공식 예약 플랫폼이나 공공 제휴 서비스가 아닙니다.',
  },
  places: {
    eyebrow: 'LOCAL PLACES',
    title: '장소 탐색은 로컬 큐레이션부터 신중하게 준비하고 있습니다.',
    description:
      '명소, 식당, 카페, 숙소를 한 화면에서 찾을 수 있도록 설계 중입니다. 지금은 먼저 여행 흐름과 지역 혜택 구조를 살펴보는 편이 가장 정확합니다.',
    actions: [
      {
        label: '추천 코스 보기',
        description: '대표 장소들이 어떤 순서로 이어지는지 먼저 확인합니다.',
        targetId: 'courses',
      },
      {
        label: '지역 혜택 구조 보기',
        description: '매장 정보와 여행 혜택이 어떻게 연결될지 확인합니다.',
        targetId: 'benefits',
      },
    ],
    upcoming: '장소 필터, 지도 기반 탐색, 운영 시간 검증은 이후 단계에서 추가합니다.',
  },
  contact: {
    eyebrow: 'CONTACT',
    title: '문의 창구는 아직 열리지 않았지만 준비 방향은 공개되어 있습니다.',
    description:
      '여행자 문의와 지역 업체 제휴 문의를 분리해 안내할 계획입니다. 운영 범위가 확정되기 전까지는 오해가 없도록 준비 상태만 먼저 보여드립니다.',
    actions: [
      {
        label: '제휴 안내 보기',
        description: '지역 업체와 연결하려는 현재 방향을 확인합니다.',
        targetId: 'partner',
      },
      {
        label: '혜택 준비 보기',
        description: '결제·혜택 정보가 공식 연동 없이 어떻게 안내될지 살펴봅니다.',
        targetId: 'benefits',
      },
    ],
    upcoming: '문의 유형별 접수 방식과 답변 기준이 정리되면 별도 창구를 열 예정입니다.',
    note: '현재는 공식 고객센터나 행정기관 문의 채널을 대체하지 않습니다.',
  },
  partner: {
    eyebrow: 'WITH LOCAL',
    title: '제휴 신청은 준비 중이며 소개 기준부터 먼저 다듬고 있습니다.',
    description:
      '숙소, 식당, 카페, 체험 업체를 여행자와 연결하려면 정보 정확도와 소개 기준이 먼저 필요합니다. 현재는 운영 방향만 공개하고 있습니다.',
    actions: [
      {
        label: '지역 혜택 준비 보기',
        description: '매장 정보와 여행 혜택을 어떤 구조로 보여줄지 확인합니다.',
        targetId: 'benefits',
      },
      {
        label: '맨 위로 돌아가기',
        description: '전체 분위기와 핵심 메시지를 다시 확인합니다.',
        targetId: 'top',
      },
    ],
    upcoming: '제휴 신청 폼은 검수 기준과 운영 책임 범위가 정리된 뒤 공개합니다.',
    note: '현 단계에서는 공식 제휴 확정이나 결제 연동을 의미하지 않습니다.',
  },
}

function Icon({ name }: { name: IconName }) {
  return (
    <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
      {name === 'arrowLeft' && <path d="m15 18-6-6 6-6" />}
      {name === 'arrowRight' && <path d="m9 18 6-6-6-6" />}
      {name === 'home' && (
        <>
          <path d="m4.5 11 7.5-6 7.5 6" />
          <path d="M7 10v9h10v-9" />
        </>
      )}
      {name === 'route' && (
        <>
          <path d="M6 18c4-5.5 8-6.5 12-12" />
          <circle cx="6" cy="18" r="2.2" />
          <circle cx="18" cy="6" r="2.2" />
        </>
      )}
      {name === 'map' && (
        <>
          <path d="m4 7 5-2 6 2 5-2v12l-5 2-6-2-5 2V7Z" />
          <path d="M9 5v12M15 7v12" />
        </>
      )}
      {name === 'message' && (
        <>
          <path d="M5 6h14v10H9l-4 3V6Z" />
          <path d="M8.5 10h7M8.5 13h4.5" />
        </>
      )}
      {name === 'calendar' && (
        <>
          <rect x="4" y="5.5" width="16" height="14" rx="2" />
          <path d="M8 3.5v4M16 3.5v4M4 10h16" />
        </>
      )}
      {name === 'store' && (
        <>
          <path d="M5 10h14l-1.4-5H6.4L5 10Z" />
          <path d="M6.5 10v9h11v-9M9.5 19v-5h5v5" />
        </>
      )}
    </svg>
  )
}

function Header() {
  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="부여GO 홈">
        <span className="brand-seal">扶</span>
        <strong>부여GO</strong>
      </a>
      <nav className="desktop-nav" aria-label="주요 메뉴">
        <a href="#courses">추천 코스</a>
        <a href="#benefits">지역 혜택</a>
        <a href="#partner">파트너 안내</a>
      </nav>
      <span className="mvp-label">MVP</span>
    </header>
  )
}

function HeroSlider({
  onNavigate,
  onOpenPanel,
}: {
  onNavigate: (targetId: PanelAction['targetId']) => void
  onOpenPanel: (panel: PanelKey) => void
}) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (isPaused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined
    }

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length)
    }, 6000)

    return () => window.clearInterval(timer)
  }, [isPaused])

  const move = (direction: number) => {
    setActiveIndex((current) => (current + direction + slides.length) % slides.length)
  }

  return (
    <section
      className="hero-slider"
      id="top"
      aria-roledescription="carousel"
      aria-label="부여 대표 풍경"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <Header />
      <div className="slides">
        {slides.map((slide, index) => (
          <article
            className={`slide ${index === activeIndex ? 'is-active' : ''}`}
            key={slide.location}
            aria-hidden={index !== activeIndex}
          >
            <img
              src={slide.image}
              alt={index === activeIndex ? slide.imageAlt : ''}
              style={{ objectPosition: slide.objectPosition }}
              loading={index === 0 ? 'eager' : 'lazy'}
            />
            <div className="slide-shade" />
          </article>
        ))}
      </div>

      <div className="hero-inner">
        <div className="hero-copy-block" key={activeIndex}>
          <p className="hero-kicker">오늘, 부여</p>
          <h1>
            {slides[activeIndex].title.split('\n').map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h1>
          <p className="hero-description">{slides[activeIndex].subtitle}</p>
          <div className="hero-actions">
            <button className="button button-primary" type="button" onClick={() => onNavigate('courses')}>
              여행 코스 보기
              <Icon name="arrowRight" />
            </button>
            <button className="button button-ghost" type="button" onClick={() => onOpenPanel('reservation')}>
              예약 문의 준비중
            </button>
          </div>
        </div>
      </div>

      <div className="slider-footer">
        <div className="slide-location">
          <span>{String(activeIndex + 1).padStart(2, '0')}</span>
          <strong>{slides[activeIndex].location}</strong>
        </div>
        <div className="slider-controls">
          <button type="button" onClick={() => move(-1)} aria-label="이전 풍경">
            <Icon name="arrowLeft" />
          </button>
          <div className="slide-dots" aria-label="슬라이드 선택">
            {slides.map((slide, index) => (
              <button
                type="button"
                className={index === activeIndex ? 'is-active' : ''}
                key={slide.location}
                onClick={() => setActiveIndex(index)}
                aria-label={`${slide.location} 슬라이드`}
                aria-current={index === activeIndex}
              />
            ))}
          </div>
          <button type="button" onClick={() => move(1)} aria-label="다음 풍경">
            <Icon name="arrowRight" />
          </button>
        </div>
        <small>{slides[activeIndex].credit}</small>
      </div>
    </section>
  )
}

function ServiceMenu({
  onNavigate,
  onOpenPanel,
}: {
  onNavigate: (targetId: PanelAction['targetId']) => void
  onOpenPanel: (panel: PanelKey) => void
}) {
  return (
    <section className="service-menu" aria-label="부여GO 주요 서비스">
      <div className="content-width service-grid">
        {services.map((service) => (
          <button
            type="button"
            key={service.title}
            onClick={() => {
              if (service.icon === 'route') {
                onNavigate('courses')
                return
              }

              onOpenPanel(service.icon === 'map' ? 'places' : 'reservation')
            }}
          >
            <span className="service-icon"><Icon name={service.icon} /></span>
            <span>
              <strong>{service.title}</strong>
              <small>{service.description}</small>
            </span>
            <Icon name="arrowRight" />
          </button>
        ))}
      </div>
    </section>
  )
}

function CourseSection({ onOpenPanel }: { onOpenPanel: (panel: PanelKey) => void }) {
  return (
    <section className="section course-section" id="courses">
      <div className="content-width">
        <div className="section-heading">
          <div>
            <p className="eyebrow">추천 여행</p>
            <h2>어떤 부여를 만나고 싶나요?</h2>
          </div>
          <p>처음 방문해도 어렵지 않도록 여행의 흐름부터 정리하고 있습니다.</p>
        </div>
        <div className="course-grid">
          {courses.map((course) => (
            <article className="course-card" key={course.title}>
              <div className="course-image">
                <img src={course.image} alt={course.imageAlt} style={{ objectPosition: course.position }} />
                <div className="tag-list">
                  {course.tags.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
              </div>
              <div className="course-body">
                <h3>{course.title}</h3>
                <p>{course.description}</p>
                <div className="route-line"><Icon name="route" /> {course.route}</div>
                <button type="button" onClick={() => onOpenPanel('course')}>
                  코스 미리보기 <Icon name="arrowRight" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function BenefitsSection() {
  return (
    <section className="section benefits-section" id="benefits">
      <div className="content-width benefits-layout">
        <div className="benefits-copy">
          <p className="eyebrow">지역 혜택 준비</p>
          <h2>여행과 지역을 자연스럽게 잇는 방법</h2>
          <p>
            굿뜨래페이 사용 가능 매장과 지역 혜택 정보를 한눈에 확인할 수 있도록
            준비하고 있습니다.
          </p>
          <div className="legal-notice">
            현재는 공식 협의 전 단계이며 결제 및 공식 연동 기능을 제공하지 않습니다.
          </div>
        </div>
        <div className="benefit-list">
          <div><Icon name="store" /><span><strong>로컬 매장</strong><small>사용 가능 매장 정보</small></span></div>
          <div><Icon name="calendar" /><span><strong>여행 혜택</strong><small>시기별 지역 혜택 안내</small></span></div>
          <div><Icon name="message" /><span><strong>제휴 문의</strong><small>지역 업체 신청 창구</small></span></div>
        </div>
      </div>
    </section>
  )
}

function PartnerSection({ onOpenPanel }: { onOpenPanel: (panel: PanelKey) => void }) {
  return (
    <section className="partner-section" id="partner">
      <img src="/buyeo-assets/slide-busosanseong.jpg" alt="낙화암에서 본 백마강" />
      <div className="partner-overlay" />
      <div className="content-width partner-content">
        <p className="eyebrow">WITH LOCAL</p>
        <h2>부여의 좋은 가게와 경험을<br />함께 소개하고 싶습니다.</h2>
        <p>숙소, 식당, 카페, 체험 업체를 여행자와 연결할 준비를 하고 있습니다.</p>
        <button className="button button-light" type="button" onClick={() => onOpenPanel('partner')}>
          제휴 신청 준비중 <Icon name="arrowRight" />
        </button>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="content-width footer-main">
        <div>
          <strong className="footer-brand">부여GO</strong>
          <p>부여 여행을 더 쉽게 만들기 위한 개인 프로젝트 MVP</p>
        </div>
        <div className="footer-links">
          <span>공식 관광·결제 서비스가 아닙니다.</span>
          <span>정보는 검증 후 순차적으로 업데이트됩니다.</span>
        </div>
      </div>
      <div className="content-width photo-credits">
        <strong>PHOTO CREDITS</strong>
        <p>
          Gungnamji 011, Baekje Cultural Land 029 — travel oriented, CC BY-SA 2.0 ·
          Nakwaam rock 1 — Frankhöffner, CC BY-SA 3.0 ·
          Jeongnimsa Temple 03 — Bernard Gagnon, CC0 1.0.
          Wikimedia Commons 원본을 웹 크기에 맞춰 축소했습니다.
        </p>
      </div>
    </footer>
  )
}

function BottomNavigation({ onOpenPanel }: { onOpenPanel: (panel: PanelKey) => void }) {
  return (
    <nav className="bottom-nav" aria-label="모바일 주요 메뉴">
      <a href="#top" aria-current="page"><Icon name="home" /><span>홈</span></a>
      <a href="#courses"><Icon name="route" /><span>코스</span></a>
      <button type="button" onClick={() => onOpenPanel('places')}><Icon name="map" /><span>장소</span></button>
      <button type="button" onClick={() => onOpenPanel('contact')}><Icon name="message" /><span>문의</span></button>
    </nav>
  )
}

function ExperiencePanel({
  panelKey,
  onClose,
  onNavigate,
}: {
  panelKey: PanelKey | null
  onClose: () => void
  onNavigate: (targetId: PanelAction['targetId']) => void
}) {
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!panelKey) {
      return undefined
    }

    const previousOverflow = document.body.style.overflow
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)
    closeButtonRef.current?.focus()

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose, panelKey])

  if (!panelKey) {
    return null
  }

  const panel = panelContent[panelKey]

  return (
    <div className="experience-panel-backdrop" onClick={onClose}>
      <section
        className="experience-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="experience-panel-title"
        aria-describedby="experience-panel-description"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="experience-panel-shell">
          <p className="panel-eyebrow">{panel.eyebrow}</p>
          <button
            className="panel-close"
            type="button"
            onClick={onClose}
            aria-label="안내 패널 닫기"
            ref={closeButtonRef}
          >
            닫기
          </button>
          <h2 id="experience-panel-title">{panel.title}</h2>
          <p className="panel-description" id="experience-panel-description">
            {panel.description}
          </p>

          <div className="panel-action-group">
            {panel.actions.map((action) => (
              <button
                className="panel-action-card"
                type="button"
                key={action.label}
                onClick={() => onNavigate(action.targetId)}
              >
                <span>
                  <strong>{action.label}</strong>
                  <small>{action.description}</small>
                </span>
                <Icon name="arrowRight" />
              </button>
            ))}
          </div>

          <div className="panel-meta">
            <strong>다음 단계</strong>
            <p>{panel.upcoming}</p>
          </div>

          {panel.note && <p className="panel-note">{panel.note}</p>}
        </div>
      </section>
    </div>
  )
}

function App() {
  const [activePanel, setActivePanel] = useState<PanelKey | null>(null)

  const handleNavigate = (targetId: PanelAction['targetId']) => {
    setActivePanel(null)

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    document.getElementById(targetId)?.scrollIntoView({
      behavior: reduceMotion ? 'auto' : 'smooth',
      block: 'start',
    })
  }

  return (
    <main>
      <HeroSlider onNavigate={handleNavigate} onOpenPanel={setActivePanel} />
      <ServiceMenu onNavigate={handleNavigate} onOpenPanel={setActivePanel} />
      <CourseSection onOpenPanel={setActivePanel} />
      <BenefitsSection />
      <PartnerSection onOpenPanel={setActivePanel} />
      <Footer />
      <BottomNavigation onOpenPanel={setActivePanel} />
      <ExperiencePanel
        panelKey={activePanel}
        onClose={() => setActivePanel(null)}
        onNavigate={handleNavigate}
      />
    </main>
  )
}

export default App
