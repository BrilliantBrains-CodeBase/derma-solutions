/**
 * GENERATED FILE — DO NOT EDIT. Run `npm run seo:routes`.
 *
 * All 93 URLs, derived from src/seo/registry.generated.ts:
 *   55 WordPress pages · 37 posts · 1 category archive
 *
 * Paths are written WITHOUT a trailing slash because that is react-router's
 * form; `dirStyle: 'nested'` in vite.config.ts turns each one back into
 * dist/<path>/index.html, which serves at the original trailing-slash URL.
 */
import type { RouteRecord } from 'vite-react-ssg'
import { RootLayout } from './layout/RootLayout'
import NotFound from './pages/NotFound'

export const routes: RouteRecord[] = [
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, lazy: async () => ({ Component: (await import('./pages/Home')).default }) },

      /* ---- WordPress pages (55) ---------------------------------------------- */
  { path: 'abdominoplasty-tummy-tuck-treatment-in-bangalore', lazy: async () => ({ Component: (await import('./pages/AbdominoplastyTummyTuckTreatmentInBangalore')).default }) },
  { path: 'acne-scar-treatment-in-bangalore', lazy: async () => ({ Component: (await import('./pages/AcneScarTreatmentInBangalore')).default }) },
  { path: 'best-dermatologist-in-marathahalli-whitefield-bangalore', lazy: async () => ({ Component: (await import('./pages/BestDermatologistInMarathahalliWhitefieldBangalore')).default }) },
  { path: 'best-hair-loss-treatment-in-bangalore', lazy: async () => ({ Component: (await import('./pages/BestHairLossTreatmentInBangalore')).default }) },
  { path: 'best-hydrafacial-treatment-in-marathahalli-whitefield-bangalore', lazy: async () => ({ Component: (await import('./pages/BestHydrafacialTreatmentInMarathahalliWhitefieldBangalore')).default }) },
  { path: 'blogs', lazy: async () => ({ Component: (await import('./pages/Blogs')).default }) },
  { path: 'botox-treatment-in-bangalore-whitefield-and-marathahalli', lazy: async () => ({ Component: (await import('./pages/BotoxTreatmentInBangaloreWhitefieldAndMarathahalli')).default }) },
  { path: 'breast-surgeries-in-bangalore', lazy: async () => ({ Component: (await import('./pages/BreastSurgeriesInBangalore')).default }) },
  { path: 'category/uncategorized', lazy: async () => ({ Component: (await import('./pages/CategoryUncategorized')).default }) },
  { path: 'chemical-peel-treatment-in-bangalore', lazy: async () => ({ Component: (await import('./pages/ChemicalPeelTreatmentInBangalore')).default }) },
  { path: 'cosmetic-dermatology-in-bangalore', lazy: async () => ({ Component: (await import('./pages/CosmeticDermatologyInBangalore')).default }) },
  { path: 'cosmetic-plastic-surgery-in-marathahalli', lazy: async () => ({ Component: (await import('./pages/CosmeticPlasticSurgeryInMarathahalli')).default }) },
  { path: 'cryolipolysis-coolsculpting-in-bangalore', lazy: async () => ({ Component: (await import('./pages/CryolipolysisCoolsculptingInBangalore')).default }) },
  { path: 'dermal-fillers-treatment-bangalore', lazy: async () => ({ Component: (await import('./pages/DermalFillersTreatmentBangalore')).default }) },
  { path: 'dr-chandhana-vishal-n-plastic-surgeon', lazy: async () => ({ Component: (await import('./pages/DrChandhanaVishalNPlasticSurgeon')).default }) },
  { path: 'dr-sumedha-tirthani-dermatologist', lazy: async () => ({ Component: (await import('./pages/DrSumedhaTirthaniDermatologist')).default }) },
  { path: 'dr-thyagaraj-best-plastic-surgeon-in-bangalore', lazy: async () => ({ Component: (await import('./pages/DrThyagarajBestPlasticSurgeonInBangalore')).default }) },
  { path: 'ear-lobe-repair-surgery-in-bangalore', lazy: async () => ({ Component: (await import('./pages/EarLobeRepairSurgeryInBangalore')).default }) },
  { path: 'fractional-co2-laser-skin-resurfacing-in-bangalore', lazy: async () => ({ Component: (await import('./pages/FractionalCo2LaserSkinResurfacingInBangalore')).default }) },
  { path: 'gfc-hair-treatment-in-bangalore', lazy: async () => ({ Component: (await import('./pages/GfcHairTreatmentInBangalore')).default }) },
  { path: 'gynecomastia-surgery-in-bangalore', lazy: async () => ({ Component: (await import('./pages/GynecomastiaSurgeryInBangalore')).default }) },
  { path: 'hair-analysis-in-bangalore', lazy: async () => ({ Component: (await import('./pages/HairAnalysisInBangalore')).default }) },
  { path: 'hair-transplant-in-bangalore-marathahalli-whitefield', lazy: async () => ({ Component: (await import('./pages/HairTransplantInBangaloreMarathahalliWhitefield')).default }) },
  { path: 'hifu-treatment-in-bangalore', lazy: async () => ({ Component: (await import('./pages/HifuTreatmentInBangalore')).default }) },
  { path: 'hollywood-facial-carbon-laser-peel-bangalore', lazy: async () => ({ Component: (await import('./pages/HollywoodFacialCarbonLaserPeelBangalore')).default }) },
  { path: 'image-gallery', lazy: async () => ({ Component: (await import('./pages/ImageGallery')).default }) },
  { path: 'inch-reduction-treatment-in-bangalore', lazy: async () => ({ Component: (await import('./pages/InchReductionTreatmentInBangalore')).default }) },
  { path: 'iv-glutathione-treatment', lazy: async () => ({ Component: (await import('./pages/IvGlutathioneTreatment')).default }) },
  { path: 'iv-glutathione-treatment-in-bangalore', lazy: async () => ({ Component: (await import('./pages/IvGlutathioneTreatmentInBangalore')).default }) },
  { path: 'laser-hair-removal-in-bangalore', lazy: async () => ({ Component: (await import('./pages/LaserHairRemovalInBangalore')).default }) },
  { path: 'laser-tattoo-removal-in-bangalore', lazy: async () => ({ Component: (await import('./pages/LaserTattooRemovalInBangalore')).default }) },
  { path: 'laser-toning-treatment-in-bangalore', lazy: async () => ({ Component: (await import('./pages/LaserToningTreatmentInBangalore')).default }) },
  { path: 'liposuction-treatment-in-bangalore', lazy: async () => ({ Component: (await import('./pages/LiposuctionTreatmentInBangalore')).default }) },
  { path: 'maintenance-page', lazy: async () => ({ Component: (await import('./pages/MaintenancePage')).default }) },
  { path: 'microdermabrasion-treatment-in-bangalore', lazy: async () => ({ Component: (await import('./pages/MicrodermabrasionTreatmentInBangalore')).default }) },
  { path: 'mnrf-treatment-in-bangalore-microneedling-with-radio-frequency', lazy: async () => ({ Component: (await import('./pages/MnrfTreatmentInBangaloreMicroneedlingWithRadioFrequency')).default }) },
  { path: 'mole-removal-treatment-in-bangalore', lazy: async () => ({ Component: (await import('./pages/MoleRemovalTreatmentInBangalore')).default }) },
  { path: 'nad-iv-drips-treatment-in-bangalore', lazy: async () => ({ Component: (await import('./pages/NadIvDripsTreatmentInBangalore')).default }) },
  { path: 'phototherapy-treatment-in-bangalore', lazy: async () => ({ Component: (await import('./pages/PhototherapyTreatmentInBangalore')).default }) },
  { path: 'privacy-policy', lazy: async () => ({ Component: (await import('./pages/PrivacyPolicy')).default }) },
  { path: 'radio-frequency-skin-tightening-treatment', lazy: async () => ({ Component: (await import('./pages/RadioFrequencySkinTighteningTreatment')).default }) },
  { path: 'rhinoplasty-surgery-in-bangalore', lazy: async () => ({ Component: (await import('./pages/RhinoplastySurgeryInBangalore')).default }) },
  { path: 'salmon-sperm-pdrn-facial-in-bangalore', lazy: async () => ({ Component: (await import('./pages/SalmonSpermPdrnFacialInBangalore')).default }) },
  { path: 'skin-boosters-treatment-in-bangalore', lazy: async () => ({ Component: (await import('./pages/SkinBoostersTreatmentInBangalore')).default }) },
  { path: 'skin-lightening-treatment-in-bangalore', lazy: async () => ({ Component: (await import('./pages/SkinLighteningTreatmentInBangalore')).default }) },
  { path: 'skin-tightening-treatment-in-marathahalli-whitefield', lazy: async () => ({ Component: (await import('./pages/SkinTighteningTreatmentInMarathahalliWhitefield')).default }) },
  { path: 'terms-of-use', lazy: async () => ({ Component: (await import('./pages/TermsOfUse')).default }) },
  { path: 'thread-lifts', lazy: async () => ({ Component: (await import('./pages/ThreadLifts')).default }) },
  { path: 'video-gallery', lazy: async () => ({ Component: (await import('./pages/VideoGallery')).default }) },
  { path: 'vitiligo-laser-treatment-in-bangalore', lazy: async () => ({ Component: (await import('./pages/VitiligoLaserTreatmentInBangalore')).default }) },
  { path: 'warts-removal-treatment-in-bangalore', lazy: async () => ({ Component: (await import('./pages/WartsRemovalTreatmentInBangalore')).default }) },
  { path: 'weight-loss-injections-in-bangalore', lazy: async () => ({ Component: (await import('./pages/WeightLossInjectionsInBangalore')).default }) },
  { path: 'weight-loss-treatment-in-marathahalli', lazy: async () => ({ Component: (await import('./pages/WeightLossTreatmentInMarathahalli')).default }) },
  { path: 'xanthelasma-removal-treatment-in-bangalore', lazy: async () => ({ Component: (await import('./pages/XanthelasmaRemovalTreatmentInBangalore')).default }) },
  { path: 'dermato-surgery-in-bangalore', lazy: async () => ({ Component: (await import('./pages/DermatoSurgeryInBangalore')).default }) },

      /* ---- Blog posts (37) — one shared template ---------------------------
       * Each route loads the template and its own content module
       * (src/content/blog/posts/<slug>.ts, from `npm run content:blog`), so no
       * page carries the other posts' bodies.
       */
  { path: 'anti-ageing-treatments-for-men-bengaluru', lazy: async () => {
    const [{ default: BlogPost }, { default: post }] = await Promise.all([import('./pages/BlogPost'), import('./content/blog/posts/anti-ageing-treatments-for-men-bengaluru')])
    return { Component: () => <BlogPost post={post} /> }
  } },
  { path: 'best-treatments-for-open-pores-and-uneven-skin-texture', lazy: async () => {
    const [{ default: BlogPost }, { default: post }] = await Promise.all([import('./pages/BlogPost'), import('./content/blog/posts/best-treatments-for-open-pores-and-uneven-skin-texture')])
    return { Component: () => <BlogPost post={post} /> }
  } },
  { path: 'blog-botox-vs-fillers-difference', lazy: async () => {
    const [{ default: BlogPost }, { default: post }] = await Promise.all([import('./pages/BlogPost'), import('./content/blog/posts/blog-botox-vs-fillers-difference')])
    return { Component: () => <BlogPost post={post} /> }
  } },
  { path: 'blog-is-laser-treatment-safe-for-indian-skin', lazy: async () => {
    const [{ default: BlogPost }, { default: post }] = await Promise.all([import('./pages/BlogPost'), import('./content/blog/posts/blog-is-laser-treatment-safe-for-indian-skin')])
    return { Component: () => <BlogPost post={post} /> }
  } },
  { path: 'breast-surgery-specialist-evaluation-before-procedure', lazy: async () => {
    const [{ default: BlogPost }, { default: post }] = await Promise.all([import('./pages/BlogPost'), import('./content/blog/posts/breast-surgery-specialist-evaluation-before-procedure')])
    return { Component: () => <BlogPost post={post} /> }
  } },
  { path: 'chemical-peels-vs-microneedling-vs-lasers-vs-injectables', lazy: async () => {
    const [{ default: BlogPost }, { default: post }] = await Promise.all([import('./pages/BlogPost'), import('./content/blog/posts/chemical-peels-vs-microneedling-vs-lasers-vs-injectables')])
    return { Component: () => <BlogPost post={post} /> }
  } },
  { path: 'choose-right-skin-treatment-dull-skin-pigmentation-acne-scars', lazy: async () => {
    const [{ default: BlogPost }, { default: post }] = await Promise.all([import('./pages/BlogPost'), import('./content/blog/posts/choose-right-skin-treatment-dull-skin-pigmentation-acne-scars')])
    return { Component: () => <BlogPost post={post} /> }
  } },
  { path: 'choosing-the-right-skin-and-hair-doctor', lazy: async () => {
    const [{ default: BlogPost }, { default: post }] = await Promise.all([import('./pages/BlogPost'), import('./content/blog/posts/choosing-the-right-skin-and-hair-doctor')])
    return { Component: () => <BlogPost post={post} /> }
  } },
  { path: 'coolsculpting-eliminate-stubborn-fat', lazy: async () => {
    const [{ default: BlogPost }, { default: post }] = await Promise.all([import('./pages/BlogPost'), import('./content/blog/posts/coolsculpting-eliminate-stubborn-fat')])
    return { Component: () => <BlogPost post={post} /> }
  } },
  { path: 'cryolipolysis-vs-liposuction-bengaluru', lazy: async () => {
    const [{ default: BlogPost }, { default: post }] = await Promise.all([import('./pages/BlogPost'), import('./content/blog/posts/cryolipolysis-vs-liposuction-bengaluru')])
    return { Component: () => <BlogPost post={post} /> }
  } },
  { path: 'earlobe-repair-surgery-bengaluru', lazy: async () => {
    const [{ default: BlogPost }, { default: post }] = await Promise.all([import('./pages/BlogPost'), import('./content/blog/posts/earlobe-repair-surgery-bengaluru')])
    return { Component: () => <BlogPost post={post} /> }
  } },
  { path: 'gynecomastia-surgery-bengaluru', lazy: async () => {
    const [{ default: BlogPost }, { default: post }] = await Promise.all([import('./pages/BlogPost'), import('./content/blog/posts/gynecomastia-surgery-bengaluru')])
    return { Component: () => <BlogPost post={post} /> }
  } },
  { path: 'hifu-a-non-surgical-facelift', lazy: async () => {
    const [{ default: BlogPost }, { default: post }] = await Promise.all([import('./pages/BlogPost'), import('./content/blog/posts/hifu-a-non-surgical-facelift')])
    return { Component: () => <BlogPost post={post} /> }
  } },
  { path: 'how-can-you-treat-stubborn-pigmentation-and-achieve-clearer-skin', lazy: async () => {
    const [{ default: BlogPost }, { default: post }] = await Promise.all([import('./pages/BlogPost'), import('./content/blog/posts/how-can-you-treat-stubborn-pigmentation-and-achieve-clearer-skin')])
    return { Component: () => <BlogPost post={post} /> }
  } },
  { path: 'how-dermatologists-treat-acne-scars', lazy: async () => {
    const [{ default: BlogPost }, { default: post }] = await Promise.all([import('./pages/BlogPost'), import('./content/blog/posts/how-dermatologists-treat-acne-scars')])
    return { Component: () => <BlogPost post={post} /> }
  } },
  { path: 'how-long-do-dermal-fillers-last', lazy: async () => {
    const [{ default: BlogPost }, { default: post }] = await Promise.all([import('./pages/BlogPost'), import('./content/blog/posts/how-long-do-dermal-fillers-last')])
    return { Component: () => <BlogPost post={post} /> }
  } },
  { path: 'how-to-prepare-skin-for-wedding', lazy: async () => {
    const [{ default: BlogPost }, { default: post }] = await Promise.all([import('./pages/BlogPost'), import('./content/blog/posts/how-to-prepare-skin-for-wedding')])
    return { Component: () => <BlogPost post={post} /> }
  } },
  { path: 'hydrafacial-vs-chemical-peel', lazy: async () => {
    const [{ default: BlogPost }, { default: post }] = await Promise.all([import('./pages/BlogPost'), import('./content/blog/posts/hydrafacial-vs-chemical-peel')])
    return { Component: () => <BlogPost post={post} /> }
  } },
  { path: 'laser-toning-for-pigmentation', lazy: async () => {
    const [{ default: BlogPost }, { default: post }] = await Promise.all([import('./pages/BlogPost'), import('./content/blog/posts/laser-toning-for-pigmentation')])
    return { Component: () => <BlogPost post={post} /> }
  } },
  { path: 'medical-facial-vs-salon-facial', lazy: async () => {
    const [{ default: BlogPost }, { default: post }] = await Promise.all([import('./pages/BlogPost'), import('./content/blog/posts/medical-facial-vs-salon-facial')])
    return { Component: () => <BlogPost post={post} /> }
  } },
  { path: 'mnrf-vs-co2-laser-for-acne-scars', lazy: async () => {
    const [{ default: BlogPost }, { default: post }] = await Promise.all([import('./pages/BlogPost'), import('./content/blog/posts/mnrf-vs-co2-laser-for-acne-scars')])
    return { Component: () => <BlogPost post={post} /> }
  } },
  { path: 'pdrn-salmon-dna-facial-benefits', lazy: async () => {
    const [{ default: BlogPost }, { default: post }] = await Promise.all([import('./pages/BlogPost'), import('./content/blog/posts/pdrn-salmon-dna-facial-benefits')])
    return { Component: () => <BlogPost post={post} /> }
  } },
  { path: 'phototherapy-for-skin-conditions', lazy: async () => {
    const [{ default: BlogPost }, { default: post }] = await Promise.all([import('./pages/BlogPost'), import('./content/blog/posts/phototherapy-for-skin-conditions')])
    return { Component: () => <BlogPost post={post} /> }
  } },
  { path: 'reconstructive-surgery-restoring-form-function-confidence', lazy: async () => {
    const [{ default: BlogPost }, { default: post }] = await Promise.all([import('./pages/BlogPost'), import('./content/blog/posts/reconstructive-surgery-restoring-form-function-confidence')])
    return { Component: () => <BlogPost post={post} /> }
  } },
  { path: 'rf-vs-hifu-skin-tightening', lazy: async () => {
    const [{ default: BlogPost }, { default: post }] = await Promise.all([import('./pages/BlogPost'), import('./content/blog/posts/rf-vs-hifu-skin-tightening')])
    return { Component: () => <BlogPost post={post} /> }
  } },
  { path: 'rhinoplasty-nose-reshaping-surgery-bangalore', lazy: async () => {
    const [{ default: BlogPost }, { default: post }] = await Promise.all([import('./pages/BlogPost'), import('./content/blog/posts/rhinoplasty-nose-reshaping-surgery-bangalore')])
    return { Component: () => <BlogPost post={post} /> }
  } },
  { path: 'skin-boosters-treatment-bengaluru', lazy: async () => {
    const [{ default: BlogPost }, { default: post }] = await Promise.all([import('./pages/BlogPost'), import('./content/blog/posts/skin-boosters-treatment-bengaluru')])
    return { Component: () => <BlogPost post={post} /> }
  } },
  { path: 'skin-boosters-vs-dermal-fillers', lazy: async () => {
    const [{ default: BlogPost }, { default: post }] = await Promise.all([import('./pages/BlogPost'), import('./content/blog/posts/skin-boosters-vs-dermal-fillers')])
    return { Component: () => <BlogPost post={post} /> }
  } },
  { path: 'thread-lift-vs-fillers-how-to-choose-the-right-treatment', lazy: async () => {
    const [{ default: BlogPost }, { default: post }] = await Promise.all([import('./pages/BlogPost'), import('./content/blog/posts/thread-lift-vs-fillers-how-to-choose-the-right-treatment')])
    return { Component: () => <BlogPost post={post} /> }
  } },
  { path: 'vaser-liposuction-complete-guide', lazy: async () => {
    const [{ default: BlogPost }, { default: post }] = await Promise.all([import('./pages/BlogPost'), import('./content/blog/posts/vaser-liposuction-complete-guide')])
    return { Component: () => <BlogPost post={post} /> }
  } },
  { path: 'vitiligo-repigmentation-treatment', lazy: async () => {
    const [{ default: BlogPost }, { default: post }] = await Promise.all([import('./pages/BlogPost'), import('./content/blog/posts/vitiligo-repigmentation-treatment')])
    return { Component: () => <BlogPost post={post} /> }
  } },
  { path: 'weight-loss-injections-bangalore', lazy: async () => {
    const [{ default: BlogPost }, { default: post }] = await Promise.all([import('./pages/BlogPost'), import('./content/blog/posts/weight-loss-injections-bangalore')])
    return { Component: () => <BlogPost post={post} /> }
  } },
  { path: 'what-is-preventive-botox-why-more-people-in-their-20s-and-30s-are-starting-early', lazy: async () => {
    const [{ default: BlogPost }, { default: post }] = await Promise.all([import('./pages/BlogPost'), import('./content/blog/posts/what-is-preventive-botox-why-more-people-in-their-20s-and-30s-are-starting-early')])
    return { Component: () => <BlogPost post={post} /> }
  } },
  { path: 'what-to-ask-before-cosmetic-surgery', lazy: async () => {
    const [{ default: BlogPost }, { default: post }] = await Promise.all([import('./pages/BlogPost'), import('./content/blog/posts/what-to-ask-before-cosmetic-surgery')])
    return { Component: () => <BlogPost post={post} /> }
  } },
  { path: 'when-should-you-start-anti-ageing-treatments-in-bengaluru', lazy: async () => {
    const [{ default: BlogPost }, { default: post }] = await Promise.all([import('./pages/BlogPost'), import('./content/blog/posts/when-should-you-start-anti-ageing-treatments-in-bengaluru')])
    return { Component: () => <BlogPost post={post} /> }
  } },
  { path: 'why-daily-sunscreen-is-your-best-skin-investment', lazy: async () => {
    const [{ default: BlogPost }, { default: post }] = await Promise.all([import('./pages/BlogPost'), import('./content/blog/posts/why-daily-sunscreen-is-your-best-skin-investment')])
    return { Component: () => <BlogPost post={post} /> }
  } },
  { path: 'xanthelasma-removal-bengaluru', lazy: async () => {
    const [{ default: BlogPost }, { default: post }] = await Promise.all([import('./pages/BlogPost'), import('./content/blog/posts/xanthelasma-removal-bengaluru')])
    return { Component: () => <BlogPost post={post} /> }
  } },

      /* ---- Not found -------------------------------------------------------
       * '404' is prerendered so static hosts have a 404.html to serve; the
       * post-build step moves it to dist/404.html. The catch-all handles
       * client-side navigation. Neither is in the sitemap, both are noindex.
       */
      { path: '404', element: <NotFound /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]

/** Sanity: the homepage record the registry expects to back `index: true`. */
export const homeSlug = 'derma-solutions-home'
