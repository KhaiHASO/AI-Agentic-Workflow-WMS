import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User } from 'lucide-react';

const MobileLayout = ({ children, title, showBack = true, footer }) => {
  const navigate = useNavigate();

  return (
    <div className="mobile-container scanner-sim">
      <header className="mobile-header d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center gap-2">
          {showBack && (
            <button className="btn p-0 border-0" onClick={() => navigate(-1)}>
              <ArrowLeft size={20} />
            </button>
          )}
          <h6 className="mb-0 fw-bold">{title}</h6>
        </div>
        <div className="bg-light rounded-circle p-2">
          <User size={18} className="text-muted" />
        </div>
      </header>

      <main className="mobile-content">
        {children}
      </main>

      {footer && (
        <footer className="mobile-footer">
          {footer}
        </footer>
      )}
    </div>
  );
};

export default MobileLayout;
