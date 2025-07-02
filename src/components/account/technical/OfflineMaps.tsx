import React from 'react';
import ActionButton from '../shared/ActionButton';
import styles from '../../../styles/shared.module.css';

interface OfflineMap {
  id: string;
  name: string;
  size: string;
  downloaded: boolean;
}

const OfflineMaps: React.FC = () => {
  // TODO: Replace with actual offline map data from Firebase/local storage
  const offlineMaps: OfflineMap[] = [
    {
      id: 'whistler',
      name: 'Whistler Blackcomb',
      size: '45 MB',
      downloaded: true
    },
    {
      id: 'vail',
      name: 'Vail Resort',
      size: '38 MB',
      downloaded: true
    },
    {
      id: 'aspen',
      name: 'Aspen Snowmass',
      size: '52 MB',
      downloaded: false
    }
  ];

  const handleMapAction = (mapId: string, downloaded: boolean) => {
    if (downloaded) {
      // TODO: Remove offline map
      console.log('Removing offline map:', mapId);
    } else {
      // TODO: Download offline map
      console.log('Downloading offline map:', mapId);
    }
  };

  return (
    <div className={styles.card}>
      <h3 className={styles.cardTitle}>Offline Maps</h3>
      <div className="space-y-3">
        {offlineMaps.map((map) => (
          <div key={map.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <div className="font-medium text-gray-900">{map.name}</div>
              <div className="text-sm text-gray-600">{map.size}</div>
            </div>
            <button 
              onClick={() => handleMapAction(map.id, map.downloaded)}
              className={`px-3 py-1 rounded-lg text-sm ${
                map.downloaded 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
              }`}
            >
              {map.downloaded ? 'Downloaded' : 'Download'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OfflineMaps;