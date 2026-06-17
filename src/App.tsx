import './App.css'

type ValueCardProps = {
  index: string
  title: string
  description: string
  icon: IconName
}

type CoursePreviewCardProps = {
  title: string
  description: string
  tags: string[]
  places: string
  image: string
  imageAlt: string
}

type IconName =
  | 'route'
  | 'map'
  | 'message'
  | 'coin'
  | 'store'
  | 'handshake'
  | 'home'
  | 'leaf'

const values: ValueCardProps[] = [
  {
    index: '01',
    title: '코스 추천',
    description:
      '당일치기, 1박2일, 가족 여행처럼 상황에 맞는 부여 여행 코스를 준비합니다.',
    icon: 'route',
  },
  {
    index: '02',
    title: '로컬 장소',
    description:
      '궁남지, 정림사지, 부소산성 같은 대표 명소부터 맛집, 카페, 숙소까지 정리합니다.',
    icon: 'map',
  },
  {
    index: '03',
    title: '예약 문의',
    description:
      '추후 숙소, 체험, 로컬 투어 문의를 간단히 남길 수 있도록 확장합니다.',
    icon: 'message',
  },
]

const courses: CoursePreviewCardProps[] = [
  {
    title: '부여 처음이면 이 코스',
    description: '백제의 시간과 대표 명소를 차분히 잇는 첫 방문 추천 흐름입니다.',
    tags: ['첫 방문', '역사', '부모님'],
    places: '궁남지 -> 국립부여박물관 -> 정림사지 -> 부소산성',
    image: '/buyeo-assets/gungnamji-hero.jpg',
    imageAlt: '부여 궁남지사계 공식 관광 이미지',
  },
  {
    title: '커플 감성 코스',
    description: '산책과 사진, 카페 시간을 여유롭게 넣은 감성형 하루 코스입니다.',
    tags: ['산책', '사진', '카페'],
    places: '궁남지 -> 감성 카페 -> 성흥산 사랑나무 -> 저녁 맛집',
    image: '/buyeo-assets/love-tree-hero.jpg',
    imageAlt: '부여 성흥산 사랑나무 공식 관광 이미지',
  },
  {
    title: '가족 여행 코스',
    description: '아이와 함께 보고 배우기 좋은 장소를 중심으로 구성할 예정입니다.',
    tags: ['아이와 함께', '주말', '체험'],
    places: '백제문화단지 -> 국립부여박물관 -> 궁남지 -> 숙소',
    image: '/buyeo-assets/baekje-complex.jpg',
    imageAlt: '부여 백제문화단지 공식 관광 이미지',
  },
]

const benefitItems = [
  { label: '사용 가능 매장 표시', icon: 'store' },
  { label: '지역 혜택 안내', icon: 'coin' },
  { label: '제휴 매장 신청', icon: 'handshake' },
  { label: '공식 협의 후 연동 검토', icon: 'leaf' },
] satisfies Array<{ label: string; icon: IconName }>

const heroMarks = [
  '백제의 결',
  '강과 연꽃',
  '로컬 코스',
]

function showReadyMessage(message: string) {
  window.alert(message)
}

function Icon({ name }: { name: IconName }) {
  return (
    <svg className="app-icon" viewBox="0 0 24 24" aria-hidden="true">
      {name === 'route' && (
        <>
          <path d="M6 18c3.8-5.3 8.2-6.7 12-12" />
          <circle cx="6" cy="18" r="2.4" />
          <circle cx="18" cy="6" r="2.4" />
        </>
      )}
      {name === 'map' && (
        <>
          <path d="M4.5 7.2 9 5l6 2.2 4.5-2.2v11.8L15 19l-6-2.2-4.5 2.2V7.2Z" />
          <path d="M9 5v11.8M15 7.2V19" />
        </>
      )}
      {name === 'message' && (
        <>
          <path d="M5 6.5h14v9.2H9.4L5 19.2V6.5Z" />
          <path d="M8.3 10h7.4M8.3 13h4.8" />
        </>
      )}
      {name === 'coin' && (
        <>
          <circle cx="12" cy="12" r="7.4" />
          <path d="M9.2 10.1c.6-1 1.5-1.5 2.8-1.5 1.9 0 3 1 3 2.4 0 1.8-1.6 2.4-3 2.4-1.9 0-3 .7-3 2h6" />
        </>
      )}
      {name === 'store' && (
        <>
          <path d="M5 10.5h14l-1.2-5H6.2L5 10.5Z" />
          <path d="M6.5 10.5v7.8h11v-7.8M9.4 18.3v-4.7h5.2v4.7" />
        </>
      )}
      {name === 'handshake' && (
        <>
          <path d="M8.2 12.4 11 9.7a2.4 2.4 0 0 1 3.3 0l1.5 1.4" />
          <path d="m5 12.2 4.9 4.6a2 2 0 0 0 2.7 0l5.9-5.4" />
          <path d="m16.5 8.2 2.6 2.7M4.9 10.9l2.7-2.7" />
        </>
      )}
      {name === 'home' && (
        <>
          <path d="M4.8 11.4 12 5.3l7.2 6.1" />
          <path d="M7.1 10.2v8.1h9.8v-8.1" />
        </>
      )}
      {name === 'leaf' && (
        <>
          <path d="M18.6 5.4C11 5.2 6.4 9.2 6.2 16.6c7.3.2 11.3-4.5 12.4-11.2Z" />
          <path d="M6.4 16.4c3.1-3.3 6.1-5.6 9.7-7.3" />
        </>
      )}
    </svg>
  )
}

function Header() {
  const scrollToCourses = () => {
    document.getElementById('course-preview')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="부여GO 홈">
        <span className="brand-symbol">扶</span>
        <span>
          <strong>부여GO</strong>
          <small>Buyeo travel concierge</small>
        </span>
      </a>
      <nav className="desktop-nav" aria-label="랜딩 섹션">
        <button type="button" onClick={scrollToCourses}>
          코스
        </button>
        <a href="#benefits">혜택 준비</a>
        <a href="#partner">제휴 안내</a>
      </nav>
      <span className="status-badge">MVP 준비중</span>
    </header>
  )
}

function HeroSection() {
  const scrollToCourses = () => {
    document.getElementById('course-preview')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  return (
    <section className="hero-section" id="top">
      <Header />
      <div className="hero-content">
        <div className="hero-copy-wrap">
          <p className="section-eyebrow">백제의 도시, 부여를 더 쉽게</p>
          <h1>
            <span>부여 여행,</span>
            <span>어디부터 가야 할지</span>
            <span>모르겠다면</span>
          </h1>
          <p className="hero-subtitle">
            <span>하루 코스부터 예약 문의까지,</span>
            <span>부여GO에서 쉽게 시작하세요.</span>
          </p>
          <p className="hero-copy">
            <span>백제의 도시 부여를 처음 오는 사람도 쉽게 둘러볼 수 있도록</span>
            <span>여행 코스, 로컬 장소, 예약 문의를 한 곳에 모으고 있습니다.</span>
          </p>
          <div className="hero-actions">
            <button className="primary-button" type="button" onClick={scrollToCourses}>
              <Icon name="route" />
              추천 코스 미리보기
            </button>
            <button
              className="ghost-button"
              type="button"
              onClick={() => showReadyMessage('예약 문의 기능은 곧 추가될 예정입니다.')}
            >
              <Icon name="message" />
              예약 문의 준비중
            </button>
          </div>
          <div className="hero-mark-row" aria-label="부여GO 키워드">
            {heroMarks.map((mark) => (
              <span key={mark}>{mark}</span>
            ))}
          </div>
        </div>
        <aside className="hero-panel" aria-label="부여GO 준비 기능">
          <span>오늘의 무드</span>
          <strong>백마강을 따라</strong>
          <p>
            <span>첫 화면은 부여의 절경을 크게 보여주고,</span>
            <span>기능은 MVP 범위 안에서 차분히 안내합니다.</span>
          </p>
        </aside>
      </div>
      <p className="hero-credit">
        사진 출처: 부여군 문화관광 공식 사이트 / 백마강 수상관광
      </p>
    </section>
  )
}

function ValueCard({ index, title, description, icon }: ValueCardProps) {
  return (
    <article className="value-card">
      <div className="value-card-top">
        <span>{index}</span>
        <span className="icon-badge">
          <Icon name={icon} />
        </span>
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
    </article>
  )
}

function CoursePreviewCard({
  title,
  description,
  tags,
  places,
  image,
  imageAlt,
}: CoursePreviewCardProps) {
  return (
    <article className="course-card">
      <img src={image} alt={imageAlt} />
      <div className="course-card-body">
        <div className="tag-row" aria-label={`${title} 태그`}>
          {tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <h3>{title}</h3>
        <p>{description}</p>
        <div className="place-flow">{places}</div>
        <button
          className="text-button"
          type="button"
          onClick={() => showReadyMessage('코스 상세 페이지는 다음 단계에서 추가될 예정입니다.')}
        >
          자세히 보기 준비중
        </button>
      </div>
    </article>
  )
}

function GoodtraeNotice() {
  return (
    <section className="notice-section section-band" id="benefits">
      <div className="section-inner split-layout">
        <div>
          <p className="section-eyebrow">지역 혜택 준비</p>
          <h2>굿뜨래페이·지역 혜택은 준비중</h2>
        </div>
        <div className="notice-copy">
          <p>
            <span>부여GO는 향후 굿뜨래페이 사용 가능 매장 정보와</span>
            <span>지역 혜택 안내를 제공할 수 있도록 준비하고 있습니다.</span>
          </p>
          <p className="caution-note">
            <span>현재는 공식 협의 전 단계이므로</span>
            <span>결제 기능이나 공식 연동 기능은 제공하지 않습니다.</span>
          </p>
          <ul className="benefit-list">
            {benefitItems.map((item) => (
              <li key={item.label}>
                <Icon name={item.icon} />
                {item.label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

function PartnerNotice() {
  return (
    <section className="partner-section section-band" id="partner">
      <div className="section-inner partner-panel">
        <span className="partner-icon">
          <Icon name="handshake" />
        </span>
        <p className="section-eyebrow">로컬 파트너</p>
        <h2>부여의 가게와 체험을 소개할 준비도 하고 있어요</h2>
        <p>
          <span>숙소, 식당, 카페, 체험 업체를 부여GO에 소개하고</span>
          <span>예약 문의까지 연결할 수 있도록 확장할 예정입니다.</span>
        </p>
        <button
          className="primary-button"
          type="button"
          onClick={() => showReadyMessage('제휴 신청 기능은 다음 단계에서 추가될 예정입니다.')}
        >
          <Icon name="store" />
          제휴 신청 준비중
        </button>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="app-footer">
      <div className="section-inner footer-grid">
        <div>
          <strong>부여GO</strong>
          <p>부여GO는 부여 여행을 더 쉽게 만들기 위한 개인 프로젝트 MVP입니다.</p>
          <small>
            공식 관광/결제 서비스가 아니며, 정보는 순차적으로 검증 후 업데이트할
            예정입니다.
          </small>
        </div>
        <div className="legal-copy">
          <p>
            사진 및 관광지 기초 정보 출처: 부여군 문화관광 공식 사이트
            (www.buyeo.go.kr/html/tour/). 사용한 관광 상세 이미지에는 공공누리
            제3유형(출처표시+변경금지) 고지가 표시되어 있으며, 실제 배포 전
            저작권정책 및 이용 가능 범위를 재확인해야 합니다.
          </p>
          <p>
            부여GO는 굿뜨래페이, 부여군, 공식 관광 서비스와 제휴·연동된 서비스가
            아니며 결제, 예약 확정, 공식 민원 처리를 제공하지 않습니다.
          </p>
        </div>
      </div>
    </footer>
  )
}

function BottomNavigation() {
  return (
    <nav className="bottom-nav" aria-label="준비중인 주요 메뉴">
      <button type="button" aria-current="page">
        <Icon name="home" />
        홈
      </button>
      <button type="button" onClick={() => showReadyMessage('코스 기능은 곧 추가될 예정입니다.')}>
        <Icon name="route" />
        코스
      </button>
      <button type="button" onClick={() => showReadyMessage('장소 기능은 곧 추가될 예정입니다.')}>
        <Icon name="map" />
        장소
      </button>
      <button type="button" onClick={() => showReadyMessage('문의 기능은 곧 추가될 예정입니다.')}>
        <Icon name="message" />
        문의
      </button>
    </nav>
  )
}

function App() {
  return (
    <main className="page-shell">
      <HeroSection />

      <section className="content-section">
        <div className="section-inner">
          <p className="section-eyebrow">서비스 방향</p>
          <h2>부여 여행을 쉽게 시작하는 세 가지 방법</h2>
          <div className="value-grid">
            {values.map((value) => (
              <ValueCard key={value.title} {...value} />
            ))}
          </div>
        </div>
      </section>

      <section className="content-section course-section" id="course-preview">
        <div className="section-inner">
          <div className="section-heading-row">
            <div>
              <p className="section-eyebrow">추천 코스 미리보기</p>
              <h2>
                <span>처음 오는 사람도</span>
                <span>고르기 쉬운 부여 코스</span>
              </h2>
            </div>
            <p>
              <span>실제 상세 페이지는 다음 단계에서 추가하고,</span>
              <span>지금은 부여GO가 준비하는 여행 경험을 먼저 보여줍니다.</span>
            </p>
          </div>
          <div className="course-list">
            {courses.map((course) => (
              <CoursePreviewCard key={course.title} {...course} />
            ))}
          </div>
        </div>
      </section>

      <GoodtraeNotice />
      <PartnerNotice />
      <Footer />
      <BottomNavigation />
    </main>
  )
}

export default App
