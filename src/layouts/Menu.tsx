import { isMobile } from '@walletconnect/browser-utils';

import { ReactComponent as ObridgeDarkImg } from 'assets/icons/obridge_full_dark.svg';
import { ReactComponent as ObridgeLightImg } from 'assets/icons/obridge_full_light.svg';
import classNames from 'classnames';
import { WalletManagement } from 'components/WalletManagement/WalletManagement';
import { ThemeContext } from 'context/theme-context';
import useOnClickOutside from 'hooks/useOnClickOutside';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Menu.module.scss';

const Menu: React.FC = () => {
  const location = useLocation();
  const [link, setLink] = useState('/');
  const { theme } = useContext(ThemeContext);
  const [open, setOpen] = useState(false);

  const ref = useRef(null);
  useOnClickOutside(ref, () => {
    setOpen(false);
  });

  useEffect(() => {
    setLink(location.pathname);
  }, [location.pathname]);

  const mobileMode = isMobile();

  return (
    <>
      {mobileMode ? (
        <div className={styles.menuMobile}>
          <div className={styles.logo}>
            <Link to={'/'} onClick={() => setLink('/')}>
              {theme === 'light' ? <ObridgeDarkImg /> : <ObridgeLightImg />}
            </Link>
          </div>
          <WalletManagement />
        </div>
      ) : (
        <div className={classNames(styles.menu)}>
          <div className={styles.menuLeft}>
            <div className={styles.logoWrapper}>
              <Link to={'/'} onClick={() => setLink('/')} className={styles.logo}>
                {theme === 'light' ? <ObridgeDarkImg /> : <ObridgeLightImg />}
              </Link>
              <div className={styles.divider}></div>
            </div>
          </div>
          <div className={classNames(styles.menuRight)}>
            <div className={styles.divider}></div>
            <div className={classNames(styles.connect_wallet_wrapper)}>
              <span>
                <WalletManagement />
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Menu;
