import { siteConfig } from '@/presentation/shared/config/site'

import { HeaderControls } from '../HeaderControls'
import { HeaderLogo } from '../HeaderLogo'
import { MobileMenu } from '../MobileMenu'
import { SearchButton } from '../SearchButton'

/**
 * Cabeçalho: estrutura no servidor, só os controles hidratam no cliente.
 * Desktop: links e controles. Celular: busca e menu.
 */
export function Header() {
  return (
    <header className="site-head">
      <div className="wrap head-in">
        <HeaderLogo />
        <nav className="nav" aria-label="Seções">
          {siteConfig.nav.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <HeaderControls />
        <div className="mobile-actions">
          <SearchButton showShortcut={false} />
          <MobileMenu />
        </div>
      </div>
    </header>
  )
}
