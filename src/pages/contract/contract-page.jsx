import React from 'react';

import { Header } from '../../components/header-component';
import { Footer } from '../../components/footer-component';
import { Menu } from '../../components/menu-component';
import { Contract } from '../../components/contract-component';

export function ContractPage() {
  const burgerRef = React.useRef();

  return (
    <div className='wrapper'>
      <Header burgerRef={burgerRef} />

      <div className='content'>
        <Menu burgerRef={burgerRef} />
        <Contract burgerRef={burgerRef} />
      </div>

      <Footer />
    </div>
  );
}
