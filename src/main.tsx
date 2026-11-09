import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext.tsx';
import { ThemeProvider } from './context/ThemeContext.tsx';
import { WalletProvider } from './context/WalletContext.tsx';
import { KarmaProvider } from './context/KarmaContext.tsx';
import App from './App.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <LanguageProvider>
          <WalletProvider>
            <KarmaProvider>
              <App />
            </KarmaProvider>
          </WalletProvider>
        </LanguageProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
