import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { awardKarmaPoints, getKarmaState, KarmaState } from '../services/karmaService.ts';
import { useLanguage } from './LanguageContext.tsx';

interface KarmaRewardNotice {
  points: number;
  title: string;
  desc: string;
}

interface KarmaContextType {
  karmaState: KarmaState;
  rewardNotice: KarmaRewardNotice | null;
  setRewardNotice: (notice: KarmaRewardNotice | null) => void;
  awardKarma: (
    points: number,
    reasonVi: string,
    reasonEn?: string,
    meta?: { isTestnet?: boolean; isEn?: boolean; txHash?: string }
  ) => void;
}

const KarmaContext = createContext<KarmaContextType | undefined>(undefined);

export const KarmaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isEn } = useLanguage();
  const [karmaState, setKarmaState] = useState<KarmaState>(() => getKarmaState(isEn));
  const [rewardNotice, setRewardNotice] = useState<KarmaRewardNotice | null>(null);

  useEffect(() => {
    const handleUpdate = () => {
      setKarmaState(getKarmaState(isEn));
    };
    window.addEventListener('ytc_karma_awarded', handleUpdate);
    return () => window.removeEventListener('ytc_karma_awarded', handleUpdate);
  }, [isEn]);

  const awardKarma = useCallback(
    (
      points: number,
      reasonVi: string,
      reasonEn?: string,
      meta?: { isTestnet?: boolean; isEn?: boolean; txHash?: string }
    ) => {
      awardKarmaPoints(points, reasonVi, reasonEn || reasonVi, meta);
      setKarmaState(getKarmaState(isEn));
    },
    [isEn]
  );

  return (
    <KarmaContext.Provider
      value={{
        karmaState,
        rewardNotice,
        setRewardNotice,
        awardKarma
      }}
    >
      {children}
    </KarmaContext.Provider>
  );
};

export const useKarma = () => {
  const context = useContext(KarmaContext);
  if (!context) {
    throw new Error('useKarma must be used within a KarmaProvider');
  }
  return context;
};
