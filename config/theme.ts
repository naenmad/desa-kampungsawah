/**
 * Sentralisasi Konfigurasi Warna & Tema Desa Kampungsawah.
 * Skala warna abu-abu (gray) diatur dengan kontras yang lebih tinggi (WCAG AA Compliant)
 * agar teks abu-abu di atas latar belakang putih mudah terbaca oleh warga.
 */
export const colors = {
  emerald: {
    50: "#ecfdf5",
    100: "#d1fae5",
    200: "#a7f3d0",
    300: "#6ee7b7",
    400: "#34d399",
    500: "#10b981",
    600: "#059669", // Primary brand color
    700: "#047857",
    800: "#065f46",
    950: "#022c22",
  },
  gray: {
    50: "#f9fafb",
    100: "#f3f4f6",
    200: "#e5e7eb",
    300: "#d1d5db",
    400: "#6b7280", // High contrast (semula gray-500)
    500: "#4b5563", // High contrast (semula gray-600)
    600: "#374151", // High contrast (semula gray-700)
    700: "#1f2937",
    800: "#111827",
    900: "#030712",
  },
};

export const theme = {
  colors,
  fontFamily: {
    sans: ["Plus Jakarta Sans", "sans-serif"],
  },
};
