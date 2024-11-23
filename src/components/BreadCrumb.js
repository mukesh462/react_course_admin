import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumb = () => {
  const location = useLocation(); // Get the current location
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <nav className="breadcrumb">
      <ol className="list-reset flex">
        <li>
          <Link to="/" className="text-blue-600">Home</Link>
        </li>
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;
          return (
            <li key={to} className="mx-1 capitalize text-white">
              <span className="mx-2">/</span>
              {index === pathnames.length - 1 ? (
                <span className="text-white">{value}</span>
              ) : (
                <Link to={to} className="text-[#31ABEB]">{value}</Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
