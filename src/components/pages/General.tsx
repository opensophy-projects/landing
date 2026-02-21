import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Globe, Zap, ShieldCheck, TrendingUp, BriefcaseBusiness, BookOpen, BadgeCheck, LayoutTemplate, SquarePen, HeartPlus, Signal, Shield, Code2, Palette } from 'lucide-react';
import { SingularityShaders } from '../SingularityShaders';
import { GlowingEffect } from '../ui/glowing-effect';
import { GlowingServiceCard } from '../ui/glowing-service-card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { Stats } from '../ui/stats';
import { cn } from '@/lib/utils';

interface GeneralProps {
  isNegative: boolean;
}

const General: React.FC<GeneralProps> = ({ isNegative }) => {
  const principles = [
    {
      id: 'openness',
      icon: <BadgeCheck className="w-6 h-6" />,
      title: "Открытость",
      description: "Фокус на open-source решениях и свободных инструментах"
    },
    {
      id: 'practicality',
      icon: <Zap className="w-6 h-6" />,
      title: "Практичность",
      description: "Гайды и ресурсы, которые можно применить сразу"
    },
    {
      id: 'security',
      icon: <ShieldCheck className="w-6 h-6" />,
      title: "Безопасность",
      description: "Best practices и фокус на защиту данных"
    },
    {
      id: 'relevance',
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Актуальность",
      description: "Современные инструменты и свежая информация"
    },
    {
      id: 'ready-solutions',
      icon: <BriefcaseBusiness className="w-6 h-6" />,
      title: "Готовые решения",
      description: "Подборки компонентов и шаблонов для быстрого старта"
    },
    {
      id: 'educational',
      icon: <BookOpen className="w-6 h-6" />,
      title: "Образовательный контент",
      description: "Статьи, гайды и практические примеры"
    }
  ];

  const services = [
    {
      id: 'cybersecurity',
      icon: <Shield className="w-6 h-6" />,
      title: "Кибербезопасность",
      subtitle: "Защита ваших данных и систем от угроз",
      accentColor: "rgba(239,68,68,0.85)",
      accentColorLight: "rgba(239,68,68,0.12)",
      accentColorRing: "#ef4444",
      items: [
        {
          title: "Проверка утечек секретов и доступов",
          description: "Поиск паролей, токенов, API-ключей и конфиденциальных данных в открытых источниках до того, как ими воспользуются злоумышленники."
        },
        {
          title: "Проверка утечек персональных данных",
          description: "По предоставленным данным (например, номеру телефона) найдём всю связанную информацию, которая могла попасть в открытый доступ через утечки."
        },
        {
          title: "Проверка сайта на уязвимости",
          description: "Автоматическая проверка на типовые уязвимости без вмешательства в работу сайта. Официально, с подтверждением от владельца — не пентест."
        },
        {
          title: "Анализ кода на безопасность",
          description: "Быстрая проверка исходного кода на уязвимости и проблемные места до выхода в продакшн."
        }
      ]
    },
    {
      id: 'development',
      icon: <Code2 className="w-6 h-6" />,
      title: "Разработка",
      subtitle: "Создание качественных цифровых продуктов",
      accentColor: "rgba(99,102,241,0.85)",
      accentColorLight: "rgba(99,102,241,0.12)",
      accentColorRing: "#6366f1",
      items: [
        {
          title: "Разработка статического сайта",
          description: "Современный сайт с использованием ИИ-инструментов под любой стек. Автоматическое выявление уязвимостей прямо в процессе разработки."
        },
        {
          title: "Тестирование сайта",
          description: "Комплексная проверка на удобство и функциональность. Выявление проблем UX и рекомендации по улучшению."
        }
      ]
    },
    {
      id: 'design',
      icon: <Palette className="w-6 h-6" />,
      title: "Дизайн",
      subtitle: "Визуальная идентичность и интерфейсы",
      accentColor: "rgba(16,185,129,0.85)",
      accentColorLight: "rgba(16,185,129,0.12)",
      accentColorRing: "#10b981",
      items: [
        {
          title: "Разработка логотипа",
          description: "Уникальный и запоминающийся логотип для вашего бренда. Концепция, цветовая палитра и типографика, отражающие ценности бизнеса."
        },
        {
          title: "UI/UX аудит",
          description: "Анализ интерфейса на соответствие современным стандартам. Конкретные рекомендации по улучшению пользовательского опыта."
        }
      ]
    }
  ];

  const faqItems = [
    {
      id: "item-1",
      title: "Для кого эти ресурсы?",
      content: "Наши ресурсы предназначены для разработчиков, дизайнеров, специалистов по безопасности и всех, кто работает в сфере IT. Независимо от вашего уровня опыта, вы найдете полезные материалы и инструменты."
    },
    {
      id: "item-2",
      title: "Как использовать материалы?",
      content: "Все наши статьи, гайды и подборки находятся в свободном доступе — читайте, применяйте на практике, делитесь с коллегами. Open-source проекты размещены на GitHub с открытым исходным кодом — можете использовать их в своих разработках, изучать реализацию и адаптировать под свои задачи. (но не забывайте читать лицензию!)"
    },
    {
      id: "item-3",
      title: "Как насчёт партнёрства?",
      content: "Мы открыты к сотрудничеству. Напишите нам о ваших идеях и давайте обсудим возможности вместе."
    },
    {
      id: "item-4",
      title: "Как долго ждать ответ если я напишу?",
      content: "Обычно мы отвечаем на письма в течение 24-48 часов. В Telegram ответ может быть быстрее."
    }
  ];

  const projectFeatures = [
    {
      id: 'design',
      icon: <LayoutTemplate className="w-6 h-6" />,
      title: "Современный дизайн",
      description: "Чистый и минималистичный интерфейс — контент выглядит профессионально без лишних настроек."
    },
    {
      id: 'markdown',
      icon: <SquarePen className="w-6 h-6" />,
      title: "Мощный Markdown",
      description: "Большая поддержка Markdown и расширенных блоков — таблицы, код, алерты и многое другое"
    }
  ];

  const projectFeatures2 = [
    {
      id: 'components',
      icon: <HeartPlus className="w-6 h-6" />,
      title: "Не только документация!",
      description: "Hub поддерживает рендеринг и мощную настройку компонентов что позволяет создать не только документацию но и ui-библиотеку"
    },
    {
      id: 'more',
      icon: <Signal className="w-6 h-6" />,
      title: "И многое другое!",
      description: "Изучите проект в нашем",
      link: "GitHub",
      href: "https://github.com/opensophy-projects/hub"
    }
  ];

  const bgColor = isNegative ? 'bg-[#0a0a0a]' : 'bg-[#E8E7E3]';
  const iconColor = isNegative ? 'text-[#E8E7E3]' : 'text-[#0a0a0a]';
  const labelColor = isNegative ? 'text-white/60' : 'text-black/50';
  const borderColor = isNegative ? 'border-white/10' : 'border-black/10';

  return (
    <div className="min-h-screen relative flex flex-col pb-20">
      <Helmet>
        <title>Opensophy</title>
        <meta name="title" content="Opensophy" />
        <meta name="description" content="Opensophy — проект, который разрабатывает open-source проекты и практические туториалы для всех: от опытных специалистов до тех, кто только делает первые шаги в IT." />
        <meta name="keywords" content="Opensophy, open source, IT ресурсы, туториалы, кибербезопасность, разработка, обучение программированию, практические гайды" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <link rel="canonical" href="https://opensophy.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://opensophy.com/" />
        <meta property="og:title" content="Opensophy" />
        <meta property="og:description" content="Opensophy — проект, который разрабатывает open-source проекты и практические туториалы для всех: от опытных специалистов до тех, кто только делает первые шаги в IT." />
        <meta property="og:locale" content="ru_RU" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://opensophy.com/" />
        <meta property="twitter:title" content="Opensophy" />
        <meta property="twitter:description" content="Opensophy — проект, который разрабатывает open-source проекты и практические туториалы для всех: от опытных специалистов до тех, кто только делает первые шаги в IT." />
        <script type="application/ld+json">
          {`{
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Opensophy",
            "description": "Opensophy — проект, который разрабатывает open-source проекты и практические туториалы для всех: от опытных специалистов до тех, кто только делает первые шаги в IT.",
            "url": "https://opensophy.com/",
            "isPartOf": {
              "@type": "WebSite",
              "name": "Opensophy",
              "url": "https://opensophy.com"
            }
          }`}
        </script>
      </Helmet>

      <div className={`absolute inset-0 transition-all duration-500 ${isNegative ? 'bg-[#0a0a0a]' : 'bg-[#E8E7E3]'}`} />

      <div className={`relative z-10 flex-1 ${isNegative ? 'text-white' : 'text-black'}`}>

        {/* ── HERO ── */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 md:px-8">
          <div className="absolute inset-0">
            <SingularityShaders
              speed={1} intensity={1.2} size={1.1}
              waveStrength={1} colorShift={1}
              isNegative={isNegative} className="h-full w-full"
            />
          </div>
          <div className="relative z-10 w-full max-w-7xl mx-auto">
            <div className="flex flex-col items-center justify-center text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="flex flex-col items-center justify-center"
              >
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className={`text-xs sm:text-sm md:text-base font-semibold uppercase tracking-widest mb-4 sm:mb-6 md:mb-8 ${labelColor}`}
                >
                  КИБЕРБЕЗОПАСНОСТЬ. РАЗРАБОТКА. OPEN-SOURCE.
                </motion.div>
                <h1
                  className={`text-5xl sm:text-6xl md:text-8xl lg:text-[10rem] font-bold tracking-[0.10em] ${isNegative ? 'text-white' : 'text-black'} font-veilstack drop-shadow-lg leading-none mb-4 sm:mb-6 md:mb-8`}
                  style={{ fontFamily: 'UnifixSP, sans-serif' }}
                >
                  Opensophy
                </h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className={`text-base sm:text-lg md:text-2xl lg:text-3xl font-light tracking-wide mb-8 sm:mb-10 md:mb-12 max-w-3xl leading-relaxed px-2 sm:px-4 md:px-0 ${isNegative ? 'text-white/80' : 'text-black/80'}`}
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── О OPENSOPHY ── */}
        <section className={`relative overflow-visible ${bgColor} py-12 sm:py-16 md:py-20 lg:py-28`}>
          <div className="lg:container lg:mx-auto lg:px-4 xl:px-8">
            <div className="lg:max-w-7xl lg:mx-auto px-4 sm:px-6 md:px-8">
              {/* Логотип сверху */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="flex flex-col items-center mb-12 sm:mb-16"
              >
                <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 mb-6">
                  <img src="/favicon.png" alt="Opensophy Logo" className="w-full h-full object-contain" />
                </div>
                <p className={`text-xs sm:text-sm font-semibold uppercase tracking-widest ${labelColor}`}>
                  О ПРОЕКТЕ
                </p>
                <h2
                  className={`text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.05] mt-2 ${isNegative ? 'text-white' : 'text-black'}`}
                  style={{ fontFamily: 'UnifixSP, sans-serif' }}
                >
                  Opensophy
                </h2>
              </motion.div>

              {/* Текст о проекте */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col gap-6 max-w-4xl mx-auto"
              >
                <p className={`text-base sm:text-lg leading-relaxed text-center ${isNegative ? 'text-white/75' : 'text-black/75'}`}>
                  Opensophy — проект, который разрабатывает open-source проекты и практические туториалы для всех: от опытных специалистов до тех, кто только делает первые шаги в IT.
                </p>
                <p className={`text-base sm:text-lg leading-relaxed text-center ${isNegative ? 'text-white/60' : 'text-black/60'}`}>
                  Мы создаём инструменты, шаблоны и образовательные материалы в открытом доступе — чтобы каждый мог использовать их в работе и учёбе. Параллельно оказываем профессиональные услуги: проверяем сайты и код на уязвимости, ищем утечки данных, разрабатываем сайты и помогаем с тестированием.
                </p>
                <p className={`text-base sm:text-lg leading-relaxed text-center ${isNegative ? 'text-white/60' : 'text-black/60'}`}>
                  Мы верим, что безопасность и качество кода должны быть доступны каждому — поэтому делимся знаниями открыто и работаем честно.
                </p>
              </motion.div>

              {/* Divider */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                viewport={{ once: true }}
                className={`mt-16 sm:mt-20 h-px origin-left ${isNegative ? 'bg-white/10' : 'bg-black/10'}`}
              />
            </div>
          </div>
        </section>

        {/* ── НАШ ПОДХОД ── */}
        <section className={`relative overflow-visible ${bgColor} py-12 sm:py-16 md:py-20 lg:py-28`}>
          <div className="lg:container lg:mx-auto lg:px-4 xl:px-8">
            <div className="lg:max-w-7xl lg:mx-auto px-4 sm:px-6 md:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="mb-16 sm:mb-20 md:mb-28 text-center"
              >
                <h2
                  className={`text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 ${isNegative ? 'text-white' : 'text-black'}`}
                  style={{ fontFamily: 'UnifixSP, sans-serif' }}
                >
                  НАШ ПОДХОД
                </h2>
                <p className={`text-lg sm:text-xl md:text-2xl leading-relaxed ${labelColor}`}>
                  6 ключевых принципов, которыми мы руководствуемся в работе
                </p>
              </motion.div>

              <ul className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
                {principles.map((principle) => (
                  <motion.li
                    key={principle.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="min-h-[14rem] list-none"
                  >
                    <div className={cn("relative h-full rounded-[1.25rem] border-[0.75px] p-2 md:rounded-[1.5rem] md:p-3", borderColor)}>
                      <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} borderWidth={3} isNegative={isNegative} />
                      <div className={cn(
                        "relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-[0.75px] p-6 shadow-sm md:p-6",
                        isNegative ? 'bg-[#0a0a0a] border-white/10 shadow-[0px_0px_27px_0px_rgba(45,45,45,0.3)]' : 'bg-[#E8E7E3] border-black/10'
                      )}>
                        <div className="relative flex flex-1 flex-col justify-between gap-3">
                          <div className={cn("w-fit rounded-lg border-[0.75px] p-2", isNegative ? 'border-white/20 bg-[#0a0a0a]' : 'border-black/20 bg-[#E8E7E3]')}>
                            <div className={iconColor}>{principle.icon}</div>
                          </div>
                          <div className="space-y-3">
                            <h3 className={cn("pt-0.5 text-xl leading-[1.375rem] font-semibold font-sans tracking-[-0.04em] md:text-2xl md:leading-[1.875rem] text-balance", isNegative ? 'text-white' : 'text-black')}>
                              {principle.title}
                            </h3>
                            <p className={cn("font-sans text-sm leading-[1.125rem] md:text-base md:leading-[1.375rem]", isNegative ? 'text-white/60' : 'text-black/60')}>
                              {principle.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── НАШИ УСЛУГИ ── */}
        <section className={`relative overflow-visible ${bgColor} py-12 sm:py-16 md:py-20 lg:py-28`}>
          <div className="lg:container lg:mx-auto lg:px-4 xl:px-8">
            <div className="lg:max-w-7xl lg:mx-auto px-4 sm:px-6 md:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="mb-16 sm:mb-20 md:mb-24 text-center"
              >
                <h2
                  className={`text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 ${isNegative ? 'text-white' : 'text-black'}`}
                  style={{ fontFamily: 'UnifixSP, sans-serif' }}
                >
                  НАШИ УСЛУГИ
                </h2>
                <p className={`text-lg sm:text-xl md:text-2xl leading-relaxed max-w-2xl mx-auto ${labelColor}`}>
                  Комплексная поддержка ваших цифровых продуктов — от безопасности до визуала
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 items-stretch">
                {services.map((service, idx) => (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className="h-full"
                  >
                    <GlowingServiceCard
                      icon={service.icon}
                      title={service.title}
                      subtitle={service.subtitle}
                      services={service.items}
                      accentColor={service.accentColor}
                      accentColorLight={service.accentColorLight}
                      accentColorRing={service.accentColorRing}
                      isNegative={isNegative}
                      className="h-full"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── НАШИ ПРОЕКТЫ ── */}
        <section className={`relative overflow-visible ${bgColor} py-12 sm:py-16 md:py-20 lg:py-28`}>
          <div className="lg:container lg:mx-auto lg:px-4 xl:px-8">
            <div className="lg:max-w-7xl lg:mx-auto px-4 sm:px-6 md:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="mb-16 sm:mb-20 md:mb-28 text-center"
              >
                <h2
                  className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-2 ${isNegative ? 'text-white' : 'text-black'}`}
                  style={{ fontFamily: 'UnifixSP, sans-serif' }}
                >
                  Наши проекты
                </h2>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="mb-12"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-center">
                  <div className="space-y-6">
                    {projectFeatures.map((feature) => (
                      <motion.div key={feature.id} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }} viewport={{ once: true }} className="flex gap-4">
                        <div className={cn("flex-shrink-0 w-12 h-12 rounded-lg border-[0.75px] p-2.5 flex items-center justify-center", isNegative ? 'border-white/20 bg-[#0a0a0a]' : 'border-black/20 bg-[#E8E7E3]')}>
                          <div className={iconColor}>{feature.icon}</div>
                        </div>
                        <div className="flex-1">
                          <h3 className={cn("font-bold text-xl mb-2", isNegative ? 'text-white' : 'text-black')}>{feature.title}</h3>
                          <p className={cn("text-base leading-relaxed", isNegative ? 'text-white/70' : 'text-black/70')}>{feature.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} viewport={{ once: true }} className="flex flex-col items-center justify-center">
                    <div className="flex flex-col items-center gap-6">
                      <div className="w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center">
                        <img src="/logohub.png" alt="Hub Logo" className="w-full h-full object-contain" />
                      </div>
                      <div className="text-5xl sm:text-6xl font-bold text-[#662bad]" style={{ fontFamily: 'UnifixSP, sans-serif' }}>
                        hub
                      </div>
                    </div>
                  </motion.div>

                  <div className="space-y-6">
                    {projectFeatures2.map((feature) => (
                      <motion.div key={feature.id} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }} viewport={{ once: true }} className="flex gap-4">
                        <div className={cn("flex-shrink-0 w-12 h-12 rounded-lg border-[0.75px] p-2.5 flex items-center justify-center", isNegative ? 'border-white/20 bg-[#0a0a0a]' : 'border-black/20 bg-[#E8E7E3]')}>
                          <div className={iconColor}>{feature.icon}</div>
                        </div>
                        <div className="flex-1">
                          <h3 className={cn("font-bold text-xl mb-2", isNegative ? 'text-white' : 'text-black')}>{feature.title}</h3>
                          <p className={cn("text-base leading-relaxed", isNegative ? 'text-white/70' : 'text-black/70')}>
                            {feature.description}{' '}
                            {feature.href && (
                              <a href={feature.href} target="_blank" rel="noopener noreferrer" className={cn("font-semibold underline transition-all", isNegative ? 'text-white hover:text-white/80' : 'text-black hover:text-black/80')}>
                                {feature.link}
                              </a>
                            )}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <Stats isNegative={isNegative} />

        {/* ── FAQ ── */}
        <section className={`relative overflow-visible ${bgColor} py-12 sm:py-16 md:py-20 lg:py-28`}>
          <div className="lg:container lg:mx-auto lg:px-4 xl:px-8">
            <div className="lg:max-w-7xl lg:mx-auto px-4 sm:px-6 md:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="mb-16 sm:mb-20 text-center"
              >
                <h2
                  className={`text-4xl sm:text-5xl md:text-6xl font-bold mb-4 ${isNegative ? 'text-white' : 'text-black'}`}
                  style={{ fontFamily: 'UnifixSP, sans-serif' }}
                >
                  Часто Задаваемые Вопросы
                </h2>
                <p className={`text-lg sm:text-xl leading-relaxed ${labelColor}`}>
                  Ответы на частые вопросы о Opensophy
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="max-w-4xl mx-auto"
              >
                <div className={cn("relative rounded-[1.25rem] border-[0.75px] p-2 md:rounded-[1.5rem] md:p-3", borderColor)}>
                  <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} borderWidth={3} isNegative={isNegative} />
                  <div className={cn("relative overflow-hidden rounded-xl border-[0.75px] shadow-sm", isNegative ? 'bg-[#0a0a0a] border-white/10 shadow-[0px_0px_27px_0px_rgba(45,45,45,0.3)]' : 'bg-[#E8E7E3] border-black/10')}>
                    <Accordion type="single" collapsible className="w-full">
                      {faqItems.map((item) => (
                        <AccordionItem key={item.id} value={item.id} className={cn("border-b-[0.75px]", isNegative ? 'border-white/10' : 'border-black/10', 'last:border-b-0')}>
                          <AccordionTrigger className={cn("text-left font-semibold transition-all hover:opacity-70", isNegative ? 'text-white' : 'text-black')}>
                            {item.title}
                          </AccordionTrigger>
                          <AccordionContent className={cn("text-base leading-relaxed", isNegative ? 'text-white/80' : 'text-black/70')}>
                            {item.content}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="mt-12 text-center"
              >
                <p className={`text-base sm:text-lg leading-relaxed mb-4 ${labelColor}`}>
                  Не нашли ответа на свой вопрос?
                </p>
                <a
                  href="mailto:opensophy@gmail.com"
                  className={`inline-flex items-center gap-2 px-6 py-3 backdrop-blur-2xl border rounded-lg transition-all duration-300 font-semibold hover:scale-105 ${
                    isNegative
                      ? 'bg-[#0a0a0a]/60 border-white/20 text-white hover:bg-white/10'
                      : 'bg-[#e8e7e3]/60 border-black/20 text-black hover:bg-black/10'
                  }`}
                >
                  Напишите нам
                </a>
              </motion.div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default General;
