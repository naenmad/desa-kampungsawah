"use client";

import { useState, useEffect } from "react";
import { Mail, Phone, Clock, Search, Trash2, Eye, MailOpen, Check, X, CheckCircle2, Settings } from "lucide-react";
import Card from "@/components/ui/Card";
import Input, { TextArea } from "@/components/ui/Input";
import { getContactInfo, saveContactInfo, ContactData } from "@/lib/contactService";

type ContactMessage = {
  id: number;
  name: string;
  email: string;
  whatsapp: string;
  subject: string;
  message: string;
  date: string;
  isRead: boolean;
};

const initialMessages: ContactMessage[] = [
  {
    id: 1,
    name: "H. Sukarna",
    email: "sukarna.agrowisata@gmail.com",
    whatsapp: "081299028374",
    subject: "Penawaran Kerjasama Agrowisata Sawah",
    message: "Kami ingin menawarkan konsep kemitraan agrowisata sawah tadah air terpadu di wilayah Dusun Campea, lengkap dengan fasilitas joglo dan edukasi pertanian.",
    date: "14 Juli 2026",
    isRead: false
  },
  {
    id: 2,
    name: "Ibu Nurmala",
    email: "nurmala.dompet@yahoo.com",
    whatsapp: "085782910394",
    subject: "Syarat Pembinaan UMKM Konveksi",
    message: "Apakah pendaftaran bantuan pembinaan dan desain kemasan konveksi dompet di Dusun Puloharapan masih dibuka untuk bulan ini? Mohon informasi persyaratannya.",
    date: "12 Juli 2026",
    isRead: true
  },
];

export default function TabKontakMasuk() {
  const [subTab, setSubTab] = useState<"inbox" | "settings">("inbox");
  const [messages, setMessages] = useState<ContactMessage[]>(initialMessages);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<"Semua" | "Unread" | "Kemitraan" | "Layanan">("Semua");

  // Contact Settings States
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [hours, setHours] = useState("");
  
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    // Load contact info on init
    const contact = getContactInfo();
    setAddress(contact.address);
    setPhone(contact.phone);
    setEmail(contact.email);
    setHours(contact.hours);
  }, []);

  const handleDeleteMessage = (id: number) => {
    if (confirm("Apakah Anda yakin ingin menghapus pesan masuk ini?")) {
      setMessages(messages.filter((m) => m.id !== id));
      if (selectedMessage?.id === id) {
        setSelectedMessage(null);
      }
    }
  };

  const handleMarkAsRead = (id: number) => {
    setMessages(messages.map((m) => m.id === id ? { ...m, isRead: true } : m));
    if (selectedMessage?.id === id) {
      setSelectedMessage({ ...selectedMessage, isRead: true });
    }
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedContact: ContactData = {
      address,
      phone,
      email,
      hours,
    };
    saveContactInfo(updatedContact);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  // WhatsApp Helper Link
  const getWhatsAppLink = (num: string) => {
    let clean = num.replace(/\D/g, ""); // digits only
    if (clean.startsWith("0")) {
      clean = "62" + clean.slice(1);
    }
    return `https://wa.me/${clean}`;
  };

  // Aggregates
  const totalMessages = messages.length;
  const unreadCount = messages.filter(m => !m.isRead).length;
  const partnershipCount = messages.filter(m => m.subject.toLowerCase().includes("mitra") || m.subject.toLowerCase().includes("sama")).length;

  // Filtered List
  const filteredMessages = messages.filter((m) => {
    const matchesSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          m.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          m.subject.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (filterType === "Unread") return matchesSearch && !m.isRead;
    if (filterType === "Kemitraan") {
      return matchesSearch && (m.subject.toLowerCase().includes("mitra") || m.subject.toLowerCase().includes("sama"));
    }
    if (filterType === "Layanan") {
      return matchesSearch && !(m.subject.toLowerCase().includes("mitra") || m.subject.toLowerCase().includes("sama"));
    }
    return matchesSearch;
  });

  return (
    <div className="space-y-6">
      
      {/* 1. AGGREGATES CARDS (only visible for inbox tab) */}
      {subTab === "inbox" && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Card className="p-4 bg-white border border-slate-100 shadow-sm flex items-center gap-4">
            <div className="w-10 h-10 bg-slate-50 text-slate-500 rounded-xl flex items-center justify-center shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Pesan Masuk</span>
              <span className="text-xl font-black text-slate-800">{totalMessages} Pesan</span>
            </div>
          </Card>

          <Card className="p-4 bg-white border border-slate-100 shadow-sm flex items-center gap-4">
            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0 border border-blue-100">
              <MailOpen className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Belum Dibaca</span>
              <span className="text-xl font-black text-blue-650">{unreadCount} Pesan Baru</span>
            </div>
          </Card>

          <Card className="p-4 bg-white border border-slate-100 shadow-sm flex items-center gap-4">
            <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center shrink-0 border border-emerald-100">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Penawaran Kemitraan</span>
              <span className="text-xl font-black text-emerald-650">{partnershipCount} Pengajuan</span>
            </div>
          </Card>
        </div>
      )}

      {/* 2. HEADER TAB CONTROLS */}
      <Card className="p-6 bg-white border border-slate-100 shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Ubah Kontak & Pesan Masuk Desa</h3>
            <p className="text-xs text-slate-500 mt-1">
              Gunakan tab untuk memantau pesan masuk dari warga atau memperbarui informasi kontak kantor desa yang tampil di web umum.
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto justify-end">
            {isSaved && (
              <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 text-xs font-bold px-3 py-1.5 rounded-xl flex items-center animate-fade-in">
                <CheckCircle2 className="w-4 h-4 mr-1 text-emerald-600" />
                Kontak Diperbarui!
              </span>
            )}
          </div>
        </div>

        {/* Toggles subTab */}
        <div className="flex flex-wrap gap-2 mt-6 border-t border-slate-100 pt-4">
          <button
            type="button"
            onClick={() => setSubTab("inbox")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              subTab === "inbox"
                ? "bg-emerald-600 text-white shadow-sm"
                : "bg-slate-50 text-slate-650 hover:bg-slate-100"
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Pesan Kontak Masuk</span>
          </button>
          <button
            type="button"
            onClick={() => setSubTab("settings")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              subTab === "settings"
                ? "bg-emerald-600 text-white shadow-sm"
                : "bg-slate-50 text-slate-650 hover:bg-slate-100"
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Pengaturan Kontak Desa</span>
          </button>
        </div>
      </Card>

      {/* 3. SUB TAB DATA LIST / SETTINGS */}
      
      {/* 3A. TAB: INBOX MESSAGES */}
      {subTab === "inbox" && (
        <div className="space-y-6">
          <Card className="p-6 bg-white border border-slate-100 shadow-sm overflow-x-auto">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between border-b border-slate-100 pb-4 mb-4">
              <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
                Daftar Pesan Masuk
              </h4>
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto items-center">
                
                {/* Search */}
                <div className="relative w-full sm:w-64">
                  <span className="absolute inset-y-0 left-3 flex items-center">
                    <Search className="w-4 h-4 text-slate-400" />
                  </span>
                  <input
                    type="text"
                    placeholder="Cari pengirim, email, atau subjek..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-emerald-600 transition-colors"
                  />
                </div>

                {/* Filter Type */}
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value as any)}
                  className="w-full sm:w-auto px-4 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-emerald-600 bg-white transition-colors cursor-pointer"
                >
                  <option value="Semua">Semua Pesan</option>
                  <option value="Unread">Belum Dibaca</option>
                  <option value="Kemitraan">Kemitraan & Bisnis</option>
                  <option value="Layanan">Layanan & Informasi</option>
                </select>

              </div>
            </div>

            <table className="w-full text-left text-xs min-w-[700px]">
              <thead>
                <tr className="text-slate-400 border-b border-slate-100 font-bold uppercase tracking-wider">
                  <th className="py-3 pl-2 w-8">Status</th>
                  <th className="py-3">Pengirim</th>
                  <th className="py-3">Alamat Email</th>
                  <th className="py-3">No. WhatsApp</th>
                  <th className="py-3">Subjek Hubungi</th>
                  <th className="py-3">Tanggal Masuk</th>
                  <th className="py-3 text-right pr-2">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-655">
                {filteredMessages.map((item) => (
                  <tr key={item.id} className={`hover:bg-slate-50/50 transition-colors ${!item.isRead ? "bg-slate-50/20 font-bold" : ""}`}>
                    <td className="py-3.5 pl-2">
                      {!item.isRead ? (
                        <div className="w-2 h-2 bg-blue-600 rounded-full" />
                      ) : (
                        <div className="w-2 h-2 bg-slate-200 rounded-full" />
                      )}
                    </td>
                    <td className="py-3.5 font-bold text-slate-800">{item.name}</td>
                    <td className="py-3.5 text-slate-600 font-mono">{item.email}</td>
                    <td className="py-3.5 text-slate-600 font-mono">{item.whatsapp}</td>
                    <td className="py-3.5 text-emerald-700 font-bold max-w-[180px] truncate" title={item.subject}>{item.subject}</td>
                    <td className="py-3.5 text-slate-450">{item.date}</td>
                    <td className="py-3.5 text-right pr-2 whitespace-nowrap space-x-1">
                      <button
                        onClick={() => handleStartVerifikasi(item)}
                        className="text-emerald-600 hover:text-emerald-800 p-1 hover:bg-slate-50 rounded transition-all cursor-pointer inline-block"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteMessage(item.id)}
                        className="text-red-650 hover:text-red-800 p-1 hover:bg-slate-50 rounded transition-all cursor-pointer inline-block"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredMessages.length === 0 && (
                  <tr>
                    <td colSpan={7} className="text-center py-10 text-slate-400 italic">Kotak masuk pesan kosong.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </Card>
        </div>
      )}

      {/* 3B. TAB: VILLAGE CONTACT SETTINGS */}
      {subTab === "settings" && (
        <Card className="p-6 bg-white border border-slate-100 shadow-sm">
          <h4 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-3 mb-6">
            Form Ubah Profil Informasi Kontak Desa Kampungsawah
          </h4>

          <form onSubmit={handleSaveSettings} className="space-y-6 max-w-2xl">
            <TextArea
              label="Alamat Fisik Kantor Desa"
              required
              rows={3}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Masukkan alamat lengkap kantor kepala desa..."
            />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Input
                label="Nomor Telepon / WhatsApp Desa"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Contoh: +62 812-3456-7890"
              />
              <Input
                label="Alamat Email Resmi Desa"
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Contoh: kontak@desakampungsawah.id"
              />
            </div>

            <Input
              label="Jam Pelayanan Operasional Kantor"
              required
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              placeholder="Contoh: Senin - Jumat | 08:00 - 15:00 WIB"
            />

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-3 rounded-xl text-xs transition-colors shadow-sm cursor-pointer"
              >
                Simpan Perubahan Kontak
              </button>
            </div>
          </form>
        </Card>
      )}

      {/* 4. MODAL DETAIL PESAN INBOX */}
      {selectedMessage && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="relative bg-white rounded-3xl overflow-hidden max-w-xl w-full shadow-2xl p-6 md:p-8 space-y-6">
            
            {/* Modal Header */}
            <div className="border-b border-slate-100 pb-4 flex justify-between items-start">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Detail Pesan Masuk</span>
                <h3 className="text-lg font-black text-slate-800">{selectedMessage.subject}</h3>
              </div>
              <button
                onClick={() => setSelectedMessage(null)}
                className="bg-slate-50 hover:bg-slate-100 border border-slate-200/50 p-2 rounded-xl text-slate-400 hover:text-slate-650 cursor-pointer transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Grid Informasi Pengirim */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-650">
              
              <div className="space-y-0.5">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Pengirim</span>
                <span className="text-sm font-bold text-slate-900 block">{selectedMessage.name}</span>
              </div>

              <div className="space-y-0.5">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Tanggal Masuk</span>
                <span className="text-xs font-bold text-slate-800 block">{selectedMessage.date}</span>
              </div>

              {/* Email Address with mailto */}
              <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl space-y-1">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Alamat Email</span>
                <span className="text-xs font-mono font-bold text-slate-800 block">{selectedMessage.email}</span>
                <a
                  href={`mailto:${selectedMessage.email}`}
                  className="inline-flex items-center text-[10px] font-bold text-emerald-600 hover:text-emerald-700 mt-1"
                >
                  <Mail className="w-3.5 h-3.5 mr-1" />
                  <span>Kirim Email Balasan</span>
                </a>
              </div>

              {/* WhatsApp Number with redirect */}
              <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl space-y-1">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Nomor WhatsApp</span>
                <span className="text-xs font-mono font-bold text-slate-800 block">{selectedMessage.whatsapp}</span>
                <a
                  href={getWhatsAppLink(selectedMessage.whatsapp)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-[10px] font-bold text-emerald-600 hover:text-emerald-700 mt-1"
                >
                  <Phone className="w-3.5 h-3.5 mr-1" />
                  <span>Hubungi via WhatsApp</span>
                </a>
              </div>

              {/* Full Message Box */}
              <div className="md:col-span-2 space-y-1.5">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Isi Pesan Lengkap</span>
                <p className="p-4 bg-slate-50 border border-slate-100 rounded-2xl leading-relaxed text-slate-650 font-medium">
                  {selectedMessage.message}
                </p>
              </div>

            </div>

            {/* Quick Actions Panel */}
            <div className="border-t border-slate-100 pt-4 flex flex-col sm:flex-row justify-between items-center gap-3">
              <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>Masuk: {selectedMessage.date}</span>
              </span>

              <div className="flex gap-2 w-full sm:w-auto justify-end">
                {!selectedMessage.isRead && (
                  <button
                    onClick={() => handleMarkAsRead(selectedMessage.id)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-2.5 rounded-xl text-xs transition-colors shadow-sm flex items-center gap-1 cursor-pointer"
                  >
                    <Check className="w-4 h-4" />
                    <span>Tandai Sudah Dibaca</span>
                  </button>
                )}
                <button
                  onClick={() => setSelectedMessage(null)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-750 font-bold px-5 py-2.5 rounded-xl text-xs cursor-pointer transition-colors"
                >
                  Tutup
                </button>
              </div>
            </div>

          </Card>
        </div>
      )}

    </div>
  );

  function handleStartVerifikasi(item: ContactMessage) {
    setSelectedMessage(item);
    if (!item.isRead) {
      handleMarkAsRead(item.id);
    }
  }
}
