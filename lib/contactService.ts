"use client";

import { useState, useEffect } from "react";

export type ContactData = {
  address: string;
  phone: string;
  email: string;
  hours: string;
};

export const DEFAULT_CONTACT: ContactData = {
  address: "Jl. Raya Kampungsawah No. 82, Jayakerta, Kabupaten Karawang, Jawa Barat 41358",
  phone: "+62 812-3456-7890",
  email: "kontak@desakampungsawah.id",
  hours: "Senin - Jumat | 08:00 - 15:00 WIB",
};

export function getContactInfo(): ContactData {
  if (typeof window === "undefined") {
    return DEFAULT_CONTACT;
  }
  const stored = localStorage.getItem("desa_contact_info");
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      return DEFAULT_CONTACT;
    }
  }
  return DEFAULT_CONTACT;
}

export function saveContactInfo(data: ContactData) {
  if (typeof window === "undefined") return;
  localStorage.setItem("desa_contact_info", JSON.stringify(data));
  // Dispatch storage event to sync components in the same tab
  window.dispatchEvent(new Event("storage"));
}

export function useContactInfo() {
  const [contact, setContact] = useState<ContactData>(DEFAULT_CONTACT);

  useEffect(() => {
    // Initial load
    setContact(getContactInfo());

    // Listen to changes to sync dynamically
    const handleStorageChange = () => {
      setContact(getContactInfo());
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return contact;
}
