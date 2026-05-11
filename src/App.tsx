import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bell,
  Bitcoin,
  Bookmark,
  BookOpen,
  CandlestickChart,
  ChartNoAxesCombined,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  Crown,
  Flame,
  GraduationCap,
  Heart,
  LineChart,
  Loader2,
  Medal,
  Menu,
  MessageCircle,
  MoreHorizontal,
  PenLine,
  Plus,
  Search,
  Send,
  Settings,
  Share2,
  Moon,
  Sun,
  RotateCcw,
  Smartphone,
  Sparkles,
  ShieldCheck,
  Star,
  Target,
  Trophy,
  Users,
  Wallet,
} from "lucide-react";

type Screen =
  | "dashboard"
  | "learn"
  | "lesson"
  | "fundamental"
  | "technical"
  | "community"
  | "chat"
  | "trade"
  | "platform"
  | "signals"
  | "tournament"
  | "profile";

type Tone = "default" | "outline" | "soft" | "success" | "danger";
type NoticeTone = "info" | "success" | "error";
type NoticeState = { message: string; tone: NoticeTone } | null;

const navItems = [
  { id: "learn" as Screen, label: "یادگیری", icon: GraduationCap },
  { id: "community" as Screen, label: "اجتماع", icon: Users },
  { id: "trade" as Screen, label: "ترید", icon: ChartNoAxesCombined },
  { id: "platform" as Screen, label: "پلتفرم", icon: Wallet },
  { id: "tournament" as Screen, label: "مسابقات", icon: Trophy },
];

const lessons = [
  { title: "فارکس چیست؟", level: "سطح مقدماتی", progress: 84, icon: "🌐" },
  { title: "جفت‌ارز چیست؟", level: "سطح مقدماتی", progress: 62, icon: "💱" },
  { title: "اهرم چیست؟", level: "سطح مقدماتی", progress: 40, icon: "⚖️" },
  { title: "اسپرد چیست؟", level: "سطح مقدماتی", progress: 18, icon: "💳" },
];

const brokers = [
  { name: "IC Markets", rating: "4.8", spread: "اسپرد ۰.۰ پیپ", deposit: "حداقل واریز ۲۰۰$", mark: "IC" },
  { name: "Pepperstone", rating: "4.7", spread: "اسپرد ۰.۱ پیپ", deposit: "حداقل واریز ۲۰۰$", mark: "P" },
  { name: "XM", rating: "4.6", spread: "اسپرد ۰.۶ پیپ", deposit: "حداقل واریز ۵$", mark: "XM" },
];

const signals = [
  { pair: "EUR/USD", type: "خرید", typeClass: "bg-emerald-50 text-emerald-600", stop: "1.0750", target: "1.0900", entry: "1.0900", analyst: "محمد تریدر", time: "۳ ساعت پیش", avatar: "م" },
  { pair: "GBP/USD", type: "فروش", typeClass: "bg-rose-50 text-rose-600", stop: "1.2700", target: "1.2500", entry: "1.2610", analyst: "سارا FX", time: "۲ ساعت پیش", avatar: "س" },
];

const communityPosts = [
  {
    id: 1,
    author: "محمد تریدر",
    avatar: "م",
    age: "۲ ساعت پیش",
    title: "تحلیل بیت‌کوین",
    text: "به نظر می‌رسد BTC در محدوده حمایتی خوبی قرار دارد و احتمال رشد وجود دارد.",
    pair: "BTC/USDT",
    likes: 123,
    comments: 45,
    shares: 21,
  },
  {
    id: 2,
    author: "سارا FX",
    avatar: "س",
    age: "۴ ساعت پیش",
    title: "تحلیل EUR/USD",
    text: "شکست مقاومت و پولبک موفق به نظر می‌رسد.",
    pair: "EUR/USD",
    likes: 82,
    comments: 18,
    shares: 9,
  },
];

const ranking = [
  { rank: "1", name: "علی تریدر", gain: "+12.45%", avatar: "ع" },
  { rank: "2", name: "محمد FX", gain: "+8.32%", avatar: "م" },
  { rank: "3", name: "سارا تریدر", gain: "+6.21%", avatar: "س" },
];

function cx(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function Card({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return (
    <div
      className={cx(
        "rounded-[24px] border border-slate-100 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.03),0_10px_28px_rgba(15,23,42,0.04)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

function CardContent({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return <div className={className}>{children}</div>;
}

function Button({
  className = "",
  children,
  tone = "default",
  loading = false,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { tone?: Tone; loading?: boolean }) {
  const tones: Record<Tone, string> = {
    default: "bg-violet-700 text-white shadow-[0_10px_24px_rgba(109,40,217,0.22)] hover:bg-violet-800",
    outline: "border border-violet-200 bg-white text-violet-700 hover:border-violet-300 hover:bg-violet-50",
    soft: "bg-violet-50 text-violet-700 hover:bg-violet-100",
    success: "bg-emerald-600 text-white shadow-[0_10px_24px_rgba(5,150,105,0.18)] hover:bg-emerald-700",
    danger: "bg-rose-500 text-white shadow-[0_10px_24px_rgba(244,63,94,0.18)] hover:bg-rose-600",
  };
  return (
    <button
      className={cx(
        "inline-flex min-h-10 items-center justify-center gap-2 rounded-2xl font-bold tracking-[-0.01em] transition duration-150 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-violet-100 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60",
        tones[tone],
        className,
      )}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading && <Loader2 className="h-4 w-4 animate-spin" />}
      {children}
    </button>
  );
}

function IconButton({
  children,
  onClick,
  className = "",
  label,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  label: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={cx(
        "flex h-10 w-10 items-center justify-center rounded-2xl text-slate-700 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-violet-100 active:scale-95",
        className,
      )}
    >
      {children}
    </button>
  );
}

function Avatar({ label = "ع", small = false }: { label?: string; small?: boolean }) {
  return (
    <div
      className={cx(
        "flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-slate-900 to-slate-600 font-extrabold text-white shadow-sm",
        small ? "h-8 w-8 text-[11px]" : "h-10 w-10 text-sm",
      )}
    >
      {label}
    </div>
  );
}

function Header({
  title,
  onBack,
  onProfile,
  left = "bell",
  right = "avatar",
}: {
  title?: string;
  onBack?: () => void;
  onProfile?: () => void;
  left?: "bell" | "settings" | "back" | "none";
  right?: "avatar" | "learn" | "square" | "none";
}) {
  return (
    <div className="mb-5 flex h-10 items-center justify-between">
      {left === "none" ? (
        <div className="h-10 w-10" />
      ) : (
        <IconButton label={left === "back" ? "بازگشت" : left === "settings" ? "تنظیمات" : "اعلان‌ها"} onClick={left === "back" ? onBack : undefined}>
          {left === "back" ? <ChevronLeft className="h-5 w-5" /> : left === "settings" ? <Settings className="h-5 w-5" /> : <Bell className="h-[18px] w-[18px]" />}
        </IconButton>
      )}

      {title ? <h1 className="text-[18px] font-extrabold tracking-[-0.025em] text-slate-950">{title}</h1> : <div />}

      {right === "avatar" ? (
        <button onClick={onProfile} aria-label="پروفایل" className="rounded-full transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-violet-100 active:scale-95">
          <Avatar />
        </button>
      ) : right === "learn" ? (
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-violet-50 text-violet-700">
          <GraduationCap className="h-5 w-5" />
        </div>
      ) : right === "square" ? (
        <IconButton label="گزینه‌ها"><BookOpen className="h-[18px] w-[18px]" /></IconButton>
      ) : (
        <div className="h-10 w-10" />
      )}
    </div>
  );
}

function Segmented({
  items,
  active,
  onChange,
  compact = false,
}: {
  items: string[];
  active: number;
  onChange: (index: number) => void;
  compact?: boolean;
}) {
  const segmentId = React.useId();
  return (
    <div className="flex rounded-full bg-slate-100/90 p-1 ring-1 ring-inset ring-slate-100">
      {items.map((item, index) => (
        <button
          key={item}
          onClick={() => onChange(index)}
          className={cx(
            "relative flex-1 overflow-hidden rounded-full font-bold transition duration-150",
            compact ? "px-3 py-2 text-[11px]" : "px-3 py-2.5 text-[12px]",
            index === active ? "text-white" : "text-slate-600 hover:text-slate-900",
          )}
        >
          {index === active && (
            <motion.span
              layoutId={`segment-${segmentId}`}
              className="absolute inset-0 rounded-full bg-violet-700 shadow-[0_8px_20px_rgba(109,40,217,0.20)]"
              transition={{ type: "spring", stiffness: 420, damping: 34 }}
            />
          )}
          <span className="relative z-10">{item}</span>
        </button>
      ))}
    </div>
  );
}

function PurpleProgress({ value }: { value: number }) {
  return (
    <div className="h-1.5 overflow-hidden rounded-full bg-violet-100">
      <div className="h-1.5 rounded-full bg-gradient-to-l from-violet-700 to-violet-500 transition-all duration-300" style={{ width: `${value}%` }} />
    </div>
  );
}

function Notice({ notice }: { notice: NoticeState }) {
  const toneClasses = {
    info: "bg-slate-950/95 text-white",
    success: "bg-emerald-600 text-white",
    error: "bg-rose-600 text-white",
  };
  return (
    <AnimatePresence>
      {notice && (
        <motion.div
          initial={{ opacity: 0, y: -14, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -14, scale: 0.98 }}
          className={cx(
            "absolute left-4 right-4 top-4 z-50 flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-center text-[12px] font-bold shadow-xl",
            toneClasses[notice.tone],
          )}
        >
          {notice.tone === "success" && <CheckCircle2 className="h-4 w-4" />}
          <span>{notice.message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
}: {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}) {
  return (
    <Card className="border-dashed shadow-none">
      <CardContent className="flex min-h-[180px] flex-col items-center justify-center px-6 py-8 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-violet-50 text-violet-700">
          <Search className="h-5 w-5" />
        </div>
        <h3 className="mt-4 text-[14px] font-extrabold text-slate-950">{title}</h3>
        <p className="mt-2 text-[12px] leading-6 text-slate-500">{description}</p>
        {actionLabel && onAction && (
          <Button tone="soft" onClick={onAction} className="mt-4 h-9 px-4 text-[11px] shadow-none">
            {actionLabel}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

function LiveBadge({ label = "زنده" }: { label?: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-2.5 py-1 text-[10px] font-bold text-rose-600">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-rose-500" />
      </span>
      {label}
    </span>
  );
}

function LineChartMini({ dense = false }: { dense?: boolean }) {
  return (
    <svg viewBox="0 0 320 160" className={cx("w-full", dense ? "h-[92px]" : "h-[150px]")}>
      <path
        d="M6 66 L18 77 L28 70 L38 112 L50 90 L62 105 L76 86 L88 93 L102 81 L114 57 L126 73 L138 43 L150 63 L162 55 L176 78 L188 59 L200 67 L214 56 L228 85 L240 72 L252 90 L266 64 L278 80 L290 55 L304 68 L314 42"
        fill="none"
        stroke="#7c3aed"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CandleChart() {
  const candles: Array<[number, number, number, boolean]> = [
    [18, 96, 22, true], [34, 81, 38, true], [50, 55, 31, false], [66, 70, 24, false],
    [82, 98, 18, true], [98, 84, 31, true], [114, 72, 26, false], [130, 86, 24, false],
    [146, 79, 22, true], [162, 68, 31, true], [178, 61, 23, false], [194, 84, 20, true],
    [210, 73, 25, true], [226, 64, 20, false], [242, 77, 22, true], [258, 68, 18, true],
  ];

  return (
    <svg viewBox="0 0 320 170" className="h-[160px] w-full">
      <path d="M25 38 L278 84" fill="none" stroke="#ec4899" strokeWidth="1.6" opacity="0.7" />
      <path d="M18 134 L285 82" fill="none" stroke="#10b981" strokeWidth="1.8" opacity="0.8" />
      <text x="238" y="68" fill="#ec4899" fontSize="10">مقاومت</text>
      <text x="238" y="135" fill="#10b981" fontSize="10">حمایت</text>
      {candles.map(([x, y, h, up], index) => (
        <g key={index}>
          <line x1={x + 5} y1={y - 8} x2={x + 5} y2={y + h + 8} stroke={up ? "#10b981" : "#ef4444"} strokeWidth="1.4" />
          <rect x={x} y={y} width="10" height={h} rx="2" fill={up ? "#10b981" : "#ef4444"} />
        </g>
      ))}
      <text x="286" y="28" fill="#94a3b8" fontSize="9">72,000</text>
      <text x="286" y="60" fill="#94a3b8" fontSize="9">68,000</text>
      <text x="286" y="92" fill="#94a3b8" fontSize="9">64,000</text>
      <text x="286" y="124" fill="#94a3b8" fontSize="9">60,000</text>
      <text x="286" y="156" fill="#94a3b8" fontSize="9">56,000</text>
    </svg>
  );
}

function PostChart() {
  const candles: Array<[number, number, number, boolean]> = [
    [10, 70, 14, true], [25, 77, 18, false], [40, 82, 15, false], [55, 93, 20, true], [70, 102, 17, false],
    [85, 104, 14, true], [100, 92, 22, true], [115, 75, 25, true], [130, 80, 18, false], [145, 62, 19, true],
    [160, 39, 28, true], [175, 56, 23, false], [190, 69, 20, false], [205, 85, 18, true], [220, 93, 15, false],
    [235, 99, 14, true], [250, 87, 16, true], [265, 82, 12, true], [280, 84, 15, false],
  ];

  return (
    <svg viewBox="0 0 320 150" className="h-[150px] w-full">
      <path d="M34 32 L294 93" fill="none" stroke="#ec4899" strokeWidth="1.5" opacity="0.55" />
      <path d="M72 119 L295 84" fill="none" stroke="#6366f1" strokeWidth="1.5" opacity="0.65" />
      <path d="M58 124 L168 80 L273 117" fill="none" stroke="#6366f1" strokeWidth="1.5" opacity="0.65" />
      {candles.map(([x, y, h, up], index) => (
        <g key={index}>
          <line x1={x + 4} y1={y - 7} x2={x + 4} y2={y + h + 7} stroke={up ? "#10b981" : "#ef4444"} strokeWidth="1.3" />
          <rect x={x} y={y} width="8" height={h} rx="1.5" fill={up ? "#10b981" : "#ef4444"} />
        </g>
      ))}
      <text x="284" y="22" fill="#94a3b8" fontSize="9">77,000</text>
      <text x="284" y="48" fill="#94a3b8" fontSize="9">74,000</text>
      <text x="284" y="74" fill="#94a3b8" fontSize="9">71,000</text>
      <text x="284" y="100" fill="#94a3b8" fontSize="9">68,000</text>
      <text x="284" y="126" fill="#94a3b8" fontSize="9">65,000</text>
    </svg>
  );
}

function Dashboard({ goTo, openProfile, notify }: { goTo: (screen: Screen) => void; openProfile: () => void; notify: (message: string) => void }) {
  return (
    <div dir="rtl">
      <Header onProfile={openProfile} />

      <div className="mb-5 text-right">
        <h2 className="text-[22px] font-extrabold tracking-[-0.03em] text-slate-950">سلام علی!</h2>
        <p className="mt-1.5 text-[13px] font-medium text-slate-600">امروز برای رشدت عالیه 🚀</p>
      </div>

      <Card className="overflow-hidden bg-gradient-to-br from-violet-700 to-fuchsia-600 text-white shadow-[0_18px_40px_rgba(109,40,217,0.22)]">
        <CardContent className="p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[11px] font-medium text-violet-100">سطح شما</p>
              <p className="mt-1 text-[16px] font-extrabold">متوسط</p>
            </div>
            <span className="rounded-full bg-white/15 px-3 py-1 text-[11px] font-bold backdrop-blur">سطح ۱۲</span>
          </div>
          <div className="my-4 h-px bg-white/10" />
          <div className="flex items-end justify-between">
            <div>
              <p className="text-[11px] font-medium text-violet-100">تجربه شما</p>
              <p className="mt-1 text-[16px] font-extrabold">۲,۴۵۰ XP</p>
            </div>
            <div className="text-left">
              <p className="text-[11px] font-medium text-violet-100">تا سطح بعدی</p>
              <p className="mt-1 text-[13px] font-bold">۵۵۰ XP</p>
            </div>
          </div>
          <div className="mt-4 h-1.5 rounded-full bg-white/20">
            <div className="h-1.5 w-[77%] rounded-full bg-white" />
          </div>
        </CardContent>
      </Card>

      <section className="mt-6">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-[14px] font-extrabold">ادامه یادگیری</h3>
          <button onClick={() => goTo("learn")} className="text-[12px] font-bold text-violet-700">مشاهده همه</button>
        </div>
        <button onClick={() => goTo("lesson")} className="block w-full text-right">
          <Card className="shadow-sm ring-1 ring-slate-100 transition hover:shadow-md">
            <CardContent className="flex items-center gap-3.5 p-4">
              <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-violet-700 text-white">
                <LineChart className="h-5 w-5" />
                <span className="absolute -left-0.5 top-0 h-2.5 w-2.5 rounded-full bg-violet-700" />
              </div>
              <div className="flex-1">
                <p className="text-[11px] font-medium text-slate-500">مبانی فارکس</p>
                <p className="mt-1 text-[13px] font-extrabold">اهرم چیست؟</p>
                <div className="mt-3"><PurpleProgress value={70} /></div>
              </div>
              <span className="self-end pb-0.5 text-[11px] font-bold text-violet-700">۷۰٪</span>
            </CardContent>
          </Card>
        </button>
      </section>

      <div className="mt-4 grid grid-cols-3 gap-2.5">
        {[
          { icon: Flame, title: "چالش روزانه", sub: "تکمیل شد", tone: "text-orange-500", action: "چالش روزانه باز شد." },
          { icon: Trophy, title: "کوئیز", sub: "۱۲ سؤال", tone: "text-violet-700", action: "کوییز امروز آماده است." },
          { icon: Medal, title: "سری یادگیری", sub: "۷ روز", tone: "text-orange-500", action: "سری یادگیری شما ۷ روزه شد." },
        ].map(({ icon: Icon, title, sub, tone, action }) => (
          <button key={title} onClick={() => notify(action)} className="text-right">
            <Card className="h-full shadow-sm ring-1 ring-slate-100 transition hover:-translate-y-0.5 hover:shadow-md">
              <CardContent className="p-3.5 text-center">
                <Icon className={cx("mx-auto h-6 w-6", tone)} />
                <p className="mt-3 text-[11px] font-extrabold">{title}</p>
                <p className="mt-1 text-[10px] font-medium text-slate-500">{sub}</p>
              </CardContent>
            </Card>
          </button>
        ))}
      </div>

      <section className="mt-6">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-[14px] font-extrabold">آمار سریع</h3>
          <button onClick={() => goTo("profile")} className="text-[12px] font-bold text-violet-700">مشاهده همه</button>
        </div>
        <div className="grid grid-cols-3 gap-2.5">
          {[
            { value: "۲۴", label: "درس تکمیل شده" },
            { value: "۱۴.۵", label: "ساعت یادگیری" },
            { value: "۷", label: "روزهای متوالی" },
          ].map((item) => (
            <Card key={item.label} className="shadow-sm ring-1 ring-slate-100">
              <CardContent className="p-3.5 text-center">
                <p className="text-[18px] font-extrabold">{item.value}</p>
                <p className="mt-1 text-[10px] font-medium text-slate-500">{item.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}

function LearnHub({ goTo, openProfile, notify }: { goTo: (screen: Screen) => void; openProfile: () => void; notify: (message: string, tone?: NoticeTone) => void }) {
  const [category, setCategory] = useState(0);
  const [expandedLesson, setExpandedLesson] = useState<number | null>(2);
  return (
    <div dir="rtl">
      <Header title="یادگیری" left="none" right="learn" onProfile={openProfile} />
      <Segmented
        items={["مبانی", "تحلیل بنیادی", "تحلیل تکنیکال"]}
        active={category}
        onChange={(index) => {
          setCategory(index);
          if (index === 1) goTo("fundamental");
          if (index === 2) goTo("technical");
        }}
      />

      <section className="mt-6">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-[14px] font-extrabold">دسته‌بندی دروس</h3>
          <button onClick={() => notify("همه دسته‌بندی‌های آموزشی نمایش داده شد.")} className="text-[12px] font-bold text-violet-700">مشاهده همه</button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[
            { title: "فارکس", icon: GraduationCap, tone: "bg-violet-50 text-violet-700" },
            { title: "ارز دیجیتال", icon: Bitcoin, tone: "bg-amber-50 text-amber-500" },
          ].map(({ title, icon: Icon, tone }) => (
            <button key={title} onClick={() => notify(`دسته ${title} انتخاب شد.`)} className="text-right">
              <Card className="transition hover:shadow-md">
                <CardContent className="flex h-[78px] items-center justify-between p-4">
                  <span className="text-[15px] font-extrabold">{title}</span>
                  <div className={cx("flex h-10 w-10 items-center justify-center rounded-full", tone)}><Icon className="h-5 w-5" /></div>
                </CardContent>
              </Card>
            </button>
          ))}
        </div>
      </section>

      <section className="mt-6">
        <h3 className="mb-3 text-[15px] font-extrabold">دروس محبوب</h3>
        <div className="space-y-3">
          {lessons.map((lesson, index) => {
            const expanded = expandedLesson === index;
            return (
              <Card key={lesson.title} className="overflow-hidden transition hover:shadow-md">
                <button
                  className="block w-full text-right"
                  onClick={() => setExpandedLesson((current) => current === index ? null : index)}
                >
                  <CardContent className="flex items-center gap-3 p-3">
                    <div className="flex h-[58px] w-[58px] shrink-0 items-center justify-center rounded-2xl bg-violet-50 text-[24px]">{lesson.icon}</div>
                    <div className="flex-1">
                      <p className="text-[13px] font-extrabold">{lesson.title}</p>
                      <p className="mt-1 text-[11px] font-medium text-slate-500">{lesson.level}</p>
                      <div className="mt-3 flex items-center gap-2">
                        <div className="flex-1"><PurpleProgress value={lesson.progress} /></div>
                        <span className="text-[11px] font-bold text-violet-700">{lesson.progress}%</span>
                      </div>
                    </div>
                    <ChevronDown className={cx("h-4 w-4 text-slate-400 transition", expanded && "rotate-180")} />
                  </CardContent>
                </button>
                <AnimatePresence initial={false}>
                  {expanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22 }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-slate-100 px-4 py-3">
                        <div className="flex items-center justify-between gap-3">
                          <p className="text-[11px] leading-6 text-slate-500">درس کوتاه، تمرین تعاملی و آزمون پایانی.</p>
                          <Button
                            onClick={() => index === 2 ? goTo("lesson") : notify(`درس ${lesson.title} شروع شد.`, "success")}
                            className="h-9 shrink-0 px-4 text-[11px]"
                          >
                            شروع درس
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            );
          })}
        </div>
      </section>
    </div>
  );
}

function Lesson({ goBack, notify }: { goBack: () => void; notify: (message: string) => void }) {
  const [step, setStep] = useState(0);
  return (
    <div dir="rtl">
      <Header title="مبانی" left="back" onBack={goBack} right="square" />

      <div className="mb-5 mt-1 flex items-center justify-center gap-0">
        {[0, 1, 2, 3, 4].map((item, index) => (
          <React.Fragment key={item}>
            <span className={cx("h-2.5 w-2.5 rounded-full", index <= step ? "bg-violet-700" : "bg-violet-200")} />
            {index < 4 && <span className="h-px w-11 bg-violet-100" />}
          </React.Fragment>
        ))}
      </div>

      <Card className="min-h-[515px] shadow-sm ring-1 ring-slate-100">
        <CardContent className="flex min-h-[515px] flex-col p-5 text-center">
          <h2 className="mt-4 text-[20px] font-extrabold">اهرم چیست؟</h2>
          <p className="mt-2 text-[12px] font-medium text-slate-500">سطح مقدماتی</p>
          <p className="mx-auto mt-7 max-w-[260px] text-[13px] leading-7 text-slate-700">اهرم به شما امکان می‌دهد با سرمایه کمتر، معامله بزرگ‌تری انجام دهید.</p>
          <button onClick={() => notify("مثال عملی باز شد.")} className="mx-auto mt-6 rounded-full border border-violet-200 px-4 py-2 text-[12px] font-bold text-violet-700 transition hover:bg-violet-50">مثال عملی</button>

          <div className="relative mx-auto mt-8 h-[150px] w-[250px]">
            <div className="absolute left-7 top-10 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-[13px] font-extrabold">$100</div>
            <div className="absolute right-5 top-0 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 text-[13px] font-extrabold">$1,000</div>
            <div className="absolute left-[54px] top-[89px] h-1 w-[155px] origin-left rotate-[-7deg] rounded-full bg-[#3f3094]" />
            <div className="absolute left-1/2 top-[94px] h-12 w-1 -translate-x-1/2 bg-[#3f3094]" />
            <div className="absolute left-1/2 top-[128px] h-0 w-0 -translate-x-1/2 border-x-[18px] border-b-[24px] border-x-transparent border-b-[#3f3094]" />
            <div className="absolute bottom-0 left-[77px] h-2 w-24 rounded-full bg-violet-100/70" />
          </div>

          <div className="mt-auto rounded-2xl bg-slate-50 px-5 py-4 text-[13px] leading-7 text-slate-700">با اهرم ۱:۱۰، با ۱۰۰ دلار می‌توانید یک معامله ۱۰۰۰ دلاری باز کنید.</div>
        </CardContent>
      </Card>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <Button tone="outline" onClick={() => setStep((current) => Math.max(0, current - 1))} disabled={step === 0} className="h-12 text-[13px]">قبلی</Button>
        <Button onClick={() => {
          if (step < 4) setStep((current) => current + 1);
          else notify("این درس تکمیل شد.");
        }} className="h-12 text-[13px]">{step < 4 ? "بعدی" : "اتمام درس"}</Button>
      </div>
    </div>
  );
}

function Fundamental({ goBack, notify }: { goBack: () => void; notify: (message: string) => void }) {
  const [tab, setTab] = useState(1);
  return (
    <div dir="rtl">
      <Header title="تحلیل بنیادی" left="back" onBack={goBack} right="square" />
      <Segmented items={["اخبار", "تأثیر", "نتیجه"]} active={tab} onChange={setTab} />

      <section className="mt-6">
        <h3 className="mb-3 text-[15px] font-extrabold">اخبار اقتصادی</h3>
        <button onClick={() => notify("جزئیات خبر اقتصادی باز شد.")} className="block w-full text-right">
          <Card className="overflow-hidden shadow-sm ring-1 ring-slate-100 transition hover:shadow-md">
            <CardContent className="relative min-h-[126px] p-4">
              <div className="relative z-10 max-w-[160px]">
                <p className="text-[13px] font-extrabold">اعلام نرخ بهره فدرال رزرو</p>
                <p className="mt-1 text-[11px] font-medium text-slate-500">۲ ساعت پیش</p>
                <p className="mt-5 text-[12px] text-slate-700">نرخ بهره ۰.۲۵٪ افزایش یافت.</p>
              </div>
              <div className="absolute bottom-0 left-0 flex h-[118px] w-[126px] items-end justify-center overflow-hidden bg-gradient-to-t from-slate-100 to-transparent">
                <div className="relative mb-0 h-[84px] w-[86px]">
                  <div className="absolute bottom-0 left-1/2 h-[58px] w-[70px] -translate-x-1/2 border-x-[8px] border-b-[58px] border-x-transparent border-b-slate-300" />
                  <div className="absolute bottom-[47px] left-1/2 h-3 w-[72px] -translate-x-1/2 rounded-t-md bg-slate-300" />
                  <div className="absolute left-[12px] top-[18px] h-[17px] w-[32px] bg-[linear-gradient(to_bottom,#b91c1c_0_33%,#fff_33%_66%,#1d4ed8_66%)]" />
                </div>
              </div>
            </CardContent>
          </Card>
        </button>
      </section>

      <section className="mt-6">
        <h3 className="mb-3 text-[15px] font-extrabold">تأثیر بر بازار</h3>
        <div className="space-y-3">
          <Card className="shadow-sm ring-1 ring-slate-100">
            <CardContent className="p-4">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-bold">جفت‌ارز: EUR/USD</span>
                <span className="font-bold text-violet-700">قبل از خبر</span>
              </div>
              <LineChartMini dense />
            </CardContent>
          </Card>
          <Card className="shadow-sm ring-1 ring-slate-100">
            <CardContent className="p-4">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-bold text-emerald-600">۱.۲٪ کاهش</span>
                <span className="font-bold text-violet-700">بعد از خبر</span>
              </div>
              <LineChartMini dense />
            </CardContent>
          </Card>
        </div>
      </section>

      <Button onClick={() => notify("تحلیل بنیادی تکمیل شد.")} className="mt-5 h-11 w-full text-[13px]">فهمیدم</Button>
    </div>
  );
}

function Technical({ goBack, notify }: { goBack: () => void; notify: (message: string) => void }) {
  const [tool, setTool] = useState(0);
  const tools = [
    { icon: PenLine, label: "خط روند" },
    { icon: Target, label: "حمایت/مقاومت" },
    { icon: Menu, label: "فیبوناچی" },
    { icon: CandlestickChart, label: "الگوها" },
  ];
  return (
    <div dir="rtl">
      <Header title="تحلیل تکنیکال" left="back" onBack={goBack} right="square" />

      <div className="grid grid-cols-4 gap-2">
        {tools.map(({ icon: Icon, label }, index) => (
          <button key={label} onClick={() => setTool(index)}>
            <Card className={cx("shadow-sm ring-1 transition", index === tool ? "ring-violet-200 bg-violet-50" : "ring-slate-100 hover:shadow-md")}>
              <CardContent className="flex h-[68px] flex-col items-center justify-center p-2 text-center">
                <Icon className={cx("h-[18px] w-[18px]", index === tool ? "text-violet-700" : "text-slate-700")} />
                <p className="mt-2 text-[10px] font-medium text-slate-600">{label}</p>
              </CardContent>
            </Card>
          </button>
        ))}
      </div>

      <section className="mt-5">
        <div className="mb-2 flex items-center justify-between px-1">
          <span className="text-[13px] font-extrabold">BTC/USDT</span>
          <span className="text-[11px] font-bold text-slate-500">4H</span>
        </div>
        <Card className="shadow-sm ring-1 ring-slate-100">
          <CardContent className="p-4">
            <CandleChart />
            <div className="mt-1 flex justify-between border-t border-slate-100 pt-3 text-[10px] text-slate-400"><span>10</span><span>15</span><span>20</span><span>25</span></div>
          </CardContent>
        </Card>
      </section>

      <section className="mt-4">
        <div className="flex items-center justify-between">
          <span className="text-[13px] font-extrabold">ابزارها</span>
          <div className="flex gap-2">
            {[PenLine, Target, Plus, Users, PenLine, ChevronLeft].map((Icon, index) => (
              <button key={index} onClick={() => notify(`ابزار ${index + 1} فعال شد.`)} className="flex h-9 w-9 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-slate-100 transition hover:bg-slate-50 active:scale-95">
                <Icon className="h-4 w-4 text-slate-500" />
              </button>
            ))}
          </div>
        </div>
      </section>

      <Card className="mt-4 shadow-sm ring-1 ring-slate-100">
        <CardContent className="flex items-center gap-4 p-4">
          <div className="w-16 shrink-0">
            <svg viewBox="0 0 56 44" className="h-12 w-full"><path d="M2 38 L18 11 L31 30 L44 5 L54 5" fill="none" stroke="#8b5cf6" strokeWidth="2.5" strokeLinecap="round" /></svg>
          </div>
          <div className="flex-1">
            <p className="text-[11px] font-bold text-violet-700">چالش شما</p>
            <p className="mt-1 text-[12px] font-extrabold">این الگو چیست؟</p>
            <p className="mt-1 text-[11px] font-medium text-slate-500">الگوی مثلث صعودی</p>
            <Button onClick={() => notify("پاسخ: مثلث صعودی")} className="mt-3 h-9 px-4 text-[11px]">بررسی پاسخ</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function Community({ goTo, openProfile, notify }: { goTo: (screen: Screen) => void; openProfile: () => void; notify: (message: string, tone?: NoticeTone) => void }) {
  const [tab, setTab] = useState(0);
  const [liked, setLiked] = useState<number[]>([]);
  const [saved, setSaved] = useState<number[]>([]);
  const visiblePosts = tab === 0 ? communityPosts : tab === 2 ? communityPosts.filter((post) => post.likes > 100) : [];
  return (
    <div dir="rtl">
      <Header title="اجتماع" onProfile={openProfile} />
      <Segmented items={["ایده‌های معاملاتی", "دنبال‌شده‌ها", "محبوب‌ها"]} active={tab} onChange={setTab} compact />

      <AnimatePresence mode="wait">
        {visiblePosts.length === 0 ? (
          <motion.div key="empty-community" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="mt-5">
            <EmptyState
              title="هنوز کسی را دنبال نکرده‌ای"
              description="معامله‌گرهای مورد علاقه‌ات را دنبال کن تا ایده‌هایشان اینجا نمایش داده شود."
              actionLabel="مشاهده محبوب‌ها"
              onAction={() => setTab(2)}
            />
          </motion.div>
        ) : (
          <motion.div key={`posts-${tab}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="mt-5 space-y-5">
            {visiblePosts.map((post, index) => {
              const isLiked = liked.includes(post.id);
              const isSaved = saved.includes(post.id);
              return (
                <section key={post.id} className={cx(index === 0 && "border-b border-slate-100 pb-5")}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar label={post.avatar} />
                      <div>
                        <div className="flex items-center gap-1">
                          <p className="text-[13px] font-extrabold">{post.author}</p>
                          <ShieldCheck className="h-3.5 w-3.5 text-blue-500" />
                        </div>
                        <p className="mt-1 text-[10px] font-medium text-slate-500">{post.age}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <button onClick={() => notify("منوی پست باز شد.")} className="text-slate-300"><MoreHorizontal className="h-4 w-4" /></button>
                      <span className="rounded-full bg-violet-50 px-3 py-1 text-[11px] font-bold text-violet-700">تحلیل</span>
                    </div>
                  </div>

                  <h3 className="mt-4 text-[15px] font-extrabold">{post.title}</h3>
                  <p className="mt-3 text-[12px] leading-7 text-slate-700">{post.text}</p>

                  {index === 0 && (
                    <div className="mt-4">
                      <p className="mb-2 text-[11px] font-bold text-slate-700">{post.pair}</p>
                      <PostChart />
                    </div>
                  )}

                  <div className="mt-4 flex items-center justify-between text-[12px] text-slate-500">
                    <button onClick={() => setLiked((current) => isLiked ? current.filter((id) => id !== post.id) : [...current, post.id])} className="flex items-center gap-1.5 transition hover:text-rose-500">
                      <Heart className={cx("h-4 w-4", isLiked && "fill-rose-500 text-rose-500")} />
                      <span>{post.likes + (isLiked ? 1 : 0)}</span>
                    </button>
                    <button onClick={() => goTo("chat")} className="flex items-center gap-1.5 transition hover:text-violet-700"><MessageCircle className="h-4 w-4" /><span>{post.comments}</span></button>
                    <button onClick={() => notify("لینک پست کپی شد.", "success")} className="flex items-center gap-1.5 transition hover:text-violet-700"><Share2 className="h-4 w-4" /><span>{post.shares}</span></button>
                    <button onClick={() => setSaved((current) => isSaved ? current.filter((id) => id !== post.id) : [...current, post.id])} className="transition hover:text-violet-700">
                      <Bookmark className={cx("h-4 w-4", isSaved && "fill-violet-700 text-violet-700")} />
                    </button>
                  </div>
                </section>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Chat({ goBack, notify }: { goBack: () => void; notify: (message: string, tone?: NoticeTone) => void }) {
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);
  const [messages, setMessages] = useState([
    { name: "محمد تریدر", text: "سلام به همه! تحلیل امروز چیه؟", time: "10:30", label: "م" },
    { name: "سارا", text: "به نظر من EUR/USD صعودی هست.", time: "10:31", label: "س" },
    { name: "علی تریدر", text: "موافقم، شکست مقاومت تأیید شد.", time: "10:32", label: "ع" },
    { name: "رضا تریدر", text: "ممنون از تحلیل‌ها 🙏", time: "10:33", label: "ر" },
  ]);
  const send = () => {
    if (!draft.trim()) {
      notify("متن پیام نمی‌تواند خالی باشد.", "error");
      return;
    }
    setSending(true);
    window.setTimeout(() => {
      setMessages((current) => [...current, { name: "شما", text: draft.trim(), time: "الان", label: "ش" }]);
      setDraft("");
      setSending(false);
      notify("پیام ارسال شد.", "success");
    }, 650);
  };
  return (
    <div dir="rtl" className="flex min-h-[690px] flex-col">
      <Header title="اتاق گفتگو" left="back" onBack={goBack} right="none" />

      <button onClick={() => notify("مشخصات اتاق گفتگو باز شد.")} className="mb-5 flex items-center gap-3 text-right">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-50 text-violet-700"><Users className="h-5 w-5" /></div>
        <div>
          <div className="flex items-center gap-2">
            <p className="text-[14px] font-extrabold">فارکس عمومی</p>
            <LiveBadge label="آنلاین" />
          </div>
          <p className="mt-1 text-[11px] font-medium text-slate-500">1,245 آنلاین</p>
        </div>
      </button>

      <div className="flex-1 space-y-4">
        <AnimatePresence initial={false}>
          {messages.map((message, index) => (
            <motion.div
              key={`${message.time}-${index}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="flex items-start gap-3"
            >
              <Avatar label={message.label} />
              <div className="min-w-0 flex-1 rounded-[18px] bg-slate-50 px-4 py-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <span className="text-[12px] font-extrabold text-violet-700">{message.name}</span>
                    {message.name !== "شما" && <ShieldCheck className="h-3.5 w-3.5 text-blue-500" />}
                  </div>
                  <span className="text-[10px] text-slate-400">{message.time}</span>
                </div>
                <p className="mt-2 text-[12px] leading-6 text-slate-700">{message.text}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="mt-5 flex items-center gap-2 rounded-[18px] border border-slate-100 bg-white px-3 py-2 shadow-sm ring-1 ring-slate-50">
        <input
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={(event) => event.key === "Enter" && send()}
          className="h-10 flex-1 bg-transparent px-2 text-[12px] outline-none placeholder:text-slate-300"
          placeholder="پیام خود را بنویسید..."
        />
        <Button loading={sending} onClick={send} className="h-10 w-10 rounded-full p-0 shadow-none">
          {!sending && <Send className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  );
}

function Trade({ goBack, notify }: { goBack: () => void; notify: (message: string, tone?: NoticeTone) => void }) {
  const [tab, setTab] = useState(0);
  const [timeframe, setTimeframe] = useState("1H");
  const [volume, setVolume] = useState(0.01);
  const [leverageIndex, setLeverageIndex] = useState(1);
  const [openingTrade, setOpeningTrade] = useState(false);
  const leverages = ["1:50", "1:100", "1:200"];
  const openTrade = () => {
    setOpeningTrade(true);
    window.setTimeout(() => {
      setOpeningTrade(false);
      notify(`معامله با حجم ${volume.toFixed(2)} و اهرم ${leverages[leverageIndex]} باز شد.`, "success");
    }, 850);
  };
  return (
    <div dir="rtl">
      <Header title="ترید" left="back" onBack={goBack} right="square" />
      <Segmented items={["معاملات زنده", "تمرین / بک‌تست"]} active={tab} onChange={setTab} />

      <section className="mt-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[15px] font-extrabold tracking-wide">EUR/USD</span>
            <LiveBadge />
          </div>
          <span className="text-[15px] font-extrabold text-emerald-600">+0.45%</span>
        </div>
        <div className="mt-5 flex items-start justify-between">
          <div>
            <h2 className="text-[26px] font-extrabold leading-none tracking-wide">1.08564</h2>
            <p className="mt-2 text-[12px] font-bold text-emerald-600">+0.00485 (+0.45%)</p>
          </div>
          <button onClick={() => notify("انتخاب بازه زمانی باز شد.")} className="mt-1 flex items-center gap-1 text-[11px] font-bold text-slate-500">
            <span>{timeframe}</span>
            <ChevronDown className="h-3.5 w-3.5" />
          </button>
        </div>
        <motion.div key={timeframe} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} className="mt-3"><LineChartMini /></motion.div>
        <div className="mt-1 flex items-center justify-between px-1 text-[11px] font-bold text-slate-500">
          <span className="text-slate-300">⋮</span>
          {["1M", "1H", "4H", "1D"].map((item) => (
            <button key={item} onClick={() => setTimeframe(item)} className={cx("rounded-full px-4 py-2 transition", timeframe === item ? "bg-violet-700 text-white" : "hover:bg-slate-100")}>{item}</button>
          ))}
        </div>
      </section>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <Button tone="success" onClick={() => notify("سفارش خرید آماده شد.", "success")} className="h-[68px] flex-col rounded-[18px]">
          <span className="text-[16px] font-extrabold">خرید</span>
          <span className="mt-1 text-[13px] font-bold">1.08578</span>
        </Button>
        <Button tone="danger" onClick={() => notify("سفارش فروش آماده شد.")} className="h-[68px] flex-col rounded-[18px]">
          <span className="text-[16px] font-extrabold">فروش</span>
          <span className="mt-1 text-[13px] font-bold">1.08550</span>
        </Button>
      </div>

      <div className="mt-5 space-y-3">
        <div className="flex items-center gap-3">
          <span className="w-10 text-[12px] font-extrabold">حجم</span>
          <div className="flex h-12 flex-1 items-center justify-between rounded-[14px] border border-slate-200 px-4">
            <span className="text-[13px] font-bold">{volume.toFixed(2)}</span>
            <div className="flex items-center gap-4 text-slate-600">
              <button onClick={() => setVolume((current) => +(current + 0.01).toFixed(2))} className="text-[20px] leading-none">+</button>
              <span className="h-5 w-px bg-slate-200" />
              <button onClick={() => setVolume((current) => Math.max(0.01, +(current - 0.01).toFixed(2)))} className="text-[20px] leading-none">−</button>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="w-10 text-[12px] font-extrabold">اهرم</span>
          <button onClick={() => setLeverageIndex((current) => (current + 1) % leverages.length)} className="flex h-12 flex-1 items-center justify-between rounded-[14px] border border-slate-200 px-4 text-right">
            <span className="text-[13px] font-bold">{leverages[leverageIndex]}</span>
            <ChevronDown className="h-4 w-4 text-slate-400" />
          </button>
        </div>
      </div>

      <Button loading={openingTrade} onClick={openTrade} className="mt-4 h-[48px] w-full rounded-[14px] text-[14px]">باز کردن معامله</Button>
    </div>
  );
}

function Platform({ goBack, goTo, notify }: { goBack: () => void; goTo: (screen: Screen) => void; notify: (message: string) => void }) {
  const [tab, setTab] = useState(2);
  const [category, setCategory] = useState<string | null>(null);
  return (
    <div dir="rtl">
      <Header title="پلتفرم" left="back" onBack={goBack} right="square" />
      <Segmented items={["همه", "صرافی‌ها", "بروکرها", "پراپ‌فرم‌ها"]} active={tab} onChange={setTab} compact />

      <section className="mt-6">
        <h3 className="mb-4 text-[18px] font-extrabold">برترین بروکرها</h3>
        <div className="space-y-3">
          {brokers.map((broker) => (
            <Card key={broker.name} className="shadow-sm ring-1 ring-slate-100">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex h-[62px] w-[62px] shrink-0 items-center justify-center rounded-[18px] bg-slate-950 text-[16px] font-extrabold text-white">{broker.mark}</div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <p className="truncate text-[16px] font-extrabold">{broker.name}</p>
                    <span className="flex items-center gap-1 text-[12px] font-bold text-slate-600"><Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />{broker.rating}</span>
                  </div>
                  <p className="mt-2 text-[12px] text-slate-600">{broker.spread}</p>
                  <p className="mt-2 text-[12px] text-slate-600">{broker.deposit}</p>
                </div>
                <Button tone="outline" onClick={() => notify(`بررسی ${broker.name} باز شد.`)} className="h-10 px-4 text-[12px]">بررسی</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <button onClick={() => goTo("signals")} className="mt-5 text-[12px] font-bold text-violet-700">مشاهده همه</button>

      <section className="mt-6">
        <h3 className="mb-4 text-[16px] font-extrabold">دسته‌بندی‌ها</h3>
        <div className="grid grid-cols-3 gap-3">
          {["واریز سریع", "اسپرد پایین", "مناسب مبتدیان"].map((tag) => (
            <button key={tag} onClick={() => setCategory(tag)}>
              <Card className={cx("shadow-sm ring-1 transition", category === tag ? "bg-violet-50 ring-violet-200" : "ring-slate-100 hover:shadow-md")}>
                <CardContent className="flex h-[52px] items-center justify-center px-2 text-center text-[12px] font-bold text-slate-700">{tag}</CardContent>
              </Card>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}

function Signals({ goBack, notify }: { goBack: () => void; notify: (message: string, tone?: NoticeTone) => void }) {
  const [tab, setTab] = useState(1);
  const visibleSignals = tab === 2 ? [] : signals;
  return (
    <div dir="rtl">
      <Header title="سیگنال‌های اختصاصی" left="back" onBack={goBack} right="none" />
      <Segmented items={["همه", "فارکس", "ارز دیجیتال"]} active={tab} onChange={setTab} compact />
      <AnimatePresence mode="wait">
        {visibleSignals.length === 0 ? (
          <motion.div key="empty-signals" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="mt-5">
            <EmptyState
              title="فعلاً سیگنال جدیدی نیست"
              description="به محض انتشار سیگنال ارز دیجیتال، اینجا نمایش داده می‌شود."
              actionLabel="مشاهده فارکس"
              onAction={() => setTab(1)}
            />
          </motion.div>
        ) : (
          <motion.div key={`signals-${tab}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="mt-5 space-y-4">
            {visibleSignals.map((signal) => (
              <Card key={signal.pair}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-[16px] font-extrabold">{signal.pair}</p>
                    <span className={cx("rounded-full px-3 py-1 text-[12px] font-bold", signal.typeClass)}>{signal.type}</span>
                  </div>
                  <div className="mt-5 grid grid-cols-3 gap-3 text-right">
                    <div><p className="text-[11px] text-slate-600">حد ضرر</p><p className="mt-1 text-[13px] font-bold">{signal.stop}</p></div>
                    <div><p className="text-[11px] text-slate-600">حد سود</p><p className="mt-1 text-[13px] font-bold">{signal.target}</p></div>
                    <div><p className="text-[11px] text-slate-600">قیمت ورود</p><p className="mt-1 text-[13px] font-bold">{signal.entry}</p></div>
                  </div>
                  <div className="mt-5 flex items-center justify-between">
                    <div className="flex items-center gap-2"><Avatar label={signal.avatar} small /><div><p className="text-[12px] font-bold">{signal.analyst}</p><p className="mt-0.5 text-[10px] text-slate-500">{signal.time}</p></div></div>
                    <Button tone="outline" onClick={() => notify(`سیگنال ${signal.pair} باز شد.`, "success")} className="h-9 px-5 text-[12px]">مشاهده</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Tournament({ openProfile, notify }: { openProfile: () => void; notify: (message: string, tone?: NoticeTone) => void }) {
  const [tab, setTab] = useState(0);
  const [joining, setJoining] = useState(false);
  const joinTournament = () => {
    setJoining(true);
    window.setTimeout(() => {
      setJoining(false);
      notify("در مسابقه هفتگی ثبت‌نام شدید.", "success");
    }, 850);
  };
  return (
    <div dir="rtl">
      <Header title="مسابقات" left="none" right="none" onProfile={openProfile} />
      <Segmented items={["زنده", "بک‌تست"]} active={tab} onChange={setTab} />

      <Card className="mt-4 overflow-hidden bg-gradient-to-br from-[#5722d8] to-[#6d28d9] text-white shadow-[0_18px_40px_rgba(109,40,217,0.22)]">
        <CardContent className="p-5">
          <div className="flex items-center justify-center gap-2">
            <h2 className="text-center text-[17px] font-extrabold">مسابقه هفتگی</h2>
            <LiveBadge />
          </div>
          <div className="mt-4 flex items-end justify-center gap-4 text-center" dir="ltr">
            {[{ value: "02", label: "روز" }, { value: "14", label: "ساعت" }, { value: "36", label: "دقیقه" }].map((item, index) => (
              <React.Fragment key={item.label}>
                <div><p className="text-[24px] font-medium tracking-[0.16em]">{item.value}</p><p className="mt-1 text-[11px] text-violet-100">{item.label}</p></div>
                {index < 2 && <span className="pb-5 text-[24px] font-light">:</span>}
              </React.Fragment>
            ))}
          </div>
          <div className="mt-5 h-px bg-white/10" />
          <div className="mt-4 grid grid-cols-2">
            <div className="border-l border-white/10 text-center"><p className="text-[11px] text-violet-100">جایزه</p><p className="mt-2 text-[15px] font-extrabold">10,000 USDT</p></div>
            <div className="text-center"><p className="text-[11px] text-violet-100">شرکت‌کنندگان</p><p className="mt-2 text-[15px] font-extrabold">1,234</p></div>
          </div>
          <Button loading={joining} onClick={joinTournament} className="mt-5 h-[46px] w-full rounded-full bg-white/10 text-[13px] text-white shadow-none hover:bg-white/15">شرکت در مسابقه</Button>
        </CardContent>
      </Card>

      <section className="mt-7">
        <h3 className="mb-4 text-[17px] font-extrabold">جدول رتبه‌بندی</h3>
        {ranking.map((person, index) => (
          <div key={person.rank} className={cx("flex h-[58px] items-center justify-between", index < 2 && "border-b border-slate-100")}>
            <div className="flex items-center gap-4"><span className="w-3 text-[12px] font-bold">{person.rank}</span><Avatar label={person.avatar} /><span className="text-[13px] font-bold">{person.name}</span></div>
            <span className="text-[13px] font-extrabold text-emerald-600">{person.gain}</span>
          </div>
        ))}
      </section>
    </div>
  );
}

function Profile({ goTo, notify }: { goTo: (screen: Screen) => void; notify: (message: string) => void }) {
  return (
    <div dir="rtl">
      <Header title="پروفایل" left="settings" right="none" />
      <div className="mt-1 text-center">
        <div className="mx-auto flex h-[76px] w-[76px] items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-slate-900 to-slate-600 text-[20px] font-extrabold text-white">ع</div>
        <h2 className="mt-3 text-[17px] font-extrabold">علی تریدر</h2>
        <p className="mt-1 text-[11px] font-bold text-violet-700">سطح متوسط</p>
        <Button onClick={() => notify("صفحه ارتقا به پرو باز شد.")} className="mt-4 h-[42px] w-[218px] rounded-full text-[13px]"><Crown className="ml-2 h-4 w-4" />ارتقا به پرو</Button>
      </div>
      <div className="mt-5 grid grid-cols-3 text-center">
        <div><p className="text-[11px] text-slate-500">دنبال‌کننده‌ها</p><p className="mt-2 text-[16px] font-extrabold">1,234</p></div>
        <div><p className="text-[11px] text-slate-500">سود خالص</p><p className="mt-2 text-[16px] font-extrabold text-emerald-600">+12.45%</p></div>
        <div><p className="text-[11px] text-slate-500">معاملات</p><p className="mt-2 text-[16px] font-extrabold">128</p></div>
      </div>
      <div className="mt-5 h-px bg-slate-100" />
      <section className="mt-4">
        <h3 className="mb-4 text-[14px] font-extrabold">دستاوردها</h3>
        <div className="grid grid-cols-4 gap-3">
          {["⚕", "⚔", "✦", "♫"].map((glyph, index) => (
            <button key={glyph} onClick={() => notify(`دستاورد ${index + 1} باز شد.`)} className="flex h-[58px] items-center justify-center rounded-2xl bg-slate-50">
              <div className={cx("flex h-10 w-10 items-center justify-center rounded-[12px] text-[19px] font-extrabold text-white shadow-sm", index === 0 ? "bg-gradient-to-br from-violet-400 to-violet-700" : index === 1 ? "bg-gradient-to-br from-amber-300 to-amber-500" : index === 2 ? "bg-gradient-to-br from-emerald-300 to-emerald-600" : "bg-gradient-to-br from-sky-300 to-blue-500")}>{glyph}</div>
            </button>
          ))}
        </div>
      </section>
      <Card className="mt-5 shadow-sm ring-1 ring-slate-100">
        <CardContent className="divide-y divide-slate-100 px-4">
          {[
            { label: "سیگنال‌های اختصاصی", icon: "📈", to: "signals" as Screen },
            { label: "اتاق‌های ویژه", icon: "♧", to: "chat" as Screen },
            { label: "مسیرهای پیشرفته", icon: "♢", to: "learn" as Screen },
          ].map((item) => (
            <button key={item.label} onClick={() => goTo(item.to)} className="flex h-[50px] w-full items-center justify-between">
              <div className="flex items-center gap-3"><span className="text-[15px] text-slate-500">{item.icon}</span><span className="text-[12px] font-bold text-slate-700">{item.label}</span></div>
              <span className="rounded-full bg-violet-50 px-3 py-1 text-[11px] font-bold text-violet-700">پرو</span>
            </button>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

function App() {
  const [active, setActive] = useState<Screen>("dashboard");
  const [, setHistory] = useState<Screen[]>([]);
  const [notice, setNotice] = useState<NoticeState>(null);
  const [darkMode, setDarkMode] = useState(false);
  const [presentationMode, setPresentationMode] = useState(true);

  const notify = (message: string, tone: NoticeTone = "info") => {
    setNotice({ message, tone });
    window.setTimeout(() => setNotice(null), 1800);
  };

  const goTo = (screen: Screen) => {
    setHistory((current) => [...current, active]);
    setActive(screen);
  };

  const goBack = () => {
    setHistory((current) => {
      const copy = [...current];
      const previous = copy.pop() ?? "dashboard";
      setActive(previous);
      return copy;
    });
  };

  const resetDemo = () => {
    setActive("dashboard");
    setHistory([]);
    notify("دمو به صفحه اصلی بازگشت.", "success");
  };

  const toggleTheme = () => {
    setDarkMode((current) => !current);
    notify(darkMode ? "تم روشن فعال شد." : "تم تاریک فعال شد.", "success");
  };

  const togglePresentation = () => {
    setPresentationMode((current) => !current);
    notify(presentationMode ? "حالت تمرکز فعال شد." : "حالت ارائه فعال شد.");
  };

  const openProfile = () => goTo("profile");

  const screens = useMemo(
    () => ({
      dashboard: <Dashboard goTo={goTo} openProfile={openProfile} notify={notify} />,
      learn: <LearnHub goTo={goTo} openProfile={openProfile} notify={notify} />,
      lesson: <Lesson goBack={goBack} notify={notify} />,
      fundamental: <Fundamental goBack={goBack} notify={notify} />,
      technical: <Technical goBack={goBack} notify={notify} />,
      community: <Community goTo={goTo} openProfile={openProfile} notify={notify} />,
      chat: <Chat goBack={goBack} notify={notify} />,
      trade: <Trade goBack={goBack} notify={notify} />,
      platform: <Platform goBack={goBack} goTo={goTo} notify={notify} />,
      signals: <Signals goBack={goBack} notify={notify} />,
      tournament: <Tournament openProfile={openProfile} notify={notify} />,
      profile: <Profile goTo={goTo} notify={notify} />,
    }),
    [active],
  );

  const bottomActive: Screen = active === "dashboard" || ["lesson", "fundamental", "technical"].includes(active) ? "learn" : active;
  const showBottom = !["profile", "signals"].includes(active);

  return (
    <div
      className={cx(
        "app-shell min-h-screen transition-colors duration-300",
        darkMode
          ? "app-dark bg-[radial-gradient(circle_at_top,_#312e81,_#0f172a_48%)] text-slate-100"
          : "bg-[radial-gradient(circle_at_top,_#f4f0ff,_#ffffff_48%)] text-slate-900",
      )}
      style={{ fontFamily: '"Vazirmatn Variable", "Vazirmatn", Tahoma, sans-serif' }}
    >
      <style>{`
        .app-dark .bg-white { background-color: #111827 !important; }
        .app-dark .bg-white\/95 { background-color: rgba(17, 24, 39, 0.95) !important; }
        .app-dark .bg-slate-50 { background-color: #0f172a !important; }
        .app-dark .bg-slate-100, .app-dark .bg-slate-100\/90 { background-color: rgba(51, 65, 85, 0.72) !important; }
        .app-dark .text-slate-950, .app-dark .text-slate-900, .app-dark .text-slate-700 { color: #f8fafc !important; }
        .app-dark .text-slate-600, .app-dark .text-slate-500 { color: #cbd5e1 !important; }
        .app-dark .text-slate-400 { color: #94a3b8 !important; }
        .app-dark .border-slate-100, .app-dark .border-slate-200 { border-color: rgba(148, 163, 184, 0.16) !important; }
        .app-dark .ring-slate-100, .app-dark .ring-slate-200\/80 { --tw-ring-color: rgba(148, 163, 184, 0.16) !important; }
        .app-dark .shadow-sm { box-shadow: 0 1px 2px rgba(0,0,0,0.18), 0 12px 28px rgba(0,0,0,0.16) !important; }
        .app-dark input { color: #f8fafc; }
        .app-dark input::placeholder { color: #64748b; }
      `}</style>

      <div className="mx-auto grid min-h-screen w-full max-w-6xl items-center gap-8 px-4 py-4 lg:grid-cols-[minmax(280px,1fr)_390px] lg:px-8">
        <AnimatePresence>
          {presentationMode && (
            <motion.aside
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 18 }}
              transition={{ duration: 0.22 }}
              className="order-2 hidden lg:block"
              dir="rtl"
            >
              <div className="max-w-xl">
                <div className="inline-flex items-center gap-2 rounded-full bg-violet-100 px-3 py-1.5 text-[12px] font-bold text-violet-700">
                  <Sparkles className="h-4 w-4" />
                  پروتوتایپ تعاملی آماده ارائه
                </div>
                <h2 className="mt-5 text-[32px] font-extrabold leading-[1.35] tracking-[-0.04em]">
                  اکوسیستم آموزش، ترید و رقابت برای معامله‌گران تازه‌کار
                </h2>
                <p className="mt-4 max-w-lg text-[14px] leading-8 text-slate-600">
                  دمو شامل مسیر یادگیری، اجتماع، معاملات، پلتفرم‌های مقایسه‌ای، مسابقات و پروفایل کاربر است. همه بخش‌ها تعاملی‌اند و برای نمایش به کارفرما طراحی شده‌اند.
                </p>

                <div className="mt-6 grid max-w-lg grid-cols-3 gap-3">
                  {[
                    { value: "۱۲+", label: "صفحه تعاملی" },
                    { value: "۵", label: "ماژول اصلی" },
                    { value: "RTL", label: "کاملاً فارسی" },
                  ].map((item) => (
                    <Card key={item.label}>
                      <CardContent className="p-4 text-center">
                        <p className="text-[20px] font-extrabold text-violet-700">{item.value}</p>
                        <p className="mt-1 text-[11px] font-medium text-slate-500">{item.label}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Button onClick={resetDemo} className="h-11 px-5 text-[13px]"><RotateCcw className="h-4 w-4" />شروع دوباره دمو</Button>
                  <Button tone="outline" onClick={toggleTheme} className="h-11 px-5 text-[13px]">
                    {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                    {darkMode ? "تم روشن" : "تم تاریک"}
                  </Button>
                  <Button tone="soft" onClick={togglePresentation} className="h-11 px-5 text-[13px] shadow-none">
                    <Smartphone className="h-4 w-4" />
                    حالت تمرکز
                  </Button>
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        <div className="order-1 flex justify-center lg:justify-end">
          <div className="relative">
            <div className="mb-3 flex justify-center gap-2 lg:hidden">
              <Button tone="soft" onClick={toggleTheme} className="h-9 px-3 text-[11px] shadow-none">
                {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                {darkMode ? "روشن" : "تاریک"}
              </Button>
              <Button tone="soft" onClick={resetDemo} className="h-9 px-3 text-[11px] shadow-none">
                <RotateCcw className="h-4 w-4" />
                ریست
              </Button>
            </div>

            <div className="relative mx-auto flex min-h-[770px] w-full max-w-[390px] flex-col overflow-hidden rounded-[36px] bg-white shadow-[0_28px_80px_rgba(76,29,149,0.16)] ring-1 ring-slate-200/80">
              <Notice notice={notice} />
              <main className="flex-1 overflow-y-auto px-5 pb-6 pt-5">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, x: 14 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -14 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                  >
                    {screens[active]}
                  </motion.div>
                </AnimatePresence>
              </main>
              {showBottom && (
                <nav className="grid grid-cols-5 border-t border-slate-100 bg-white/95 px-2 pb-2 pt-2 backdrop-blur">
                  {navItems.map(({ id, label, icon: Icon }) => {
                    const selected = bottomActive === id;
                    return (
                      <button key={id} onClick={() => setActive(id === "learn" ? "learn" : id)} className="flex flex-col items-center justify-center gap-1 py-1.5">
                        <Icon className={cx("h-[19px] w-[19px] transition", selected ? "text-violet-700" : "text-slate-400")} />
                        <span className={cx("text-[10px] font-bold", selected ? "text-violet-700" : "text-slate-400")}>{label}</span>
                      </button>
                    );
                  })}
                </nav>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
