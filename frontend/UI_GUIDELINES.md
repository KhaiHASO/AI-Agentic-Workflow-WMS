# Dashcode UI/UX Guidelines

Tài liệu này định nghĩa các chuẩn mực thiết kế và phát triển giao diện cho dự án Dashcode (Next.js + Tailwind CSS).

## 1. Core Framework & Tech Stack
- **Framework:** Next.js (App Router), Tailwind CSS (v4).
- **Component Library:** Radix UI (được bọc trong thư mục `components/ui`).
- **Styling Method:** Tailwind Utility Classes kết hợp với `class-variance-authority` (CVA) cho các component variants.

## 2. Layout Structure (Các Class & Component bọc chính)
- **Cấu trúc Layout chính:** Sử dụng `LayoutProvider`, `DashCodeHeader`, `DashCodeSidebar`, `LayoutContentProvider`, `DashCodeFooter`.
- **Thành phần Sidebar:** `DashCodeSidebar`.
- **Thành phần Header:** `DashCodeHeader`.
- **Wrapper nội dung chính:** `LayoutContentProvider` lồng bên trong `LayoutProvider`.
- **Cấu trúc bao quanh ứng dụng:** `<body className="dashcode-app">`.

## 3. UI Components Standards

### A. Thẻ Card (`Card`)
Sử dụng các component trong `components/ui/card.tsx`:
- `<Card>`: Container chính (mặc định `rounded-lg bg-card`).
- `<CardHeader>`: Phần đầu của thẻ.
- `<CardTitle>`: Tiêu đề (class `text-2xl font-semibold`).
- `<CardDescription>`: Mô tả ngắn (class `text-sm text-muted-foreground`).
- `<CardContent>`: Phần nội dung chính (mặc định có `p-6`).
- `<CardFooter>`: Phần chân của thẻ.

### B. Bảng (`Table`)
Sử dụng các component trong `components/ui/table.tsx`:
- `<Table>`: Container cho bảng (`w-full caption-bottom text-sm`).
- `<TableHeader>`: Đầu bảng (`[&_tr]:border-b [&_tr]:border-t`).
- `<TableHead>`: Ô tiêu đề (`h-14 px-6 text-default-900 uppercase text-xs`).
- `<TableBody>`: Thân bảng.
- `<TableRow>`: Dòng bảng (`border-b border-default-100`).
- `<TableCell>`: Ô dữ liệu (`px-6 h-14 text-default-600 text-sm font-normal`).

### C. Nút bấm (`Button`)
Sử dụng `<Button>` từ `components/ui/button.tsx` với các props:
- **Colors:** `primary`, `secondary`, `success`, `info`, `warning`, `destructive`, `default`.
- **Variants:** `default` (filled), `outline`, `soft`, `ghost`, `shadow`.
- **Sizes:** `default`, `sm`, `md`, `lg`, `icon`.
- **Rounded:** `sm`, `md`, `lg`, `full`.

### D. Badge Trạng thái (`Badge`)
Sử dụng `<Badge>` từ `components/ui/badge.tsx`:
- **Colors:** `primary`, `secondary`, `success`, `info`, `warning`, `destructive`, `default`.
- **Rounded:** `sm`, `md`, `lg`, `full`.

### E. Form & Input
Sử dụng các component trong `components/ui/input.tsx` và `components/ui/form.tsx`:
- **Input:** `<Input />` (mặc định có class `h-10 border-default-200 focus:ring-primary`).
- **Form Wrapper:** Sử dụng `react-hook-form` tích hợp với `components/ui/form.tsx`.

## 4. Nguyên tắc Phát triển
- **KHÔNG** tự ý viết CSS inline trừ trường hợp bất khả kháng.
- **KHÔNG** tạo thêm class mới nếu Tailwind hoặc Component hiện tại đã có.
- **LUÔN LUÔN** kiểm tra `components/ui/` trước khi xây dựng UI mới để tái sử dụng component sẵn có.
