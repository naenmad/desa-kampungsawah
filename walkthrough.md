# Walkthrough - Next.js & Laravel Backend Integration

We have successfully created and configured the Laravel backend with MySQL models, migrations, and seeders, documented all endpoints with Swagger OpenAPI attributes, and fully integrated the Next.js frontend with REST APIs.

---

## 1. Backend Features (Laravel & MySQL)

### Database Schemas & Migrations
- **User Accounts**: Updated `User` model, including pre-registering the administrator (`admin@kampungsawah.id`/`admin123`) using bcrypt hashing.
- **Village Contact**: Created schema for `village_contacts` table to manage address, phone, email, and working hours.
- **Homepage Configurations**: Created schema for dynamic landing page texts, titles, and village head info.
- **News**: Created schema for articles (`news`), categorizations, and dates.
- **Population Stats**: Created schema for `population_stats` containing demographic logs split by Dusun.
- **Apparatus Structure**: Created schema for `apparatuses` to map the organizational hierarchy.
- **Letter Requests**: Created schema for `letter_requests` with status states (`pending`, `approved`, `rejected`) and rejection reason support.
- **Complaints**: Created schema for citizen reports (`complaints`) supporting public anonymous/verified submissions and status tracking.
- **Inbox Messages**: Created schema for `inbox_messages` to handle "Hubungi Kami" submissions.

### Controller Implementation & Swagger Attributes
- Converted all controllers to use modern **PHP 8 Swagger attributes** (`#[OA\Get]`, `#[OA\Post]`, etc.) to generate clean JSON OpenAPI definitions.
- Set up a dummy schema metadata scanner file `Swagger.php` to define the OpenAPI application header.
- Verified document scan regeneration with `php artisan l5-swagger:generate` (growing size to 35.7KB).

### CORS & Security Settings
- Configured CORS rules to accept operations from the frontend client domain (`http://localhost:3000`) and handle Authorization tokens.
- Protected all mutation routes using Laravel Sanctum middleware.

---

## 2. Frontend Features (Next.js)

### Reusable API Client Helper
- Created [apiClient.ts](file:///Users/mac/Developer/personal/desa-kampungsawah/lib/apiClient.ts) to manage the API base URL, inject the dynamic Authorization token, and return clean JSON values.

### Hook & Page Integrations
- **Auth Page**: Updated the login page to call `POST /api/login`, store the token, and clear it on logout.
- **Service Hooks**: Updated [contactService.ts](file:///Users/mac/Developer/personal/desa-kampungsawah/lib/contactService.ts), [homepageService.ts](file:///Users/mac/Developer/personal/desa-kampungsawah/lib/homepageService.ts), [newsService.ts](file:///Users/mac/Developer/personal/desa-kampungsawah/lib/newsService.ts), [populationService.ts](file:///Users/mac/Developer/personal/desa-kampungsawah/lib/populationService.ts), and [structureService.ts](file:///Users/mac/Developer/personal/desa-kampungsawah/lib/structureService.ts) to interface with the database instead of local storage fallbacks.
- **Citizen Forms**: Bound the letter request, complaints tracking, and contacts submission forms to public post requests.
- **Admin Dashboard Tabs**: Updated all control tabs to enable live administrative actions (such as verification state updates).

---

## 3. Verification & Testing

We compiled the Next.js production build using `npm run build` and confirmed type safety:
```bash
▲ Next.js 16.2.10 (Turbopack)

  Creating an optimized production build ...
✓ Compiled successfully in 25.2s
  Running TypeScript ...
  Finished TypeScript in 14.6s ...
  Collecting page data using 7 workers ...
  Generating static pages using 7 workers (0/16) ...
✓ Generating static pages using 7 workers (16/16) in 602ms
  Finalizing page optimization ...
```
All routes successfully built with zero errors.
