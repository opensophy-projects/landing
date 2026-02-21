import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ServicesGrid, ServiceGridItem } from '../ui/services-grid';

interface ServicesProps {
  isNegative: boolean;
}

const Services: React.FC<ServicesProps> = ({ isNegative }) => {
  const bgColor = isNegative ? 'bg-[#0a0a0a]' : 'bg-[#E8E7E3]';
  const textColor = isNegative ? 'text-white' : 'text-black';
  const labelColor = isNegative ? 'text-white/50' : 'text-black/40';
  const subTextColor = isNegative ? 'text-white/65' : 'text-black/60';
  const dividerColor = isNegative ? 'bg-white/8' : 'bg-black/8';

  const cybersecurityItems: ServiceGridItem[] = [
    {
      id: 'secrets',
      tag: 'Утечки',
      title: 'Проверка утечек секретов и доступов',
      description: 'Поиск паролей, токенов, API-ключей в открытых источниках до того, как ими воспользуются злоумышленники.',
    },
    {
      id: 'personal',
      tag: 'Данные',
      title: 'Проверка утечек персональных данных',
      description: 'По номеру телефона, email или иным данным найдём всю связанную информацию в открытом доступе.',
    },
    {
      id: 'vuln',
      tag: 'Уязвимости',
      title: 'Проверка сайта на уязвимости',
      description: 'Автоматическая проверка на типовые уязвимости без вмешательства в работу сайта. Официально, с подтверждением от владельца.',
    },
    {
      id: 'code',
      tag: 'Код',
      title: 'Анализ кода на безопасность',
      description: 'Статический анализ исходного кода на уязвимости и проблемные места до выхода в продакшн.',
    },
  ];

  const developmentItems: ServiceGridItem[] = [
    {
      id: 'static',
      tag: 'Разработка',
      title: 'Разработка статического сайта',
      description: 'Современный сайт с использованием ИИ-инструментов под любой стек. Безопасность проверяется прямо в процессе разработки.',
    },
    {
      id: 'redesign',
      tag: 'Редизайн',
      title: 'Редизайн сайта',
      description: 'Аудит текущего сайта, новый дизайн-макет и полная фронтенд реализация. Сохраняем контент, обновляем визуал.',
    },
    {
      id: 'testing',
      tag: 'Тестирование',
      title: 'Тестирование сайта',
      description: 'Комплексная проверка функциональности, UX и производительности. Отчёт с приоритизированными рекомендациями.',
    },
  ];

  const designItems: ServiceGridItem[] = [
    {
      id: 'logo',
      tag: 'Брендинг',
      title: 'Разработка логотипа для бренда',
      description: 'Концепция, цветовая палитра и типографика. Несколько вариантов, полный набор файлов и гайдлайны использования.',
    },
    {
      id: 'audit',
      tag: 'Аудит',
      title: 'UI/UX аудит',
      description: 'Анализ интерфейса на соответствие современным стандартам. Конкретные рекомендации по улучшению пользовательского опыта.',
    },
  ];

  const SectionHeader = ({
    label,
    title,
    subtitle,
    note,
  }: {
    label: string;
    title: string;
    subtitle: string;
    note: string;
  }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="mb-10 sm:mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-4"
    >
      <div>
        <p className={cn("text-xs font-bold uppercase tracking-widest mb-3", labelColor)}>
          {label}
        </p>
        <h2
          className={cn("text-4xl sm:text-5xl md:text-6xl font-bold mb-3", textColor)}
          style={{ fontFamily: 'UnifixSP, sans-serif' }}
        >
          {title}
        </h2>
        <p className={cn("text-base sm:text-lg leading-relaxed max-w-xl", subTextColor)}>
          {subtitle}
        </p>
      </div>
      <p className={cn("text-sm font-medium flex-shrink-0 pb-1", labelColor)}>
        {note}
      </p>
    </motion.div>
  );

  return (
    <div className="min-h-screen relative flex flex-col pb-20">
      <Helmet>
        <title>Услуги — Opensophy</title>
        <meta name="title" content="Услуги — Opensophy" />
        <meta name="description" content="Профессиональные услуги: кибербезопасность, разработка сайтов, тестирование, дизайн. Все по договорённости." />
        <meta name="keywords" content="кибербезопасность, проверка утечек, разработка сайтов, редизайн, тестирование, дизайн логотипов" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://opensophy.com/services" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://opensophy.com/services" />
        <meta property="og:title" content="Услуги — Opensophy" />
        <meta property="og:description" content="Профессиональные услуги: кибербезопасность, разработка сайтов, тестирование, дизайн." />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="Услуги — Opensophy" />
        <meta property="twitter:description" content="Профессиональные услуги: кибербезопасность, разработка сайтов, тестирование, дизайн." />
        <script type="application/ld+json">
          {`{
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Opensophy — Услуги",
            "url": "https://opensophy.com/services",
            "isPartOf": { "@type": "WebSite", "name": "Opensophy", "url": "https://opensophy.com" }
          }`}
        </script>
      </Helmet>

      <div className={`absolute inset-0 transition-all duration-500 ${bgColor}`} />

      <div className={`relative z-10 flex-1 ${textColor}`}>

        {/* ── HERO ── */}
        <section className={`py-20 sm:py-28 md:py-36 lg:py-44 px-4 sm:px-6 md:px-8 ${bgColor}`}>
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className={cn("text-xs sm:text-sm font-bold uppercase tracking-widest mb-4", labelColor)}>
                УСЛУГИ
              </p>
              <h1
                className={cn("text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 sm:mb-8", textColor)}
                style={{ fontFamily: 'UnifixSP, sans-serif' }}
              >
                Что мы делаем
              </h1>
              <p className={cn("text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl mb-10", subTextColor)}>
                Кибербезопасность, разработка и дизайн. Все проекты — по индивидуальной договорённости, без шаблонных прайсов.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="mailto:opensophy@gmail.com"
                  className={cn(
                    "inline-flex items-center px-7 py-3.5 rounded-lg font-semibold transition-all duration-300 hover:scale-105",
                    isNegative ? 'bg-white text-black hover:bg-white/90' : 'bg-black text-white hover:bg-black/90'
                  )}
                >
                  Написать на Email
                </a>
                <a
                  href="https://t.me/veilosophy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "inline-flex items-center px-7 py-3.5 rounded-lg font-semibold border transition-all duration-300 hover:scale-105",
                    isNegative
                      ? 'border-white/25 text-white hover:bg-white/8'
                      : 'border-black/20 text-black hover:bg-black/6'
                  )}
                >
                  Telegram
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── КИБЕРБЕЗОПАСНОСТЬ ── */}
        <section className={`py-12 sm:py-16 md:py-20 lg:py-28 px-4 sm:px-6 md:px-8 ${bgColor}`}>
          <div className="max-w-7xl mx-auto">
            <SectionHeader
              label="01 — Безопасность"
              title="Кибербезопасность"
              subtitle="Защита ваших данных и систем. Выявляем угрозы до того, как ими воспользуются."
              note="от 10 000 — 50 000 ₽ · по договорённости"
            />
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <ServicesGrid items={cybersecurityItems} isNegative={isNegative} cols={2} />
            </motion.div>
          </div>
        </section>

        {/* divider */}
        <div className={cn("mx-4 sm:mx-8 md:mx-auto md:max-w-7xl h-px", dividerColor)} />

        {/* ── РАЗРАБОТКА ── */}
        <section className={`py-12 sm:py-16 md:py-20 lg:py-28 px-4 sm:px-6 md:px-8 ${bgColor}`}>
          <div className="max-w-7xl mx-auto">
            <SectionHeader
              label="02 — Разработка"
              title="Разработка"
              subtitle="Создание и улучшение сайтов с фокусом на производительность и безопасность."
              note="от 15 000 — 100 000 ₽ · по договорённости"
            />
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <ServicesGrid items={developmentItems} isNegative={isNegative} cols={3} />
            </motion.div>
          </div>
        </section>

        {/* divider */}
        <div className={cn("mx-4 sm:mx-8 md:mx-auto md:max-w-7xl h-px", dividerColor)} />

        {/* ── ДИЗАЙН ── */}
        <section className={`py-12 sm:py-16 md:py-20 lg:py-28 px-4 sm:px-6 md:px-8 ${bgColor}`}>
          <div className="max-w-7xl mx-auto">
            <SectionHeader
              label="03 — Дизайн"
              title="Дизайн"
              subtitle="Визуальная идентичность вашего бренда. Стоимость — индивидуально по задаче."
              note="по договорённости · индивидуально"
            />
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <ServicesGrid items={designItems} isNegative={isNegative} cols={2} />
            </motion.div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className={`py-12 sm:py-16 md:py-20 lg:py-28 px-4 sm:px-6 md:px-8 ${bgColor}`}>
          <div className="max-w-7xl mx-auto">
            <div className={cn(
              "flex flex-col md:flex-row md:items-center md:justify-between gap-8 border rounded-2xl p-10 md:p-14",
              isNegative ? "border-white/10" : "border-black/10"
            )}>
              <div>
                <h2
                  className={cn("text-3xl sm:text-4xl md:text-5xl font-bold mb-3", textColor)}
                >
                  Готовы начать?
                </h2>
                <p className={cn("text-base sm:text-lg leading-relaxed max-w-md", subTextColor)}>
                  Напишите — обсудим детали и подберём оптимальное решение. Первая консультация бесплатна.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
                <a
                  href="mailto:opensophy@gmail.com"
                  className={cn(
                    "inline-flex items-center justify-center px-7 py-3.5 rounded-lg font-semibold transition-all duration-300 hover:scale-105",
                    isNegative ? 'bg-white text-black hover:bg-white/90' : 'bg-black text-white hover:bg-black/90'
                  )}
                >
                  Написать на Email
                </a>
                <a
                  href="https://t.me/veilosophy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "inline-flex items-center justify-center px-7 py-3.5 rounded-lg font-semibold border transition-all duration-300 hover:scale-105",
                    isNegative
                      ? 'border-white/25 text-white hover:bg-white/8'
                      : 'border-black/20 text-black hover:bg-black/6'
                  )}
                >
                  Telegram
                </a>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default Services;
