import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Home,
  ChevronRight,
  Plus,
  Calendar,
  Sparkles,
  Camera,
  Layers,
  Leaf,
  Clock,
  Check,
  Upload,
  Loader2,
  X,
  ArrowRight,
  MapPin
} from 'lucide-react';
import { UserGarden, GardenPlant, PlantDiaryEntry, PlantGrowthStatus } from '../types/index.ts';
import { SEED_PLANTS } from '../data/plants.ts';
import {
  getGardenData,
  addGardenPlant,
  addPlantDiaryEntry,
  uploadPlantImage
} from '../services/apiService.ts';
import { useSEO } from '../utils/useSEO.ts';

export const GardenPage: React.FC = () => {
  useSEO({
    title: 'Vườn Số Của Tôi & Nhật Ký Cây Trồng Đô Thị | Yêu Trồng Cây',
    description: 'Quản lý khu vườn ban công sân thượng cá nhân: theo dõi sự lớn lên của từng chậu cây qua dòng thời gian ảnh Before/After và lưu trữ nhật ký chăm sóc bền vững.',
  });

  const [garden, setGarden] = useState<UserGarden | null>(null);
  const [plants, setPlants] = useState<GardenPlant[]>([]);
  const [diaries, setDiaries] = useState<PlantDiaryEntry[]>([]);
  const [activeTab, setActiveTab] = useState<'plants' | 'timeline'>('plants');
  const [selectedPlantId, setSelectedPlantId] = useState<string | null>(null);

  // Modal: Thêm Cây Mới
  const [isAddPlantOpen, setIsAddPlantOpen] = useState(false);
  const [newCustomName, setNewCustomName] = useState('');
  const [newSelectedSeedId, setNewSelectedSeedId] = useState('');
  const [newPlantedDate, setNewPlantedDate] = useState(new Date().toISOString().split('T')[0]);
  const [newPotType, setNewPotType] = useState('Chậu nhựa thông minh 35cm');
  const [newPlantStatus, setNewPlantStatus] = useState<PlantGrowthStatus>('healthy');
  const [newNotes, setNewNotes] = useState('');
  const [plantCoverUrl, setPlantCoverUrl] = useState('');
  const [isUploadingPlantCover, setIsUploadingPlantCover] = useState(false);
  const plantFileInputRef = useRef<HTMLInputElement>(null);

  // Modal: Ghi Nhật Ký Ảnh
  const [isAddDiaryOpen, setIsAddDiaryOpen] = useState(false);
  const [diaryPlantId, setDiaryPlantId] = useState('');
  const [diaryDate, setDiaryDate] = useState(new Date().toISOString().split('T')[0]);
  const [diaryStage, setDiaryStage] = useState('Đậu quả non');
  const [diaryNote, setDiaryNote] = useState('');
  const [diaryImageUrl, setDiaryImageUrl] = useState('');
  const [isUploadingDiary, setIsUploadingDiary] = useState(false);
  const diaryFileInputRef = useRef<HTMLInputElement>(null);

  // Tải dữ liệu vườn
  useEffect(() => {
    let isMounted = true;
    getGardenData().then(({ garden: g, plants: p, diaries: d }) => {
      if (isMounted) {
        setGarden(g);
        setPlants(p);
        setDiaries(d);
        if (p.length > 0 && !diaryPlantId) {
          setDiaryPlantId(p[0].id);
        }
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  // Tự động điền ảnh và tên loài khi chọn từ danh mục 50 loài chuẩn
  const handleSelectSeedPlant = (seedId: string) => {
    setNewSelectedSeedId(seedId);
    if (!seedId) return;
    const found = SEED_PLANTS.find((p) => p.id === seedId);
    if (found) {
      if (!newCustomName) setNewCustomName(found.common_name);
      setPlantCoverUrl(found.image_url);
    }
  };

  // Upload ảnh cây đại diện
  const handlePlantCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploadingPlantCover(true);
    const res = await uploadPlantImage(file);
    setIsUploadingPlantCover(false);
    if (res.success && res.url) {
      setPlantCoverUrl(res.url);
    }
  };

  // Upload ảnh nhật ký
  const handleDiaryPhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploadingDiary(true);
    const res = await uploadPlantImage(file);
    setIsUploadingDiary(false);
    if (res.success && res.url) {
      setDiaryImageUrl(res.url);
    }
  };

  // Lưu cây mới
  const handleSubmitNewPlant = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCustomName.trim()) {
      alert('Vui lòng nhập tên cho cây của bạn.');
      return;
    }

    const payload: Partial<GardenPlant> = {
      garden_id: garden?.id || 'gdn-default-01',
      plant_id: newSelectedSeedId || undefined,
      custom_name: newCustomName.trim(),
      species_name: SEED_PLANTS.find((p) => p.id === newSelectedSeedId)?.scientific_name,
      planted_date: newPlantedDate,
      pot_type: newPotType,
      current_status: newPlantStatus,
      cover_image_url: plantCoverUrl || 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Leaf_-pani_koorkka.JPG/330px-Leaf_-pani_koorkka.JPG?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
      notes: newNotes,
    };

    const res = await addGardenPlant(payload);
    if (res.success && res.data) {
      const updated = [res.data, ...plants];
      setPlants(updated);
      localStorage.setItem('ytc_garden_plants', JSON.stringify(updated));
      setIsAddPlantOpen(false);
      setNewCustomName('');
      setNewNotes('');
      setPlantCoverUrl('');
    }
  };

  // Lưu nhật ký mới
  const handleSubmitNewDiary = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!diaryPlantId || !diaryNote.trim() || !diaryImageUrl) {
      alert('Vui lòng chọn cây, nhập ghi chú và tải ảnh nhật ký.');
      return;
    }

    const payload: Partial<PlantDiaryEntry> = {
      garden_plant_id: diaryPlantId,
      user_id: garden?.user_id || 'usr-local-me',
      entry_date: diaryDate,
      stage: diaryStage,
      note: diaryNote.trim(),
      image_url: diaryImageUrl,
    };

    const res = await addPlantDiaryEntry(payload);
    if (res.success && res.data) {
      const updated = [res.data, ...diaries];
      setDiaries(updated);
      localStorage.setItem('ytc_garden_diaries', JSON.stringify(updated));
      setIsAddDiaryOpen(false);
      setDiaryNote('');
      setDiaryImageUrl('');
    }
  };

  // Tính số ngày đã trồng
  const calculateDaysPlanted = (dateStr: string) => {
    try {
      const planted = new Date(dateStr).getTime();
      const now = new Date().getTime();
      const diff = Math.max(0, Math.floor((now - planted) / (1000 * 60 * 60 * 24)));
      return diff;
    } catch {
      return 0;
    }
  };

  const statusLabelMap: Record<PlantGrowthStatus, { label: string; color: string }> = {
    healthy: { label: 'Đang phát triển xanh tốt', color: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
    flowering: { label: 'Đang trổ hoa bói', color: 'bg-pink-100 text-pink-800 border-pink-200' },
    fruiting: { label: 'Đang đậu quả mọng', color: 'bg-amber-100 text-amber-800 border-amber-200' },
    recovering: { label: 'Hồi phục sau bệnh', color: 'bg-blue-100 text-blue-800 border-blue-200' },
    dormant: { label: 'Nghỉ đông / Chờ đâm chồi', color: 'bg-gray-100 text-gray-800 border-gray-200' },
  };

  return (
    <div className="min-h-screen bg-cream-100 flex flex-col">
      {/* 1. Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 w-full">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-forest-700">
          <Link to="/" target="_blank" rel="noopener noreferrer" className="hover:text-forest-950 flex items-center gap-1 transition">
            <Home className="w-3.5 h-3.5" />
            <span>Trang Chủ</span>
          </Link>
          <ChevronRight className="w-3 h-3 text-forest-400 shrink-0" />
          <span className="font-bold text-forest-950 flex items-center gap-1">
            <Leaf className="w-3.5 h-3.5 text-herbal-600" />
            <span>Vườn Số Của Tôi (Digital Garden)</span>
          </span>
        </nav>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 flex-1 w-full space-y-8">
        {/* 2. Garden Hero & Stats Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-forest-100 shadow-sm relative overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-herbal-50 text-herbal-800 text-xs font-semibold border border-herbal-200">
                <Sparkles className="w-3.5 h-3.5 text-herbal-600" />
                <span>Hồ Sơ Nông Nghiệp Đô Thị</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-forest-950 tracking-tight">
                {garden?.garden_name || 'Vườn Ban Công Của Tôi'}
              </h1>
              <p className="text-xs sm:text-sm text-forest-700 max-w-2xl leading-relaxed">
                {garden?.description || 'Khu vườn nhỏ phủ xanh ban công đô thị, theo dõi hành trình lớn lên của từng mầm cây qua ảnh chụp thời gian thực.'}
              </p>
              <div className="flex items-center gap-3 pt-1 text-xs text-forest-600">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600" /> {garden?.city || 'TP. Hồ Chí Minh'}
                </span>
                <span className="w-1 h-1 rounded-full bg-forest-300"></span>
                <span>Loại vườn: {garden?.garden_type === 'balcony' ? 'Ban công chung cư' : 'Sân thượng'}</span>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setIsAddPlantOpen(true)}
                className="px-5 py-2.5 rounded-2xl bg-forest-900 hover:bg-forest-950 text-white text-xs font-bold shadow-md hover:shadow-lg transition flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4 text-herbal-400" />
                <span>Thêm Cây Mới</span>
              </button>
              <button
                onClick={() => setIsAddDiaryOpen(true)}
                className="px-5 py-2.5 rounded-2xl bg-herbal-50 hover:bg-herbal-100 text-herbal-900 text-xs font-bold border border-herbal-200 transition flex items-center gap-1.5"
              >
                <Camera className="w-4 h-4 text-herbal-700" />
                <span>Ghi Nhật Ký Ảnh</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-forest-50">
            <div className="bg-forest-50/60 p-4 rounded-2xl border border-forest-100">
              <span className="text-[11px] font-semibold text-forest-700">Tổng Số Cây Đang Trồng</span>
              <p className="text-2xl font-serif font-bold text-forest-950 mt-0.5">{plants.length}</p>
            </div>
            <div className="bg-forest-50/60 p-4 rounded-2xl border border-forest-100">
              <span className="text-[11px] font-semibold text-forest-700">Cây Đậu Quả / Trổ Hoa</span>
              <p className="text-2xl font-serif font-bold text-amber-700 mt-0.5">
                {plants.filter((p) => p.current_status === 'fruiting' || p.current_status === 'flowering').length}
              </p>
            </div>
            <div className="bg-forest-50/60 p-4 rounded-2xl border border-forest-100">
              <span className="text-[11px] font-semibold text-forest-700">Mốc Nhật Ký Đã Lưu</span>
              <p className="text-2xl font-serif font-bold text-herbal-700 mt-0.5">{diaries.length}</p>
            </div>
            <div className="bg-forest-50/60 p-4 rounded-2xl border border-forest-100">
              <span className="text-[11px] font-semibold text-forest-700">Tuân Thủ An Toàn H7</span>
              <p className="text-sm font-bold text-emerald-800 mt-1.5 flex items-center gap-1">
                <Check className="w-4 h-4 text-emerald-600" /> Tẩy EXIF Sạch Sẽ
              </p>
            </div>
          </div>
        </div>

        {/* 3. Navigation Tabs: Cây Trong Vườn vs Dòng Thời Gian Nhật Ký */}
        <div className="flex items-center gap-2 border-b border-forest-100 pb-3">
          <button
            onClick={() => setActiveTab('plants')}
            className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold transition flex items-center gap-1.5 ${
              activeTab === 'plants'
                ? 'bg-forest-900 text-white shadow-xs'
                : 'bg-white text-forest-800 hover:bg-forest-50 border border-forest-100'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Cây Trong Vườn ({plants.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('timeline')}
            className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold transition flex items-center gap-1.5 ${
              activeTab === 'timeline'
                ? 'bg-forest-900 text-white shadow-xs'
                : 'bg-white text-forest-800 hover:bg-forest-50 border border-forest-100'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Dòng Thời Gian Ảnh Before/After ({diaries.length})</span>
          </button>
        </div>

        {/* 4. Tab 1: Plants Grid */}
        {activeTab === 'plants' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plants.map((plant) => {
              const days = calculateDaysPlanted(plant.planted_date);
              const plantDiaries = diaries.filter((d) => d.garden_plant_id === plant.id);

              return (
                <div
                  key={plant.id}
                  className="bg-white rounded-3xl overflow-hidden border border-forest-100 shadow-sm hover:shadow-md transition flex flex-col justify-between group"
                >
                  <div>
                    {/* Plant Image & Status */}
                    <div className="relative aspect-[16/10] bg-forest-900 overflow-hidden">
                      <img
                        src={plant.cover_image_url}
                        alt={plant.custom_name}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      />
                      <div className="absolute top-3 left-3">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold shadow-xs border ${
                            statusLabelMap[plant.current_status]?.color || 'bg-white text-forest-900'
                          }`}
                        >
                          {statusLabelMap[plant.current_status]?.label}
                        </span>
                      </div>
                      <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded-full bg-forest-950/80 backdrop-blur-xs text-white text-[10px] font-semibold">
                        Đã trồng {days} ngày
                      </div>
                    </div>

                    {/* Plant Info */}
                    <div className="p-5 space-y-2.5">
                      <h3 className="font-serif font-bold text-lg text-forest-950 leading-snug">
                        {plant.custom_name}
                      </h3>
                      {plant.species_name && (
                        <p className="text-xs italic text-herbal-700 font-serif">
                          {plant.species_name}
                        </p>
                      )}
                      <p className="text-xs text-forest-700/80 line-clamp-2 leading-relaxed">
                        {plant.notes || 'Cây được chăm sóc tự nhiên trong chậu ban công.'}
                      </p>

                      <div className="pt-2 text-[11px] text-forest-600 flex items-center justify-between border-t border-forest-50">
                        <span>Chậu: {plant.pot_type}</span>
                        <span>{plantDiaries.length} mốc ảnh</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Actions */}
                  <div className="p-4 bg-cream-50/50 border-t border-forest-100 flex items-center justify-between gap-2">
                    <button
                      onClick={() => {
                        setDiaryPlantId(plant.id);
                        setIsAddDiaryOpen(true);
                      }}
                      className="px-3.5 py-1.5 rounded-xl bg-forest-900 text-white text-xs font-semibold hover:bg-forest-950 transition flex items-center gap-1"
                    >
                      <Camera className="w-3.5 h-3.5 text-herbal-400" />
                      <span>Thêm ảnh</span>
                    </button>

                    <button
                      onClick={() => {
                        setSelectedPlantId(plant.id);
                        setActiveTab('timeline');
                      }}
                      className="px-3.5 py-1.5 rounded-xl bg-white border border-forest-200 text-forest-900 text-xs font-semibold hover:bg-forest-50 transition flex items-center gap-1"
                    >
                      <span>Xem nhật ký</span>
                      <ArrowRight className="w-3.5 h-3.5 text-forest-500" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* 5. Tab 2: Chronological Photo Timeline & Progression */}
        {activeTab === 'timeline' && (
          <div className="space-y-6">
            {selectedPlantId && (
              <div className="p-4 rounded-2xl bg-herbal-50 border border-herbal-200 flex items-center justify-between">
                <span className="text-xs font-bold text-herbal-900">
                  Đang lọc nhật ký của: {plants.find((p) => p.id === selectedPlantId)?.custom_name}
                </span>
                <button
                  onClick={() => setSelectedPlantId(null)}
                  className="text-xs text-herbal-700 hover:text-herbal-900 font-semibold underline"
                >
                  Xem tất cả cây
                </button>
              </div>
            )}

            <div className="space-y-6">
              {diaries
                .filter((d) => !selectedPlantId || d.garden_plant_id === selectedPlantId)
                .map((entry) => {
                  const targetPlant = plants.find((p) => p.id === entry.garden_plant_id);

                  return (
                    <div
                      key={entry.id}
                      className="bg-white rounded-3xl p-6 border border-forest-100 shadow-sm flex flex-col md:flex-row gap-6 items-start hover:border-forest-200 transition"
                    >
                      {/* Photo */}
                      <div className="w-full md:w-64 aspect-[4/3] rounded-2xl overflow-hidden bg-forest-900 shrink-0">
                        <img
                          src={entry.image_url}
                          alt={entry.stage}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-herbal-100 text-herbal-900 border border-herbal-200">
                            {entry.stage}
                          </span>
                          <span className="text-xs text-gray-500 flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" /> {entry.entry_date}
                          </span>
                          {targetPlant && (
                            <span className="text-xs font-bold text-forest-900 bg-forest-50 px-2.5 py-0.5 rounded-full border border-forest-100">
                              {targetPlant.custom_name}
                            </span>
                          )}
                        </div>

                        <p className="text-sm text-forest-800 leading-relaxed pt-1">
                          {entry.note}
                        </p>

                        <div className="pt-2 text-[11px] text-gray-400 flex items-center gap-1">
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Đã lưu vết ảnh sạch EXIF (Móc nối H7)</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}
      </main>

      {/* 6. Modal: Thêm Cây Vào Vườn */}
      {isAddPlantOpen && (
        <div className="fixed inset-0 z-50 bg-forest-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-forest-100 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-forest-100">
              <h3 className="text-lg font-serif font-bold text-forest-950 flex items-center gap-2">
                <Leaf className="w-5 h-5 text-herbal-600" />
                <span>Thêm Cây Mới Vào Vườn</span>
              </h3>
              <button
                onClick={() => setIsAddPlantOpen(false)}
                className="p-1 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-forest-50"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitNewPlant} className="space-y-4 text-xs">
              {/* Chọn cây từ 50 loài có sẵn */}
              <div>
                <label className="block font-bold text-forest-900 mb-1">
                  Chọn từ danh mục 50 loài chuẩn hóa (hoặc tự nhập bên dưới):
                </label>
                <select
                  value={newSelectedSeedId}
                  onChange={(e) => handleSelectSeedPlant(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-forest-200 text-xs text-forest-950 bg-white"
                >
                  <option value="">-- Tự nhập cây riêng của tôi --</option>
                  {SEED_PLANTS.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.common_name} ({p.scientific_name})
                    </option>
                  ))}
                </select>
              </div>

              {/* Tên thân mật đặt cho cây */}
              <div>
                <label className="block font-bold text-forest-900 mb-1">
                  Tên cây của bạn *
                </label>
                <input
                  type="text"
                  required
                  placeholder="VD: Chậu Ổi Lê Ban Công, Khóm Húng Chanh Trị Ho..."
                  value={newCustomName}
                  onChange={(e) => setNewCustomName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-forest-200 text-xs text-forest-950"
                />
              </div>

              {/* Ngày trồng & Loại chậu */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-forest-900 mb-1">Ngày bắt đầu trồng</label>
                  <input
                    type="date"
                    value={newPlantedDate}
                    onChange={(e) => setNewPlantedDate(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-forest-200 text-xs text-forest-950 bg-white"
                  />
                </div>
                <div>
                  <label className="block font-bold text-forest-900 mb-1">Loại chậu trồng</label>
                  <input
                    type="text"
                    value={newPotType}
                    onChange={(e) => setNewPotType(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-forest-200 text-xs text-forest-950"
                  />
                </div>
              </div>

              {/* Trạng thái sinh trưởng */}
              <div>
                <label className="block font-bold text-forest-900 mb-1">Trạng thái hiện tại</label>
                <select
                  value={newPlantStatus}
                  onChange={(e) => setNewPlantStatus(e.target.value as any)}
                  className="w-full px-3 py-2.5 rounded-xl border border-forest-200 text-xs text-forest-950 bg-white"
                >
                  <option value="healthy">Đang phát triển xanh tốt</option>
                  <option value="flowering">Đang trổ hoa bói</option>
                  <option value="fruiting">Đang đậu quả mọng</option>
                  <option value="recovering">Hồi phục sau bệnh</option>
                  <option value="dormant">Nghỉ đông / Chờ đâm chồi</option>
                </select>
              </div>

              {/* Ảnh đại diện */}
              <div>
                <label className="block font-bold text-forest-900 mb-1">Ảnh đại diện chậu cây</label>
                <div className="flex items-center gap-3">
                  <input
                    type="file"
                    ref={plantFileInputRef}
                    accept="image/*"
                    onChange={handlePlantCoverUpload}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => plantFileInputRef.current?.click()}
                    disabled={isUploadingPlantCover}
                    className="px-4 py-2 rounded-xl bg-forest-50 hover:bg-forest-100 border border-forest-200 text-forest-800 text-xs font-semibold flex items-center gap-1.5"
                  >
                    {isUploadingPlantCover ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-herbal-600" />
                    ) : (
                      <Upload className="w-3.5 h-3.5 text-herbal-600" />
                    )}
                    <span>Tải ảnh từ máy (Tự tẩy EXIF)</span>
                  </button>
                  {plantCoverUrl && (
                    <span className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
                      <Check className="w-3 h-3" /> Đã có ảnh
                    </span>
                  )}
                </div>
              </div>

              {/* Ghi chú */}
              <div>
                <label className="block font-bold text-forest-900 mb-1">Ghi chú về nguồn gốc / dinh dưỡng</label>
                <textarea
                  rows={2}
                  placeholder="VD: Cành giâm xin từ bạn Minh Hiệp Bình Chánh, bón trùn quế..."
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-forest-200 text-xs text-forest-950"
                />
              </div>

              {/* Buttons */}
              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddPlantOpen(false)}
                  className="px-4 py-2 rounded-xl border border-forest-200 text-xs font-semibold text-forest-800"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-forest-900 hover:bg-forest-950 text-white text-xs font-bold shadow-md"
                >
                  Lưu Vào Vườn
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 7. Modal: Ghi Nhật Ký Ảnh */}
      {isAddDiaryOpen && (
        <div className="fixed inset-0 z-50 bg-forest-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-forest-100 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-forest-100">
              <h3 className="text-lg font-serif font-bold text-forest-950 flex items-center gap-2">
                <Camera className="w-5 h-5 text-herbal-600" />
                <span>Ghi Nhật Ký Ảnh Theo Dõi Cây</span>
              </h3>
              <button
                onClick={() => setIsAddDiaryOpen(false)}
                className="p-1 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-forest-50"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitNewDiary} className="space-y-4 text-xs">
              {/* Chọn cây ghi nhật ký */}
              <div>
                <label className="block font-bold text-forest-900 mb-1">Chọn cây theo dõi *</label>
                <select
                  value={diaryPlantId}
                  onChange={(e) => setDiaryPlantId(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-forest-200 text-xs text-forest-950 bg-white"
                >
                  {plants.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.custom_name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Ngày & Giai đoạn */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-forest-900 mb-1">Ngày ghi nhật ký</label>
                  <input
                    type="date"
                    value={diaryDate}
                    onChange={(e) => setDiaryDate(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-forest-200 text-xs text-forest-950 bg-white"
                  />
                </div>
                <div>
                  <label className="block font-bold text-forest-900 mb-1">Giai đoạn</label>
                  <select
                    value={diaryStage}
                    onChange={(e) => setDiaryStage(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-forest-200 text-xs text-forest-950 bg-white"
                  >
                    <option value="Mới trồng / Cắm cành">Mới trồng / Cắm cành</option>
                    <option value="Đâm chồi nảy lộc">Đâm chồi nảy lộc</option>
                    <option value="Bấm ngọn kích nhánh">Bấm ngọn kích nhánh</option>
                    <option value="Trổ hoa bói">Trổ hoa bói</option>
                    <option value="Đậu quả non">Đậu quả non</option>
                    <option value="Thu hoạch đợt 1">Thu hoạch đợt 1</option>
                    <option value="Hồi sức sau cắt tỉa">Hồi sức sau cắt tỉa</option>
                  </select>
                </div>
              </div>

              {/* Tải ảnh nhật ký */}
              <div>
                <label className="block font-bold text-forest-900 mb-1">Ảnh chụp tiến triển *</label>
                <div className="flex items-center gap-3">
                  <input
                    type="file"
                    ref={diaryFileInputRef}
                    accept="image/*"
                    onChange={handleDiaryPhotoUpload}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => diaryFileInputRef.current?.click()}
                    disabled={isUploadingDiary}
                    className="px-4 py-2 rounded-xl bg-forest-50 hover:bg-forest-100 border border-forest-200 text-forest-800 text-xs font-semibold flex items-center gap-1.5"
                  >
                    {isUploadingDiary ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-herbal-600" />
                    ) : (
                      <Upload className="w-3.5 h-3.5 text-herbal-600" />
                    )}
                    <span>Tải ảnh lá / quả (Tự tẩy EXIF)</span>
                  </button>
                  {diaryImageUrl && (
                    <span className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
                      <Check className="w-3 h-3" /> Đã tải ảnh lên
                    </span>
                  )}
                </div>
              </div>

              {/* Ghi chú nhật ký */}
              <div>
                <label className="block font-bold text-forest-900 mb-1">Ghi chú tình trạng & phân bón *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="VD: Cây bật đọt non rất nhanh sau đợt mưa, đã tưới thêm dịch chuối pha loãng 1:20..."
                  value={diaryNote}
                  onChange={(e) => setDiaryNote(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-forest-200 text-xs text-forest-950"
                />
              </div>

              {/* Buttons */}
              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddDiaryOpen(false)}
                  className="px-4 py-2 rounded-xl border border-forest-200 text-xs font-semibold text-forest-800"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={!diaryImageUrl || !diaryNote.trim()}
                  className="px-6 py-2.5 rounded-xl bg-forest-900 hover:bg-forest-950 disabled:opacity-50 text-white text-xs font-bold shadow-md"
                >
                  Lưu Nhật Ký
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
