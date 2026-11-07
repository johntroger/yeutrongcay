import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { SwapOffer } from '../types/index.ts';
import { useLanguage } from '../context/LanguageContext.tsx';
import { ShieldCheck, MapPin, Navigation } from 'lucide-react';

// Bảng tọa độ trung tâm quận/huyện đã làm mờ theo tiêu chuẩn H8 (không lưu GPS nhà riêng)
export const FUZZED_REGION_COORDINATES: Record<string, [number, number]> = {
  'cau giay': [21.0366, 105.7958],
  'nghia do': [21.0425, 105.7960],
  'ha noi': [21.0285, 105.8542],
  'hoan kiem': [21.0288, 105.8524],
  'dong da': [21.0181, 105.8299],
  'ha dong': [20.9738, 105.7770],
  'tay ho': [21.0601, 105.8197],
  'hai chau': [16.0544, 108.2230],
  'da nang': [16.0544, 108.2022],
  'son tra': [16.0967, 108.2483],
  'hue': [16.4637, 107.5909],
  'thu duc': [10.8355, 106.7218],
  'hiep binh chanh': [10.8402, 106.7255],
  'binh thanh': [10.8170, 106.7180],
  'thanh da': [10.8245, 106.7210],
  'quan 1': [10.7769, 106.7009],
  'quan 3': [10.7844, 106.6844],
  'quan 7': [10.7340, 106.7219],
  'tan binh': [10.8015, 106.6557],
  'ho chi minh': [10.7769, 106.7009],
  'tphcm': [10.7769, 106.7009],
  'can tho': [10.0342, 105.7725],
  'ninh kieu': [10.0342, 105.7820],
};

export function getFuzzedCoordinates(location: string, region: 'north' | 'central' | 'south', index: number): [number, number] {
  const norm = location.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  
  for (const [key, coords] of Object.entries(FUZZED_REGION_COORDINATES)) {
    if (norm.includes(key)) {
      // Thêm độ lệch nhẹ ngẫu nhiên trong bán kính 300m - 500m để các ghim cùng quận không bị đè lên nhau
      const offsetLat = ((index % 5) - 2) * 0.004;
      const offsetLng = (((index * 3) % 5) - 2) * 0.004;
      return [coords[0] + offsetLat, coords[1] + offsetLng];
    }
  }

  // Tọa độ dự phòng theo vùng miền
  if (region === 'north') {
    return [21.0285 + (index * 0.005), 105.8542 + (index * 0.005)];
  } else if (region === 'central') {
    return [16.0544 + (index * 0.005), 108.2022 + (index * 0.005)];
  } else {
    return [10.7769 + (index * 0.005), 106.7009 + (index * 0.005)];
  }
}

interface InteractiveSwapMapProps {
  offers: SwapOffer[];
  onSelectOffer?: (offerId: string) => void;
  selectedRegion?: 'all' | 'north' | 'central' | 'south';
}

export const InteractiveSwapMap: React.FC<InteractiveSwapMapProps> = ({
  offers,
  onSelectOffer,
  selectedRegion = 'all',
}) => {
  const { isEn } = useLanguage();
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const [activeStationCount, setActiveStationCount] = useState(0);

  // Khởi tạo bản đồ Leaflet
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      // Tâm Việt Nam ban đầu
      const initialMap = L.map(mapContainerRef.current, {
        center: [16.0544, 107.8],
        zoom: 6,
        scrollWheelZoom: false, // Tránh kẹt cuộn chuột khi lướt trang
      });

      // Lớp bản đồ nền OpenStreetMap
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 18,
      }).addTo(initialMap);

      const markersGroup = L.layerGroup().addTo(initialMap);
      markersLayerRef.current = markersGroup;
      mapInstanceRef.current = initialMap;
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Cập nhật ghim (markers) khi danh sách offers hoặc vùng thay đổi
  useEffect(() => {
    const map = mapInstanceRef.current;
    const markersLayer = markersLayerRef.current;
    if (!map || !markersLayer) return;

    markersLayer.clearLayers();

    const filtered = offers.filter((o) => selectedRegion === 'all' || o.region_zone === selectedRegion);
    setActiveStationCount(filtered.length);

    filtered.forEach((offer, idx) => {
      const coords = getFuzzedCoordinates(offer.location_name, offer.region_zone, idx);

      // Màu icon theo loại tin
      const markerColor =
        offer.offer_type === 'giveaway'
          ? '#059669' // emerald-600
          : offer.offer_type === 'exchange'
          ? '#2563eb' // blue-600
          : '#d97706'; // amber-600

      const markerEmoji =
        offer.offer_type === 'giveaway'
          ? '🎁'
          : offer.offer_type === 'exchange'
          ? '🔄'
          : '🔍';

      const customIcon = L.divIcon({
        className: 'custom-swap-marker',
        html: `
          <div style="
            background-color: ${markerColor};
            width: 34px;
            height: 34px;
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 10px rgba(0,0,0,0.3);
            border: 2px solid #ffffff;
            cursor: pointer;
            transition: transform 0.2s ease;
          ">
            <span style="transform: rotate(45deg); font-size: 15px;">${markerEmoji}</span>
          </div>
        `,
        iconSize: [34, 34],
        iconAnchor: [17, 34],
        popupAnchor: [0, -32],
      });

      const marker = L.marker(coords, { icon: customIcon });

      const offerTypeLabel =
        offer.offer_type === 'giveaway'
          ? (isEn ? '🎁 Free Giveaway' : '🎁 Tặng Miễn Phí (0đ)')
          : offer.offer_type === 'exchange'
          ? (isEn ? '🔄 Plant Swap' : '🔄 Trao Đổi Cây')
          : (isEn ? '🔍 Seeking Variety' : '🔍 Cần Tìm Giống');

      const popupHtml = `
        <div style="font-family: inherit; min-width: 200px; max-width: 240px; padding: 2px;">
          <div style="position: relative; width: 100%; height: 110px; border-radius: 12px; overflow: hidden; margin-bottom: 8px;">
            <img src="${offer.image_url}" alt="${offer.plant_name}" style="width: 100%; height: 100%; object-fit: cover;" />
            <span style="position: absolute; top: 6px; left: 6px; background: rgba(0,0,0,0.7); color: #fff; font-size: 10px; font-weight: bold; padding: 2px 8px; border-radius: 99px;">
              ${offerTypeLabel}
            </span>
          </div>
          <h4 style="margin: 0 0 4px 0; font-size: 13px; font-weight: bold; color: #1e3a27; line-height: 1.3;">
            ${offer.plant_name}
          </h4>
          <p style="margin: 0 0 4px 0; font-size: 11px; color: #059669; font-weight: 600;">
            📍 ${offer.location_name}
          </p>
          <p style="margin: 0 0 8px 0; font-size: 10px; color: #6b7280; font-style: italic;">
            ${offer.item_type} • Bởi: ${offer.user_name}
          </p>
          <button id="btn-view-offer-${offer.id}" style="
            width: 100%;
            background: #143521;
            color: #ffffff;
            border: none;
            padding: 6px 12px;
            border-radius: 8px;
            font-size: 11px;
            font-weight: 600;
            cursor: pointer;
            transition: background 0.2s;
          ">
            ${isEn ? 'View Listing Details →' : 'Xem chi tiết tin này →'}
          </button>
        </div>
      `;

      marker.bindPopup(popupHtml);

      marker.on('popupopen', () => {
        const btn = document.getElementById(`btn-view-offer-${offer.id}`);
        if (btn) {
          btn.onclick = () => {
            if (onSelectOffer) {
              onSelectOffer(offer.id);
            }
            const el = document.getElementById(`swap-offer-${offer.id}`);
            if (el) {
              el.scrollIntoView({ behavior: 'smooth', block: 'center' });
              el.classList.add('ring-4', 'ring-emerald-400');
              setTimeout(() => {
                el.classList.remove('ring-4', 'ring-emerald-400');
              }, 3000);
            }
          };
        }
      });

      markersLayer.addLayer(marker);
    });

    // Tự động điều chỉnh góc nhìn (Fly to Region)
    if (selectedRegion === 'north') {
      map.flyTo([21.0285, 105.8542], 10, { duration: 1 });
    } else if (selectedRegion === 'central') {
      map.flyTo([16.0544, 108.2022], 11, { duration: 1 });
    } else if (selectedRegion === 'south') {
      map.flyTo([10.7769, 106.7009], 10, { duration: 1 });
    } else {
      map.flyTo([16.0544, 107.8], 6, { duration: 1 });
    }
  }, [offers, selectedRegion, isEn, onSelectOffer]);

  const handleFlyTo = (region: 'all' | 'north' | 'central' | 'south') => {
    const map = mapInstanceRef.current;
    if (!map) return;
    if (region === 'north') {
      map.flyTo([21.0285, 105.8542], 10, { duration: 1.2 });
    } else if (region === 'central') {
      map.flyTo([16.0544, 108.2022], 11, { duration: 1.2 });
    } else if (region === 'south') {
      map.flyTo([10.7769, 106.7009], 10, { duration: 1.2 });
    } else {
      map.flyTo([16.0544, 107.8], 6, { duration: 1.2 });
    }
  };

  // Thống kê phân bổ cụm trạm theo khu vực
  const clusterStats = React.useMemo(() => {
    const north = offers.filter((o) => o.region_zone === 'north').length;
    const central = offers.filter((o) => o.region_zone === 'central').length;
    const south = offers.filter((o) => o.region_zone === 'south').length;
    return { north, central, south, total: offers.length };
  }, [offers]);

  return (
    <div className="bg-white dark:bg-charcoal-900 rounded-3xl p-5 sm:p-6 border border-forest-100 dark:border-forest-800 shadow-sm space-y-4 transition-colors">
      
      {/* Map Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-forest-50 dark:border-forest-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
            <h3 className="font-serif font-bold text-base sm:text-lg text-forest-950 dark:text-cream-50 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <span>{isEn ? 'Interactive Community Plant Swap Map' : 'Bản Đồ Số Trực Quan Trạm Đổi Cây 3 Miền'}</span>
            </h3>
          </div>
          <p className="text-xs text-forest-700 dark:text-forest-300 mt-0.5">
            {isEn
              ? `Displaying ${activeStationCount} active exchange & giveaway stations across Vietnam.`
              : `Hiển thị ${activeStationCount} điểm hẹn chia sẻ cành giâm và hạt giống sạch đang hoạt động.`}
          </p>
        </div>

        {/* Quick Region View Buttons with Cluster Counts */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 hidden sm:inline mr-1">
            <Navigation className="w-3 h-3 inline mr-1" />
            {isEn ? 'Cluster Jump:' : 'Gom cụm:'}
          </span>
          <button
            onClick={() => handleFlyTo('north')}
            className="px-2.5 py-1 rounded-xl bg-forest-50 dark:bg-charcoal-800 hover:bg-forest-100 dark:hover:bg-charcoal-700 text-forest-900 dark:text-cream-100 text-xs font-medium border border-forest-200 dark:border-forest-700 transition flex items-center gap-1.5"
          >
            <span>{isEn ? 'North' : 'Bắc'}</span>
            <span className="px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">{clusterStats.north}</span>
          </button>
          <button
            onClick={() => handleFlyTo('central')}
            className="px-2.5 py-1 rounded-xl bg-forest-50 dark:bg-charcoal-800 hover:bg-forest-100 dark:hover:bg-charcoal-700 text-forest-900 dark:text-cream-100 text-xs font-medium border border-forest-200 dark:border-forest-700 transition flex items-center gap-1.5"
          >
            <span>{isEn ? 'Central' : 'Trung'}</span>
            <span className="px-1.5 py-0.2 rounded-full bg-blue-100 text-blue-800 text-[10px] font-bold">{clusterStats.central}</span>
          </button>
          <button
            onClick={() => handleFlyTo('south')}
            className="px-2.5 py-1 rounded-xl bg-forest-50 dark:bg-charcoal-800 hover:bg-forest-100 dark:hover:bg-charcoal-700 text-forest-900 dark:text-cream-100 text-xs font-medium border border-forest-200 dark:border-forest-700 transition flex items-center gap-1.5"
          >
            <span>{isEn ? 'South' : 'Nam'}</span>
            <span className="px-1.5 py-0.2 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold">{clusterStats.south}</span>
          </button>
          <button
            onClick={() => handleFlyTo('all')}
            className="px-2.5 py-1 rounded-xl bg-forest-900 text-white text-xs font-medium hover:bg-forest-800 transition flex items-center gap-1.5"
          >
            <span>{isEn ? 'All Vietnam' : 'Toàn Quốc'}</span>
            <span className="px-1.5 py-0.2 rounded-full bg-white/20 text-white text-[10px] font-bold">{clusterStats.total}</span>
          </button>
        </div>
      </div>

      {/* Map Canvas */}
      <div className="relative w-full h-[380px] sm:h-[450px] rounded-2xl overflow-hidden border border-forest-100 dark:border-forest-800 shadow-inner z-0">
        <div ref={mapContainerRef} className="w-full h-full" />
      </div>

      {/* Map Legend & Safety Standard H8 Disclaimer */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 text-xs text-forest-700 dark:text-forest-300">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-emerald-600 border border-white shadow-xs"></span>
            <span>{isEn ? 'Free Giveaway (0đ)' : 'Tặng Miễn Phí (0đ)'}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-blue-600 border border-white shadow-xs"></span>
            <span>{isEn ? 'Direct Exchange' : 'Trao Đổi Cây'}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-amber-600 border border-white shadow-xs"></span>
            <span>{isEn ? 'Seeking Variety' : 'Cần Tìm Giống'}</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-forest-600 dark:text-forest-400 text-[11px]">
          <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span>
            {isEn
              ? 'Privacy Standard H8: Pin locations are fuzzed to district centers—no private home GPS stored.'
              : 'Tiêu chuẩn bảo mật H8: Tọa độ đã làm mờ theo tâm Quận/Huyện—tuyệt đối không lưu GPS nhà riêng.'}
          </span>
        </div>
      </div>

    </div>
  );
};
