# QUY CHUẨN KIẾN TRÚC CHO ANTIGRAVITY AI AGENTS

1. **Công nghệ Frontend**: Bắt buộc dùng `React 18/19` + `TypeScript` + `Vite` + `Tailwind CSS`.
2. **Quy tắc Code**:
   - Cấm dùng kiểu `any` trong TypeScript.
   - Luôn tuân theo strict mode (`tsc --noEmit` phải đạt 0 lỗi).
   - Component phân chia rõ ràng theo thư mục `src/components/` và `src/features/`.
3. **Quản lý trạng thái**: Sử dụng React Hooks tiêu chuẩn (`useState`, `useEffect`, `useMemo`, `useCallback`) hoặc `Zustand` khi cần state toàn cục.
4. **Icons**: Sử dụng duy nhất bộ icon `lucide-react`.
