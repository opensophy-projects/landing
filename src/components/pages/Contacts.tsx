import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { GlowingEffect } from '../ui/glowing-effect';

interface ContactsProps {
  isNegative: boolean;
}

const Contacts: React.FC<ContactsProps> = ({ isNegative }) => {
  const contactChannels = [
    {
      id: 'email',
      title: 'Email',
      description: 'Для подробных вопросов и предложений',
      link: 'opensophy@gmail.com',
      href: 'mailto:opensophy@gmail.com',
      external: false
    },
    {
      id: 'telegram',
      title: 'Telegram',
      description: 'Для быстрого ответа и консультаций',
      link: '@veilosophy',
      href: 'https://t.me/veilosophy',
      external: true
    },
    {
      id: 'github',
      title: 'GitHub',
      description: 'Открытые проекты и код',
      link: 'github.com/opensophy-projects',
      href: 'https://github.com/opensophy-projects',
      external: true
    },
    {
      id: 'habr',
      title: 'Habr',
      description: 'Статьи и публикации',
      link: 'habr.com/ru/users/opensophy',
      href: 'https://habr.com/ru/users/opensophy/',
      external: true
    }
  ];

  const borderColor = isNegative ? 'border-white/10' : 'border-black/10';
  const bgColor = isNegative ? 'bg-[#0a0a0a]' : 'bg-[#E8E7E3]';
  const textColor = isNegative ? 'text-white' : 'text-black';
  const subTextColor = isNegative ? 'text-white/70' : 'text-black/70';
  const labelColor = isNegative ? 'text-white/60' : 'text-black/50';

  return (
    <div className="min-h-screen relative flex flex-col">
      <Helmet>
        <title>Контакты — Opensophy</title>
        <meta name="title" content="Контакты — Opensophy" />
        <meta name="description" content="Свяжитесь с командой Opensophy. Мы открыты к сотрудничеству, вопросам и предложениям. Email, Telegram, GitHub, Habr." />
        <meta name="keywords" content="контакты Opensophy, связь, Telegram, GitHub, Habr, Opensophy email, сотрудничество" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <link rel="canonical" href="https://opensophy.com/contacts" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://opensophy.com/contacts" />
        <meta property="og:title" content="Контакты — Opensophy" />
        <meta property="og:description" content="Свяжитесь с командой Opensophy. Мы открыты к сотрудничеству, вопросам и предложениям." />
        <meta property="og:locale" content="ru_RU" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://opensophy.com/contacts" />
        <meta property="twitter:title" content="Контакты — Opensophy" />
        <meta property="twitter:description" content="Свяжитесь с командой Opensophy. Мы открыты к сотрудничеству, вопросам и предложениям." />
        <script type="application/ld+json">
          {`{
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Opensophy — Контакты",
            "description": "Свяжитесь с командой Opensophy. Мы открыты к сотрудничеству, вопросам и предложениям.",
            "url": "https://opensophy.com/contacts",
            "isPartOf": {
              "@type": "WebSite",
              "name": "Opensophy",
              "url": "https://opensophy.com"
            },
            "breadcrumb": {
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Главная",
                  "item": "https://opensophy.com/"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Контакты",
                  "item": "https://opensophy.com/contacts"
                }
              ]
            }
          }`}
        </script>
      </Helmet>

      <div className={`absolute inset-0 transition-all duration-500 ${bgColor}`} />

      <div className={`relative z-10 flex-1 flex flex-col pb-20 ${textColor}`}>

        {/* Hero */}
        <section className={`py-20 sm:py-24 md:py-32 lg:py-40 px-4 sm:px-6 md:px-8 ${bgColor}`}>
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <p className={`text-xs sm:text-sm font-semibold uppercase tracking-widest mb-4 ${labelColor}`}>
                СВЯЗЬ
              </p>
              <h1
                className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 sm:mb-8 ${textColor}`}
                style={{ fontFamily: 'UnifixSP, sans-serif' }}
              >
                Контакты
              </h1>
              <p className={`text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl mx-auto ${subTextColor}`}>
                Свяжитесь с нами несколькими способами. Мы всегда открыты к сотрудничеству, вопросам и предложениям.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact cards */}
        <section className={`flex-1 ${bgColor} py-12 sm:py-16 md:py-20`}>
          <div className="lg:container lg:mx-auto lg:px-4 xl:px-8">
            <div className="lg:max-w-7xl lg:mx-auto w-full px-4 sm:px-6 md:px-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                {contactChannels.map((channel, index) => (
                  <motion.a
                    key={channel.id}
                    href={channel.href}
                    target={channel.external ? '_blank' : undefined}
                    rel={channel.external ? 'noopener noreferrer' : undefined}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="block group cursor-pointer"
                  >
                    <div className={cn(
                      "relative h-full rounded-[1.25rem] border-[0.75px] p-2 md:rounded-[1.5rem] md:p-3",
                      borderColor
                    )}>
                      <GlowingEffect
                        spread={40}
                        glow={true}
                        disabled={false}
                        proximity={64}
                        inactiveZone={0.01}
                        borderWidth={3}
                        isNegative={isNegative}
                      />
                      <div className={cn(
                        "relative flex flex-col gap-4 overflow-hidden rounded-xl border-[0.75px] p-8 md:p-10 shadow-sm transition-all duration-300 group-hover:scale-[1.02]",
                        isNegative
                          ? 'bg-[#0a0a0a] border-white/10 shadow-[0px_0px_27px_0px_rgba(45,45,45,0.3)]'
                          : 'bg-[#E8E7E3] border-black/10'
                      )}>
                        <div className="space-y-3">
                          <h3
                            className={cn("text-2xl sm:text-3xl font-bold", textColor)}
                            style={{ fontFamily: 'UnifixSP, sans-serif' }}
                          >
                            {channel.title}
                          </h3>
                          <p className={cn("text-sm sm:text-base", subTextColor)}>
                            {channel.description}
                          </p>
                          <div className={cn(
                            "text-base sm:text-lg font-semibold pt-2 transition-colors",
                            isNegative
                              ? 'text-white/80 group-hover:text-white'
                              : 'text-black/80 group-hover:text-black'
                          )}>
                            {channel.link}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default Contacts;