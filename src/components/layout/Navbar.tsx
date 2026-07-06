"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search, MapPin, ChevronDown } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname } from "@/routing";
import { cn } from "@/lib/utils";
import { useBranchContext } from "@/context/BranchContext";

const locales = [
  { code: "en", label: "EN" },
  { code: "fr", label: "FR" },
  { code: "ar", label: "AR" },
] as const;

export function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { selectedBranch, branches, setSelectedBranch } = useBranchContext();
  const [branchOpen, setBranchOpen] = useState(false);
  const [branchSearch, setBranchSearch] = useState("");
  const [langOpen, setLangOpen] = useState(false);
  const branchRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);

  const filteredBranches = branches.filter((b) => {
    const q = branchSearch.toLowerCase();
    return (
      b.name.toLowerCase().includes(q) ||
      b.nameAr.includes(q) ||
      b.city.toLowerCase().includes(q) ||
      b.cityAr.includes(q)
    );
  });
  const isRtl = locale === "ar";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (branchRef.current && !branchRef.current.contains(e.target as Node)) {
        setBranchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleBranchSelect = (slug: string) => {
    const branch = branches.find((b) => b.slug === slug) ?? null;
    setSelectedBranch(branch);
    setBranchOpen(false);
    setBranchSearch("");
  };

  const navLinks = [
    { href: "/", label: t("home") },
    { href: "/cars", label: t("cars") },
    { href: "/corporate", label: t("corporate") },
    { href: "/locations/downtown-dubai", label: t("locations") },
  ];

  const switchLocale = (code: string) => {
    const segments = pathname.split("/");
    segments[1] = code;
    window.location.href = segments.join("/");
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled || pathname === "/"
          ? "bg-ink-950/80 backdrop-blur-xl"
          : "bg-transparent",
        "py-4"
      )}
      dir={isRtl ? "rtl" : "ltr"}
    >
      <nav className="container-mb relative flex items-center justify-between">
        <Link href="/">
          <img
            src="/images/logo.png"
            alt="MultiBranch"
            className="h-12 w-auto object-contain"
          />
        </Link>

        <div className="hidden items-center gap-0.5 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href as any}
              className={cn(
                "rounded-none px-4 py-2 text-sm font-medium transition-all duration-200",
                pathname === link.href
                  ? "text-gold-400 bg-gold-500/10"
                  : "text-ink-300 hover:text-ink-50 hover:bg-ink-800/50"
              )}
            >
              {link.label}
            </Link>
          ))}

          <div ref={branchRef} className="relative">
            <button
              onClick={() => setBranchOpen(!branchOpen)}
              className={cn(
                "flex items-center gap-2 rounded-none px-3 py-2 text-sm transition-all",
                selectedBranch
                  ? "text-gold-400 bg-gold-500/10"
                  : "text-ink-400 hover:text-ink-200 hover:bg-ink-800/50"
              )}
            >
              <MapPin className="h-4 w-4 shrink-0" />
              <span className="max-w-[120px] truncate">
                {selectedBranch
                  ? isRtl ? selectedBranch.nameAr : selectedBranch.name
                  : "Select Branch"}
              </span>
              <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", branchOpen && "rotate-180")} />
            </button>

            <AnimatePresence>
              {branchOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-0 top-full mt-2 w-72 overflow-hidden border border-ink-700 bg-ink-900 shadow-2xl shadow-ink-950/50 backdrop-blur-xl z-50"
                >
                  <div className="border-b border-ink-800 p-3">
                    <div className="flex items-center gap-3 bg-ink-950 px-3 py-2">
                      <Search className="h-4 w-4 text-ink-500" />
                      <input
                        type="text"
                        value={branchSearch}
                        onChange={(e) => setBranchSearch(e.target.value)}
                        placeholder="Search branches..."
                        className="flex-1 bg-transparent text-sm text-ink-100 outline-none placeholder:text-ink-500"
                        autoFocus
                      />
                    </div>
                  </div>

                  <ul className="max-h-56 overflow-y-auto py-1">
                    {filteredBranches.length === 0 ? (
                      <li className="px-4 py-6 text-center text-sm text-ink-500">No branches found</li>
                    ) : (
                      filteredBranches.map((branch) => (
                        <li key={branch.slug}>
                          <button
                            onClick={() => handleBranchSelect(branch.slug)}
                            className={cn(
                              "flex w-full items-center gap-3 px-4 py-3 text-start transition-all hover:bg-ink-800/50",
                              selectedBranch?.slug === branch.slug && "bg-gold-500/5"
                            )}
                          >
                            <div className="h-10 w-10 shrink-0 overflow-hidden bg-ink-800">
                              <img src={branch.image} alt="" className="h-full w-full object-cover" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-ink-50 truncate">
                                {isRtl ? branch.nameAr : branch.name}
                              </p>
                              <p className="text-xs text-ink-500 truncate">
                                {isRtl ? branch.cityAr : branch.city}
                              </p>
                            </div>
                            {selectedBranch?.slug === branch.slug && (
                              <span className="text-[10px] font-medium text-gold-400">Selected</span>
                            )}
                          </button>
                        </li>
                      ))
                    )}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="mx-3 h-4 w-px bg-ink-700" />

          <div ref={langRef} className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1.5 rounded-none px-2.5 py-1.5 transition-all hover:bg-ink-800/50"
            >
              {locale === "en" && (
                <svg className="h-4 w-5 shrink-0 rounded-sm" viewBox="0 0 60 30"><path fill="#012169" d="M0 0h60v30H0z"/><path fill="#FFF" d="M0 0l60 30M60 0L0 30" stroke="#FFF" strokeWidth="6"/><path fill="#C8102E" d="M0 0l60 30M60 0L0 30" stroke="#C8102E" strokeWidth="4"/><path fill="#FFF" d="M28 0h4v30h-4zM0 13h60v4H0z"/><path fill="#C8102E" d="M30 0h2v30h-2zM0 14h60v2H0z"/></svg>
              )}
              {locale === "fr" && (
                <svg className="h-4 w-5 shrink-0 rounded-sm" viewBox="0 0 60 30"><path fill="#002495" d="M0 0h20v30H0z"/><path fill="#FFF" d="M20 0h20v30H20z"/><path fill="#ED2939" d="M40 0h20v30H40z"/></svg>
              )}
              {locale === "ar" && (
                <svg className="h-4 w-5 shrink-0 rounded-sm" viewBox="0 0 60 30"><path fill="#009E00" d="M0 0h60v10H0z"/><path fill="#FFF" d="M0 10h60v10H0z"/><path fill="#000" d="M0 20h60v10H0z"/><path fill="#FF0000" d="M0 0h15v30H0z"/></svg>
              )}
              <ChevronDown className={cn("h-3 w-3 text-ink-500 transition-transform", langOpen && "rotate-180")} />
            </button>

            <AnimatePresence>
              {langOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.96 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full mt-2 w-14 overflow-hidden border border-ink-700 bg-ink-900 shadow-xl backdrop-blur-xl z-50"
                >
                  {locales.filter((l) => l.code !== locale).map((l) => (
                    <button
                      key={l.code}
                      onClick={() => { switchLocale(l.code); setLangOpen(false); }}
                      className="flex w-full items-center justify-center py-2.5 transition-all hover:bg-ink-800/50"
                    >
                      {l.code === "en" && (
                        <svg className="h-5 w-6 shrink-0 rounded-sm" viewBox="0 0 60 30"><path fill="#012169" d="M0 0h60v30H0z"/><path fill="#FFF" d="M0 0l60 30M60 0L0 30" stroke="#FFF" strokeWidth="6"/><path fill="#C8102E" d="M0 0l60 30M60 0L0 30" stroke="#C8102E" strokeWidth="4"/><path fill="#FFF" d="M28 0h4v30h-4zM0 13h60v4H0z"/><path fill="#C8102E" d="M30 0h2v30h-2zM0 14h60v2H0z"/></svg>
                      )}
                      {l.code === "fr" && (
                        <svg className="h-5 w-6 shrink-0 rounded-sm" viewBox="0 0 60 30"><path fill="#002495" d="M0 0h20v30H0z"/><path fill="#FFF" d="M20 0h20v30H20z"/><path fill="#ED2939" d="M40 0h20v30H40z"/></svg>
                      )}
                      {l.code === "ar" && (
                        <svg className="h-5 w-6 shrink-0 rounded-sm" viewBox="0 0 60 30"><path fill="#009E00" d="M0 0h60v10H0z"/><path fill="#FFF" d="M0 10h60v10H0z"/><path fill="#000" d="M0 20h60v10H0z"/><path fill="#FF0000" d="M0 0h15v30H0z"/></svg>
                      )}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex items-center justify-center rounded-none p-2.5 text-ink-300 hover:bg-ink-800/50 md:hidden"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute top-full left-0 right-0 z-40 flex min-h-screen flex-col items-center justify-center bg-ink-950/98 backdrop-blur-2xl md:hidden"
          >
            <nav className="flex flex-col items-center gap-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                >
                  <Link
                    href={link.href as any}
                    className={cn(
                      "block px-8 py-4 text-center text-lg font-display tracking-wider transition-colors",
                      pathname === link.href
                        ? "text-gold-400"
                        : "text-ink-400 hover:text-ink-50"
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.4 }}
              className="mt-10 flex flex-col items-center gap-3"
            >
              <p className="text-[11px] tracking-widest text-ink-500 uppercase">Select Branch</p>
              <div className="flex flex-wrap justify-center gap-2">
                {branches.map((branch) => (
                  <button
                    key={branch.slug}
                    onClick={() => {
                      const b = branches.find((x) => x.slug === branch.slug) ?? null;
                      setSelectedBranch(b);
                      setMobileOpen(false);
                    }}
                    className={cn(
                      "rounded-none border px-4 py-2 text-xs font-medium tracking-wider transition-all",
                      selectedBranch?.slug === branch.slug
                        ? "border-gold-500/50 bg-gold-500/10 text-gold-400"
                        : "border-ink-700/50 text-ink-400 hover:border-ink-500 hover:text-ink-200"
                    )}
                  >
                    {isRtl ? branch.nameAr : branch.name}
                  </button>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="mt-6 flex items-center justify-center gap-3"
            >
              <div className="inline-flex items-center gap-1.5 rounded-none border border-ink-700/50 px-3 py-2">
                {locale === "en" && (
                  <svg className="h-5 w-6 shrink-0 rounded-sm" viewBox="0 0 60 30"><path fill="#012169" d="M0 0h60v30H0z"/><path fill="#FFF" d="M0 0l60 30M60 0L0 30" stroke="#FFF" strokeWidth="6"/><path fill="#C8102E" d="M0 0l60 30M60 0L0 30" stroke="#C8102E" strokeWidth="4"/><path fill="#FFF" d="M28 0h4v30h-4zM0 13h60v4H0z"/><path fill="#C8102E" d="M30 0h2v30h-2zM0 14h60v2H0z"/></svg>
                )}
                {locale === "fr" && (
                  <svg className="h-5 w-6 shrink-0 rounded-sm" viewBox="0 0 60 30"><path fill="#002495" d="M0 0h20v30H0z"/><path fill="#FFF" d="M20 0h20v30H20z"/><path fill="#ED2939" d="M40 0h20v30H40z"/></svg>
                )}
                {locale === "ar" && (
                  <svg className="h-5 w-6 shrink-0 rounded-sm" viewBox="0 0 60 30"><path fill="#009E00" d="M0 0h60v10H0z"/><path fill="#FFF" d="M0 10h60v10H0z"/><path fill="#000" d="M0 20h60v10H0z"/><path fill="#FF0000" d="M0 0h15v30H0z"/></svg>
                )}
                <div className="flex gap-1.5">
                  {locales.filter((l) => l.code !== locale).map((l) => (
                    <button
                      key={l.code}
                      onClick={() => { switchLocale(l.code); setMobileOpen(false); }}
                      className="transition-all hover:opacity-80"
                    >
                      {l.code === "en" && (
                        <svg className="h-5 w-6 shrink-0 rounded-sm" viewBox="0 0 60 30"><path fill="#012169" d="M0 0h60v30H0z"/><path fill="#FFF" d="M0 0l60 30M60 0L0 30" stroke="#FFF" strokeWidth="6"/><path fill="#C8102E" d="M0 0l60 30M60 0L0 30" stroke="#C8102E" strokeWidth="4"/><path fill="#FFF" d="M28 0h4v30h-4zM0 13h60v4H0z"/><path fill="#C8102E" d="M30 0h2v30h-2zM0 14h60v2H0z"/></svg>
                      )}
                      {l.code === "fr" && (
                        <svg className="h-5 w-6 shrink-0 rounded-sm" viewBox="0 0 60 30"><path fill="#002495" d="M0 0h20v30H0z"/><path fill="#FFF" d="M20 0h20v30H20z"/><path fill="#ED2939" d="M40 0h20v30H40z"/></svg>
                      )}
                      {l.code === "ar" && (
                        <svg className="h-5 w-6 shrink-0 rounded-sm" viewBox="0 0 60 30"><path fill="#009E00" d="M0 0h60v10H0z"/><path fill="#FFF" d="M0 10h60v10H0z"/><path fill="#000" d="M0 20h60v10H0z"/><path fill="#FF0000" d="M0 0h15v30H0z"/></svg>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
