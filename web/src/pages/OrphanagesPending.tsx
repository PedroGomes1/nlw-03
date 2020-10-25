import React, { useEffect, useState } from 'react';
import Dashboard from '../components/Dashboard';
import api from '../services/api';
import { Orphanages as OrphanagesProps } from '../components/Dashboard';

const OrphanagesPending: React.FC = () => {
  const [orphanages, setOrphanages] = useState<OrphanagesProps[]>([]);
  
  useEffect(() => {
    async function loadOrphanagesPending() {
      const response = await api.get<OrphanagesProps[]>('orphanages-pending')

      setOrphanages(response.data)
    }
    loadOrphanagesPending();
  }, [])

  return (
    <Dashboard
      orphanages={orphanages}
      title={"Orfanatos Pendentes"}
      quantity={orphanages.length}
    />
  )
}

export default OrphanagesPending;