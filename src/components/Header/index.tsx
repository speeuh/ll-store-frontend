import { Outlet } from 'react-router-dom';

import stylesTema from 'styles/Tema.module.scss';

export default function Header() {
  return (
    <>
      <div> Header </div>
      <div className={stylesTema.container}>
        <Outlet />
      </div>
    </>
  );
}
