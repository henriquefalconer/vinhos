import React from 'react';

import { HarmonizationProvider } from './useHarmonization';

const Providers: React.FC = ({ children }) => {
  return <HarmonizationProvider>{children}</HarmonizationProvider>;
};

export default Providers;
