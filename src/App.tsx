import { AppProvider } from './context/AppContext'
import { About } from './components/About'
import { AutocultivoSection } from './components/AutocultivoSection'
import { CartButton } from './components/CartButton'
import { CbdSection } from './components/CbdSection'
import { CategoryGrid } from './components/CategoryGrid'
import { ChatWidget } from './components/ChatWidget'
import { EventPromoPopup } from './components/EventPromoPopup'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { InstagramReelsMarquee } from './components/InstagramReelsMarquee'
import { JoinClub } from './components/JoinClub'
import { Locations } from './components/Locations'
import { RadioPlayer } from './components/RadioPlayer'
import { WhyChooseUs } from './components/WhyChooseUs'

function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-[#f5f5f5] dark:bg-black font-sans text-black dark:text-white selection:bg-pink-500 selection:text-white transition-colors duration-300">
        <Header />
        <main>
          <Hero />
          <About />
          <CategoryGrid />
          <AutocultivoSection />
          <CbdSection />
          <InstagramReelsMarquee />
          <WhyChooseUs />
          <Locations />
          <JoinClub />
        </main>
        <Footer />
        <RadioPlayer />
        <ChatWidget />
        <CartButton />
        <EventPromoPopup />
      </div>
    </AppProvider>
  )
}

export default App
