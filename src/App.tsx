import { useEffect, useState } from 'react'
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

function HeroSlider() {
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
            <button
              className="button button-primary"
              type="button"
              onClick={() => document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' })}
            >
              여행 코스 보기
              <Icon name="arrowRight" />
            </button>
            <button
              className="button button-ghost"
              type="button"
              onClick={() => window.alert('예약 문의 기능은 다음 단계에서 추가될 예정입니다.')}
            >
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

function ServiceMenu() {
  return (
    <section className="service-menu" aria-label="부여GO 주요 서비스">
      <div className="content-width service-grid">
        {services.map((service) => (
          <button
            type="button"
            key={service.title}
            onClick={() => window.alert(`${service.title} 기능은 준비중입니다.`)}
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

function CourseSection() {
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
                <button
                  type="button"
                  onClick={() => window.alert('코스 상세 페이지는 다음 단계에서 추가될 예정입니다.')}
                >
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

function PartnerSection() {
  return (
    <section className="partner-section" id="partner">
      <img src="/buyeo-assets/slide-busosanseong.jpg" alt="낙화암에서 본 백마강" />
      <div className="partner-overlay" />
      <div className="content-width partner-content">
        <p className="eyebrow">WITH LOCAL</p>
        <h2>부여의 좋은 가게와 경험을<br />함께 소개하고 싶습니다.</h2>
        <p>숙소, 식당, 카페, 체험 업체를 여행자와 연결할 준비를 하고 있습니다.</p>
        <button
          className="button button-light"
          type="button"
          onClick={() => window.alert('제휴 신청 기능은 다음 단계에서 추가될 예정입니다.')}
        >
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

function BottomNavigation() {
  return (
    <nav className="bottom-nav" aria-label="모바일 주요 메뉴">
      <a href="#top" aria-current="page"><Icon name="home" /><span>홈</span></a>
      <a href="#courses"><Icon name="route" /><span>코스</span></a>
      <button type="button" onClick={() => window.alert('장소 기능은 준비중입니다.')}><Icon name="map" /><span>장소</span></button>
      <button type="button" onClick={() => window.alert('문의 기능은 준비중입니다.')}><Icon name="message" /><span>문의</span></button>
    </nav>
  )
}

function App() {
  return (
    <main>
      <HeroSlider />
      <ServiceMenu />
      <CourseSection />
      <BenefitsSection />
      <PartnerSection />
      <Footer />
      <BottomNavigation />
    </main>
  )
}

export default App
