"use client";

import { useState, useEffect } from "react";
import { apiFetch } from "./apiClient";

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

export async function saveContactInfo(data: ContactData) {
  const result = await apiFetch("/contact", {
    method: "PUT",
    body: JSON.stringify(data),
  });
  window.dispatchEvent(new Event("contact-updated"));
  return result;
}

export function useContactInfo() {
  const [contact, setContact] = useState<ContactData>(DEFAULT_CONTACT);

  useEffect(() => {
    const fetchContact = () => {
      apiFetch("/contact")
        .then((data) => {
          if (data) setContact(data);
        })
        .catch(() => {
          // Fallback
        });
    };

    fetchContact();

    window.addEventListener("contact-updated", fetchContact);
    return () => {
      window.removeEventListener("contact-updated", fetchContact);
    };
  }, []);

  return contact;
}
