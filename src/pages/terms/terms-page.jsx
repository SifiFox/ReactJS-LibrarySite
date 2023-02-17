import React from 'react';

import { Header } from '../../components/header-component';
import { Footer } from '../../components/footer-component';
import { Menu } from '../../components/menu-component';
import { Terms } from '../../components/terms-component';

export function TermsPage() {
  const burgerRef = React.useRef();

  return (
    <div className='wrapper'>
      <Header burgerRef={burgerRef} />

      <div className='content'>
        <Menu burgerRef={burgerRef} />
        <Terms burgerRef={burgerRef} />
      </div>

      <Footer />
    </div>
  );
}
