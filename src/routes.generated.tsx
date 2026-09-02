/**
 * GENERATED FILE — DO NOT EDIT. Run `npm run seo:routes`.
 *
 * All 92 live URLs, derived from src/seo/registry.generated.ts:
 *   54 WordPress pages · 37 posts · 1 category archive
 *
 * Paths are written WITHOUT a trailing slash because that is react-router's
 * form; `dirStyle: 'nested'` in vite.config.ts turns each one back into
 * dist/<path>/index.html, which serves at the original trailing-slash URL.
 */
import type { RouteRecord } from 'vite-react-ssg'
import { RootLayout } from './layout/RootLayout'
import BlogPost from './pages/BlogPost'
import NotFound from './pages/NotFound'

export const routes: RouteRecord[] = [
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, lazy: async () => ({ Component: (await import('./pages/Home')).default }) },

      /* ---- WordPress pages (54) ---------------------------------------------- */
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

      /* ---- Blog posts (37) — one shared template ------------------------- */
  { path: 'anti-ageing-treatments-for-men-bengaluru', element: <BlogPost slug="anti-ageing-treatments-for-men-bengaluru" /> },
  { path: 'best-treatments-for-open-pores-and-uneven-skin-texture', element: <BlogPost slug="best-treatments-for-open-pores-and-uneven-skin-texture" /> },
  { path: 'blog-botox-vs-fillers-difference', element: <BlogPost slug="blog-botox-vs-fillers-difference" /> },
  { path: 'blog-is-laser-treatment-safe-for-indian-skin', element: <BlogPost slug="blog-is-laser-treatment-safe-for-indian-skin" /> },
  { path: 'breast-surgery-specialist-evaluation-before-procedure', element: <BlogPost slug="breast-surgery-specialist-evaluation-before-procedure" /> },
  { path: 'chemical-peels-vs-microneedling-vs-lasers-vs-injectables', element: <BlogPost slug="chemical-peels-vs-microneedling-vs-lasers-vs-injectables" /> },
  { path: 'choose-right-skin-treatment-dull-skin-pigmentation-acne-scars', element: <BlogPost slug="choose-right-skin-treatment-dull-skin-pigmentation-acne-scars" /> },
  { path: 'choosing-the-right-skin-and-hair-doctor', element: <BlogPost slug="choosing-the-right-skin-and-hair-doctor" /> },
  { path: 'coolsculpting-eliminate-stubborn-fat', element: <BlogPost slug="coolsculpting-eliminate-stubborn-fat" /> },
  { path: 'cryolipolysis-vs-liposuction-bengaluru', element: <BlogPost slug="cryolipolysis-vs-liposuction-bengaluru" /> },
  { path: 'earlobe-repair-surgery-bengaluru', element: <BlogPost slug="earlobe-repair-surgery-bengaluru" /> },
  { path: 'gynecomastia-surgery-bengaluru', element: <BlogPost slug="gynecomastia-surgery-bengaluru" /> },
  { path: 'hifu-a-non-surgical-facelift', element: <BlogPost slug="hifu-a-non-surgical-facelift" /> },
  { path: 'how-can-you-treat-stubborn-pigmentation-and-achieve-clearer-skin', element: <BlogPost slug="how-can-you-treat-stubborn-pigmentation-and-achieve-clearer-skin" /> },
  { path: 'how-dermatologists-treat-acne-scars', element: <BlogPost slug="how-dermatologists-treat-acne-scars" /> },
  { path: 'how-long-do-dermal-fillers-last', element: <BlogPost slug="how-long-do-dermal-fillers-last" /> },
  { path: 'how-to-prepare-skin-for-wedding', element: <BlogPost slug="how-to-prepare-skin-for-wedding" /> },
  { path: 'hydrafacial-vs-chemical-peel', element: <BlogPost slug="hydrafacial-vs-chemical-peel" /> },
  { path: 'laser-toning-for-pigmentation', element: <BlogPost slug="laser-toning-for-pigmentation" /> },
  { path: 'medical-facial-vs-salon-facial', element: <BlogPost slug="medical-facial-vs-salon-facial" /> },
  { path: 'mnrf-vs-co2-laser-for-acne-scars', element: <BlogPost slug="mnrf-vs-co2-laser-for-acne-scars" /> },
  { path: 'pdrn-salmon-dna-facial-benefits', element: <BlogPost slug="pdrn-salmon-dna-facial-benefits" /> },
  { path: 'phototherapy-for-skin-conditions', element: <BlogPost slug="phototherapy-for-skin-conditions" /> },
  { path: 'reconstructive-surgery-restoring-form-function-confidence', element: <BlogPost slug="reconstructive-surgery-restoring-form-function-confidence" /> },
  { path: 'rf-vs-hifu-skin-tightening', element: <BlogPost slug="rf-vs-hifu-skin-tightening" /> },
  { path: 'rhinoplasty-nose-reshaping-surgery-bangalore', element: <BlogPost slug="rhinoplasty-nose-reshaping-surgery-bangalore" /> },
  { path: 'skin-boosters-treatment-bengaluru', element: <BlogPost slug="skin-boosters-treatment-bengaluru" /> },
  { path: 'skin-boosters-vs-dermal-fillers', element: <BlogPost slug="skin-boosters-vs-dermal-fillers" /> },
  { path: 'thread-lift-vs-fillers-how-to-choose-the-right-treatment', element: <BlogPost slug="thread-lift-vs-fillers-how-to-choose-the-right-treatment" /> },
  { path: 'vaser-liposuction-complete-guide', element: <BlogPost slug="vaser-liposuction-complete-guide" /> },
  { path: 'vitiligo-repigmentation-treatment', element: <BlogPost slug="vitiligo-repigmentation-treatment" /> },
  { path: 'weight-loss-injections-bangalore', element: <BlogPost slug="weight-loss-injections-bangalore" /> },
  { path: 'what-is-preventive-botox-why-more-people-in-their-20s-and-30s-are-starting-early', element: <BlogPost slug="what-is-preventive-botox-why-more-people-in-their-20s-and-30s-are-starting-early" /> },
  { path: 'what-to-ask-before-cosmetic-surgery', element: <BlogPost slug="what-to-ask-before-cosmetic-surgery" /> },
  { path: 'when-should-you-start-anti-ageing-treatments-in-bengaluru', element: <BlogPost slug="when-should-you-start-anti-ageing-treatments-in-bengaluru" /> },
  { path: 'why-daily-sunscreen-is-your-best-skin-investment', element: <BlogPost slug="why-daily-sunscreen-is-your-best-skin-investment" /> },
  { path: 'xanthelasma-removal-bengaluru', element: <BlogPost slug="xanthelasma-removal-bengaluru" /> },

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
