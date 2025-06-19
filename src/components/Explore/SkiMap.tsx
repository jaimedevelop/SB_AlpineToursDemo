// Key changes to your existing SkiMap.tsx:

import { useResortContext } from '../../contexts/ResortContext';

export default function SkiMap() {
  // Replace your local state with context
  const { 
    selectedResort, 
    setSelectedResort, 
    setFilteredResorts 
  } = useResortContext();

  // Remove these local state declarations:
  // const [selectedResort, setSelectedResort] = useState<Resort | null>(null);

  // Update your filteredResorts effect to use context:
  useEffect(() => {
    setFilteredResorts(filteredResorts);
    console.log("Passing filtered resorts to context:", filteredResorts.length);
  }, [filteredResorts, setFilteredResorts]);

  // Update the return JSX to use proper height:
  return (
    <div className="relative w-full h-full"> {/* Changed from h-screen */}
      {/* FilterBar Component */}
      <FilterBar 
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        isFilterActive={isFilterActive}
      />
      
      <Map
        initialViewState={{
          longitude: -100,
          latitude: 40,
          zoom: 3,
        }}
        mapboxAccessToken={MAPBOX_TOKEN}
        style={{ width: '100%', height: '100%' }}
        mapStyle="mapbox://styles/mapbox/outdoors-v12"
        reuseMaps
        onClick={handleMapClick}
        onLoad={handleMapLoad}
      >
        {/* Resort markers */}
        {filteredResorts.map((resort, index) => (
          resort.latitude && resort.longitude ? (
            <Marker
              key={index}
              latitude={Number(resort.latitude)}
              longitude={Number(resort.longitude)}
              onClick={e => {
                e.originalEvent.stopPropagation();
                setSelectedResort(resort); // This now updates context
              }}
            >
              <MapPin 
                className={`cursor-pointer transition-colors ${
                  selectedResort?.name === resort.name 
                    ? 'text-red-600' 
                    : 'text-blue-600 hover:text-blue-800'
                }`} 
              />
            </Marker>
          ) : null
        ))}

        {/* Rest of your markers and popup... */}
      </Map>
      
      {/* Add SlidingPanel here when ready */}
      {/* <SlidingPanel resorts={filteredResorts} /> */}
    </div>
  );
}