import { NavLink, Outlet } from 'react-router-dom';
import styles from './Layout.module.scss';

export function Layout() {
  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.brand}>
            <span className={styles.brandMark} aria-hidden="true" />
            <div>
              <span className={styles.brandName}>Грузопоток</span>
              <span className={styles.brandSub}>система приёмки заказов на доставку</span>
            </div>
          </div>
          <nav className={styles.nav}>
            <NavLink
              to="/orders/new"
              className={({ isActive }) => (isActive ? styles.navLinkActive : styles.navLink)}
            >
              Новый заказ
            </NavLink>
            <NavLink
              to="/orders"
              end
              className={({ isActive }) => (isActive ? styles.navLinkActive : styles.navLink)}
            >
              Список заказов
            </NavLink>
          </nav>
        </div>
      </header>
      <main className={styles.content}>
        <div className={styles.contentInner}>
          <Outlet />
        </div>
      </main>
    </div>
  );
}
