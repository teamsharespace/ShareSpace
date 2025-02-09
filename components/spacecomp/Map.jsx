'use client'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const Map = ({ listings }) => {
  const router = useRouter()
  const [coord, setCoord] = useState([19.07, 72.87])

  const handleMarkerClick = (uid) => {
    router.push(`/spaces/${uid}`)
  }

  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full flex-grow relative">
        <MapContainer
          className="w-full h-full absolute"
          center={coord}
          zoom={13}
          scrollWheelZoom={true}
          style={{ minHeight: '600px', height: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {listings.map((listing) => (
            <Marker
              key={listing.id}
              position={[listing.lat, listing.lng]}
              icon={L.divIcon({
                className: 'custom-marker ',
                html: `<div class="marker-content">₹${listing.price}</div>`,
                iconSize: [30, 30],
                iconAnchor: [15, 15],
              })}
              eventHandlers={{
                click: () => handleMarkerClick(listing.id),
              }}
            >
              <Popup>
                {listing.name} <br />
                ₹{listing.price} /hr
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  )
}

export default Map
