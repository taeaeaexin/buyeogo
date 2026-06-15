import './App.css'

type ValueCardProps = {
  title: string
  description: string
}

type CoursePreviewCardProps = {
  title: string
  description: string
  tags: string[]
  places: string
}

const values: ValueCardProps[] = [
  {
    title: '코스 추천',
    description:
      '당일치기, 1박2일, 가족 여행처럼 상황에 맞는 부여 여행 코스를 준비합니다.',
  },
  {
    title: '로컬 장소',
    description:
      '궁남지, 정림사지, 부소산성 같은 대표 명소부터 맛집, 카페, 숙소까지 정리합니다.',
  },
  {
    title: '예약 문의',
    description:
      '추후 숙소, 체험, 로컬 투어 문의를 간단히 남길 수 있도록 확장합니다.',
  },
]

const courses: CoursePreviewCardProps[] = [
  {
    title: '부여 처음이면 이 코스',
    description: '처음 방문하는 여행자가 부여의 핵심 명소를 차분히 만나는 일정입니다.',
    tags: ['첫 방문', '역사', '부모님'],
    places: '궁남지 -> 국립부여박물관 -> 정림사지 -> 부소산성',
  },
  {
    title: '커플 감성 코스',
    description: '산책, 사진, 카페 시간을 넉넉히 담은 가벼운 하루 코스입니다.',
    tags: ['산책', '사진', '카페'],
    places: '궁남지 -> 감성 카페 -> 성흥산 사랑나무 -> 저녁 맛집',
  },
  {
    title: '가족 여행 코스',
    description: '아이와 함께 배우고 쉬어가기 좋은 주말형 가족 여행 흐름입니다.',
    tags: ['아이와 함께', '주말', '체험'],
    places: '백제문화단지 -> 국립부여박물관 -> 궁남지 -> 숙소',
  },
]

const benefitItems = [
  '사용 가능 매장 표시',
  '지역 혜택 안내',
  '제휴 매장 신청',
  '공식 협의 후 연동 검토',
]

function showReadyMessage(message: string) {
  window.alert(message)
}

function Header() {
  return (
    <header className="app-header">
      <div className="brand-mark" aria-hidden="true">
        GO
      </div>
      <div>
        <p className="brand-kicker">백제의 도시를 가볍게</p>
        <h1>부여GO</h1>
      </div>
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
    <section className="hero-section">
      <div className="hero-visual" aria-hidden="true">
        <span className="sun-disc" />
        <span className="river-line" />
        <span className="temple-shape" />
      </div>
      <p className="section-eyebrow">Buyeo travel MVP</p>
      <h2>부여 여행, 어디부터 가야 할지 모르겠다면</h2>
      <p className="hero-subtitle">
        하루 코스부터 예약 문의까지, 부여GO에서 쉽게 시작하세요.
      </p>
      <p className="hero-copy">
        백제의 도시 부여를 처음 오는 사람도 쉽게 둘러볼 수 있도록 여행 코스, 로컬
        장소, 예약 문의를 한 곳에 모으고 있습니다.
      </p>
      <div className="hero-actions">
        <button className="primary-button" type="button" onClick={scrollToCourses}>
          추천 코스 미리보기
        </button>
        <button
          className="secondary-button"
          type="button"
          onClick={() => showReadyMessage('예약 문의 기능은 곧 추가될 예정입니다.')}
        >
          예약 문의 준비중
        </button>
      </div>
    </section>
  )
}

function ValueCard({ title, description }: ValueCardProps) {
  return (
    <article className="value-card">
      <span className="card-dot" aria-hidden="true" />
      <h3>{title}</h3>
      <p>{description}</p>
    </article>
  )
}

function CoursePreviewCard({ title, description, tags, places }: CoursePreviewCardProps) {
  return (
    <article className="course-card">
      <div className="course-card-header">
        <h3>{title}</h3>
        <div className="tag-row" aria-label={`${title} 태그`}>
          {tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </div>
      <p>{description}</p>
      <div className="place-flow">{places}</div>
      <button
        className="text-button"
        type="button"
        onClick={() => showReadyMessage('코스 상세 페이지는 다음 단계에서 추가될 예정입니다.')}
      >
        자세히 보기 준비중
      </button>
    </article>
  )
}

function GoodtraeNotice() {
  return (
    <section className="notice-section">
      <p className="section-eyebrow">지역 혜택</p>
      <h2>굿뜨래페이·지역 혜택은 준비중</h2>
      <p>
        부여GO는 향후 굿뜨래페이 사용 가능 매장 정보와 지역 혜택 안내를 제공할 수
        있도록 준비하고 있습니다.
      </p>
      <p className="caution-note">
        현재는 공식 협의 전 단계이므로 결제 기능이나 공식 연동 기능은 제공하지
        않습니다.
      </p>
      <ul className="benefit-list">
        {benefitItems.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  )
}

function PartnerNotice() {
  return (
    <section className="partner-section">
      <p className="section-eyebrow">로컬 파트너</p>
      <h2>부여의 가게와 체험을 소개할 준비도 하고 있어요</h2>
      <p>
        숙소, 식당, 카페, 체험 업체를 부여GO에 소개하고 예약 문의까지 연결할 수
        있도록 확장할 예정입니다.
      </p>
      <button
        className="primary-button"
        type="button"
        onClick={() => showReadyMessage('제휴 신청 기능은 다음 단계에서 추가될 예정입니다.')}
      >
        제휴 신청 준비중
      </button>
    </section>
  )
}

function Footer() {
  return (
    <footer className="app-footer">
      <p>부여GO는 부여 여행을 더 쉽게 만들기 위한 개인 프로젝트 MVP입니다.</p>
      <small>
        공식 관광/결제 서비스가 아니며, 정보는 순차적으로 검증 후 업데이트할
        예정입니다.
      </small>
    </footer>
  )
}

function BottomNavigation() {
  return (
    <nav className="bottom-nav" aria-label="준비중인 주요 메뉴">
      <button type="button" aria-current="page">
        <span aria-hidden="true">⌂</span>
        홈
      </button>
      <button type="button" onClick={() => showReadyMessage('코스 기능은 곧 추가될 예정입니다.')}>
        <span aria-hidden="true">◇</span>
        코스
      </button>
      <button type="button" onClick={() => showReadyMessage('장소 기능은 곧 추가될 예정입니다.')}>
        <span aria-hidden="true">◎</span>
        장소
      </button>
      <button type="button" onClick={() => showReadyMessage('문의 기능은 곧 추가될 예정입니다.')}>
        <span aria-hidden="true">✉</span>
        문의
      </button>
    </nav>
  )
}

function App() {
  return (
    <main className="page-shell">
      <div className="phone-frame">
        <Header />
        <HeroSection />

        <section className="content-section">
          <p className="section-eyebrow">서비스 방향</p>
          <h2>부여 여행을 쉽게 시작하는 세 가지 방법</h2>
          <div className="value-grid">
            {values.map((value) => (
              <ValueCard key={value.title} {...value} />
            ))}
          </div>
        </section>

        <section className="content-section" id="course-preview">
          <p className="section-eyebrow">추천 코스 미리보기</p>
          <h2>취향에 맞춰 고를 수 있는 부여 코스</h2>
          <div className="course-list">
            {courses.map((course) => (
              <CoursePreviewCard key={course.title} {...course} />
            ))}
          </div>
        </section>

        <GoodtraeNotice />
        <PartnerNotice />
        <Footer />
        <BottomNavigation />
      </div>
    </main>
  )
}

export default App
