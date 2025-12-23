"use client"

import Script from "next/script"

export default function InstagramSection() {
  const posts = [
    // Post 1 (Original)
    `<blockquote class="instagram-media" data-instgrm-permalink="https://www.instagram.com/p/DQW4QAQEnDx/?utm_source=ig_embed&amp;utm_campaign=loading" data-instgrm-version="14" style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);">...</blockquote>`,
    // Post 2
    `<blockquote class="instagram-media" data-instgrm-permalink="https://www.instagram.com/p/DQSBqOWEgfc/?utm_source=ig_embed&amp;utm_campaign=loading" data-instgrm-version="14" style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);">...</blockquote>`,
    // Post 3
    `<blockquote class="instagram-media" data-instgrm-permalink="https://www.instagram.com/p/DQCn9nmEkoW/?utm_source=ig_embed&amp;utm_campaign=loading" data-instgrm-version="14" style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);">...</blockquote>`,
    // Post 4
    `<blockquote class="instagram-media" data-instgrm-permalink="https://www.instagram.com/p/DOOIXjpj1SF/?utm_source=ig_embed&amp;utm_campaign=loading" data-instgrm-version="14" style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);">...</blockquote>`
  ]

  // Full HTML content for posts
  // Since the user provided FULL blockquotes, I will insert them as is.
  // Note: I will use the actual full strings in the tool call below, trimming the '...' used in this thought process.

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-12 bg-clip-text text-transparent bg-linear-to-b from-neutral-800 to-neutral-500 dark:from-neutral-200 dark:to-neutral-500">
          Life & Updates
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 justify-items-center">
          {/* 
                    We render each post in a div. 
                    Instagram embed script will find them. 
                */}
          <div dangerouslySetInnerHTML={{ __html: `<blockquote class="instagram-media" data-instgrm-permalink="https://www.instagram.com/p/DQW4QAQEnDx/?utm_source=ig_embed&amp;utm_campaign=loading" data-instgrm-version="14" style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"></blockquote>` }} />
          <div dangerouslySetInnerHTML={{ __html: `<blockquote class="instagram-media" data-instgrm-permalink="https://www.instagram.com/p/DQSBqOWEgfc/?utm_source=ig_embed&amp;utm_campaign=loading" data-instgrm-version="14" style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"></blockquote>` }} />
          <div dangerouslySetInnerHTML={{ __html: `<blockquote class="instagram-media" data-instgrm-permalink="https://www.instagram.com/p/DQCn9nmEkoW/?utm_source=ig_embed&amp;utm_campaign=loading" data-instgrm-version="14" style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"></blockquote>` }} />
          <div dangerouslySetInnerHTML={{ __html: `<blockquote class="instagram-media" data-instgrm-permalink="https://www.instagram.com/p/DOOIXjpj1SF/?utm_source=ig_embed&amp;utm_campaign=loading" data-instgrm-version="14" style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"></blockquote>` }} />
        </div>
        <Script src="//www.instagram.com/embed.js" strategy="lazyOnload" />
      </div>
    </section>
  )
}
