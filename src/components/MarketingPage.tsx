import { useEffect, useState, type FormEvent } from 'react'
const LOGO = '/brand/philomena-peace-logo.png'
const services = [
  [
    'Federal & USAJOBS résumés',
    'Translate your experience into clear evidence aligned with the vacancy announcement. Federal résumé writing, application positioning, and USAJOBS guidance for your next opportunity.',
    'FEDERAL APPLICATIONS · USAJOBS',
  ],
  [
    'SES & executive applications',
    'Present your leadership with purpose through SES applications, executive biographies, and tailored narratives including ECQs, KSAs, TQs, and MTQs.',
    'SENIOR EXECUTIVES · LEADERSHIP NARRATIVES',
  ],
  [
    'Private sector résumés',
    'An achievement-led leadership story for your next promotion or career change, supported by tailored cover letters and networking résumés.',
    'EXECUTIVE POSITIONING · CAREER CHANGE',
  ],
  [
    'LinkedIn & personal branding',
    'Build a consistent professional presence with LinkedIn profile writing, social media profiles, online portfolios, and career marketing materials.',
    'LINKEDIN · VISIBILITY · PERSONAL BRAND',
  ],
  [
    'Military transitions',
    'Communicate military experience in language civilian employers understand. Bring your leadership, transferable skills, and next career direction into focus.',
    'MILITARY TO CIVILIAN · TRANSFERABLE SKILLS',
  ],
  [
    'Career coaching & mentoring',
    'Find right-fit opportunities, strengthen your job search, and prepare your next move with personal guidance, career education, and technology training.',
    'CAREER STRATEGY · COACHING · EDUCATION',
  ],
]
const certifications = [
  ['Magnetize Your Federal Résumé™ Certified Writer', 'Jan 2013'],
  ['Magnetize Your Federal Résumé™ Certified Coach', 'Mar 2013'],
  ['Magnetize Your USAJOBS™ Certified Coach', 'Mar 2013'],
  ['Magnetize Your Cover Letter™ Certified Writer', 'Feb 2013'],
  ['Magnetize Your Résumé™ Certified Coach', 'Apr 2013'],
  ['Magnetize Your Résumé™ Certified Writer', 'Apr 2013'],
  ['Certified Career Solutions Consultant™', 'Apr 2013'],
]
export function MarketingPage() {
  const [menu, setMenu] = useState(false)
  const [service, setService] = useState(services[0][0])
  const [state, setState] = useState('idle')
  useEffect(() => {
    const items = document.querySelectorAll<HTMLElement>('[data-reveal]')
    if (!('IntersectionObserver' in window)) {
      items.forEach((el) => el.classList.add('is-visible'))
      return
    }
    document.documentElement.classList.add('motion-ready')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
    )
    items.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (state === 'pending') return
    const body = new URLSearchParams()
    new FormData(event.currentTarget).forEach((v, k) =>
      body.append(k, String(v)),
    )
    setState('pending')
    try {
      const response = await fetch('/__forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
        signal: AbortSignal.timeout(15000),
      })
      if (!response.ok || /\bdata-netlify\s*=/i.test(await response.text()))
        throw new Error()
      setState('success')
    } catch {
      setState('error')
    }
  }
  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <header className="header">
        <a className="brand" href="#home">
          <img
            className="brand-logo"
            src={LOGO}
            alt="Philomena Peace Résumé Expert logo"
            width={83}
            height={83}
          />
          <span>
            PHILOMENA ANDREAS PEACE
            <small>EXECUTIVE DOCUMENTATION SPECIALIST</small>
          </span>
        </a>
        <button
          className="menu-toggle"
          onClick={() => setMenu(!menu)}
          aria-expanded={menu}
          aria-controls="navigation"
        >
          {menu ? 'Close' : 'Menu'} ☰
        </button>
        <nav
          id="navigation"
          className={menu ? 'open' : ''}
          aria-label="Main navigation"
        >
          {['Services', 'About', 'Portfolio', 'Credentials'].map((x) => (
            <a
              key={x}
              href={`#${x.toLowerCase()}`}
              onClick={() => setMenu(false)}
            >
              {x}
            </a>
          ))}
          <a className="nav-cta" href="#contact" onClick={() => setMenu(false)}>
            Let’s work together <span>↗</span>
          </a>
        </nav>
      </header>
      <main id="main">
        <section id="home" className="hero wrap">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="short-line" /> FEDERAL PRECISION. EXECUTIVE
              PRESENCE.
            </p>
            <h1 className="float-title">
              <span className="float-line">Your experience.</span>
              <span className="float-line">Your ambition.</span>
              <span className="float-line">
                <em>Expertly expressed.</em>
              </span>
            </h1>
            <p className="hero-description">
              Professional résumé writing for federal, SES, USAJOBS, and private
              sector opportunities. Strategic career documents and personal
              guidance for leaders ready for their next chapter.
            </p>
            <div className="hero-actions">
              <a className="button" href="#contact">
                Let’s shape your next move <span>↗</span>
              </a>
              <a className="text-link" href="#services">
                Explore services <span>↓</span>
              </a>
            </div>
            <div className="hero-credential">
              <img
                className="seal-logo"
                src={LOGO}
                alt=""
                width={83}
                height={83}
              />
              <div>
                Magnetize Your Federal Résumé™ Certified Writer
                <small>
                  With Philomena Andreas Peace, Senior Expert Résumé Writer
                </small>
              </div>
            </div>
          </div>
          <figure className="hero-art executive-art">
            <div className="art-grid" aria-hidden="true" />
            <figcaption className="art-caption">
              THE ANATOMY OF EXECUTIVE PRESENCE
            </figcaption>
            <div
              className="resume-sheet"
              role="img"
              aria-label="Illustrative executive résumé with a leadership profile, strategic expertise, and professional experience. Sample layout only."
            >
              <div className="resume-header">
                <span>YOUR NAME</span>
                <small>EXECUTIVE LEADERSHIP · STRATEGY · IMPACT</small>
              </div>
              <div className="resume-body">
                <p className="resume-kicker">LEADERSHIP PROFILE</p>
                <p className="resume-summary">
                  A clear vision.
                  <br />A distinctive leadership story.
                </p>
                <div className="resume-lines">
                  <i />
                  <i />
                  <i />
                </div>
                <p className="resume-kicker">STRATEGIC EXPERTISE</p>
                <div className="resume-skills">
                  <span>Strategy & vision</span>
                  <span>Organizational leadership</span>
                  <span>Transformation</span>
                  <span>Stakeholder engagement</span>
                </div>
                <p className="resume-kicker">PROFESSIONAL EXPERIENCE</p>
                <strong className="resume-position">
                  Executive leadership
                </strong>
                <div className="resume-lines">
                  <i />
                  <i />
                  <i />
                </div>
                <strong className="resume-position">
                  Selected contributions
                </strong>
                <div className="resume-lines">
                  <i />
                  <i />
                </div>
                <div className="resume-footer">
                  ILLUSTRATIVE RÉSUMÉ <span>01</span>
                </div>
              </div>
            </div>
            <div className="art-stamp">
              <span>Purpose in every word.</span>
              <small>Clarity. Credibility. Direction.</small>
            </div>
          </figure>
        </section>
        <div className="trust-strip">
          <span>BUILT FOR YOUR NEXT LEVEL</span>
          <span>Federal & SES expertise</span>
          <b aria-hidden="true" />
          <span>USAJOBS strategy</span>
          <b aria-hidden="true" />
          <span>25+ years of client support</span>
          <b aria-hidden="true" />
          <span>One-to-one collaboration</span>
        </div>
        <section id="services" className="services wrap section">
          <div className="section-heading" data-reveal>
            <div>
              <p className="eyebrow">
                PURPOSEFUL WORDS. POWERFUL POSSIBILITIES.
              </p>
              <h2>
                The right support.
                <br />
                <em>For your next move.</em>
              </h2>
            </div>
            <p>
              Your ambition is unique. Your documents should be too. Thoughtful,
              tailored writing for every stage of your leadership journey.
            </p>
          </div>
          <div className="service-list" data-reveal>
            {services.map(([title, text, tags], i) => (
              <a
                className="service"
                href="#contact"
                key={title}
                onClick={() => {
                  setService(title)
                  if (state === 'success') setState('idle')
                }}
              >
                <div className="service-top">
                  <span className="service-number">0{i + 1}</span>
                  <span className="service-rule" aria-hidden="true" />
                </div>
                <h3>{title}</h3>
                <p>{text}</p>
                <div className="service-bottom">
                  <span>{tags}</span>
                  <b>↗</b>
                </div>
              </a>
            ))}
          </div>
        </section>
        <section id="about" className="about">
          <div className="wrap about-inner">
            <div className="about-statement" data-reveal>
              <p className="eyebrow">THE PERSON BEHIND THE WORDS</p>
              <h2>
                Every accomplished career
                <br />
                has a story.
                <br />
                <em>Let’s tell yours well.</em>
              </h2>
              <span className="signature">Philomena A. Peace</span>
            </div>
            <div className="about-copy" data-reveal>
              <p className="eyebrow">MEET PHILOMENA ANDREAS PEACE</p>
              <h3>
                Your experience, seen
                <br />
                through an expert lens.
              </h3>
              <p>
                Do you need a federal résumé that opens the door to interviews?
                Are you ready for a promotion, a career change, or your next
                leadership opportunity?
              </p>
              <p>
                I bring 25+ years of helping clients pursue their career goals,
                alongside experience as a Federal Career Consultant, USAJOBS
                Expert, LinkedIn Strategist, Résumé Writer, and Technology
                Trainer.
              </p>
              <p>
                As co-author of the Magnetize Your Federal Résumé Program with
                Camille Roberts, I help job seekers—from new graduates to
                SES—understand the Six Audiences™ who read and score their
                résumés and applications.
              </p>
              <p>
                My work combines compelling career documents with practical
                education: right-fit job targeting, stronger USAJOBS
                positioning, and resources that make your search more focused
                and productive.
              </p>
              <div className="about-badge">
                Member, Career Directors International
              </div>
            </div>
          </div>
        </section>
        <section className="program-section">
          <div className="wrap program-inner" data-reveal>
            <div>
              <p className="eyebrow">KNOWLEDGE THAT MOVES YOU FORWARD</p>
              <h2>
                Magnetize Your
                <br />
                <em>Federal Résumé.</em>
              </h2>
            </div>
            <div>
              <p>
                Effective résumés lead to interviews. Our program shares
                strategies informed by 25+ years of client success to help you
                present stronger evidence in your federal résumé and
                application.
              </p>
              <p>
                Explore tips, worksheets, systems, scripts, templates, and
                resources for a more purposeful search. Career education also
                covers Microsoft Office and optimizing your presence on USAJOBS,
                LinkedIn, Facebook, Twitter, and Google.
              </p>
              <a
                className="text-link"
                href="https://ccCareerSolutions.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Explore the program <span>↗</span>
              </a>
            </div>
          </div>
          <blockquote className="wrap" data-reveal>
            “An investment in knowledge always pays the best interest.”
            <cite>— Benjamin Franklin</cite>
          </blockquote>
        </section>
        <section id="portfolio" className="wrap section portfolio">
          <div className="section-heading" data-reveal>
            <div>
              <p className="eyebrow">SELECTED DOCUMENT</p>
              <h2>
                Experience,
                <br />
                <em>presented with purpose.</em>
              </h2>
            </div>
            <p>
              A closer look at an executive curriculum vitae. Explore the full
              document to see how a professional history comes together on the
              page.
            </p>
          </div>
          <div className="portfolio-layout" data-reveal>
            <a
              className="portfolio-preview"
              href="/documents/curriculum-vitae.pdf"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View Wolfgang Trautwein’s curriculum vitae, PDF, 3 pages (opens in a new tab)"
            >
              <img
                src="/documents/curriculum-vitae-preview.png"
                alt="First page of Wolfgang Trautwein’s curriculum vitae"
                width={918}
                height={1188}
                loading="lazy"
              />
            </a>
            <div className="portfolio-copy">
              <p className="eyebrow">01 / EXECUTIVE CURRICULUM VITAE</p>
              <h3>Leadership in life sciences.</h3>
              <p>
                Wolfgang Trautwein’s CV brings together board advisory work,
                commercial strategy, and international leadership in
                diagnostics, life sciences, and MedTech.
              </p>
              <dl>
                <div>
                  <dt>Document</dt>
                  <dd>Executive curriculum vitae</dd>
                </div>
                <div>
                  <dt>Focus</dt>
                  <dd>Leadership, strategy & commercial innovation</dd>
                </div>
                <div>
                  <dt>Format</dt>
                  <dd>PDF · 3 pages</dd>
                </div>
              </dl>
              <a
                className="button"
                href="/documents/curriculum-vitae.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                View full CV <span>↗</span>
              </a>
            </div>
          </div>
        </section>
        <section id="credentials" className="credentials section">
          <div className="wrap">
            <p className="eyebrow">EXPERIENCE & PROFESSIONAL DEVELOPMENT</p>
            <h2>
              A foundation of expertise.
              <br />
              <em>A commitment to your future.</em>
            </h2>
            <div className="credentials-layout" data-reveal>
              <div>
                <h3>Professional experience</h3>
                {[
                  [
                    'Apr 2012 – Present',
                    'Federal & Professional Résumé Writer · Federal Career Educator · Director of Education',
                    'CC Career Solutions · Idaho Falls, Idaho Area',
                    'Federal and private sector résumés, SES applications, leadership narratives, LinkedIn profiles, career marketing, webinars, and technology training.',
                  ],
                  [
                    'Sep 2007 – Sep 2017',
                    'Independent Image Consultant',
                    'BeautiControl · Rigby, Idaho',
                    'Personalized image consulting, skincare, anti-aging, color cosmetics, and in-home spa experiences to help professionals look and feel their best.',
                  ],
                  [
                    'Aug 1998 – Apr 2012',
                    'ISC',
                    'Idaho Department of Health and Welfare',
                    '',
                  ],
                  [
                    '1992 – 1995',
                    'Text Processing',
                    'Ecology and Environment, Inc',
                    '',
                  ],
                ].map(([date, title, org, description]) => (
                  <article className="career-entry" key={title}>
                    <p className="career-date">{date}</p>
                    <h4>{title}</h4>
                    <p className="career-org">{org}</p>
                    {description && <p>{description}</p>}
                  </article>
                ))}
                <h3 className="education-heading">Education</h3>
                <article className="career-entry">
                  <h4>Brigham Young University – Idaho</h4>
                  <p>Coursework in Business Administration</p>
                </article>
                <article className="career-entry">
                  <h4>Rigby High School</h4>
                  <p>
                    Diploma, General Education with an emphasis in Accounting
                    and Business/Management
                  </p>
                  <p>Honor Society</p>
                </article>
              </div>
              <div className="certification-panel">
                <h3>Licenses & certifications</h3>
                {certifications.map(([title, date]) => (
                  <article className="certification" key={title}>
                    <span className="cert-mark" aria-hidden="true" />
                    <div>
                      <h4>{title}</h4>
                      <p>CC Career Solutions · Issued {date}</p>
                    </div>
                  </article>
                ))}
                <article className="certification">
                  <span className="cert-mark" aria-hidden="true" />
                  <div>
                    <h4>Certified Image Consultant</h4>
                    <p>Issued Dec 2007</p>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </section>
        <section id="process" className="wrap section">
          <div className="section-heading" data-reveal>
            <div>
              <p className="eyebrow">A COLLABORATIVE APPROACH</p>
              <h2>
                From experience
                <br />
                <em>to a clear direction.</em>
              </h2>
            </div>
            <p>
              Personal, considered, and focused on you. A clear process that
              gives your next chapter the attention it deserves.
            </p>
          </div>
          <div className="steps" data-reveal>
            {[
              [
                'Discover',
                'We discuss your career, your achievements, and where you want to go next.',
              ],
              [
                'Craft',
                'Your story takes shape in purposeful, tailored documents that reflect your value.',
              ],
              [
                'Refine',
                'We review the details together so you can move forward with clarity and confidence.',
              ],
            ].map(([title, text], i) => (
              <div key={title}>
                <span>
                  0{i + 1}
                  <i />
                </span>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </section>
        <section id="contact" className="contact">
          <div className="wrap contact-inner" data-reveal>
            <div>
              <p className="eyebrow">YOUR NEXT CHAPTER STARTS HERE</p>
              <h2>
                You bring the experience.
                <br />
                <em>Let’s find the words.</em>
              </h2>
              <p>
                Tell me a little about your goals and the support you’re looking
                for. Let’s start a conversation about your next move.
              </p>
              <div className="contact-note">
                <a href="tel:+12085571562">208.557.1562</a> · Mountain Time
                <br />
                <a
                  href="https://www.ccCareerServices.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ccCareerServices.com ↗
                </a>
              </div>
            </div>
            <div className="form-panel">
              {state === 'success' ? (
                <div className="success" role="status">
                  <h3>Thank you for reaching out.</h3>
                  <p>
                    Your enquiry has been received. Philomena can follow up
                    using the email address you provided.
                  </p>
                  <button className="button" onClick={() => setState('idle')}>
                    Send another enquiry ↗
                  </button>
                </div>
              ) : (
                <form
                  name="consultation"
                  method="POST"
                  action="/__forms.html"
                  data-netlify="true"
                  netlify-honeypot="bot-field"
                  onSubmit={submit}
                  aria-busy={state === 'pending'}
                >
                  <input type="hidden" name="form-name" value="consultation" />
                  <p hidden>
                    <label>
                      Leave empty
                      <input
                        name="bot-field"
                        tabIndex={-1}
                        autoComplete="off"
                      />
                    </label>
                  </p>
                  <fieldset disabled={state === 'pending'}>
                    <legend>Let’s talk about your goals</legend>
                    <div className="form-row">
                      <label>
                        Your name
                        <input
                          name="name"
                          autoComplete="name"
                          placeholder="Full name"
                          maxLength={100}
                          required
                        />
                      </label>
                      <label>
                        Email address
                        <input
                          name="email"
                          type="email"
                          autoComplete="email"
                          placeholder="you@example.com"
                          maxLength={254}
                          required
                        />
                      </label>
                    </div>
                    <label>
                      How can I help you?
                      <select
                        name="service"
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                      >
                        {services.map(([title]) => (
                          <option key={title}>{title}</option>
                        ))}
                        <option>A combination of services</option>
                      </select>
                    </label>
                    <label>
                      Tell me about your next move
                      <textarea
                        name="message"
                        rows={3}
                        placeholder="Your career goals, target roles, or what you have in mind…"
                        minLength={10}
                        maxLength={3000}
                        required
                      />
                    </label>
                    <button className="button" type="submit">
                      {state === 'pending'
                        ? 'Sending your enquiry…'
                        : 'Start the conversation'}{' '}
                      <span>↗</span>
                    </button>
                    <p className="privacy">
                      Your details are used to respond to your enquiry.
                    </p>
                  </fieldset>
                  {state === 'error' && (
                    <p className="error" role="alert">
                      Your enquiry could not be confirmed. Please try again;
                      your details are still here.
                    </p>
                  )}
                </form>
              )}
            </div>
          </div>
        </section>
      </main>
      <footer className="wrap footer">
        <a className="brand" href="#home">
          <img
            className="brand-logo"
            src={LOGO}
            alt=""
            width={83}
            height={83}
            loading="lazy"
          />
          <span>
            PHILOMENA ANDREAS PEACE
            <small>WORDS THAT WORK FOR YOUR FUTURE.</small>
          </span>
        </a>
        <p>© {new Date().getFullYear()} Philomena Andreas Peace.</p>
        <a href="#home">Back to top ↑</a>
      </footer>
    </>
  )
}
