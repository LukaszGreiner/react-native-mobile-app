Plan: Zapasio - Complete Implementation Roadmap
This document outlines the step-by-step implementation for the Zapasio food inventory management app using Expo.

🏗️ Prerequisites: Project Setup (on main)
Before branching out, initialize the core environment:

Initialize Expo: Run npx create-expo-app@latest zapasio --template blank-typescript.

Install Dependencies:

expo-sqlite, expo-camera, expo-haptics, expo-router

jest-expo, @testing-library/react-native

Configure Expo Router: Set up file-based navigation in /app with a (tabs) group; update app.json with scheme and plugins.

Theme System: Create theme.ts.

Primary: #E67E22 (Orange)

Status: Success (#2ECC71), Warning (#FFA500), Danger (#E74C3C).

Git Flow: Create a develop branch from main to serve as the integration target.

# Zapasio - Complete Implementation Roadmap

A step-by-step implementation plan for building a food inventory management app with Expo, starting from a fresh `expo@latest` project. Work is organized by required feature branches with clear PR checkpoints to satisfy all Git, CI/CD, API, native, and documentation requirements.

---

## Prerequisites: Project Setup (on `main`)

1. **Initialize fresh Expo project**
   - Run: `npx create-expo-app@latest zapasio --template blank-typescript`
   - Add dependencies: `expo-sqlite`, `expo-camera`, `expo-haptics`, `expo-router`, `jest-expo`, `@testing-library/react-native`
2. **Configure expo-router**
   - Set up file-based navigation in `app/` with `(tabs)` group
   - Update `app.json` with scheme and plugins
3. **Set up theme system**
   - Create `theme.ts` with colors:

   colorPrimary = "#E67E22";
   colorSecondary = "#5D4037";
   colorBackground = "#FDFCF0";
   colorText = "#2C3E50";
   colorSuccess = "#2ECC71";
   colorWarning = "#FFA500";
   colorDanger = "#E74C3C";

4. **Create `develop` branch** from `main` (integration target for all feature branches)

---

## Branch 1: `feature/storage` - Local Database Layer

1. **Create database initialization service** in `services/database.ts`
   - Initialize SQLite database
   - Create `products` table with schema: `id`, `barcode`, `name`, `quantity`, `unit`, `expiry_date`, `category`
2. **Implement database operations**
   - Add helper functions: `initDB()`, `resetDB()`, raw query executor with error handling and logging
3. **Add database provider**
   - Create React Context in `contexts/DatabaseContext.tsx` to provide database instance to components
   - Initialize on app startup in `_layout.tsx`

**PR #1**: `feature/storage` → `develop` (Database foundation ready)

---

## Branch 2: `feature/api` - CRUD Service Layer

1. **Create product service** in `services/productService.ts`
   - Implement 5 required operations:
     - `getList()` - fetch all products sorted by `expiry_date` ASC
     - `getDetails(id)` - fetch single product by ID
     - `createItem(product)` - insert new product, return created ID
     - `updateItem(id, updates)` - partial update (quantity, etc.)
     - `deleteItem(id)` - remove product from database
2. **Add barcode lookup helper**
   - Implement `findByBarcode(barcode)` for scanner workflow (check if product with barcode already exists)
3. **Create API abstraction layer** in `services/api.ts`
   - Wrap productService with REST-like interface pattern
   - Add TypeScript types for `Product` entity in `types/product.ts`

**PR #2**: `feature/api` → `develop` (CRUD operations complete)

---

## Branch 3: `feature/ui` - User Interface

1. **Restructure tab navigation** in `app/(tabs)/_layout.tsx`
   - Configure 3 tabs: Dashboard (house icon), Skaner (camera icon, centered/prominent), Ustawienia (settings icon)
2. **Build Dashboard screen** in `app/(tabs)/index.tsx`
   - Replace hardcoded data with `productService.getList()` query
   - Add search bar with text filtering by name/category
   - Add "Tylko kończące się" filter toggle
   - Implement pull-to-refresh
3. **Create ProductCard component** in `components/ProductCard.tsx`
   - Left: `StatusIndicator` - calculate color from expiry date vs today (green: >7 days, yellow: 1-7 days, red: expired)
   - Center: Product name, category badge, formatted expiry date
   - Right: `QuantityControl` with +/- buttons, haptic feedback via `expo-haptics`
4. **Build Add/Edit Product form** in `modal.tsx` or `app/(tabs)/add.tsx`
   - Text inputs: name, quantity, barcode (read-only when from scanner)
   - Pickers: unit (`szt`, `kg`, `l`), category (Nabiał, Spiżarnia, Warzywa, etc.)
   - Native DatePicker for expiry date
   - Save/Cancel actions calling `createItem()` or `updateItem()`
5. **Create Settings screen** in `app/(tabs)/settings.tsx`
   - Display unit list and category list
   - Allow adding custom categories (store in separate SQLite table or AsyncStorage)
6. **Add delete functionality**
   - Swipe-to-delete on ProductCard or delete button in edit form with confirmation dialog

**PR #3**: `feature/ui` → `develop` (Full UI implemented)

---

## Branch 4: `feature/native` - Camera & Barcode Scanner

1. **Request camera permissions**
   - Add permission request flow using `expo-camera` `Camera.requestCameraPermissionsAsync()`
   - Handle denied state with message
2. **Build Scanner screen** in `app/(tabs)/scanner.tsx`
   - Full-screen camera view with `CameraView` component
   - Enable barcode scanning with `barcodeScannerSettings={{ barcodeTypes: ['ean13', 'ean8', 'upc_a'] }}`
   - Handle `onBarcodeScanned` event
3. **Implement scanner-to-form flow**
   - On barcode detected, query `findByBarcode(barcode)`
   - **If new**: Navigate to Add form with barcode pre-filled
   - **If exists**: Show alert "Dodać kolejną sztukę [Name]?" → quick +1 quantity update
4. **Add manual entry fallback**
   - Include "Wprowadź ręcznie" button on scanner screen to open form without barcode

**PR #4**: `feature/native` → `develop` (Native camera feature complete)

---

## Branch 5: `feature/tests` - Testing Suite

1. **Configure Jest**
   - Add `jest.config.js` with `jest-expo` preset
   - Configure module name mapper for path aliases
2. **Write database service tests** in `tests/services/database.test.ts`
   - Test `initDB()`, table creation, mock SQLite for unit tests
3. **Write CRUD service tests** in `tests/services/productService.test.ts`
   - Test all 5 operations: `getList`, `getDetails`, `createItem`, `updateItem`, `deleteItem`
4. **Write component tests** in `tests/components/`
   - Test `ProductCard` renders correctly
   - Test `QuantityControl` calls update function
   - Test `StatusIndicator` shows correct colors
5. **Add test script** to `package.json`
   - Ensure `npm test` runs Jest suite

**PR #5**: `feature/tests` → `develop` (Testing infrastructure complete)

---

## CI/CD Configuration (on `develop` before final merge)

1. **Create GitHub Actions workflow** in `.github/workflows/ci.yml`:
   - Lint: `npx expo lint`
   - Test: `npm test`
   - Build: `npx expo export` or `eas build --platform all --non-interactive`
2. **Validate pipeline**
   - Create test PR from `develop` → `main`, verify all checks pass (lint, test, build)

---

## Documentation (on `develop`)

1. **Write API documentation** in `docs/api.md`
   - Document SQLite schema, all CRUD operations with parameters and return types, usage examples
2. **Write native feature documentation** in `docs/native.md`
   - Describe barcode scanner implementation, permissions flow, supported barcode types
3. **Capture screenshots** in `docs/screenshots/`
   - Dashboard, Scanner, Add Form, Settings, Edit modal
4. **Update README.md** in project root
   - Project description, setup instructions, available scripts, architecture overview, screenshots

---

## Final Merge

**Final PR**: `develop` → `main` - comprehensive review, all CI checks green, complete project ready for submission.

---

## Summary: Branch → PR Map

| Branch          | Key Deliverables                               | PR Target |
| --------------- | ---------------------------------------------- | --------- |
| feature/storage | SQLite init, schema, DB context                | develop   |
| feature/api     | 5 CRUD operations, types, barcode lookup       | develop   |
| feature/ui      | 3 tabs, ProductCard, forms, search/filter      | develop   |
| feature/native  | Camera permissions, barcode scanner, scan flow | develop   |
| feature/tests   | Jest config, service tests, component tests    | develop   |
| develop         | CI/CD, documentation, final polish             | main      |

---

## Further Considerations

- **Categories storage:** Should categories be hardcoded, stored in SQLite (separate table), or use AsyncStorage for simplicity? **Recommendation:** SQLite `categories` table for consistency.
- **Quantity decimal handling:** The schema uses REAL—should the UI allow decimal input (0.5 kg) or just integer +/- steps? **Recommendation:** Integer steps for +/-, decimal input in form.
- **Empty states:** Should we design specific empty state UI (no products yet, no search results)? **Recommendation:** Yes, add friendly illustrations/messages.

---

## Action Items from Further Considerations

1. **Categories storage:**
   - Implement a separate `categories` table in SQLite for product categories.
   - Ensure category management (add/edit/delete) is available in the Settings screen.
   - Use SQLite for all category operations for consistency.

2. **Quantity decimal handling:**
   - Use integer steps (+/-) for quick quantity changes in the UI (e.g., ProductCard).
   - Allow decimal input for quantity in the Add/Edit Product form (e.g., 0.5 kg).
   - Validate and format decimal input appropriately in forms.

3. **Empty states:**
   - Design and implement friendly empty state UI for:
     - No products in inventory
     - No search results
   - Add illustrations and helpful messages to guide users in these states.
