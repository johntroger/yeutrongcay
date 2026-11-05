import React, { useState } from 'react';
import {
  Printer,
  X,
  BookOpen,
  Leaf,
  ShieldCheck,
  SplitSquareVertical,
  Layers
} from 'lucide-react';
import { UserGarden, GardenPlant, PlantDiaryEntry, PlantGrowthStatus } from '../types/index.ts';
import { useLanguage } from '../context/LanguageContext.tsx';
import { RegionKey } from '../data/seasonalCalendar.ts';

interface GardenBookPrintModalProps {
  isOpen: boolean;
  onClose: () => void;
  garden: UserGarden | null;
  plants: GardenPlant[];
  diaries: PlantDiaryEntry[];
  initialPlantId?: string | null;
  region?: RegionKey;
}

export const GardenBookPrintModal: React.FC<GardenBookPrintModalProps> = ({
  isOpen,
  onClose,
  garden,
  plants,
  diaries,
  initialPlantId = null,
  region = 'south',
}) => {
  const { isEn } = useLanguage();
  const [filterPlantId, setFilterPlantId] = useState<string | null>(initialPlantId);

  if (!isOpen) return null;

  const filteredPlants = filterPlantId
    ? plants.filter((p) => p.id === filterPlantId)
    : plants;

  const handlePrint = () => {
    window.print();
  };

  const statusMap: Record<PlantGrowthStatus, { vi: string; en: string }> = {
    healthy: { vi: 'Phát triển xanh tốt', en: 'Thriving & Healthy' },
    flowering: { vi: 'Đang trổ hoa', en: 'Flowering Stage' },
    fruiting: { vi: 'Đang đậu quả non', en: 'Fruiting Stage' },
    recovering: { vi: 'Đang hồi phục', en: 'Recovering Post-Pest' },
    dormant: { vi: 'Nghỉ đông / Chờ đâm chồi', en: 'Dormant' },
  };

  const regionNames: Record<RegionKey, { vi: string; en: string }> = {
    north: { vi: 'Miền Bắc (Khí hậu 4 mùa cận nhiệt đới)', en: 'Northern Region (Subtropical 4 seasons)' },
    central: { vi: 'Miền Trung (Duyên hải ven biển)', en: 'Central Region (Coastal microclimate)' },
    south: { vi: 'Miền Nam (Nhiệt đới 2 mùa mưa nắng)', en: 'Southern Region (Tropical wet & dry)' },
  };

  const todayStr = new Date().toLocaleDateString(isEn ? 'en-US' : 'vi-VN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto bg-forest-950/80 backdrop-blur-md flex flex-col items-center p-2 sm:p-6 animate-fade-in">
      
      {/* Print Specific CSS Overrides */}
      <style>{`
        @media print {
          body {
            background: white !important;
            color: #111827 !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          body * {
            visibility: hidden;
          }
          #printable-garden-book, #printable-garden-book * {
            visibility: visible;
          }
          #printable-garden-book {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            margin: 0 !important;
            padding: 12mm 15mm !important;
            background: white !important;
            color: #111827 !important;
            box-shadow: none !important;
            border: none !important;
          }
          .no-print {
            display: none !important;
          }
          .print-page-break {
            page-break-after: always;
            break-after: page;
          }
          .print-avoid-break {
            page-break-inside: avoid;
            break-inside: avoid;
          }
        }
      `}</style>

      {/* Top Floating Control Bar (Hidden during printing) */}
      <div className="no-print sticky top-2 z-10 w-full max-w-5xl mb-4 bg-white dark:bg-charcoal-900 border border-forest-100 dark:border-forest-700 rounded-2xl p-4 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-herbal-100 dark:bg-charcoal-800 text-herbal-700 dark:text-herbal-400 flex items-center justify-center font-bold">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif font-bold text-sm sm:text-base text-forest-950 dark:text-cream-50">
              {isEn ? 'Printable Garden Book & Dossier Preview' : 'Xem Trước Sổ Tay Vườn & Hồ Sơ Sinh Trưởng'}
            </h3>
            <p className="text-[11px] text-gray-500 dark:text-gray-400">
              {isEn
                ? 'Publication-quality layout formatted for A4 printing or PDF export.'
                : 'Định dạng chuẩn trang A4 in ấn chuyên nghiệp hoặc lưu trữ PDF sắc nét.'}
            </p>
          </div>
        </div>

        {/* Filter & Print Trigger Buttons */}
        <div className="flex items-center gap-2 flex-wrap justify-end w-full sm:w-auto">
          {/* Scope Selector */}
          <select
            value={filterPlantId || ''}
            onChange={(e) => setFilterPlantId(e.target.value ? e.target.value : null)}
            className="text-xs px-3 py-2 rounded-xl bg-forest-50 dark:bg-charcoal-800 border border-forest-200 dark:border-forest-700 font-semibold text-forest-900 dark:text-cream-100 focus:outline-none focus:ring-1 focus:ring-herbal-500"
          >
            <option value="">{isEn ? `Full Garden Book (${plants.length} plants)` : `Toàn bộ vườn (${plants.length} cây)`}</option>
            {plants.map((p) => (
              <option key={p.id} value={p.id}>
                {isEn ? `Plant: ${p.custom_name}` : `Cây: ${p.custom_name}`}
              </option>
            ))}
          </select>

          {/* Action Print Button */}
          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-xl bg-forest-900 hover:bg-forest-950 text-white font-bold text-xs flex items-center gap-2 shadow-sm transition"
          >
            <Printer className="w-4 h-4 text-herbal-400" />
            <span>{isEn ? 'Print / Save as PDF' : 'In / Tải Về PDF'}</span>
          </button>

          {/* Close */}
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-gray-500 hover:text-gray-900 dark:hover:text-cream-100 hover:bg-forest-100 dark:hover:bg-charcoal-700 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Printable Paper Canvas (Styled for Screen Preview + Exact Print Format) */}
      <div
        id="printable-garden-book"
        className="w-full max-w-4xl bg-white text-gray-900 shadow-2xl rounded-2xl sm:rounded-3xl p-6 sm:p-12 space-y-12 border border-forest-100"
      >
        
        {/* ==================================================== */}
        {/* SECTION 1: BOTANICAL PASSPORT COVER & REGISTRY PAGE  */}
        {/* ==================================================== */}
        <div className="print-page-break border-4 border-double border-forest-900/30 p-8 sm:p-12 rounded-3xl flex flex-col justify-between min-h-[500px] relative bg-gradient-to-b from-cream-50/50 to-white">
          
          {/* Header Guild Banner */}
          <div className="text-center space-y-2 border-b-2 border-forest-900/20 pb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-900 text-white text-[10px] uppercase font-bold tracking-widest">
              <span>yeutrongcay.com</span>
              <span>•</span>
              <span>{isEn ? 'URBAN BOTANICAL GUILD' : 'HỆ SINH THÁI NÔNG NGHIỆP ĐÔ THỊ'}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-serif font-black tracking-tight text-forest-950 uppercase pt-2">
              {isEn ? 'Urban Botanical Garden Book' : 'Sổ Tay Vườn Đô Thị & Hồ Sơ Cây'}
            </h1>
            <p className="text-xs text-forest-800 font-sans italic tracking-wide">
              {isEn
                ? 'Official growth dossier, plant passports, and seasonal care ledger'
                : 'Hồ sơ pháp lý sinh trưởng, lý lịch chậu cây và nhật ký nông vụ đô thị'}
            </p>
          </div>

          {/* Central Garden Identity Seal */}
          <div className="py-8 space-y-6">
            <div className="text-center space-y-1">
              <span className="text-[11px] uppercase font-bold text-gray-500 tracking-wider">
                {isEn ? 'Registered Garden Title' : 'Tên Khu Vườn Đăng Ký'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-forest-900">
                {garden?.garden_name || (isEn ? 'Balcony Sanctuary' : 'Vườn Ban Công Xanh')}
              </h2>
              <p className="text-xs text-gray-600">
                {garden?.description || (isEn ? 'Sustainable micro-climate urban sanctuary' : 'Không gian nông nghiệp đô thị vi khí hậu tự nhiên')}
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-cream-50 border border-forest-100 text-center">
              <div>
                <span className="text-[10px] uppercase font-bold text-gray-500 block">
                  {isEn ? 'Head Gardener' : 'Chủ Vườn'}
                </span>
                <span className="text-xs font-bold text-forest-900 block mt-0.5">
                  {garden?.user_name || (isEn ? 'Urban Botanist' : 'Người Làm Vườn')}
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-gray-500 block">
                  {isEn ? 'Location' : 'Khu Vực'}
                </span>
                <span className="text-xs font-bold text-forest-900 block mt-0.5">
                  {garden?.city || 'Hồ Chí Minh'}
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-gray-500 block">
                  {isEn ? 'Total Plants' : 'Số Lượng Chậu'}
                </span>
                <span className="text-xs font-bold text-emerald-800 block mt-0.5">
                  {plants.length} {isEn ? 'plants' : 'chậu'}
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-gray-500 block">
                  {isEn ? 'Issued Date' : 'Ngày Xuất Bản'}
                </span>
                <span className="text-xs font-bold text-forest-900 block mt-0.5">
                  {todayStr}
                </span>
              </div>
            </div>
          </div>

          {/* Regional Microclimate Seal */}
          <div className="border-t-2 border-forest-900/20 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-forest-900 text-white flex items-center justify-center font-bold text-base shrink-0">
                🌱
              </div>
              <div>
                <span className="font-bold text-forest-950 block">
                  {isEn ? 'Regional Climate Sector:' : 'Phân Khu Khí Hậu Nông Vụ:'}
                </span>
                <span className="text-forest-700 text-[11px]">
                  {regionNames[region][isEn ? 'en' : 'vi']}
                </span>
              </div>
            </div>

            <div className="text-right text-[10px] text-gray-500 font-mono">
              <span>CERT-REG: YTC-{garden?.id?.toUpperCase() || 'GDN-01'}</span>
              <br />
              <span>AUTHENTICITY: SHA-256 DIGITAL LEDGER</span>
            </div>
          </div>
        </div>

        {/* ==================================================== */}
        {/* SECTION 2: GARDEN PLANTS INVENTORY TABLE (MỤC LỤC)   */}
        {/* ==================================================== */}
        <div className="print-page-break space-y-4">
          <div className="flex items-center justify-between border-b border-gray-300 pb-2">
            <h3 className="font-serif font-bold text-lg text-forest-950 flex items-center gap-2">
              <Layers className="w-4 h-4 text-herbal-700" />
              <span>{isEn ? 'Balcony Plant Inventory & Care Index' : 'Danh Mục Thống Kê & Chu Kỳ Chăm Sóc Cây Trong Vườn'}</span>
            </h3>
            <span className="text-xs text-gray-500">
              {filteredPlants.length} {isEn ? 'registered containers' : 'chậu cây đã đăng ký'}
            </span>
          </div>

          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-forest-900 text-white font-bold">
                <th className="p-2.5 rounded-l-lg">#</th>
                <th className="p-2.5">{isEn ? 'Plant Name & Species' : 'Tên Cây & Giống'}</th>
                <th className="p-2.5">{isEn ? 'Pot Type' : 'Chậu Trồng'}</th>
                <th className="p-2.5">{isEn ? 'Planted Date' : 'Ngày Trồng'}</th>
                <th className="p-2.5">{isEn ? 'Growth Stage' : 'Trạng Thái'}</th>
                <th className="p-2.5">{isEn ? 'Water / Feed' : 'Chu Kỳ Tưới/Bón'}</th>
                <th className="p-2.5 rounded-r-lg text-right">{isEn ? 'Photo Logs' : 'Mốc Ảnh'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredPlants.map((plant, idx) => {
                const logsCount = diaries.filter((d) => d.garden_plant_id === plant.id).length;
                return (
                  <tr key={plant.id} className="hover:bg-cream-50/50">
                    <td className="p-2.5 font-bold text-gray-500">{idx + 1}</td>
                    <td className="p-2.5">
                      <span className="font-bold text-forest-950 block">{plant.custom_name}</span>
                      <span className="text-[10px] text-gray-500 italic">{plant.species_name || 'N/A'}</span>
                    </td>
                    <td className="p-2.5 text-gray-700">{plant.pot_type}</td>
                    <td className="p-2.5 text-gray-700 font-mono text-[11px]">{plant.planted_date}</td>
                    <td className="p-2.5">
                      <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-gray-100 text-gray-800">
                        {statusMap[plant.current_status][isEn ? 'en' : 'vi']}
                      </span>
                    </td>
                    <td className="p-2.5 text-gray-700">
                      <span>{plant.watering_interval_days || 1}d / {plant.fertilizing_interval_days || 14}d</span>
                    </td>
                    <td className="p-2.5 text-right font-bold text-herbal-700">
                      {logsCount} {isEn ? 'logs' : 'ảnh'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* ==================================================== */}
        {/* SECTION 3: INDIVIDUAL PLANT DOSSIERS & PHOTO LOGS    */}
        {/* ==================================================== */}
        <div className="space-y-8">
          <div className="flex items-center justify-between border-b border-gray-300 pb-2">
            <h3 className="font-serif font-bold text-lg text-forest-950 flex items-center gap-2">
              <Leaf className="w-4 h-4 text-herbal-700" />
              <span>{isEn ? 'Individual Plant Dossiers & Growth Milestones' : 'Hồ Sơ Chi Tiết & Dòng Thời Gian Lớn Lên'}</span>
            </h3>
            <span className="text-xs text-gray-500">
              {isEn ? 'Before/After Photographic Records' : 'Lưu Vết Ảnh Before/After'}
            </span>
          </div>

          {filteredPlants.map((plant, index) => {
            const plantLogs = diaries.filter((d) => d.garden_plant_id === plant.id);
            const initialPhoto = plant.cover_image_url;
            const initialDate = plant.planted_date;
            const latestEntry = plantLogs.length > 0 ? plantLogs[0] : null;
            const latestPhoto = latestEntry ? latestEntry.image_url : initialPhoto;
            const latestDate = latestEntry ? latestEntry.entry_date : initialDate;

            return (
              <div
                key={plant.id}
                className="print-avoid-break p-6 rounded-3xl border-2 border-forest-100 bg-white space-y-5"
              >
                {/* Dossier Header */}
                <div className="flex items-start justify-between border-b border-gray-200 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-forest-900 text-white text-xs font-bold flex items-center justify-center">
                        {index + 1}
                      </span>
                      <h4 className="text-xl font-serif font-bold text-forest-950">
                        {plant.custom_name}
                      </h4>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-herbal-100 text-herbal-900">
                        {statusMap[plant.current_status][isEn ? 'en' : 'vi']}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 italic mt-0.5 ml-8">
                      {plant.species_name || (isEn ? 'Urban Potted Plant' : 'Cây chậu ban công')} • {plant.pot_type}
                    </p>
                  </div>

                  <div className="text-right text-[11px] text-gray-500">
                    <span className="font-semibold block">{isEn ? 'Planted On:' : 'Ngày trồng:'} {plant.planted_date}</span>
                    <span className="text-emerald-700 font-bold block">{plantLogs.length} {isEn ? 'photo milestones' : 'mốc nhật ký ảnh'}</span>
                  </div>
                </div>

                {/* Notes and Parameters */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs bg-cream-50/70 p-4 rounded-2xl">
                  <div>
                    <span className="font-bold text-gray-500 block uppercase text-[10px]">
                      {isEn ? 'Watering Schedule' : 'Chu Kỳ Tưới'}
                    </span>
                    <span className="font-semibold text-forest-900">
                      {plant.watering_interval_days || 1} {isEn ? 'day(s)/time' : 'ngày/lần'}
                    </span>
                  </div>
                  <div>
                    <span className="font-bold text-gray-500 block uppercase text-[10px]">
                      {isEn ? 'Fertilization' : 'Dinh Dưỡng Phân Bón'}
                    </span>
                    <span className="font-semibold text-forest-900">
                      {plant.fertilizing_interval_days || 14} {isEn ? 'days/cycle' : 'ngày/kỳ bón'}
                    </span>
                  </div>
                  <div>
                    <span className="font-bold text-gray-500 block uppercase text-[10px]">
                      {isEn ? 'Gardener Notes' : 'Ghi Chú Cá Nhân'}
                    </span>
                    <span className="text-gray-700 italic">
                      {plant.notes || (isEn ? 'Naturally tended in balcony sunlight.' : 'Chăm sóc tự nhiên trên ban công.')}
                    </span>
                  </div>
                </div>

                {/* Before / After Photo Timeline */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-forest-950 flex items-center gap-1.5">
                    <SplitSquareVertical className="w-3.5 h-3.5 text-herbal-700" />
                    <span>{isEn ? 'Growth Journey: Day 1 vs Latest Milestone' : 'Hành Trình Lớn Lên: Ngày Đầu Trồng vs Mốc Mới Nhất'}</span>
                  </span>

                  <div className="grid grid-cols-2 gap-4">
                    {/* Day 1 Photo */}
                    <div className="p-3 rounded-2xl bg-gray-50 border border-gray-200 space-y-1.5">
                      <div className="aspect-[4/3] rounded-xl overflow-hidden bg-forest-900">
                        <img
                          src={initialPhoto}
                          alt="Day 1"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-bold text-gray-700">{isEn ? 'Day 1 Planting' : 'Ngày Đầu Trồng'}</span>
                        <span className="font-mono text-gray-500">{initialDate}</span>
                      </div>
                    </div>

                    {/* Latest Milestone Photo */}
                    <div className="p-3 rounded-2xl bg-herbal-50/50 border border-herbal-200 space-y-1.5">
                      <div className="aspect-[4/3] rounded-xl overflow-hidden bg-forest-900">
                        <img
                          src={latestPhoto}
                          alt="Latest"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-bold text-herbal-900">
                          {latestEntry ? latestEntry.stage : (isEn ? 'Current Status' : 'Hiện tại')}
                        </span>
                        <span className="font-mono text-gray-500">{latestDate}</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* ==================================================== */}
        {/* SECTION 4: EMERGENCY ORGANIC CLINIC & AUTHENTICITY   */}
        {/* ==================================================== */}
        <div className="print-avoid-break border-t-2 border-gray-300 pt-6 space-y-4">
          <div className="p-5 rounded-2xl bg-cream-50 border border-forest-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1">
              <h5 className="font-bold text-xs text-forest-950 uppercase tracking-wide flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>{isEn ? 'Botanical Integrity & Eco-Standard Verified' : 'Cam Kết Chuẩn Sinh Thái & Dược Liệu Sạch'}</span>
              </h5>
              <p className="text-[11px] text-gray-600">
                {isEn
                  ? 'Cultivated without chemical pesticides using 100% organic neem oil, biochar, and vermicompost in accordance with Yeu Trong Cay urban standards.'
                  : 'Canh tác hoàn toàn không hóa chất, sử dụng 100% dầu neem lạnh, trấu hun và phân trùn quế theo quy chuẩn vườn phố bền vững.'}
              </p>
            </div>

            <div className="text-center shrink-0">
              <span className="inline-block px-3 py-1 rounded-xl bg-forest-900 text-white font-mono text-[10px] font-bold">
                yeutrongcay.com
              </span>
            </div>
          </div>

          <div className="text-center text-[10px] text-gray-400">
            {isEn
              ? 'Published from Yeu Trong Cay (yeutrongcay.com) - The Sustainable Urban Gardening & AI Plant Health Platform.'
              : 'Tài liệu xuất bản từ hệ thống Yêu Trồng Cây (yeutrongcay.com) - Nền tảng Nông nghiệp Đô thị & Bác Sĩ Cây Trồng AI.'}
          </div>
        </div>

      </div>

    </div>
  );
};
