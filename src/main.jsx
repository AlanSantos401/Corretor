import { StrictMode, useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { ArrowLeft, ArrowRight, Handshake, Medal, User, WhatsappLogo } from '@phosphor-icons/react'
import './styles.css'
import corretorImage from './assets/corretor.png'

const availableProperties = [
  {
    category: 'Casa à venda',
    title: 'Casa Horizonte',
    location: 'Jardins do Lago, Jussara - BA',
    details: '3 quartos  ·  2 suítes  ·  2 vagas',
    price: 'R$ 650.000,00',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=85',
  },
  {
    category: 'Apartamento',
    title: 'Apartamento Vista',
    location: 'Centro, Jussara - BA',
    details: '2 quartos  ·  1 suíte  ·  1 vaga',
    price: 'R$ 320.000,00',
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=85',
  },
  {
    category: 'Casa à venda',
    title: 'Casa São José',
    location: 'Bairro São José, Jussara - BA',
    details: '3 quartos  ·  1 suíte  ·  2 vagas',
    price: 'R$ 480.000,00',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=85',
  },
  {
    category: 'Casa à venda',
    title: 'Casa Jardim',
    location: 'Alto da Serra, Jussara - BA',
    details: '4 quartos  ·  2 suítes  ·  3 vagas',
    price: 'R$ 780.000,00',
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=900&q=85',
  },
  {
    category: 'Apartamento',
    title: 'Loft Central',
    location: 'Centro, Jussara - BA',
    details: '1 quarto  ·  1 suíte  ·  1 vaga',
    price: 'R$ 295.000,00',
    image: 'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=900&q=85',
  },
  {
    category: 'Casa à venda',
    title: 'Casa Aurora',
    location: 'Bairro Primavera, Jussara - BA',
    details: '3 quartos  ·  1 suíte  ·  2 vagas',
    price: 'R$ 540.000,00',
    image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=900&q=85',
  },
]

const soldProperties = [
  {
    title: 'Casa no Centro',
    location: 'Jussara - BA',
    image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=900&q=85',
  },
  {
    title: 'Apartamento Vista Mar',
    location: 'Jussara - BA',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=900&q=85',
  },
  {
    title: 'Casa em Condomínio',
    location: 'Jussara - BA',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=85',
  },
]

function ArrowIcon() {
  return <span aria-hidden="true">↗</span>
}

function Logo() {
  return (
    <a className="logo" href="#inicio" aria-label="Alan, início">
      <span className="logo-mark" aria-hidden="true">⌂</span>
      <span>
        <strong>Alan</strong>
        <small>CORRETOR DE IMÓVEIS</small>
      </span>
    </a>
  )
}

function PropertyCard({ property, sold = false }) {
  return (
    <article className={`property-card ${sold ? 'property-card--sold' : ''}`}>
      <div className="property-image-wrap">
        <img src={property.image} alt={`Interior ou fachada de ${property.title}`} className="property-image" />
        <span className="property-tag">{sold ? 'Vendido' : property.category}</span>
      </div>
      <div className="property-info">
        <h3>{property.title}</h3>
        <p className="property-location">⌖ {property.location}</p>
        {!sold && <p className="property-details">{property.details}</p>}
        {!sold && <strong className="property-price">{property.price}</strong>}
      </div>
    </article>
  )
}

function getCarouselDistance(viewport) {
  const card = viewport?.querySelector('.property-card')
  if (!viewport || !card) return 0

  const gap = Number.parseFloat(window.getComputedStyle(card.parentElement).columnGap) || 0
  return card.getBoundingClientRect().width + gap
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [sent, setSent] = useState(false)
  const propertyCarouselRef = useRef(null)
  const [carouselPaused, setCarouselPaused] = useState(false)

  function closeMenu() {
    setMenuOpen(false)
  }

  function handleSubmit(event) {
    event.preventDefault()
    setSent(true)
  }

  function moveCarousel(direction) {
    const viewport = propertyCarouselRef.current
    const distance = getCarouselDistance(viewport)
    if (!distance) return

    viewport.scrollBy({ left: direction * distance, behavior: 'smooth' })
  }

  useEffect(() => {
    if (carouselPaused) return undefined

    const timer = window.setInterval(() => {
      const viewport = propertyCarouselRef.current
      const distance = getCarouselDistance(viewport)
      if (!distance) return

      const isAtEnd = viewport.scrollLeft + viewport.clientWidth >= viewport.scrollWidth - distance
      viewport.scrollBy({ left: isAtEnd ? -viewport.scrollLeft : distance, behavior: 'smooth' })
    }, 3200)

    return () => window.clearInterval(timer)
  }, [carouselPaused])

  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="container nav-inner">
          <Logo />
          <button
            className="menu-toggle"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="main-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span>{menuOpen ? 'Fechar' : 'Menu'}</span>
            <i aria-hidden="true">{menuOpen ? '×' : '☰'}</i>
          </button>
          <nav id="main-navigation" className={`main-nav ${menuOpen ? 'main-nav--open' : ''}`} aria-label="Navegação principal">
            <a className="active" href="#inicio" onClick={closeMenu}>Início</a>
            <a href="#imoveis" onClick={closeMenu}>Imóveis disponíveis</a>
            <a href="#vendidos" onClick={closeMenu}>Imóveis vendidos</a>
            <a href="#sobre" onClick={closeMenu}>Sobre</a>
            <a href="#contato" onClick={closeMenu}>Contato</a>
            <a className="nav-cta" href="#contato" onClick={closeMenu}>Fale comigo</a>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero" id="inicio">
          <div className="hero-image" role="img" aria-label="Ambiente sofisticado para apresentação de um imóvel" />
          <img className="hero-person" src={corretorImage} alt="Alan, corretor de imóveis" />
          <div className="hero-overlay" />
          <div className="container hero-content">
            <div className="hero-copy">
              <p className="eyebrow">Realizando sonhos</p>
              <h1>Mais que imóveis,<br /><em>novos começos.</em></h1>
              <p className="hero-description">Encontro espaços que combinam com a sua história, com clareza em cada etapa.</p>
              <div className="hero-actions">
                <a className="button button--solid" href="#contato"><WhatsappLogo size={19} weight="fill" aria-hidden="true" />Falar no WhatsApp</a>
                <a className="text-link" href="#imoveis">Conheça meu trabalho</a>
              </div>
            </div>
            <aside className="hero-note" aria-label="Diferenciais de Alan">
              <div className="note-item">
                <Medal size={25} weight="regular" aria-hidden="true" />
                <p><strong>+6 anos</strong><br />de experiência</p>
              </div>
              <div className="note-item">
                <Handshake size={25} weight="regular" aria-hidden="true" />
                <p><strong>Especialista</strong><br />em negociações</p>
              </div>
              <div className="note-item">
                <User size={25} weight="regular" aria-hidden="true" />
                <p><strong>Atendimento</strong><br />personalizado</p>
              </div>
            </aside>
          </div>
          <a className="scroll-cue" href="#imoveis" aria-label="Rolar para imóveis">⌄</a>
        </section>

        <section className="available-section section" id="imoveis">
          <div className="container property-layout">
            <div className="section-intro">
              <p className="eyebrow">Imóveis disponíveis</p>
              <h2>Um lugar para<br /><em>viver bem.</em></h2>
              <p>Opções escolhidas com cuidado para acompanhar o seu estilo de vida e o seu momento.</p>
              <a className="button button--outline" href="#contato">Ver todos os imóveis <ArrowIcon /></a>
            </div>
            <div
              className="property-carousel"
              onMouseEnter={() => setCarouselPaused(true)}
              onMouseLeave={() => setCarouselPaused(false)}
            >
              <div className="carousel-controls" aria-label="Controles dos imóveis">
                <button className="carousel-control" type="button" aria-label="Imóvel anterior" onClick={() => moveCarousel(-1)}><ArrowLeft size={18} aria-hidden="true" /></button>
                <button className="carousel-control" type="button" aria-label="Próximo imóvel" onClick={() => moveCarousel(1)}><ArrowRight size={18} aria-hidden="true" /></button>
              </div>
              <div className="property-viewport" ref={propertyCarouselRef}>
                <div className="property-track">
                  {availableProperties.map((property) => <PropertyCard key={property.title} property={property} />)}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="sold-section section" id="vendidos">
          <div className="container property-layout">
            <div className="section-intro section-intro--dark">
              <p className="eyebrow">Negócios realizados</p>
              <h2>Histórias<br />de confiança<br /><em>e realização.</em></h2>
              <p>Cada imóvel vendido representa uma negociação concluída e uma nova etapa começando.</p>
              <a className="button button--light" href="#contato">Quero encontrar o meu <ArrowIcon /></a>
            </div>
            <div className="property-grid property-grid--sold">
              {soldProperties.map((property) => <PropertyCard key={property.title} property={property} sold />)}
            </div>
          </div>
          <div className="slider-dots" aria-hidden="true"><b /> <i /> <i /> <i /></div>
        </section>

        <section className="about-section section" id="sobre">
          <div className="container about-grid">
            <div>
              <p className="eyebrow">Por trás das chaves</p>
              <h2>Negociar bem é<br /><em>cuidar de pessoas.</em></h2>
            </div>
            <div className="about-copy">
              <p>Sou Alan, corretor de imóveis, e acredito que uma boa escolha começa com uma conversa honesta.</p>
              <p>Meu trabalho é traduzir o mercado para você tomar decisões seguras, sem pressa e sem surpresas.</p>
              <a className="text-link" href="#contato">Vamos conversar <ArrowIcon /></a>
            </div>
          </div>
        </section>

        <section className="contact-section" id="contato">
          <div className="contact-photo" role="img" aria-label="Sala de estar com luz natural e decoração contemporânea" />
          <div className="container contact-grid">
            <div className="contact-copy">
              <p className="eyebrow">Vamos conversar</p>
              <h2>O próximo endereço<br />pode começar <em>aqui.</em></h2>
              <p>Conte um pouco do que você procura. Eu retorno para entender o seu momento e indicar os melhores caminhos.</p>
              <div className="contact-details">
                <a href="mailto:alan@exemplo.com">alan@exemplo.com</a>
                <span>Jussara · Bahia</span>
                <a href="#contato">Atendimento com hora marcada</a>
              </div>
            </div>
            <form className="contact-form" onSubmit={handleSubmit}>
              <label htmlFor="name">Seu nome</label>
              <input id="name" name="name" type="text" placeholder="Como posso te chamar?" required />
              <label htmlFor="email">Seu e-mail</label>
              <input id="email" name="email" type="email" placeholder="voce@exemplo.com" required />
              <label htmlFor="message">Como posso ajudar?</label>
              <textarea id="message" name="message" placeholder="Estou procurando..." rows="4" required />
              <button className="button button--solid form-submit" type="submit">{sent ? 'Mensagem enviada ✓' : 'Enviar mensagem ↗'}</button>
              {sent && <p className="form-success" role="status">Obrigado. Alan entrará em contato em breve.</p>}
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-grid">
          <div>
            <Logo />
            <p>Imóveis escolhidos para<br />novos capítulos da sua vida.</p>
          </div>
          <div className="footer-links">
            <span>Navegação</span>
            <a href="#inicio">Início</a>
            <a href="#imoveis">Imóveis disponíveis</a>
            <a href="#vendidos">Imóveis vendidos</a>
            <a href="#sobre">Sobre</a>
          </div>
          <div className="footer-links footer-contact">
            <span>Contato</span>
            <a href="mailto:alan@exemplo.com">alan@exemplo.com</a>
            <a href="#contato">Jussara · Bahia</a>
            <div className="social-links"><a href="#contato" aria-label="Instagram">ig</a><a href="#contato" aria-label="WhatsApp">wa</a><a href="#contato" aria-label="LinkedIn">in</a></div>
          </div>
        </div>
        <div className="container footer-bottom"><span>© 2025 Alan · Corretor de imóveis</span><span>Feito para encontrar o seu lugar.</span></div>
      </footer>
    </div>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode><App /></StrictMode>,
)
