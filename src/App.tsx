import { useState } from "react";

// ─── Data ────────────────────────────────────────────────────────────────────

const GRAMMAR_TAGS = [
  "-(으)ㄴ 적이 있다/없다",
  "-아/어서",
  "-고 싶다",
  "-(으)ㄹ게요",
];

type DialogueLine = {
  speaker: "A" | "B";
  korean: string;
  russian: string;
  grammars: string[];
};

type Dialogue = {
  id: number;
  destination: string;
  subtitle: string;
  accentClass: string;
  bgClass: string;
  topic: string;
  vocab: string[];
  lines: DialogueLine[];
};

const dialogues: Dialogue[] = [
  {
    id: 1,
    destination: "Токио",
    subtitle: "일본 도쿄",
    accentClass: "text-[#c94040]",
    bgClass: "bg-[#c94040]",
    topic: "Первый полёт и впечатления",
    vocab: ["Путешествия", "Транспорт", "Описания мест"],
    lines: [
      { speaker: "A", korean: "민수 씨, 외국으로 여행 가 본 적이 있어요?", russian: "Минсу, ты когда-нибудь путешествовал за границу?", grammars: ["-(으)ㄴ 적이 있다/없다"] },
      { speaker: "B", korean: "네, 지난 방학 때 일본 도쿄에 다녀왔어요. 비행기를 처음 타 봤는데 정말 신기했어요!", russian: "Да, на прошлых каникулах я ездил в Японию, в Токио. Я впервые летел на самолёте — это было так здорово!", grammars: ["-아/어서"] },
      { speaker: "A", korean: "비행기에서 기내식도 먹었어요?", russian: "В самолёте бортовое питание тоже ел?", grammars: [] },
      { speaker: "B", korean: "아니요, 인천에서 도쿄까지 2시간밖에 안 걸려서 기내식은 없었어요. 대신 창가에 앉아서 밖을 구경했어요.", russian: "Нет, от Инчхона до Токио всего 2 часа, поэтому еды не было. Зато я сидел у окна и смотрел наружу.", grammars: ["-아/어서"] },
      { speaker: "A", korean: "도쿄는 어땠어요?", russian: "И как тебе Токио?", grammars: [] },
      { speaker: "B", korean: "음식이 다양하고 경치가 아름다워서 너무 재밌었어요. 다시 가고 싶어요!", russian: "Там разнообразная еда и красивые виды, было очень интересно. Хочу съездить снова!", grammars: ["-아/어서", "-고 싶다"] },
    ],
  },
  {
    id: 2,
    destination: "Сеул · Пусан",
    subtitle: "한국 서울·부산",
    accentClass: "text-[#2a5c8a]",
    bgClass: "bg-[#2a5c8a]",
    topic: "Контроль, транспорт и природа",
    vocab: ["Путешествия", "Транспорт", "Описания мест"],
    lines: [
      { speaker: "A", korean: "한국에 처음 왔어요? 방문 목적이 뭐예요?", russian: "Вы впервые в Корее? Какова цель визита?", grammars: [] },
      { speaker: "B", korean: "네, 이번이 처음 방문입니다. 친구와 관광차 왔어요. 일주일 머물 겁니다.", russian: "Да, это мой первый визит. Я приехал с другом с целью туризма. Останусь на неделю.", grammars: ["-(으)ㄹ게요"] },
      { speaker: "A", korean: "한국에서 어디에 갈 거예요?", russian: "Куда планируете поехать в Корее?", grammars: [] },
      { speaker: "B", korean: "서울을 구경하고 나서 기차를 타고 부산에도 갈 거예요. 부산 바다가 정말 아름답다고 들었어요.", russian: "После осмотра Сеула поеду на поезде в Пусан. Слышал, что море в Пусане очень красивое.", grammars: ["-아/어서"] },
      { speaker: "A", korean: "숙소는 예약했어요?", russian: "Жильё забронировали?", grammars: [] },
      { speaker: "B", korean: "네, 싸고 숙소가 깨끗한 곳으로 예약했어요.", russian: "Да, забронировал место, где недорого и чисто.", grammars: ["-아/어서"] },
    ],
  },
  {
    id: 3,
    destination: "Ханой",
    subtitle: "베트남 하노이",
    accentClass: "text-[#3a7d44]",
    bgClass: "bg-[#3a7d44]",
    topic: "Погода, климат и кухня",
    vocab: ["Путешествия", "Описания мест"],
    lines: [
      { speaker: "A", korean: "수진 씨, 베트남 하노이에 가 본 적 있어요?", russian: "Суджин, ты была во Вьетнаме, в Ханое?", grammars: ["-(으)ㄴ 적이 있다/없다"] },
      { speaker: "B", korean: "네, 4월에 여행을 다녀왔어요.", russian: "Да, я ездила в путешествие в апреле.", grammars: [] },
      { speaker: "A", korean: "날씨가 어땠어요? 많이 더웠어요?", russian: "Какая там была погода? Очень жарко?", grammars: [] },
      { speaker: "B", korean: "비가 조금 오기는 했지만, 공기가 맑고 바람이 불어서 시원한 편이었어요.", russian: "Хотя шёл небольшой дождь, воздух был чистый и дул ветерок — было довольно свежо.", grammars: ["-아/어서"] },
      { speaker: "A", korean: "베트남 음식은 입에 맞았어요?", russian: "Вьетнамская еда пришлась по вкусу?", grammars: [] },
      { speaker: "B", korean: "네! 쌀국수를 먹어 봤는데 생각보다 정말 맛있었어요. 지출을 줄이려고 자유여행으로 갔는데 가성비가 아주 좋았어요.", russian: "Да! Попробовала фо, и это оказалось вкуснее, чем я думала. Чтобы сократить расходы, поехала в самостоятельное путешествие — очень выгодно!", grammars: ["-아/어서", "-고 싶다"] },
    ],
  },
];

const grammarColors: Record<string, { pill: string; dot: string }> = {
  "-(으)ㄴ 적이 있다/없다": { pill: "bg-amber-100 text-amber-800 border border-amber-300", dot: "bg-amber-400" },
  "-아/어서": { pill: "bg-sky-100 text-sky-800 border border-sky-300", dot: "bg-sky-400" },
  "-고 싶다": { pill: "bg-violet-100 text-violet-800 border border-violet-300", dot: "bg-violet-400" },
  "-(으)ㄹ게요": { pill: "bg-emerald-100 text-emerald-800 border border-emerald-300", dot: "bg-emerald-400" },
};

// ─── Exercise data ────────────────────────────────────────────────────────────

type FillItem = {
  prompt: string;        // displayed prefix
  suffix?: string;       // displayed suffix after blank
  hint: string;          // hint shown inside input
  answer: string;        // correct answer
  context?: string;      // small italic note
};

type Ex1Item = { fact: string; template: string; answers: { a: string; b: string } };
type Ex3Item = { parts: [string, string]; answer: string };

const ex1Items: Ex1Item[] = [
  {
    fact: "하노이 / 4월 / 날씨가 시원하다",
    template: "하노이는 4월에 날씨가 ___ 편이에요.",
    answers: { a: "시원한", b: "시원한 편이에요" },
  },
  {
    fact: "도쿄 / 음식 / 다양하다",
    template: "도쿄는 맛있는 음식이 ___ 들었어요.",
    answers: { a: "다양하다고", b: "다양하다고 들었어요" },
  },
  {
    fact: "서울 숙소 / 싸다 / 깨끗하다",
    template: "친구가 서울 숙소가 ___ 말했어요.",
    answers: { a: "싸고 깨끗하다고", b: "싸고 깨끗하다고 말했어요" },
  },
];

const ex2Items: FillItem[] = [
  {
    prompt: "А: 비행기에서 기내식을 먹었어요?\nB: 인천에서 도쿄까지",
    suffix: ".",
    hint: "2시간밖에 안 걸리기는 했지만, ...",
    answer: "2시간밖에 안 걸리기는 했지만, 창가에 앉아서 밖을 구경했어요",
    context: "기내식 없음 → 창가 구경",
  },
  {
    prompt: "А: 베트남 물가가 비쌌어요?\nB:",
    suffix: ".",
    hint: "비행기표가 조금 비싸기는 했지만, ...",
    answer: "비행기표가 조금 비싸기는 했지만, 음식이 싸서 가성비가 좋았어요",
    context: "항공권 ↑, 식비 ↓",
  },
  {
    prompt: "А: 숙소가 조금 좁았어요?\nB:",
    suffix: ".",
    hint: "방이 조금 좁기는 했지만, ...",
    answer: "방이 조금 좁기는 했지만, 숙소가 깨끗해서 편했어요",
    context: "크기 ↓, 청결도 ↑",
  },
];

const ex3Items: Ex3Item[] = [
  {
    parts: ["서울을 구경하다", "기차를 타고 부산에 가다"],
    answer: "서울을 구경하고 나서 기차를 타고 부산에 갈 거예요.",
  },
  {
    parts: ["공항에서 세관 신고서를 내다", "짐을 찾다"],
    answer: "세관 신고서를 내고 나서 짐을 찾을게요.",
  },
  {
    parts: ["수업이 끝나다", "여행사에 비행기표를 예약하러 가다"],
    answer: "수업이 끝나고 나서 여행사에 갈 거예요.",
  },
];

const ex4Officer = [
  "한국/일본에 처음 방문하셨습니까?",
  "방문 목적이 무엇입니까?",
  "얼마 동안 머무실 겁니까?",
  "어느 숙소에 묵을 예정입니까?",
];
const ex4Tourist = [
  "네, 이번이 처음 방문입니다. / 전에 가 본 적이 있습니다.",
  "관광차 왔습니다.",
  "(일주일 / 열흘) 동안 머물 겁니다.",
  "(호텔 이름)에 묵을 겁니다. 깨끗한 곳으로 예약했습니다.",
];

const ex5Criteria = [
  { icon: "🌤", label: "Погода", detail: "하노이는 4월에 시원한 편이에요", grammar: "-(으)ㄴ 편이다" },
  { icon: "✈", label: "Транспорт", detail: "도쿄는 2시간밖에 안 걸려요", grammar: "-(으)ㄴ 적이 있다" },
  { icon: "🍜", label: "Кухня", detail: "쌀국수 / 일식 / 한국 향토 음식", grammar: "-아/어 보세요" },
  { icon: "💴", label: "Бюджет", detail: "자유여행 / 패키지 / 가성비", grammar: "-(으)ㄴ 편이다" },
];

const ex6Steps = [
  { num: 1, grammar: "-(으)ㄴ 적이 있다", template: "저는 ___에 가 본 적이 있어요.", label: "Опыт поездки" },
  { num: 2, grammar: "-(으)ㄴ 편이다", template: "날씨는 ___ 편이었고 경치가 아름다웠어요.", label: "Погода и природа" },
  { num: 3, grammar: "-고 나서", template: "비행기/기차 안에서 창가를 구경하거나 ___을/를 먹어 봤어요.", label: "Действие / Транспорт" },
  { num: 4, grammar: "-기는 하지만", template: "___(이)라서 생각보다 정말 만족스러웠어요.", label: "Итоговое впечатление" },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function GrammarTag({ g, active, onClick }: { g: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs transition-all cursor-pointer ${
        active
          ? grammarColors[g].pill + " shadow-sm scale-105"
          : "bg-[var(--color-tag-bg)] text-[var(--color-tag-text)] border border-[var(--color-border)] hover:border-[var(--color-muted)]"
      }`}
      style={{ fontFamily: "var(--font-mono)" }}
    >
      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${active ? grammarColors[g].dot : "bg-[var(--color-muted)]"}`} />
      {g}
    </button>
  );
}

// ─── Dialogs tab ─────────────────────────────────────────────────────────────

function DialoguesTab() {
  const [active, setActive] = useState(1);
  const [highlightGrammar, setHighlightGrammar] = useState<string | null>(null);
  const [showTranslation, setShowTranslation] = useState(false);
  const current = dialogues.find((d) => d.id === active)!;

  return (
    <>
      {/* Controls row */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setShowTranslation((v) => !v)}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded text-xs transition-all cursor-pointer border"
          style={{
            fontFamily: "var(--font-mono)",
            backgroundColor: showTranslation ? "var(--color-ink)" : "var(--color-tag-bg)",
            color: showTranslation ? "var(--color-paper)" : "var(--color-tag-text)",
            borderColor: showTranslation ? "var(--color-ink)" : "var(--color-border)",
          }}
        >
          {showTranslation ? "▲ скрыть перевод" : "▼ показать перевод"}
        </button>
        {GRAMMAR_TAGS.map((g) => (
          <GrammarTag
            key={g}
            g={g}
            active={highlightGrammar === g}
            onClick={() => setHighlightGrammar(highlightGrammar === g ? null : g)}
          />
        ))}
      </div>

      {/* Destination tabs */}
      <div className="flex gap-3 mb-6 flex-wrap">
        {dialogues.map((d) => (
          <button
            key={d.id}
            onClick={() => setActive(d.id)}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg border transition-all cursor-pointer text-left ${
              active === d.id ? "shadow-md scale-[1.01]" : "hover:border-[var(--color-muted)] hover:bg-[var(--color-paper-warm)]"
            }`}
            style={{
              borderColor: active === d.id ? "currentColor" : "var(--color-border)",
              backgroundColor: active === d.id ? "var(--color-paper-warm)" : "var(--color-paper)",
            }}
          >
            <span className={`text-2xl font-semibold leading-none ${d.accentClass}`} style={{ fontFamily: "var(--font-mono)" }}>
              {String(d.id).padStart(2, "0")}
            </span>
            <div>
              <div className="text-sm font-semibold leading-tight" style={{ fontFamily: "var(--font-display)", color: "var(--color-ink)" }}>
                {d.destination}
              </div>
              <div className="text-xs mt-0.5" style={{ fontFamily: "var(--font-display)", color: "var(--color-muted)" }}>
                {d.subtitle}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Dialogue card */}
      <div className="rounded-xl border overflow-hidden" style={{ borderColor: "var(--color-border)" }}>
        <div className="px-6 py-4 flex flex-col gap-1 border-b" style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-paper-warm)" }}>
          <div className="flex items-center gap-3 flex-wrap">
            <span className={`text-xs font-medium tracking-widest uppercase ${current.accentClass}`} style={{ fontFamily: "var(--font-mono)" }}>
              Диалог {current.id}
            </span>
            <div className={`h-px flex-1 ${current.bgClass} opacity-20`} />
            <div className="flex gap-1.5 flex-wrap">
              {current.vocab.map((v) => (
                <span key={v} className="text-xs px-2 py-0.5 rounded" style={{ fontFamily: "var(--font-mono)", backgroundColor: "var(--color-tag-bg)", color: "var(--color-tag-text)" }}>
                  {v}
                </span>
              ))}
            </div>
          </div>
          <h2 className="text-lg font-semibold" style={{ fontFamily: "var(--font-display)", color: "var(--color-ink)" }}>
            {current.destination} —{" "}
            <span style={{ color: "var(--color-muted)", fontWeight: 400 }}>{current.topic}</span>
          </h2>
        </div>

        <div className="divide-y" style={{ borderColor: "var(--color-border)" }}>
          {current.lines.map((line, i) => {
            const isA = line.speaker === "A";
            const faded = highlightGrammar !== null && !line.grammars.includes(highlightGrammar);
            return (
              <div
                key={i}
                className={`px-6 py-5 flex gap-5 transition-opacity duration-200 ${faded ? "opacity-25" : "opacity-100"} ${isA ? "" : "bg-[var(--color-paper-warm)]/40"}`}
              >
                <div className="flex-shrink-0 pt-0.5">
                  <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold text-white ${isA ? "bg-[#c94040]" : "bg-[#2a5c8a]"}`} style={{ fontFamily: "var(--font-mono)" }}>
                    {line.speaker}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-base leading-relaxed mb-1" style={{ fontFamily: "var(--font-display)", color: "var(--color-ink)" }}>
                    {line.korean}
                  </p>
                  {showTranslation && (
                    <p className="text-sm leading-relaxed italic" style={{ color: "var(--color-muted)" }}>
                      {line.russian}
                    </p>
                  )}
                  {line.grammars.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2.5">
                      {line.grammars.map((g) => (
                        <span key={g} className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded ${grammarColors[g].pill}`} style={{ fontFamily: "var(--font-mono)" }}>
                          <span className={`w-1.5 h-1.5 rounded-full ${grammarColors[g].dot}`} />
                          {g}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Grammar reference */}
      <div className="mt-6 rounded-lg border px-5 py-4" style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-paper-warm)" }}>
        <p className="text-xs tracking-widest uppercase mb-3" style={{ fontFamily: "var(--font-mono)", color: "var(--color-muted)" }}>
          Грамматические конструкции
        </p>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {[
            { tag: "-(으)ㄴ 적이 있다/없다", desc: "Наличие / отсутствие опыта" },
            { tag: "-아/어서", desc: "Причина или последовательность" },
            { tag: "-고 싶다", desc: "Желание что-либо сделать" },
            { tag: "-(으)ㄹ게요", desc: "Намерение или обещание" },
          ].map(({ tag, desc }) => (
            <div key={tag} className="flex items-start gap-2">
              <span className={`mt-0.5 w-2 h-2 rounded-full flex-shrink-0 ${grammarColors[tag].dot}`} />
              <div>
                <span className="text-xs font-medium" style={{ fontFamily: "var(--font-mono)", color: "var(--color-ink)" }}>{tag}</span>
                <span className="text-xs ml-2" style={{ color: "var(--color-muted)" }}>— {desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

// ─── Fill-in input ────────────────────────────────────────────────────────────

function FillInput({ answer, placeholder }: { answer: string; placeholder: string }) {
  const [value, setValue] = useState("");
  const [revealed, setRevealed] = useState(false);
  const correct = value.trim().toLowerCase() === answer.trim().toLowerCase();

  return (
    <div className="mt-3">
      <div className="flex gap-2 items-start flex-wrap">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          className="flex-1 min-w-0 px-3 py-2 rounded border text-sm outline-none transition-colors"
          style={{
            fontFamily: "var(--font-display)",
            borderColor: revealed || value.length === 0 ? "var(--color-border)" : correct ? "#3a7d44" : "#c94040",
            backgroundColor: "var(--color-paper)",
            color: "var(--color-ink)",
          }}
        />
        <button
          onClick={() => setRevealed((v) => !v)}
          className="px-3 py-2 rounded border text-xs transition-all cursor-pointer flex-shrink-0"
          style={{
            fontFamily: "var(--font-mono)",
            borderColor: "var(--color-border)",
            backgroundColor: revealed ? "var(--color-ink)" : "var(--color-tag-bg)",
            color: revealed ? "var(--color-paper)" : "var(--color-tag-text)",
          }}
        >
          {revealed ? "скрыть" : "ответ"}
        </button>
      </div>
      {revealed && (
        <p className="mt-2 text-sm px-3 py-2 rounded" style={{ fontFamily: "var(--font-display)", backgroundColor: "var(--color-paper-warm)", color: "var(--color-ink)", borderLeft: "3px solid #3a7d44" }}>
          {answer}
        </p>
      )}
    </div>
  );
}

// ─── Exercises tab ────────────────────────────────────────────────────────────

const exGrammarNew: Record<string, string> = {
  "-(으)ㄴ 적이 있다/없다": "bg-amber-100 text-amber-800 border border-amber-300",
  "-고 나서": "bg-orange-100 text-orange-800 border border-orange-300",
  "-(으)ㄴ 편이다": "bg-pink-100 text-pink-800 border border-pink-300",
  "-기는 하지만": "bg-cyan-100 text-cyan-800 border border-cyan-300",
  "-(으)ㄹ게요": "bg-emerald-100 text-emerald-800 border border-emerald-300",
  "-아/어 보세요": "bg-sky-100 text-sky-800 border border-sky-300",
};

function GrammarPill({ g }: { g: string }) {
  const cls = exGrammarNew[g] ?? "bg-gray-100 text-gray-700 border border-gray-300";
  return (
    <span className={`inline-flex text-xs px-2 py-0.5 rounded ${cls}`} style={{ fontFamily: "var(--font-mono)" }}>
      {g}
    </span>
  );
}

function ExSection({ num, title, grammar, children }: { num: number; title: string; grammar: string; children: React.ReactNode }) {
  return (
    <section className="rounded-xl border overflow-hidden" style={{ borderColor: "var(--color-border)" }}>
      <div className="px-6 py-4 border-b flex items-start gap-4 flex-wrap" style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-paper-warm)" }}>
        <span className="text-3xl font-semibold leading-none" style={{ fontFamily: "var(--font-mono)", color: "var(--color-border)" }}>
          {String(num).padStart(2, "0")}
        </span>
        <div className="flex-1">
          <p className="font-semibold text-sm leading-snug" style={{ fontFamily: "var(--font-display)", color: "var(--color-ink)" }}>{title}</p>
          <div className="mt-1">
            <GrammarPill g={grammar} />
          </div>
        </div>
      </div>
      <div className="px-6 py-5" style={{ backgroundColor: "var(--color-paper)" }}>
        {children}
      </div>
    </section>
  );
}

function ExercisesTab() {
  return (
    <div className="space-y-6">
      {/* Block header */}
      <div>
        <p className="text-xs tracking-widest uppercase mb-1" style={{ fontFamily: "var(--font-mono)", color: "var(--color-muted)" }}>
          Блок 1
        </p>
        <h2 className="text-lg font-semibold" style={{ fontFamily: "var(--font-display)", color: "var(--color-ink)" }}>
          조건부 말하기 연습
          <span className="ml-2 text-base font-normal" style={{ color: "var(--color-muted)" }}>Условно-речевые упражнения</span>
        </h2>
      </div>

      {/* Ex 1 */}
      <ExSection num={1} title="Трансформация фактов и передача информации" grammar="-(으)ㄴ 편이다">
        <div className="mb-4 rounded-lg px-4 py-3 border-l-4" style={{ borderColor: "#c94040", backgroundColor: "var(--color-paper-warm)" }}>
          <p className="text-xs uppercase tracking-widest mb-1" style={{ fontFamily: "var(--font-mono)", color: "var(--color-muted)" }}>Образец</p>
          <p className="text-sm" style={{ fontFamily: "var(--font-display)", color: "var(--color-ink)" }}>
            <span className="font-semibold">А:</span> 부산에 가 봤어요?<br />
            <span className="font-semibold">B:</span> 아직 안 가 봤지만, <strong>부산 바다가 정말 아름답다고 들었어요</strong>.
          </p>
        </div>
        <div className="space-y-5">
          {ex1Items.map((item, i) => (
            <div key={i}>
              <p className="text-xs mb-1" style={{ fontFamily: "var(--font-mono)", color: "var(--color-muted)" }}>
                {i + 1}. {item.fact}
              </p>
              <p className="text-sm" style={{ fontFamily: "var(--font-display)", color: "var(--color-ink)" }}>
                → {item.template.split("___")[0]}
                <span className="mx-1 px-6 border-b inline-block" style={{ borderColor: "var(--color-ink)" }}>&nbsp;</span>
                {item.template.split("___")[1]}
              </p>
              <FillInput answer={item.answers.a} placeholder="впишите ответ на корейском…" />
            </div>
          ))}
        </div>
      </ExSection>

      {/* Ex 2 */}
      <ExSection num={2} title="Согласие с оговоркой" grammar="-기는 하지만">
        <div className="mb-4 rounded-lg px-4 py-3 border-l-4" style={{ borderColor: "#2a5c8a", backgroundColor: "var(--color-paper-warm)" }}>
          <p className="text-xs uppercase tracking-widest mb-1" style={{ fontFamily: "var(--font-mono)", color: "var(--color-muted)" }}>Образец</p>
          <p className="text-sm" style={{ fontFamily: "var(--font-display)", color: "var(--color-ink)" }}>
            <span className="font-semibold">А:</span> 하노이에 비가 많이 왔어요?<br />
            <span className="font-semibold">B:</span> <strong>비가 조금 오기는 했지만</strong>, 바람이 불어서 시원했어요.
          </p>
        </div>
        <div className="space-y-6">
          {ex2Items.map((item, i) => (
            <div key={i}>
              <div className="text-sm whitespace-pre-line leading-relaxed" style={{ fontFamily: "var(--font-display)", color: "var(--color-ink)" }}>
                {item.prompt}
              </div>
              {item.context && (
                <p className="text-xs italic mt-0.5" style={{ color: "var(--color-muted)", fontFamily: "var(--font-body)" }}>
                  ({item.context})
                </p>
              )}
              <FillInput answer={item.answer} placeholder={item.hint} />
            </div>
          ))}
        </div>
      </ExSection>

      {/* Ex 3 */}
      <ExSection num={3} title="Логическая цепочка действий" grammar="-고 나서">
        <div className="mb-4 rounded-lg px-4 py-3 border-l-4" style={{ borderColor: "#3a7d44", backgroundColor: "var(--color-paper-warm)" }}>
          <p className="text-xs uppercase tracking-widest mb-1" style={{ fontFamily: "var(--font-mono)", color: "var(--color-muted)" }}>Задание</p>
          <p className="text-sm italic" style={{ fontFamily: "var(--font-body)", color: "var(--color-muted)" }}>
            Соедините два действия в единое предложение с <strong>-고 나서</strong>.
          </p>
        </div>
        <div className="space-y-5">
          {ex3Items.map((item, i) => (
            <div key={i}>
              <p className="text-xs mb-1" style={{ fontFamily: "var(--font-mono)", color: "var(--color-muted)" }}>
                {i + 1}. ({item.parts[0]}) + ({item.parts[1]})
              </p>
              <p className="text-sm" style={{ fontFamily: "var(--font-display)", color: "var(--color-ink)" }}>
                →
              </p>
              <FillInput answer={item.answer} placeholder="впишите полное предложение…" />
            </div>
          ))}
        </div>
      </ExSection>

      {/* Block 2 header */}
      <div className="pt-4">
        <p className="text-xs tracking-widest uppercase mb-1" style={{ fontFamily: "var(--font-mono)", color: "var(--color-muted)" }}>
          Блок 2
        </p>
        <h2 className="text-lg font-semibold" style={{ fontFamily: "var(--font-display)", color: "var(--color-ink)" }}>
          자유 의사소통 연습
          <span className="ml-2 text-base font-normal" style={{ color: "var(--color-muted)" }}>Речевые упражнения</span>
        </h2>
      </div>

      {/* Ex 4 — Role play */}
      <ExSection num={4} title="Ролевая игра: иммиграционный контроль (출입국 심사)" grammar="-(으)ㄹ게요">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border overflow-hidden" style={{ borderColor: "var(--color-border)" }}>
            <div className="px-4 py-2 flex items-center gap-2" style={{ backgroundColor: "#c94040" }}>
              <span className="w-5 h-5 rounded-full bg-white/20 inline-flex items-center justify-center text-xs font-semibold text-white" style={{ fontFamily: "var(--font-mono)" }}>А</span>
              <span className="text-xs font-semibold text-white tracking-wide" style={{ fontFamily: "var(--font-mono)" }}>Офицер</span>
            </div>
            <ul className="divide-y" style={{ borderColor: "var(--color-border)" }}>
              {ex4Officer.map((line, i) => (
                <li key={i} className="px-4 py-3 text-sm" style={{ fontFamily: "var(--font-display)", color: "var(--color-ink)" }}>
                  {line}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg border overflow-hidden" style={{ borderColor: "var(--color-border)" }}>
            <div className="px-4 py-2 flex items-center gap-2" style={{ backgroundColor: "#2a5c8a" }}>
              <span className="w-5 h-5 rounded-full bg-white/20 inline-flex items-center justify-center text-xs font-semibold text-white" style={{ fontFamily: "var(--font-mono)" }}>Б</span>
              <span className="text-xs font-semibold text-white tracking-wide" style={{ fontFamily: "var(--font-mono)" }}>Турист</span>
            </div>
            <ul className="divide-y" style={{ borderColor: "var(--color-border)" }}>
              {ex4Tourist.map((line, i) => (
                <li key={i} className="px-4 py-3 text-sm" style={{ fontFamily: "var(--font-display)", color: "var(--color-ink)" }}>
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mt-3 text-xs italic" style={{ color: "var(--color-muted)" }}>
          Студент А — офицер пограничной службы, студент Б — турист. Используйте опорные реплики и расширяйте ответы.
        </p>
      </ExSection>

      {/* Ex 5 — Tour consultation */}
      <ExSection num={5} title="Консультация попутчика: Вьетнам, Корея или Япония?" grammar="-(으)ㄴ 편이다">
        <p className="text-sm italic mb-4" style={{ color: "var(--color-muted)" }}>
          Студент А выбирает направление, студент Б даёт рекомендации на основе опыта. Обсудите четыре критерия:
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          {ex5Criteria.map((c) => (
            <div key={c.label} className="rounded-lg border px-4 py-3 flex gap-3 items-start" style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-paper-warm)" }}>
              <span className="text-xl flex-shrink-0">{c.icon}</span>
              <div>
                <p className="text-sm font-semibold" style={{ fontFamily: "var(--font-display)", color: "var(--color-ink)" }}>{c.label}</p>
                <p className="text-sm mt-0.5" style={{ fontFamily: "var(--font-display)", color: "var(--color-muted)" }}>{c.detail}</p>
                <div className="mt-1.5">
                  <GrammarPill g={c.grammar} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </ExSection>

      {/* Ex 6 — Micromonologue */}
      <ExSection num={6} title="Микромонолог: интервью о ярком впечатлении из поездки" grammar="-(으)ㄴ 적이 있다/없다">
        <p className="text-sm italic mb-4" style={{ color: "var(--color-muted)" }}>
          Выберите карточку страны (Япония, Корея, Вьетнам или Россия) и ответьте на вопрос одногруппника (4–6 предложений):
        </p>
        <div className="rounded-lg border px-4 py-3 mb-4 inline-block" style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-paper-warm)" }}>
          <p className="text-base" style={{ fontFamily: "var(--font-display)", color: "var(--color-ink)" }}>
            그 나라에서 제일 기억에 남는 것이 뭐예요?
          </p>
          <p className="text-xs italic mt-0.5" style={{ color: "var(--color-muted)" }}>
            Что вам больше всего запомнилось в этой стране?
          </p>
        </div>
        <div className="space-y-3">
          {ex6Steps.map((s) => (
            <div key={s.num} className="flex gap-4 items-start">
              <span
                className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-semibold text-white mt-0.5"
                style={{ backgroundColor: "#2a5c8a", fontFamily: "var(--font-mono)" }}
              >
                {s.num}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="text-xs" style={{ fontFamily: "var(--font-mono)", color: "var(--color-muted)" }}>{s.label}</span>
                  <GrammarPill g={s.grammar} />
                </div>
                <p className="text-sm" style={{ fontFamily: "var(--font-display)", color: "var(--color-ink)" }}>
                  {s.template}
                </p>
              </div>
            </div>
          ))}
        </div>
      </ExSection>
    </div>
  );
}

// ─── Reference data ──────────────────────────────────────────────────────────

type VocabEntry = { kr: string; ru: string };
type VocabGroup = { title: string; subtitle: string; color: string; dot: string; items: VocabEntry[] };

const vocabGroups: VocabGroup[] = [
  {
    title: "날씨와 계절",
    subtitle: "Погода и климат",
    color: "bg-sky-50 border-sky-200",
    dot: "bg-sky-400",
    items: [
      { kr: "계절", ru: "сезон, время года" },
      { kr: "날씨", ru: "погода" },
      { kr: "봄 / 여름 / 가을 / 겨울", ru: "весна / лето / осень / зима" },
      { kr: "온도 / 기온", ru: "температура" },
      { kr: "일기예보", ru: "прогноз погоды" },
      { kr: "따뜻하다", ru: "тёплый" },
      { kr: "덥다", ru: "жаркий" },
      { kr: "푹푹 찌다", ru: "удушающая жара, парит" },
      { kr: "점점 더워지다", ru: "становиться жарче" },
      { kr: "후덥지근하다", ru: "душный и влажный" },
      { kr: "시원하다", ru: "прохладный, освежающий" },
      { kr: "춥다", ru: "холодный" },
      { kr: "바람이 불다", ru: "дует ветер" },
      { kr: "비가 오다 / 내리다", ru: "идёт дождь" },
      { kr: "눈이 오다 / 내리다", ru: "идёт снег" },
      { kr: "하늘에 구름이 많다", ru: "на небе много облаков" },
    ],
  },
  {
    title: "여행 계획 및 비용",
    subtitle: "Планирование и расходы",
    color: "bg-amber-50 border-amber-200",
    dot: "bg-amber-400",
    items: [
      { kr: "여행", ru: "путешествие, поездка" },
      { kr: "해외여행", ru: "зарубежная поездка" },
      { kr: "여행기", ru: "путевые заметки, дневник путешествия" },
      { kr: "일정을 짜다", ru: "составлять план поездки" },
      { kr: "예약하다", ru: "бронировать" },
      { kr: "출발하다 / 떠나다", ru: "выезжать, отправляться в путь" },
      { kr: "도착하다", ru: "прибывать" },
      { kr: "돌아오다", ru: "возвращаться" },
      { kr: "이동하다", ru: "перемещаться, передвигаться" },
      { kr: "타다", ru: "садиться (на транспорт), ехать" },
      { kr: "걸리다", ru: "занимать время" },
      { kr: "처음", ru: "впервые, в первый раз" },
      { kr: "진짜", ru: "действительно, правда" },
      { kr: "1인당 비용", ru: "расходы на одного человека" },
      { kr: "숙박 / 숙소", ru: "ночлег / место проживания, жильё" },
      { kr: "관광 가이드", ru: "туристический гид" },
    ],
  },
  {
    title: "공항, 세관 및 이동",
    subtitle: "Аэропорт, таможня и транспорт",
    color: "bg-violet-50 border-violet-200",
    dot: "bg-violet-400",
    items: [
      { kr: "여권 / 패스포트", ru: "паспорт" },
      { kr: "비자", ru: "виза" },
      { kr: "탑승권", ru: "посадочный талон" },
      { kr: "탑승구", ru: "выход на посадку, гейт" },
      { kr: "세관 신고서", ru: "таможенная декларация" },
      { kr: "터미널", ru: "терминал" },
      { kr: "이륙", ru: "взлёт" },
      { kr: "착륙", ru: "посадка" },
      { kr: "환승", ru: "пересадка" },
      { kr: "수하물", ru: "багаж" },
      { kr: "면세점", ru: "магазин дьюти-фри" },
      { kr: "목적지 / 행선지", ru: "пункт назначения" },
      { kr: "마중 나가다 / 나오다", ru: "встречать в аэропорту" },
      { kr: "내리다", ru: "совершать посадку / сходить с транспорта" },
      { kr: "비행기 / 항공", ru: "самолёт / авиаперевозка, авиарейс" },
      { kr: "창가", ru: "место у окна" },
      { kr: "기내식", ru: "бортовое питание" },
      { kr: "앉다", ru: "сидеть, садиться" },
      { kr: "제공하다", ru: "предоставлять, предлагать" },
      { kr: "끼니 (때)", ru: "приём пищи (время приёма пищи)" },
      { kr: "유람선 / KTX", ru: "прогулочный пароход / скоростной поезд" },
      { kr: "신발을 벗다", ru: "снимать обувь" },
    ],
  },
  {
    title: "자연경관 및 지형",
    subtitle: "Природа, ландшафт и впечатления",
    color: "bg-emerald-50 border-emerald-200",
    dot: "bg-emerald-400",
    items: [
      { kr: "자연경관", ru: "природный ландшафт, пейзаж" },
      { kr: "지형", ru: "рельеф, топография, география" },
      { kr: "언덕", ru: "холм" },
      { kr: "일출", ru: "восход солнца" },
      { kr: "동서남북", ru: "стороны света (восток, запад, юг, север)" },
      { kr: "동백꽃", ru: "цветы камелии" },
      { kr: "야자수", ru: "пальма" },
      { kr: "억새", ru: "мискантус, серебристая трава" },
      { kr: "형성되다", ru: "образовываться, формироваться" },
      { kr: "폭발하다", ru: "взрываться, извергаться (о вулкане)" },
      { kr: "아름답다", ru: "красивый, прекрасный" },
      { kr: "환상적이다", ru: "фантастический" },
      { kr: "경치가 좋다", ru: "красивый вид" },
      { kr: "낯설다", ru: "незнакомый, непривычный" },
      { kr: "새로운 세계", ru: "новый мир" },
      { kr: "사람이 친절하다", ru: "люди добрые / приветливые" },
    ],
  },
  {
    title: "나라, 음식 및 사람 대하기",
    subtitle: "Страны, еда и взаимодействие",
    color: "bg-rose-50 border-rose-200",
    dot: "bg-rose-400",
    items: [
      { kr: "일본", ru: "Япония" },
      { kr: "먹다", ru: "есть, кушать" },
      { kr: "맵다", ru: "острый" },
      { kr: "육즙이 많다", ru: "сочный (о мясе)" },
      { kr: "사람을 대하다 / 다루다", ru: "обращаться с людьми / управляться с чем-либо" },
      { kr: "예방하다", ru: "предотвращать, предупреждать" },
      { kr: "발전하다", ru: "развиваться" },
      { kr: "집착하다", ru: "сильно привязываться, быть одержимым" },
    ],
  },
];

type GrammarEntry = {
  tag: string;
  translation: string;
  usage: string;
  example: { kr: string; ru: string };
  nuances: string[];
};

const grammarEntries: GrammarEntry[] = [
  {
    tag: "-(으)ㄴ 적이 있다 / 없다",
    translation: "«(не) доводилось делать что-либо», наличие/отсутствие опыта",
    usage: "Присоединяется к основе глагола для вопроса или рассказа о наличии жизненного опыта.",
    example: { kr: "일본 도쿄에 가 본 적이 있어요?", ru: "Вы когда-нибудь бывали в Токио?" },
    nuances: [
      "Часто объединяется с попыткой -아/어 보다 → -아/어 본 적이 있다/없다 (пробовал / не пробовал).",
      "Не используется для регулярных рутинных действий — только для значимого опыта.",
    ],
  },
  {
    tag: "-고 나서",
    translation: "«после того как…», «сделав первое — затем…»",
    usage: "Выражает строгую временную последовательность: второе действие начинается строго после завершения первого.",
    example: { kr: "서울을 구경하고 나서 부산에 갈 거예요.", ru: "Осмотрев Сеул, я поеду в Пусан." },
    nuances: [
      "В отличие от простого -고, подчёркивает, что первое действие доведено до конца перед началом следующего.",
    ],
  },
  {
    tag: "-(으)ㄴ/는 편이다",
    translation: "«скорее…», «довольно…», «склонен к…»",
    usage: "Смягчает категоричность: прилагательные → -(으)ㄴ 편이다, глаголы → -는 편이다.",
    example: { kr: "날씨가 시원한 편이었어요.", ru: "Погода была скорее прохладной / довольно свежей." },
    nuances: [
      "Не выражает абсолютный факт, а передаёт общую тенденцию или субъективную оценку («скорее да, чем нет»).",
    ],
  },
  {
    tag: "-(으)니까 vs -아/어서",
    translation: "«так как…», «потому что…» — причинно-следственная связь",
    usage: "Оба союза обозначают причину, но употребляются в разных контекстах.",
    example: { kr: "시간이 없으니까 빨리 가자!", ru: "Так как времени нет, пошли быстрее!" },
    nuances: [
      "С побуждением (-(으)세요, -(으)ㅂ시다, -자) — только -(으)니까. Форма -아/어서 недопустима.",
      "В вежливых извинениях/благодарностях (늦어서 죄송합니다, 도와주셔서 감사합니다) — только -아/어서. Форма -(으)니까 звучит грубо.",
    ],
  },
  {
    tag: "-기는 하지만",
    translation: "«хотя и… (но)», «…-то (сделал), но…»",
    usage: "Подтверждает факт в первой части, затем вводит противопоставление или оговорку.",
    example: { kr: "비가 조금 오기는 했지만 바람이 불어서 시원했어요.", ru: "Дождь-то немного шёл, но дул ветер и было свежо." },
    nuances: [
      "В разговорной речи -는 сокращается до -긴: -긴 하지만 / -긴 했지만.",
    ],
  },
  {
    tag: "-(으)ㄹ게요",
    translation: "«я сделаю…», «я собираюсь…» — обещание или готовность",
    usage: "1-е лицо: готовность выполнить действие, реакция на ситуацию в диалоге.",
    example: { kr: "제가 비행기표를 예매할게요.", ru: "Я куплю билеты." },
    nuances: [
      "Подлежащим может быть только говорящий (저, 나, 우리).",
      "В строгом официальном стиле заменяется на -(으)겠습니다.",
    ],
  },
  {
    tag: "-다고 들었어요",
    translation: "«я слышал, что…» — косвенная речь",
    usage: "Передаёт информацию о стране, месте или факте, полученную от третьих лиц.",
    example: { kr: "부산 바다가 정말 아름답다고 들었어요.", ru: "Я слышал, что море в Пусане очень красивое." },
    nuances: [
      "Позволяет высказываться о месте, в котором говорящий лично ещё не побывал.",
    ],
  },
];

// ─── Reference tab ────────────────────────────────────────────────────────────

function ReferenceTab() {
  const [vocabSection, setVocabSection] = useState<number | null>(null);
  const [grammarOpen, setGrammarOpen] = useState<number | null>(null);
  const [mode, setMode] = useState<"vocab" | "grammar">("vocab");

  return (
    <div className="space-y-6">
      {/* Mode switcher */}
      <div className="flex gap-1 rounded-lg p-1 border w-fit" style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-paper)" }}>
        {(["vocab", "grammar"] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className="px-4 py-1.5 rounded text-xs font-medium transition-all cursor-pointer"
            style={{
              fontFamily: "var(--font-mono)",
              backgroundColor: mode === m ? "var(--color-ink)" : "transparent",
              color: mode === m ? "var(--color-paper)" : "var(--color-muted)",
            }}
          >
            {m === "vocab" ? "Лексика" : "Грамматика"}
          </button>
        ))}
      </div>

      {mode === "vocab" && (
        <div className="space-y-3">
          {vocabGroups.map((group, gi) => {
            const open = vocabSection === gi;
            return (
              <div key={gi} className={`rounded-xl border overflow-hidden ${group.color}`}>
                <button
                  onClick={() => setVocabSection(open ? null : gi)}
                  className="w-full px-6 py-4 flex items-center gap-4 text-left cursor-pointer hover:bg-black/5 transition-colors"
                >
                  <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${group.dot}`} />
                  <div className="flex-1 min-w-0">
                    <span className="text-sm font-semibold block" style={{ fontFamily: "var(--font-display)", color: "var(--color-ink)" }}>
                      {group.title}
                    </span>
                    <span className="text-xs" style={{ color: "var(--color-muted)" }}>{group.subtitle}</span>
                  </div>
                  <span className="text-xs flex-shrink-0" style={{ fontFamily: "var(--font-mono)", color: "var(--color-muted)" }}>
                    {group.items.length} слов{open ? " ▲" : " ▼"}
                  </span>
                </button>
                {open && (
                  <div className="border-t" style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-paper)" }}>
                    <table className="w-full text-sm">
                      <tbody className="divide-y" style={{ borderColor: "var(--color-border)" }}>
                        {group.items.map((item, ii) => (
                          <tr key={ii} className="hover:bg-[var(--color-paper-warm)] transition-colors">
                            <td className="px-6 py-3 w-1/2 font-medium align-top" style={{ fontFamily: "var(--font-display)", color: "var(--color-ink)" }}>
                              {item.kr}
                            </td>
                            <td className="px-6 py-3 w-1/2 align-top italic" style={{ color: "var(--color-muted)" }}>
                              {item.ru}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {mode === "grammar" && (
        <div className="space-y-3">
          {grammarEntries.map((entry, gi) => {
            const open = grammarOpen === gi;
            return (
              <div key={gi} className="rounded-xl border overflow-hidden" style={{ borderColor: "var(--color-border)" }}>
                <button
                  onClick={() => setGrammarOpen(open ? null : gi)}
                  className="w-full px-6 py-4 flex items-start gap-4 text-left cursor-pointer hover:bg-[var(--color-paper-warm)] transition-colors"
                  style={{ backgroundColor: "var(--color-paper-warm)" }}
                >
                  <span className="text-lg font-semibold flex-shrink-0 leading-tight mt-0.5" style={{ fontFamily: "var(--font-mono)", color: "var(--color-ink)" }}>
                    {String(gi + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-1 min-w-0">
                    <code className="text-sm font-medium block" style={{ fontFamily: "var(--font-mono)", color: "var(--color-ink)" }}>
                      {entry.tag}
                    </code>
                    <span className="text-xs italic mt-0.5 block" style={{ color: "var(--color-muted)" }}>
                      {entry.translation}
                    </span>
                  </div>
                  <span className="text-xs flex-shrink-0 mt-1" style={{ fontFamily: "var(--font-mono)", color: "var(--color-muted)" }}>
                    {open ? "▲" : "▼"}
                  </span>
                </button>
                {open && (
                  <div className="border-t px-6 py-5 space-y-4" style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-paper)" }}>
                    {/* Usage */}
                    <div>
                      <p className="text-xs uppercase tracking-widest mb-1" style={{ fontFamily: "var(--font-mono)", color: "var(--color-muted)" }}>
                        Употребление
                      </p>
                      <p className="text-sm" style={{ fontFamily: "var(--font-display)", color: "var(--color-ink)" }}>
                        {entry.usage}
                      </p>
                    </div>
                    {/* Example */}
                    <div className="rounded-lg px-4 py-3 border-l-4" style={{ borderColor: "#2a5c8a", backgroundColor: "var(--color-paper-warm)" }}>
                      <p className="text-xs uppercase tracking-widest mb-1" style={{ fontFamily: "var(--font-mono)", color: "var(--color-muted)" }}>Пример</p>
                      <p className="text-sm font-medium mb-0.5" style={{ fontFamily: "var(--font-display)", color: "var(--color-ink)" }}>
                        {entry.example.kr}
                      </p>
                      <p className="text-sm italic" style={{ color: "var(--color-muted)" }}>
                        {entry.example.ru}
                      </p>
                    </div>
                    {/* Nuances */}
                    {entry.nuances.length > 0 && (
                      <div>
                        <p className="text-xs uppercase tracking-widest mb-2" style={{ fontFamily: "var(--font-mono)", color: "var(--color-muted)" }}>
                          Нюансы
                        </p>
                        <ul className="space-y-2">
                          {entry.nuances.map((n, ni) => (
                            <li key={ni} className="flex gap-2 items-start text-sm" style={{ color: "var(--color-ink)" }}>
                              <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 bg-[#c94040]" />
                              <span style={{ fontFamily: "var(--font-display)" }}>{n}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [tab, setTab] = useState<"dialogues" | "exercises" | "reference">("dialogues");

  return (
    <div className="min-h-full" style={{ fontFamily: "var(--font-body)", backgroundColor: "var(--color-paper)" }}>
      <header className="border-b px-6 py-5" style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-paper-warm)" }}>
        <div className="max-w-4xl mx-auto w-full">
          <p className="text-xs tracking-widest uppercase mb-1" style={{ fontFamily: "var(--font-mono)", color: "var(--color-muted)" }}>
            Корейский язык · Уровень 2B
          </p>
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <h1 className="text-2xl font-semibold leading-tight" style={{ fontFamily: "var(--font-display)", color: "var(--color-ink)" }}>
              여행 다이얼로그
              <span className="ml-3 text-base font-normal" style={{ fontFamily: "var(--font-body)", color: "var(--color-muted)" }}>
                Диалоги о путешествиях
              </span>
            </h1>
            <div className="flex gap-1 rounded-lg p-1 border" style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-paper)" }}>
              {(["dialogues", "exercises", "reference"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className="px-4 py-1.5 rounded text-xs font-medium transition-all cursor-pointer"
                  style={{
                    fontFamily: "var(--font-mono)",
                    backgroundColor: tab === t ? "var(--color-ink)" : "transparent",
                    color: tab === t ? "var(--color-paper)" : "var(--color-muted)",
                  }}
                >
                  {t === "dialogues" ? "Диалоги" : t === "exercises" ? "Упражнения" : "Словарь"}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8 w-full">
        {tab === "dialogues" ? <DialoguesTab /> : tab === "exercises" ? <ExercisesTab /> : <ReferenceTab />}
      </main>
    </div>
  );
}
