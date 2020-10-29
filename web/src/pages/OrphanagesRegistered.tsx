import React, { useEffect, useState } from 'react';
import Dashboard from '../components/Dashboard';
import api from '../services/api';
import { Orphanages as OrphanagesProps } from '../components/Dashboard';

const OrphanagesRegistered: React.FC = () => {

  const [orphanages, setOrphanages] = useState<OrphanagesProps[]>([]);

  useEffect(() => {
    async function loadOrphanagesRegistered() {
      const response = await api.get<OrphanagesProps[]>('orphanages', {
        params: {
          is_pending: 0
        }
      })

      setOrphanages(response.data)
    }
    loadOrphanagesRegistered();
  }, [])

  return (
    <Dashboard
      orphanages={orphanages}
      title="Orfanatos Cadastrados"
      quantity={orphanages.length}
    />
  )
}

export default OrphanagesRegistered;