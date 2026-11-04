import React, { useState } from 'react';
import { X, Sprout, Plus, Droplets, Calendar, MapPin, Award, Sparkles } from 'lucide-react';
import { UserGardenPlant, UserProfile } from '../types/index.ts';
import { SEED_PLANTS } from '../data/plants.ts';

interface MyGardenModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  onOpenWeb3ForPlant?: (plantName: string) => void;
}

export const MyGardenModal: React.FC<MyGardenModalProps> = ({
  isOpen,
  onClose,
  user,
  onOpenWeb3ForPlant,
}) => {
  const [gardenPlants, setGardenPlants] = useState<UserGardenPlant[]>([
    {
      id: 'gp-01',
      plant_id: 'herb-01',
      plant_name: 'Húng Chanh Trị Ho',
      scientific_name: 'Plectranthus amboinicus',
      category: 'herb',
      planted_date: '2026-09-15',
      location: 'Ban công hướng Đông',
      image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Leaf_-pani_koorkka.JPG/330px-Leaf_-pani_koorkka.JPG?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
      watering_interval_days: 2,
      last_watered_date: 'Hôm nay',
      passport_token_id: '#7842',
    },
    {
      id: 'gp-02',
      plant_id: 'fruit-01',
      plant_name: 'Ổi Lê Đài Loan Chậu 50L',
      scientific_name: 'Psidium guajava',
      category: 'fruit',
      planted_date: '2026-06-10',
      location: 'Sân thượng tầng 4',
      image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Psidium_guajava_fruit.jpg/330px-Psidium_guajava_fruit.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
      watering_interval_days: 1,
      last_watered_date: 'Hôm qua',
    },
  ]);

  const [isAdding, setIsAdding] = useState(false);
  const [selectedSeedId, setSelectedSeedId] = useState(SEED_PLANTS[0].id);
  const [customLocation, setCustomLocation] = useState('Ban công');

  if (!isOpen) return null;

  const handleWaterPlant = (id: string) => {
    setGardenPlants((prev) =>
      prev.map((p) => (p.id === id ? { ...p, last_watered_date: 'Vừa tưới xong' } : p)),
    );
  };

  const handleAddNewPlant = (e: React.FormEvent) => {
    e.preventDefault();
    const seed = SEED_PLANTS.find((s) => s.id === selectedSeedId) || SEED_PLANTS[0];

    const newPlant: UserGardenPlant = {
      id: `gp-${Date.now()}`,
      plant_id: seed.id,
      plant_name: seed.common_name,
      scientific_name: seed.scientific_name,
      category: seed.category,
      planted_date: new Date().toISOString().split('T')[0],
      location: customLocation,
      image_url: seed.image_url,
      watering_interval_days: seed.watering === 'daily' ? 1 : 2,
      last_watered_date: 'Hôm nay',
    };

    setGardenPlants([newPlant, ...gardenPlants]);
    setIsAdding(false);
  };

  // Tính số ngày đã trồng
  const calculateDays = (dateStr: string) => {
    const planted = new Date(dateStr).getTime();
    const now = new Date().getTime();
    const diff = Math.floor((now - planted) / (1000 * 3600 * 24));
    return diff > 0 ? diff : 1;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal-900/60 backdrop-blur-sm overflow-y-auto animate-fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-forest-100 flex flex-col relative my-auto p-6 sm:p-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-forest-50 hover:bg-forest-100 text-forest-800 flex items-center justify-center transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Profile & Garden Header */}
        <div className="flex items-center gap-4 pb-6 border-b border-forest-100 mb-6">
          <img
            src={user.avatar_url}
            alt={user.name}
            className="w-14 h-14 rounded-2xl object-cover border-2 border-herbal-500 shadow-sm"
          />
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-serif font-bold text-forest-950 text-xl">{user.name}</h3>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-herbal-100 text-herbal-800 border border-herbal-200">
                {user.badge}
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-0.5">
              Khu Vườn Số: <strong className="text-forest-900">{gardenPlants.length} gốc cây</strong> • Điểm Karma: <strong className="text-herbal-600">{user.karma_points} điểm</strong>
            </p>
          </div>
        </div>

        {/* Actions Bar */}
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-serif font-bold text-forest-900 text-lg flex items-center gap-2">
            <Sprout className="w-5 h-5 text-herbal-600" />
            <span>Gia Tài Xanh Của Tôi</span>
          </h4>

          <button
            onClick={() => setIsAdding(!isAdding)}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-forest-900 hover:bg-forest-800 text-white flex items-center gap-1.5 shadow-sm transition"
          >
            <Plus className="w-4 h-4 text-herbal-400" />
            <span>Thêm Cây Mới</span>
          </button>
        </div>

        {/* Form: Add Plant into Garden */}
        {isAdding && (
          <form onSubmit={handleAddNewPlant} className="mb-6 p-4 rounded-2xl bg-cream-50 border border-forest-100 space-y-3 animate-fade-in text-xs">
            <span className="font-bold text-forest-900 block text-xs uppercase tracking-wider">
              Chọn cây giống muốn thêm vào Vườn:
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-gray-600 mb-1">Loài cây trong danh mục:</label>
                <select
                  value={selectedSeedId}
                  onChange={(e) => setSelectedSeedId(e.target.value)}
                  className="w-full p-2 bg-white border border-forest-200 rounded-xl text-xs focus:ring-2 focus:ring-herbal-500"
                >
                  {SEED_PLANTS.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.common_name} ({s.category === 'herb' ? 'Thảo dược' : s.category === 'fruit' ? 'Ăn quả' : 'Cảnh'})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-600 mb-1">Vị trí đặt chậu:</label>
                <input
                  type="text"
                  value={customLocation}
                  onChange={(e) => setCustomLocation(e.target.value)}
                  placeholder="Ví dụ: Ban công chung cư, Sân thượng..."
                  className="w-full p-2 bg-white border border-forest-200 rounded-xl text-xs focus:ring-2 focus:ring-herbal-500"
                  required
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="px-3 py-1.5 rounded-xl text-gray-500 hover:bg-gray-100"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-xl bg-forest-900 text-white font-medium hover:bg-forest-800"
              >
                Lưu Vào Vườn
              </button>
            </div>
          </form>
        )}

        {/* Plant List */}
        <div className="space-y-4">
          {gardenPlants.map((plant) => (
            <div
              key={plant.id}
              className="p-4 rounded-2xl border border-forest-100 bg-cream-50/50 hover:bg-cream-50 transition flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between"
            >
              <div className="flex items-center gap-3.5">
                <img
                  src={plant.image_url}
                  alt={plant.plant_name}
                  className="w-16 h-16 rounded-xl object-cover border border-forest-200 shrink-0"
                />
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h5 className="font-bold text-forest-950 text-sm">{plant.plant_name}</h5>
                    {plant.passport_token_id && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-amber-100 text-amber-800 border border-amber-200 flex items-center gap-1">
                        <Award className="w-3 h-3 text-amber-600" />
                        NFT {plant.passport_token_id}
                      </span>
                    )}
                  </div>
                  <p className="text-xs font-mono italic text-forest-700/80">{plant.scientific_name}</p>
                  <div className="flex items-center gap-3 text-[11px] text-gray-600">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-forest-600" /> {plant.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-herbal-600" /> Đã trồng {calculateDays(plant.planted_date)} ngày
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions for this plant */}
              <div className="flex items-center gap-2 w-full sm:w-auto justify-end pt-2 sm:pt-0 border-t sm:border-0 border-forest-100">
                <button
                  onClick={() => handleWaterPlant(plant.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1.5 transition ${
                    plant.last_watered_date === 'Vừa tưới xong'
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                      : 'bg-white hover:bg-blue-50 text-blue-700 border border-blue-200'
                  }`}
                >
                  <Droplets className="w-3.5 h-3.5 text-blue-500" />
                  <span>{plant.last_watered_date === 'Vừa tưới xong' ? 'Đã tưới nước' : 'Tưới Nước'}</span>
                </button>

                {!plant.passport_token_id && onOpenWeb3ForPlant && (
                  <button
                    onClick={() => {
                      onClose();
                      onOpenWeb3ForPlant(plant.plant_name);
                    }}
                    className="px-3 py-1.5 rounded-xl text-xs font-medium bg-terracotta-50 hover:bg-terracotta-100 text-terracotta-700 border border-terracotta-200 flex items-center gap-1"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-terracotta-600" />
                    <span>Đúc NFT</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
