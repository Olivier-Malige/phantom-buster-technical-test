import { useEffect, useState } from 'react';

import type { IPhantoms } from '../data/phantoms';
import phantomsJson from '../data/phantoms.json';

const FAKE_LATENCY = 700;

const useFetchData = () => {
  const [data, setData] = useState<IPhantoms | null>(null);
  let latencyTimeout: NodeJS.Timeout;

  const reFetch = () => {
    setData(null);
  };

  useEffect(() => {
    latencyTimeout = setTimeout(() => {
      setData(phantomsJson as IPhantoms);
    }, FAKE_LATENCY);

    return () => clearTimeout(latencyTimeout);
  }, [data]);

  return {
    data,
    reFetch,
  };
};

export { useFetchData };
